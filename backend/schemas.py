from pydantic import BaseModel
from typing import Optional, Dict
from datetime import datetime

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    created_at: datetime

    model_config = {"from_attributes": True}

class UserLogin(BaseModel):
    email: str
    password: str

class AnalysisResult(BaseModel):
    id: str
    file_name: str
    image_path: Optional[str] = None
    prediction: str
    confidence: float
    probabilities: Dict[str, float]
    heatmap_path: Optional[str] = None
    overlay_path: Optional[str] = None
    explanation: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}

class AgenticExplanationRequest(BaseModel):
    prediction: str
    confidence: float
    probabilities: Dict[str, float]

class ChatRequest(BaseModel):
    message: str
    analysis_id: str
