try:
    import torch
    import torch.nn as nn
    from torchvision import models, transforms
    import torch.nn.functional as F
    TORCH_AVAILABLE = True
except Exception as e:
    print(f"Warning: Failed to import PyTorch: {e}")
    TORCH_AVAILABLE = False

from PIL import Image
import os
import cv2
import numpy as np

MODEL_PATH = os.getenv("MODEL_PATH", "./models/brain_tumor_model.pth")
CLASSES = ["Glioma", "Meningioma", "No Tumor", "Pituitary"]

class BrainTumorModel:
    def __init__(self):
        self.model = None
        self.is_loaded = False
        if not TORCH_AVAILABLE:
            return
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])
    def _load_model(self):
        if not os.path.exists(MODEL_PATH):
            print(f"Warning: Model not found at {MODEL_PATH}")
            return
        
        try:
            # Using EfficientNetV2-S as requested by the user
            self.model = models.efficientnet_v2_s(pretrained=False)
            num_ftrs = self.model.classifier[1].in_features
            self.model.classifier[1] = nn.Linear(num_ftrs, len(CLASSES))
            self.model.load_state_dict(torch.load(MODEL_PATH, map_location=self.device))
            self.model.to(self.device)
            self.model.eval()
            self.is_loaded = True
        except Exception as e:
            print(f"Error loading model: {e}")
            self.model = None
            self.is_loaded = False

    def analyze(self, image_path, output_dir, analysis_id):
        if not TORCH_AVAILABLE:
            raise RuntimeError("PyTorch is not available due to environment DLL restrictions. Cannot perform inference.")
        
        if not self.is_loaded:
            self._load_model()
            
        if self.model is None:
            raise RuntimeError(f"Trained model not found at {MODEL_PATH}. Please put your EfficientNet model there.")

        image = Image.open(image_path).convert("RGB")
        img_tensor = self.transform(image).unsqueeze(0).to(self.device)

        # For Grad-CAM with EfficientNetV2-S, the last convolutional layer before pooling
        # is typically self.model.features[-1]
        gradients = []
        activations = []

        def backward_hook(module, grad_input, grad_output):
            gradients.append(grad_output[0])

        def forward_hook(module, input, output):
            activations.append(output)

        target_layer = self.model.features[-1]
        b_hook = target_layer.register_full_backward_hook(backward_hook)
        f_hook = target_layer.register_forward_hook(forward_hook)

        # Forward pass
        output = self.model(img_tensor) # raw logits (z)
        
        # Temperature Scaling for confidence calibration
        # T is typically found by minimizing NLL on a validation set. 
        # Using T=2.5 as a reasonable heuristic to soften overconfident logits.
        T = 2.5 
        scaled_logits = output / T
        
        probabilities = F.softmax(scaled_logits, dim=1).squeeze().tolist()
        pred_idx = torch.argmax(output).item() # Prediction remains same based on raw logits
        confidence = probabilities[pred_idx]
            
        predicted_class = CLASSES[pred_idx]
        probs_dict = {cls: float(prob) for cls, prob in zip(CLASSES, probabilities)}

        # Backward pass for Grad-CAM
        self.model.zero_grad()
        class_loss = output[0, pred_idx]
        class_loss.backward()

        # Remove hooks
        b_hook.remove()
        f_hook.remove()

        # Compute Grad-CAM
        pooled_gradients = torch.mean(gradients[0], dim=[0, 2, 3])
        for i in range(activations[0].shape[1]):
            activations[0][:, i, :, :] *= pooled_gradients[i]

        heatmap = torch.mean(activations[0], dim=1).squeeze()
        heatmap = F.relu(heatmap)
        heatmap /= torch.max(heatmap)
        heatmap = heatmap.cpu().detach().numpy()

        # Resize heatmap to match original image size
        orig_img = cv2.imread(image_path)
        heatmap_resized = cv2.resize(heatmap, (orig_img.shape[1], orig_img.shape[0]))
        heatmap_resized = np.uint8(255 * heatmap_resized)
        heatmap_color = cv2.applyColorMap(heatmap_resized, cv2.COLORMAP_JET)

        overlay = heatmap_color * 0.4 + orig_img * 0.6
        
        heatmap_path = os.path.join(output_dir, f"{analysis_id}_heatmap.jpg")
        overlay_path = os.path.join(output_dir, f"{analysis_id}_overlay.jpg")

        cv2.imwrite(heatmap_path, heatmap_color)
        cv2.imwrite(overlay_path, overlay)

        return {
            "predicted_class": predicted_class,
            "confidence": float(confidence),
            "probabilities": probs_dict,
            "heatmap_path": heatmap_path,
            "overlay_path": overlay_path
        }

model_instance = BrainTumorModel()
