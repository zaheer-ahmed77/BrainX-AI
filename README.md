# BrainX AI Frontend

A standalone React + Vite frontend concept for the BrainX AI hackathon project.

## Included

- Redesigned landing page
- Redesigned dashboard
- Responsive desktop/tablet/mobile layouts
- MRI upload screen scaffold
- Agentic processing screen scaffold
- Analysis results screen scaffold
- History, reports and AI assistant navigation placeholders
- Reusable layout/components
- Framer Motion transitions
- Lucide icons
- No backend required for the demo flow

## Run

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Build

```bash
npm run build
```

## Important

The MRI, Grad-CAM and prediction content in this UI is illustrative demo data. Connect the screens to the actual backend/model before presenting real diagnostic results.

The UI intentionally follows the supplied BrainX design document:
- white/light-slate foundation
- Royal Blue primary accent
- Medical Teal analysis state
- Inter/system typography
- visible agentic workflow
- preliminary-analysis disclaimer

## Main flow

Landing
→ Dashboard
→ New Analysis
→ Processing
→ Results
→ Reports / AI Assistant
