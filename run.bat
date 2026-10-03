@echo off
title BrainX-AI Launcher
color 0B

echo ===================================================
echo     Starting BrainX-AI Hackathon Project...
echo ===================================================
echo.

echo [1/3] Starting FastAPI Backend (Port 8000)...
:: We use 'start' to open a new command prompt window for the backend
start "BrainXAI Backend" cmd /k "title BrainX-AI Backend & color 0A & cd backend & call venv\Scripts\activate & uvicorn main:app --host 0.0.0.0 --port 8000 --reload"

echo Waiting 4 seconds for backend to initialize...
timeout /t 4 /nobreak >nul
echo.

echo [2/3] Starting React Frontend (Port 5173)...
:: We use 'start' to open a second command prompt window for the frontend
start "BrainXAI Frontend" cmd /k "title BrainX-AI Frontend & color 0D & npm run dev"

echo Waiting 4 seconds for frontend to compile...
timeout /t 4 /nobreak >nul
echo.

echo [3/3] Opening Web App in your default Browser...
start http://localhost:5173

echo.
echo ===================================================
echo                 ALL SYSTEMS GO! 
echo.
echo  The Backend and Frontend are running in separate 
echo  terminal windows. 
echo.
echo  You can close THIS specific window now.
echo ===================================================
pause
