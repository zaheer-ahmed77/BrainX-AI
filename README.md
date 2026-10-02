# BrainX AI

## AI Brain Tumor Diagnostic Copilot

BrainX AI is an AI-powered medical diagnostic support application designed to assist with brain tumor analysis using MRI scans and patient information.

The interface is designed around an agentic workflow:

**Patient Information → MRI Upload → AI Analysis → XAI → GenAI Explanation → Medical Report**

> **Important:** BrainX AI is a research/hackathon project and is not intended to replace professional medical diagnosis or clinical judgment.

## Current Development — Frontend

This branch contains the initial BrainX AI frontend implementation, including:

- Premium landing page
- Login
- Sign up
- Forgot password UI
- Dashboard/workspace
- Browse/search case library
- MRI file picker and drag-and-drop upload UI
- Agentic processing workflow
- Analysis results
- Explainable AI / Grad-CAM presentation
- Reports UI scaffold
- AI assistant UI scaffold
- Analysis history UI scaffold
- Settings/help scaffolding
- Responsive desktop, tablet and mobile layouts

Authentication, user persistence, case data, MRI processing, AI inference, XAI results, GenAI explanations and report generation will be connected to the backend implementation.

## Tech Stack

### Frontend

- React 19
- Vite
- JavaScript
- Framer Motion
- Lucide React
- CSS design system

### Planned Backend / AI

- Python
- FastAPI
- Machine Learning
- Deep Learning
- Explainable AI
- Generative AI
- Agentic AI

## Workflow

```text
Patient Information
        ↓
MRI Upload
        ↓
MRI Analysis
        ↓
Tumor Classification
        ↓
Explainable AI
        ↓
GenAI Explanation
        ↓
Medical Report
```

## Authentication Handoff

The Login, Sign Up and Forgot Password screens are frontend-complete and prepared for backend API integration.

The current frontend validates form input and uses a temporary demo transition into the workspace. It does **not** implement real password storage, password hashing, sessions, JWTs, email verification, or server-side authentication.

The backend should later provide endpoints similar to:

```text
POST /api/auth/login
POST /api/auth/register
POST /api/auth/forgot-password
POST /api/auth/reset-password
GET  /api/auth/me
POST /api/auth/logout
```

The exact endpoint names and request/response formats should be agreed with the backend implementation before integration.

## Browse Handoff

The Browse Cases screen currently uses frontend demo data and includes:

- Case search
- Result filters
- Case cards
- Confidence display
- Case status
- Open-analysis action

The backend can replace the demo data with an authenticated cases API, for example:

```text
GET /api/cases
GET /api/cases/{case_id}
GET /api/cases?search=...
```

These are suggested API shapes, not implemented backend endpoints.

## MRI Upload Handoff

The upload screen supports selecting an image file from the device and drag-and-drop interaction. The selected file is currently held in frontend state.

The backend member can later connect it to the actual MRI upload/inference endpoint.

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Enter the project

```bash
cd <repository-name>
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

## Branch Strategy

Frontend work is developed on a feature branch before review and merge into `main`.

Example:

```text
main
├── wajeeha-frontend
├── backend
└── other-feature-branches
```

## Important Medical Disclaimer

BrainX AI is an educational/research project. The system is not a substitute for professional medical advice, diagnosis, or treatment. AI-generated results should be reviewed by qualified medical professionals before being used for clinical decision-making.

## Contributors

- BrainX AI Development Team
