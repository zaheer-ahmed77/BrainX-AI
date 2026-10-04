import os
import uuid
import shutil
from fastapi import FastAPI, UploadFile, File, Depends, HTTPException, status, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

import models, schemas
from database import engine, get_db, Base
from ml_model import model_instance
from agent import generate_explanation, chat_with_assistant, validate_mri
from report import generate_pdf_report

Base.metadata.create_all(bind=engine)

app = FastAPI(title="BrainXAI API", version="1.0.0")

CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/api/v1/health")
def health_check():
    return {"status": "ok", "message": "BrainXAI Backend is running."}

@app.post("/api/v1/analyze", response_model=schemas.AnalysisResult)
async def analyze_mri(file: UploadFile = File(...), x_user_id: str = Header(None), db: Session = Depends(get_db)):
    if not x_user_id:
        raise HTTPException(status_code=401, detail="Unauthorized: User ID missing")
    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
        raise HTTPException(status_code=400, detail="Invalid image file format.")
    
    # Read file content to check if it's empty
    content = await file.read()
    if len(content) == 0:
        raise HTTPException(status_code=400, detail="Empty file uploaded.")
    
    # In a real system, validate max size here
    MAX_SIZE = 10 * 1024 * 1024 # 10 MB
    if len(content) > MAX_SIZE:
        raise HTTPException(status_code=400, detail="File too large. Maximum size is 10MB.")

    analysis_id = f"BX-{uuid.uuid4().hex[:8].upper()}"
    file_ext = file.filename.split('.')[-1]
    save_path = os.path.join(UPLOAD_DIR, f"{analysis_id}.{file_ext}")
    
    with open(save_path, "wb") as f:
        f.write(content)

    # 0. Agentic Image Validation (Check if it's an MRI)
    if not validate_mri(save_path):
        os.remove(save_path)
        raise HTTPException(status_code=400, detail="Image rejected: This does not appear to be a Brain MRI scan. Please upload a valid MRI image.")

    # 1. AI Analysis & Grad-CAM
    try:
        model_result = model_instance.analyze(save_path, UPLOAD_DIR, analysis_id)
    except RuntimeError as e:
        # Model is missing
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

    # 2. GenAI Explanation
    explanation = ""
    try:
        explanation = generate_explanation(model_result)
    except Exception as e:
        print(f"GenAI Explanation failed: {e}")
        explanation = f"AI Explanation generation failed due to a Google Gemini API error: {str(e)}. Please check your API key quota or limits."

    # 3. Save to DB
    db_analysis = models.Analysis(
        id=analysis_id,
        user_id=x_user_id,
        file_name=file.filename,
        image_path=save_path,
        prediction=model_result['predicted_class'],
        confidence=model_result['confidence'],
        probabilities=model_result['probabilities'],
        heatmap_path=model_result['heatmap_path'],
        overlay_path=model_result['overlay_path'],
        explanation=explanation
    )
    db.add(db_analysis)
    db.commit()
    db.refresh(db_analysis)

    return db_analysis

@app.get("/api/v1/analyses", response_model=List[schemas.AnalysisResult])
def list_analyses(x_user_id: str = Header(None), db: Session = Depends(get_db)):
    if not x_user_id:
        raise HTTPException(status_code=401, detail="Unauthorized: User ID missing")
    analyses = db.query(models.Analysis).filter(models.Analysis.user_id == x_user_id).order_by(models.Analysis.created_at.desc()).all()
    return analyses

@app.get("/api/v1/analyses/{analysis_id}", response_model=schemas.AnalysisResult)
def get_analysis(analysis_id: str, x_user_id: str = Header(None), db: Session = Depends(get_db)):
    if not x_user_id:
        raise HTTPException(status_code=401, detail="Unauthorized: User ID missing")
    analysis = db.query(models.Analysis).filter(models.Analysis.id == analysis_id, models.Analysis.user_id == x_user_id).first()
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return analysis

@app.post("/api/v1/reports")
def create_report(request_data: dict, x_user_id: str = Header(None), db: Session = Depends(get_db)):
    if not x_user_id:
        raise HTTPException(status_code=401, detail="Unauthorized: User ID missing")
    analysis_id = request_data.get("analysis_id")
    if not analysis_id:
        raise HTTPException(status_code=400, detail="analysis_id is required")

    analysis = db.query(models.Analysis).filter(models.Analysis.id == analysis_id, models.Analysis.user_id == x_user_id).first()
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")

    report_filename = f"{analysis_id}_report.pdf"
    report_path = os.path.join(UPLOAD_DIR, report_filename)

    analysis_data = {
        "id": analysis.id,
        "prediction": analysis.prediction,
        "confidence": analysis.confidence,
        "probabilities": analysis.probabilities,
        "image_path": analysis.image_path,
        "overlay_path": analysis.overlay_path,
        "explanation": analysis.explanation
    }

    try:
        generate_pdf_report(analysis_data, report_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Report generation failed: {str(e)}")

    # Store in DB
    db_report = models.Report(analysis_id=analysis_id, file_path=report_path)
    db.add(db_report)
    db.commit()
    db.refresh(db_report)

    return {"status": "success", "report_id": db_report.id, "file_url": f"/api/v1/reports/download/{db_report.id}"}

@app.get("/api/v1/reports/download/{report_id}")
def download_report(report_id: int, db: Session = Depends(get_db)):
    report = db.query(models.Report).filter(models.Report.id == report_id).first()
    if not report or not os.path.exists(report.file_path):
        raise HTTPException(status_code=404, detail="Report not found")
    
    return FileResponse(report.file_path, media_type="application/pdf", filename=os.path.basename(report.file_path))

@app.get("/api/v1/images/{filename}")
def get_image(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Image not found")
    return FileResponse(file_path)

@app.post("/api/v1/ai/chat")
def chat_endpoint(request: schemas.ChatRequest, x_user_id: str = Header(None), db: Session = Depends(get_db)):
    if not x_user_id:
        raise HTTPException(status_code=401, detail="Unauthorized: User ID missing")
    analysis = db.query(models.Analysis).filter(models.Analysis.id == request.analysis_id, models.Analysis.user_id == x_user_id).first()
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")

    context = {
        "prediction": analysis.prediction,
        "confidence": analysis.confidence,
        "explanation": analysis.explanation
    }

    try:
        response = chat_with_assistant(context, request.message)
        return {"response": response}
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to get AI response.")
