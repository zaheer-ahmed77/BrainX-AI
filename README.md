# BrainXAI

## Overview
BrainXAI is an AI-powered medical diagnostic support application designed to assist with brain tumor analysis using MRI scans. It provides an agentic workflow connecting computer vision, Explainable AI (Grad-CAM), and Generative AI to provide a comprehensive, understandable analysis report.

## Features
- **MRI Upload**: Secure upload and validation of brain MRI scans (JPG, PNG, WEBP).
- **Deep Learning Analysis**: PyTorch-based image classification to detect tumor types (Glioma, Meningioma, Pituitary, or No Tumor).
- **Explainable AI (Grad-CAM)**: Visualizes the areas of the MRI that influenced the AI model's prediction.
- **Agentic AI Workflow**: An orchestrator that manages the analysis, visualization, and explanation phases.
- **GenAI Explanation**: Uses Google Gemini to translate complex model outputs into human-readable text.
- **AI Assistant**: A context-aware chat assistant that allows users to ask follow-up questions about their specific MRI results.
- **Report Generation**: Generates a professional, downloadable PDF report containing the original MRI, Grad-CAM overlay, prediction, confidence, and AI explanation.
- **Analysis History**: SQLite database integration to save and retrieve past analyses.

## Technology Stack
**Frontend**:
- React 19, Vite, Framer Motion, Lucide React, Vanilla CSS

**Backend**:
- Python 3, FastAPI, Uvicorn, SQLAlchemy, SQLite (Development)

**AI & ML**:
- PyTorch, Torchvision, OpenCV (Grad-CAM)
- Google Generative AI (Gemini 1.5 Pro)

## Architecture
```text
BrainXAI Frontend (React)
        |
        | REST API (FastAPI)
        ↓
Backend Services
        |
        ├── Image Processing & Validation
        ├── PyTorch Model Inference
        ├── Grad-CAM Heatmap Generation
        ├── Agentic Orchestrator
        ├── Gemini GenAI Explanation
        ├── PDF Report Generator
        └── SQLite Database (History)
```

## Local Setup

### Environment Variables
1. Navigate to the `backend` directory.
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Update the `.env` file with your credentials:
   - `GENAI_API_KEY`: Your Google Gemini API Key.
   - `MODEL_PATH`: Path to the trained PyTorch model (`.pth`).

### Model Setup
Place your trained PyTorch model (e.g., `brain_tumor_model.pth`) inside the `backend/models` directory, or update `MODEL_PATH` in your `.env` file to point to the correct absolute path.
*Note: If the model is not found, the backend will return a 503 error instructing the user to upload a valid model.*

### Backend Setup
1. Open a terminal and navigate to the `backend` folder.
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install fastapi uvicorn sqlalchemy pydantic python-multipart torch torchvision Pillow opencv-python google-generativeai python-dotenv reportlab
   ```
4. Start the server:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

### Frontend Setup
1. Open a new terminal and navigate to the project root (where `package.json` is located).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## API Documentation
Once the backend is running, you can access the automatic interactive API documentation at:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### Core Endpoints:
- `POST /api/v1/analyze`: Upload MRI and perform complete agentic analysis.
- `GET /api/v1/analyses`: Retrieve analysis history.
- `GET /api/v1/analyses/{id}`: Retrieve a specific analysis.
- `POST /api/v1/reports`: Generate a PDF report.
- `POST /api/v1/ai/chat`: Chat with the context-aware AI assistant.

## Deployment
For production deployment:
1. **Frontend**: Build the React app (`npm run build`) and host it on Vercel, Netlify, or Nginx.
2. **Backend**: Deploy the FastAPI app using Docker or a PaaS like Render, Heroku, or AWS Elastic Beanstalk. Ensure you set the environment variables in the production environment.
3. **Database**: Switch from SQLite to PostgreSQL by updating the `DATABASE_URL` in the production environment.
4. **CORS**: Update `CORS_ORIGINS` to match your production frontend URL.

## Medical Disclaimer
> **Important:** BrainXAI provides an AI-based preliminary analysis of brain MRI images for educational and informational purposes. It is **not** a medical diagnosis and should never replace professional evaluation by a qualified healthcare provider.

## Project Limitations
- The current ML model integration assumes a ResNet-like architecture outputting 4 classes. It must be adapted if a different model architecture is used.
- GenAI explanations rely on external API availability (Google Gemini).
- Local SQLite database is not suitable for high-concurrency production environments (use PostgreSQL).
