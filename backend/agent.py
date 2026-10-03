import os
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()

# Use google-genai (new HTTP-based SDK, no gRPC — works on restricted Windows environments)
try:
    from google import genai
    from google.genai import types
    GENAI_AVAILABLE = True
except Exception as e:
    print(f"Warning: google-genai import failed: {e}")
    GENAI_AVAILABLE = False

_client = None

def _get_client():
    global _client
    if _client is not None:
        return _client
    api_key = os.getenv("GENAI_API_KEY")
    if not api_key or api_key == "your_gemini_api_key_here":
        raise ValueError("GENAI_API_KEY is not set. Add it to backend/.env")
    if not GENAI_AVAILABLE:
        raise RuntimeError("google-genai SDK is not available.")
    _client = genai.Client(api_key=api_key)
    return _client


def validate_mri(image_path: str) -> bool:
    """
    Agentic GenAI step: Check if the uploaded image is actually a brain MRI before processing.
    """
    try:
        from PIL import Image
        client = _get_client()
        img = Image.open(image_path)
        
        prompt = "Look at this image. Is it a Brain MRI scan? Reply strictly with just 'YES' or 'NO'."
        response = client.models.generate_content(
            model="gemini-3.8-flash",
            contents=[img, prompt]
        )
        
        return "YES" in response.text.upper()
    except Exception as e:
        print(f"Validation failed (allowing through): {e}")
        return True

def generate_explanation(analysis_data: Dict[str, Any]) -> str:
    """
    Agentic GenAI call: converts raw model output into a human-readable explanation.
    Uses the google-genai HTTP SDK (no gRPC dependency).
    """
    predicted_class = analysis_data.get("predicted_class", "Unknown")
    confidence      = analysis_data.get("confidence", 0)
    probs           = analysis_data.get("probabilities", {})

    prompt = f"""You are an AI assistant inside BrainXAI, a brain MRI analysis application.
An MRI scan has just been processed by a deep learning model (EfficientNetV2-S).

Analysis results:
- Predicted class: {predicted_class}
- Model confidence: {confidence * 100:.1f}%
- Class probabilities: {probs}

A Grad-CAM heatmap was also generated to show which regions of the MRI most influenced the prediction.

Write a clear, friendly explanation (2-3 paragraphs) for the user that covers:
1. What the AI detected and what the predicted class means
2. What the confidence score and probabilities indicate
3. What the Grad-CAM heatmap represents and why it matters

Rules:
- Do NOT fabricate clinical findings not present in the data.
- Clearly state this is an AI-assisted preliminary diagnosis, and it requires official verification.
- Use simple, accessible language — avoid heavy medical jargon.
- Keep it concise and reassuring."""

    client = _get_client()
    response = client.models.generate_content(
        model="gemini-3.8-flash",
        contents=prompt
    )
    return response.text


def chat_with_assistant(context_data: Dict[str, Any], user_message: str) -> str:
    """
    Context-aware AI assistant for follow-up questions about a specific analysis.
    """
    prediction  = context_data.get("prediction", "Unknown")
    confidence  = context_data.get("confidence", 0)
    explanation = context_data.get("explanation", "")

    prompt = f"""You are the BrainXAI AI Assistant.

Current analysis context:
- Prediction: {prediction}
- Confidence: {confidence * 100:.1f}%
- AI explanation already shown to user: {explanation}

User's question: {user_message}

Answer the question helpfully, based strictly on the provided analysis context.
If the question is unrelated to the MRI analysis, politely redirect the conversation back to the results.
Always remind the user you are an AI assistant and this is a preliminary diagnosis that requires official verification."""

    client = _get_client()
    response = client.models.generate_content(
        model="gemini-3.8-flash",
        contents=prompt
    )
    return response.text
