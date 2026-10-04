import React, { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Brain, Upload, FlaskConical, ScanLine, FileText, Sparkles, Activity,
  ShieldCheck, ArrowRight, Check, ChevronRight, Menu, X, Plus, Search,
  History, LayoutDashboard, MessageCircle, Settings, Info, Bell, Download,
  LogOut, BarChart2, Eye, Zap, Bot, AlertTriangle, RefreshCw, Home, Clock, Users
} from "lucide-react";
import {
  SignedIn, SignedOut, SignIn, SignUp, UserButton, useUser, useClerk, UserProfile
} from "@clerk/clerk-react";

const API_BASE = "https://brainx-api-hge4dwaehbchfabh.centralindia-01.azurewebsites.net/api/v1";

// ─── Landing Page ─────────────────────────────────────────────────────────────
function Landing({ setAuthPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="landing">
      {/* Nav */}
      <nav className="lnav">
        <div className="lnav-inner">
          <Logo />
          <div className={`lnav-links ${menuOpen ? "open" : ""}`}>
            <a href="#how">How it works</a>
            <a href="#features">Features</a>
            <a href="#about">About</a>
          </div>
          <div className="lnav-actions desktop-only">
            <SignedOut>
              <button className="btn btn-primary" onClick={() => setAuthPage("signup")}>Access Platform <ArrowRight size={15} /></button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <button className="lnav-burger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} color="#0f172a" /> : <Menu size={20} color="#0f172a" />}
          </button>
        </div>
        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="mobile-menu">
            <SignedOut>
              <button className="btn btn-primary btn-block mb-12" onClick={() => setAuthPage("signup")}>Access Platform</button>
            </SignedOut>
            <a href="#how" onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>AI-Powered Brain MRI Analysis with <span className="h1-accent">Generative & Agentic AI</span></h1>
            <p>Upload an MRI scan and get instant AI classification, Grad-CAM explainability, a natural-language explanation, and a downloadable report — all in one automated workflow.</p>
            <div className="hero-flow">
              {["MRI", "AI Analysis", "XAI", "GenAI", "Report"].map((s, i) => (
                <React.Fragment key={s}>
                  <span className="flow-step">{s}</span>
                  {i < 4 && <ArrowRight size={13} className="flow-arrow" />}
                </React.Fragment>
              ))}
            </div>
            <div className="hero-cta">
              <SignedOut>
                <button className="btn btn-primary btn-lg" onClick={() => setAuthPage("signup")}>Access Platform <ArrowRight size={16} /></button>
              </SignedOut>
              <SignedIn>
                {/* Redirect to app if already signed in */}
                <GoToAppButton />
              </SignedIn>
            </div>
            <p className="hero-disclaimer"><ShieldCheck size={14} /> AI-assisted preliminary diagnosis, requires official verification.</p>
          </div>

          <div className="hero-visual">
            <div className="hv-card">
              <div className="hv-topbar">
                <span className="hv-live"><span className="live-dot" />LIVE ANALYSIS</span>
                <span className="hv-id">BX-A92F14</span>
              </div>
              <div className="hv-mri">
                <div className="mri-bg">
                  <div className="mri-ring r1" /><div className="mri-ring r2" />
                  <div className="mri-brain">
                    <div className="mri-lobe ll" /><div className="mri-lobe rl" />
                    <div className="mri-hotspot h1" /><div className="mri-hotspot h2" />
                  </div>
                  <div className="mri-scanline" />
                </div>
              </div>
              <div className="hv-result">
                <div>
                  <div className="hv-label">MODEL OUTPUT</div>
                  <div className="hv-pred">Glioma</div>
                </div>
                <div className="hv-conf">
                  <div className="hv-conf-val">94.2%</div>
                  <div className="hv-conf-bar"><div style={{width: "94.2%"}} /></div>
                  <div className="hv-conf-lbl">Confidence</div>
                </div>
              </div>
            </div>
            <div className="hv-chip chip1"><Check size={12} /> Analysis complete</div>
            <div className="hv-chip chip2"><ScanLine size={12} /> Grad-CAM ready</div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="trust-strip">
        {["Computer Vision","Explainable AI","Generative AI","Agentic Workflow","EfficientNetV2-S"].map((t, i) => (
          <React.Fragment key={t}><span>{t}</span>{i < 4 && <span className="ts-dot" />}</React.Fragment>
        ))}
      </div>

      {/* How it works */}
      <section className="section" id="how">
        <div className="sec-inner">
          <div className="sec-head">
            <div className="sec-kicker">HOW IT WORKS</div>
            <h2>One scan. Four connected stages.</h2>
            <p>The full pipeline is automated — from upload to AI-generated report — with every stage visible.</p>
          </div>
          <div className="steps-grid">
            {[
              { n: "01", icon: <Upload size={20} />, title: "Upload MRI", desc: "Drag & drop or browse to upload a brain MRI image." },
              { n: "02", icon: <FlaskConical size={20} />, title: "Analyze", desc: "EfficientNetV2-S classifies the scan and generates a confidence score." },
              { n: "03", icon: <ScanLine size={20} />, title: "Explain", desc: "Grad-CAM heatmap highlights the regions that influenced the prediction." },
              { n: "04", icon: <FileText size={20} />, title: "Generate Report", desc: "GenAI and the Agentic system compile a complete downloadable PDF report." },
            ].map((step, i) => (
              <div className="step-card" key={step.n}>
                <div className="step-num">{step.n}</div>
                <div className="step-icon-wrap">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                {i < 3 && <ChevronRight className="step-arrow" size={17} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section features-section" id="features">
        <div className="sec-inner">
          <div className="sec-head">
            <div className="sec-kicker">CAPABILITIES</div>
            <h2>More than a prediction.</h2>
            <p>BrainXAI combines four distinct AI components into a single, unified workflow.</p>
          </div>
          <div className="features-grid">
            {[
              { icon: <Brain size={20} />, title: "Brain Tumor Classification", desc: "EfficientNetV2-S model classifies MRI scans into Glioma, Meningioma, Pituitary, or No Tumor with a confidence score." },
              { icon: <ScanLine size={20} />, title: "Explainable AI (Grad-CAM)", desc: "Gradient-weighted Class Activation Maps highlight the exact MRI regions that drove the model's prediction." },
              { icon: <Sparkles size={20} />, title: "AI-Generated Explanation", desc: "Gemini GenAI converts raw model output into a natural-language explanation a non-expert can understand." },
              { icon: <Bot size={20} />, title: "Agentic AI Workflow", desc: "An autonomous agent orchestrates the full pipeline — analysis, XAI, explanation, and report — without manual steps." },
              { icon: <FileText size={20} />, title: "AI-Generated Reports", desc: "A professional, structured PDF report is generated automatically containing the prediction, heatmap, and AI explanation." },
              { icon: <MessageCircle size={20} />, title: "Interactive AI Assistant", desc: "Ask follow-up questions about the analysis results. The assistant uses the actual results as context for accurate answers." },
            ].map((f) => (
              <div className="feat-card" key={f.title}>
                <div className="feat-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="disclaimer-section" id="about">
        <div className="sec-inner">
          <div className="disclaimer-panel">
            <ShieldCheck size={24} className="disc-icon" />
            <div>
              <h3>Clear about what the AI can — and cannot — tell you.</h3>
              <p>BrainXAI presents model outputs, confidence scores, and explainability visualizations while clearly separating AI assistance from clinical diagnosis. This tool provides an AI-assisted preliminary diagnosis and requires official verification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="lfooter">
        <div className="sec-inner lfooter-inner">
          <Logo />
          <span>AI Brain MRI Analysis Copilot</span>
          <span>AI-assisted preliminary diagnosis</span>
        </div>
      </footer>
    </div>
  );
}

function GoToAppButton() {
  // When signed in on landing, this just shows a go to app button
  return (
    <button className="btn btn-primary btn-lg" onClick={() => window.location.reload()}>
      Open Dashboard <ArrowRight size={16} />
    </button>
  );
}

// ─── App Shell (Protected) ────────────────────────────────────────────────────
function AppShell() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [analyses, setAnalyses] = useState([]);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [loadingAnalyses, setLoadingAnalyses] = useState(false);
  const { user } = useUser();

  const fetchAnalyses = useCallback(async () => {
    setLoadingAnalyses(true);
    try {
      const res = await fetch(`${API_BASE}/analyses`);
      if (res.ok) setAnalyses(await res.json());
    } catch (e) { console.warn("Backend not available:", e); }
    finally { setLoadingAnalyses(false); }
  }, []);

  useEffect(() => { fetchAnalyses(); }, [fetchAnalyses, page]);

  const nav = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={17} /> },
    { id: "upload", label: "New Analysis", icon: <Plus size={17} /> },
    { id: "history", label: "Analysis History", icon: <History size={17} /> },
    { id: "reports", label: "Reports", icon: <FileText size={17} /> },
    { id: "assistant", label: "AI Assistant", icon: <MessageCircle size={17} /> },
  ];

  const navigate = (id) => { setPage(id); setSidebarOpen(false); };

  return (
    <div className="app-shell">
      {/* Sidebar */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <Logo />
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}><X size={18} /></button>
        </div>
        <button className="new-btn" onClick={() => navigate("upload")}>
          <Plus size={16} /> New Analysis
        </button>
        <div className="sidebar-section-label">WORKSPACE</div>
        <nav className="sidebar-nav">
          {nav.map(n => (
            <button key={n.id} className={`nav-item ${page === n.id ? "active" : ""}`} onClick={() => navigate(n.id)}>
              {n.icon} {n.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-section-label" style={{marginTop: "auto"}}>ACCOUNT</div>
        <nav className="sidebar-nav">
          <button className={`nav-item ${page === "settings" ? "active" : ""}`} onClick={() => navigate("settings")}>
            <Settings size={17} /> Settings
          </button>
          <button className={`nav-item ${page === "about" ? "active" : ""}`} onClick={() => navigate("about")}>
            <Info size={17} /> About
          </button>
        </nav>
        <div className="sidebar-user">
          <div className="su-avatar">{user?.firstName?.charAt(0) || "U"}</div>
          <div className="su-info">
            <strong>{user?.fullName || user?.firstName || "User"}</strong>
            <span>Research workspace</span>
          </div>
          <UserButton />
        </div>
      </aside>

      {/* Main */}
      <div className="app-main">
        <header className="app-header">
          <button className="header-burger" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
          <div className="header-breadcrumb" style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ transform: "scale(0.9)", transformOrigin: "left center", display: "flex" }}>
              <Logo />
            </div>
            <ChevronRight size={13} className="hb-sep" style={{ marginLeft: "4px" }} />
            <span className="hb-current">{nav.find(n => n.id === page)?.label || "Dashboard"}</span>
          </div>
          <div className="header-right">
            <div className="status-pill"><span className="status-green" />System Ready</div>
            {user && <span className="header-mode">DEMO MODE</span>}
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        <main className="app-content">
          <AnimatePresence mode="wait">
            <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
              {page === "dashboard" && <Dashboard setPage={setPage} analyses={analyses} setCurrentAnalysis={setCurrentAnalysis} loading={loadingAnalyses} />}
              {page === "upload" && <UploadPage setPage={setPage} setCurrentAnalysis={setCurrentAnalysis} onDone={fetchAnalyses} />}
              {page === "history" && <HistoryPage analyses={analyses} setCurrentAnalysis={setCurrentAnalysis} setPage={setPage} loading={loadingAnalyses} />}
              {page === "results" && <ResultsPage analysis={currentAnalysis} setPage={setPage} />}
              {page === "processing" && <ProcessingPage />}
              {page === "reports" && <ReportsPage analysis={currentAnalysis} setPage={setPage} />}
              {page === "assistant" && <AssistantPage analysis={currentAnalysis} setPage={setPage} />}
              {page === "settings" && <SettingsPage />}
              {page === "about" && <AboutPage />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ setPage, analyses, setCurrentAnalysis, loading }) {
  const { user } = useUser();
  const recent = analyses.slice(0, 4);

  return (
    <div className="page">
      {/* Hero card */}
      <div className="dash-hero">
        <div className="dash-hero-copy">
          <div className="dash-kicker"><Zap size={12} /> AI BRAIN DIAGNOSTIC COPILOT</div>
          <h2>Welcome back, {user?.firstName || "Researcher"}.</h2>
          <p>Upload a brain MRI scan to start the full AI analysis workflow — classification, Grad-CAM, GenAI explanation, and report generation.</p>
          <div className="dash-hero-actions">
            <button className="btn btn-white" onClick={() => setPage("upload")}>+ New Analysis</button>
            <button className="btn btn-ghost-white" onClick={() => setPage("history")}>View History</button>
          </div>
        </div>
        <div className="dash-hero-orbit">
          <div className="do-ring r-a" /><div className="do-ring r-b" />
          <div className="do-center"><Brain size={38} /></div>
          <span className="do-node n1"><ScanLine size={13} /></span>
          <span className="do-node n2"><Sparkles size={13} /></span>
          <span className="do-node n3"><FileText size={13} /></span>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row">
        {[
          { label: "Total Analyses", value: analyses.length, icon: <ScanLine size={18} />, color: "blue" },
          { label: "Reports Generated", value: analyses.length, icon: <FileText size={18} />, color: "teal" },
          { label: "Last Analysis", value: analyses.length > 0 ? new Date(analyses[0].created_at).toLocaleDateString() : "—", icon: <Clock size={18} />, color: "slate" },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-body">
              <span>{s.label}</span>
              <strong>{s.value}</strong>
            </div>
          </div>
        ))}
      </div>

      {/* Recent + Workflow */}
      <div className="dash-grid">
        <div className="dash-panel">
          <div className="panel-hd">
            <div>
              <div className="panel-kicker">RECENT</div>
              <h3>Analysis History</h3>
            </div>
            <button className="text-btn" onClick={() => setPage("history")}>View all <ArrowRight size={14} /></button>
          </div>
          <div className="history-list">
            {loading && <div className="empty-msg"><RefreshCw size={18} className="spin" /> Loading...</div>}
            {!loading && recent.length === 0 && (
              <div className="empty-msg">
                <Upload size={22} />
                <p>No analyses yet. <button className="inline-link" onClick={() => setPage("upload")}>Start your first one.</button></p>
              </div>
            )}
            {recent.map(a => (
              <button className="history-row" key={a.id} onClick={() => { setCurrentAnalysis(a); setPage("results"); }}>
                <div className="hr-thumb"><Brain size={19} /></div>
                <div className="hr-body">
                  <strong>{a.file_name}</strong>
                  <span>{new Date(a.created_at).toLocaleString()}</span>
                </div>
                <div className="hr-pred"><span className="pred-dot" />{a.prediction}</div>
                <div className="hr-conf">{(a.confidence * 100).toFixed(1)}%</div>
                <ChevronRight size={16} className="hr-arrow" />
              </button>
            ))}
          </div>
        </div>

        <div className="dash-panel">
          <div className="panel-hd">
            <div>
              <div className="panel-kicker">WORKFLOW</div>
              <h3>Agentic Pipeline</h3>
            </div>
          </div>
          <div className="wf-list">
            {[
              { label: "Upload MRI", desc: "Supported: JPG, PNG, WEBP", done: true },
              { label: "AI Classification", desc: "EfficientNetV2-S model", done: true },
              { label: "Grad-CAM XAI", desc: "Region attention heatmap", done: true },
              { label: "GenAI Explanation", desc: "Gemini-powered interpretation", done: false },
            ].map((s, i) => (
              <div className="wf-row" key={s.label}>
                <span className={`wf-dot ${s.done ? "done" : ""}`}>{s.done ? <Check size={12} /> : i + 1}</span>
                <div className="wf-body"><strong>{s.label}</strong><span>{s.desc}</span></div>
                {i < 3 && <div className="wf-line" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="disclaimer-bar"><ShieldCheck size={14} /> BrainXAI provides preliminary AI-based analysis. Results must not be used as medical diagnosis.</div>
    </div>
  );
}

// ─── Upload Page ──────────────────────────────────────────────────────────────
function UploadPage({ setPage, setCurrentAnalysis, onDone }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    setError(null);
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const analyze = async () => {
    if (!file) return;
    setError(null);
    setPage("processing");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch(`${API_BASE}/analyze`, { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) { 
        setError(data.detail || "Unknown error"); 
        setPage("upload"); 
        return; 
      }
      setCurrentAnalysis(data);
      onDone();
      setPage("results");
    } catch (e) {
      setError("Could not reach the backend. Make sure the Python server is running on port 8000.");
      setPage("upload");
    }
  };

  return (
    <div className="page">
      <div className="page-hd">
        <div className="sec-kicker">NEW ANALYSIS</div>
        <h1>Upload a Brain MRI</h1>
        <p>Start the BrainXAI agentic workflow with an MRI scan you are authorized to analyze.</p>
      </div>

      <div className="upload-area">
        {error && (
          <div style={{ background: "#FEE2E2", color: "#991B1B", padding: "16px", borderRadius: "12px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px", border: "1px solid #FCA5A5", fontWeight: "600", fontSize: "14px", lineHeight: "1.5" }}>
            <AlertTriangle size={24} style={{ flexShrink: 0 }} />
            {error}
          </div>
        )}
        {/* Drop zone */}
        <div
          className={`drop-zone ${dragging ? "dragging" : ""} ${file ? "has-file" : ""}`}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]); }}
          onClick={() => !file && inputRef.current?.click()}
        >
          <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.webp" hidden onChange={e => handleFile(e.target.files?.[0])} />

          {!file ? (
            <div className="dz-empty">
              <div className="dz-icon"><Upload size={28} /></div>
              <h3>Drop your MRI image here</h3>
              <p>or click to browse files from your device</p>
              <button className="btn btn-primary" onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}>Browse Files</button>
              <span className="dz-formats">JPG · JPEG · PNG · WEBP · Max 10MB</span>
            </div>
          ) : (
            <div className="dz-preview">
              <img src={preview} alt="MRI Preview" className="preview-img" />
              <div className="preview-info">
                <div className="preview-badge"><Check size={14} /> File selected</div>
                <h3>{file.name}</h3>
                <p>{(file.size / 1024 / 1024).toFixed(2)} MB · Ready for analysis</p>
                <div className="preview-actions">
                  <button className="btn btn-primary" onClick={e => { e.stopPropagation(); analyze(); }}>
                    <FlaskConical size={16} /> Analyze MRI
                  </button>
                  <button className="btn btn-outline" onClick={e => { e.stopPropagation(); setFile(null); setPreview(null); }}>
                    Choose Another
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info cards */}
        <div className="upload-info">
          <div className="ui-card">
            <Brain size={18} className="ui-icon" />
            <h4>EfficientNetV2-S Model</h4>
            <p>State-of-the-art CNN classification into Glioma, Meningioma, Pituitary, or No Tumor.</p>
          </div>
          <div className="ui-card">
            <ScanLine size={18} className="ui-icon" />
            <h4>Grad-CAM Visualization</h4>
            <p>See exactly which regions of the MRI drove the AI model's prediction.</p>
          </div>
          <div className="ui-card">
            <Sparkles size={18} className="ui-icon" />
            <h4>GenAI Explanation</h4>
            <p>Gemini converts the technical model output into an understandable explanation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Processing Page ──────────────────────────────────────────────────────────
function ProcessingPage() {
  const stages = [
    "MRI received & validated",
    "AI model analyzing image",
    "Tumor classification completed",
    "Grad-CAM heatmap generated",
    "AI explanation generated",
    "Report prepared",
  ];
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => s < stages.length - 1 ? s + 1 : s), 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="page processing-page">
      <div className="sec-kicker">AGENTIC WORKFLOW</div>
      <h1>BrainXAI is analyzing the scan.</h1>
      <p className="proc-sub">The agentic pipeline is running — every stage is shown in real time.</p>

      <div className="proc-layout">
        <div className="proc-timeline">
          {stages.map((s, i) => (
            <div key={s} className={`proc-step ${i < step ? "done" : i === step ? "active" : ""}`}>
              <div className="ps-dot">
                {i < step ? <Check size={13} /> : i === step ? <span className="ps-pulse" /> : <span className="ps-num">{i + 1}</span>}
              </div>
              <div className="ps-body">
                <strong>{s}</strong>
                <span>{i < step ? "Completed" : i === step ? "Processing…" : "Waiting"}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="proc-visual">
          <div className="pv-orb"><Brain size={48} /></div>
          <h3>Agentic Analysis Running</h3>
          <p>Classification, XAI, and GenAI interpretation are coordinated automatically. Please wait…</p>
          <div className="pv-bar">
            <div className="pv-bar-fill" style={{ width: `${((step + 1) / stages.length) * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Results Page ─────────────────────────────────────────────────────────────
function ResultsPage({ analysis, setPage }) {
  const [view, setView] = useState("original"); // original | heatmap | overlay

  if (!analysis) return (
    <div className="page empty-page">
      <AlertTriangle size={36} />
      <h2>No analysis selected</h2>
      <button className="btn btn-primary" onClick={() => setPage("upload")}>Upload MRI</button>
    </div>
  );

  const getFilename = p => p ? p.replace(/\\/g, "/").split("/").pop() : "";
  const imgUrl = `${API_BASE}/images/${getFilename(analysis.image_path)}`;
  const overlayUrl = `${API_BASE}/images/${getFilename(analysis.overlay_path)}`;
  const heatmapUrl = `${API_BASE}/images/${getFilename(analysis.heatmap_path)}`;

  const viewUrls = { original: imgUrl, heatmap: heatmapUrl, overlay: overlayUrl };
  const confPct = (analysis.confidence * 100).toFixed(1);

  const tumorColors = {
    "Glioma": "#dc2626",
    "Meningioma": "#d97706",
    "Pituitary": "#7c3aed",
    "No Tumor": "#16a34a",
  };
  const predColor = tumorColors[analysis.prediction] || "#1e40af";

  return (
    <div className="page results-page">
      <div className="page-hd row">
        <div>
          <div className="sec-kicker">ANALYSIS / {analysis.id}</div>
          <h1>Analysis Results</h1>
          <p>{new Date(analysis.created_at).toLocaleString()} · {analysis.file_name}</p>
        </div>
        <div className="page-hd-actions">
          <span className="badge-complete"><Check size={13} /> Completed</span>
          <button className="btn btn-primary" onClick={() => setPage("reports")}>Generate Report <FileText size={15} /></button>
          <button className="btn btn-outline" onClick={() => setPage("assistant")}>Ask AI <MessageCircle size={15} /></button>
        </div>
      </div>

      {/* Prediction card */}
      <div className="pred-card">
        <div className="pred-left">
          <div className="pred-label">MODEL PREDICTION</div>
          <div className="pred-tumor" style={{ color: predColor }}>{analysis.prediction}</div>
          <div className="pred-status">Predicted Tumor Type</div>
        </div>
        <div className="pred-mid">
          <div className="pred-label">CONFIDENCE SCORE</div>
          <div className="pred-conf">{confPct}%</div>
          <div className="pred-bar"><div className="pred-bar-fill" style={{ width: `${confPct}%`, background: predColor }} /></div>
          <div className="pred-note">Model confidence, not clinical probability.</div>
        </div>
        <div className="pred-right">
          <div className="pred-label">CLASS PROBABILITIES</div>
          {Object.entries(analysis.probabilities || {}).map(([cls, prob]) => (
            <div className="prob-row" key={cls}>
              <span>{cls}</span>
              <div className="prob-bar"><div style={{ width: `${(prob * 100).toFixed(1)}%`, background: tumorColors[cls] || "#94a3b8" }} /></div>
              <span className="prob-val">{(prob * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Image viewer */}
      <div className="img-section">
        <div className="img-sec-hd">
          <h3>Explainable AI — Grad-CAM Visualization</h3>
          <div className="view-tabs">
            {["original", "heatmap", "overlay"].map(v => (
              <button key={v} className={`view-tab ${view === v ? "active" : ""}`} onClick={() => setView(v)}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="img-viewer">
          <img src={viewUrls[view]} alt={view} className="mri-img" onError={e => e.target.style.display = "none"} />
          <div className="img-label">{view.toUpperCase()}</div>
        </div>
        <p className="img-caption">Grad-CAM highlights the regions in the MRI that most strongly influenced the model's prediction of <strong>{analysis.prediction}</strong>.</p>
      </div>

      {/* GenAI Explanation */}
      <div className="explanation-card">
        <div className="exp-hd">
          <div className="exp-icon"><Sparkles size={18} /></div>
          <div>
            <div className="sec-kicker">GENAI EXPLANATION</div>
            <h3>What does this result mean?</h3>
          </div>
        </div>
        <div className="exp-body">
          <p>{analysis.explanation || "No explanation generated. Check your Gemini API key."}</p>
        </div>
        <button className="text-btn mt-12" onClick={() => setPage("assistant")}>
          Ask follow-up questions <ArrowRight size={14} />
        </button>
      </div>

      {/* Warning */}
      <div className="result-warn">
        <AlertTriangle size={15} />
        <span><strong>Important:</strong> This is an AI-generated preliminary analysis. It is not a medical diagnosis. Consult a qualified medical professional for clinical assessment.</span>
      </div>
    </div>
  );
}

// ─── History Page ─────────────────────────────────────────────────────────────
function HistoryPage({ analyses, setCurrentAnalysis, setPage, loading }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Glioma", "Meningioma", "Pituitary", "No Tumor"];
  const filtered = analyses.filter(a =>
    (filter === "All" || a.prediction === filter) &&
    (a.file_name.toLowerCase().includes(query.toLowerCase()) || a.id.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="page">
      <div className="page-hd row">
        <div>
          <div className="sec-kicker">HISTORY</div>
          <h1>Analysis History</h1>
          <p>Browse and review all your previous MRI analysis records.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setPage("upload")}>+ New Analysis</button>
      </div>

      <div className="search-bar">
        <Search size={16} className="search-icon" />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by filename or case ID…" />
      </div>

      <div className="filter-bar">
        {filters.map(f => (
          <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
        <span className="filter-count">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {loading && <div className="empty-msg"><RefreshCw size={18} className="spin" /> Loading…</div>}

      <div className="hist-grid">
        {filtered.map(a => (
          <div className="hist-card" key={a.id}>
            <div className="hc-preview"><Brain size={32} /><span className="hc-id">{a.id}</span></div>
            <div className="hc-body">
              <div className="hc-top">
                <span className="badge-complete"><Check size={11} /> Done</span>
                <span className="hc-date">{new Date(a.created_at).toLocaleDateString()}</span>
              </div>
              <h4>{a.file_name}</h4>
              <div className="hc-meta">
                <div><span>Prediction</span><strong>{a.prediction}</strong></div>
                <div><span>Confidence</span><strong>{(a.confidence * 100).toFixed(1)}%</strong></div>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => { setCurrentAnalysis(a); setPage("results"); }}>
                Open Analysis <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {!loading && filtered.length === 0 && (
        <div className="empty-state">
          <Search size={28} />
          <h3>No analyses found</h3>
          <p>Try a different search term or upload a new MRI.</p>
          <button className="btn btn-primary" onClick={() => setPage("upload")}>Upload MRI</button>
        </div>
      )}
    </div>
  );
}

// ─── Reports Page ─────────────────────────────────────────────────────────────
function ReportsPage({ analysis, setPage }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const generate = async () => {
    if (!analysis) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysis_id: analysis.id }),
      });
      const data = await res.json();
      if (data.file_url) {
        window.open(`http://localhost:8000${data.file_url}`, "_blank");
        setDone(true);
      }
    } catch (e) { alert("Could not generate report. Ensure the backend is running."); }
    setLoading(false);
  };

  if (!analysis) return (
    <div className="page empty-page">
      <FileText size={36} />
      <h2>No analysis selected</h2>
      <p>Please run an analysis first, then generate a report.</p>
      <button className="btn btn-primary" onClick={() => setPage("upload")}>Upload MRI</button>
    </div>
  );

  return (
    <div className="page">
      <div className="page-hd">
        <div className="sec-kicker">REPORTS</div>
        <h1>Generate AI Report</h1>
        <p>Generate a professional PDF report for analysis <strong>{analysis.id}</strong>.</p>
      </div>

      <div className="report-card">
        <div className="report-icon"><FileText size={32} /></div>
        <h3>Analysis Report — {analysis.id}</h3>
        <p>The AI-generated report will include:</p>
        <ul className="report-list">
          <li><Check size={14} /> MRI image and case information</li>
          <li><Check size={14} /> Model prediction and confidence score</li>
          <li><Check size={14} /> Class probability distribution</li>
          <li><Check size={14} /> Grad-CAM visualization</li>
          <li><Check size={14} /> GenAI-generated natural-language explanation</li>
          <li><Check size={14} /> Medical disclaimer</li>
        </ul>
        {done && <div className="success-banner"><Check size={16} /> Report generated successfully! It opened in a new tab.</div>}
        <div className="report-actions">
          <button className="btn btn-primary" onClick={generate} disabled={loading}>
            {loading ? <><RefreshCw size={15} className="spin" /> Generating…</> : <><Download size={15} /> Download PDF Report</>}
          </button>
          <button className="btn btn-outline" onClick={() => setPage("results")}>Back to Results</button>
        </div>
      </div>
    </div>
  );
}

// ─── Assistant Page ───────────────────────────────────────────────────────────
function AssistantPage({ analysis, setPage }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm the BrainXAI AI Assistant. I can answer questions about the current MRI analysis results. What would you like to know?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (!analysis) { alert("Please run an analysis first."); return; }
    const msg = input.trim();
    setMessages(m => [...m, { role: "user", text: msg }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, analysis_id: analysis.id }),
      });
      const data = await res.json();
      if (!res.ok) {
         setMessages(m => [...m, { role: "assistant", text: `Error: ${data.detail || data.error || res.statusText}` }]);
      } else {
         setMessages(m => [...m, { role: "assistant", text: data.response || "No response from AI." }]);
      }
    } catch (e) {
      setMessages(m => [...m, { role: "assistant", text: `Connection error: ${e.message}` }]);
    }
    setLoading(false);
  };

  const suggestions = [
    "Explain this result in simple words.",
    "Why did the AI predict this tumor type?",
    "What does the highlighted region represent?",
    "Explain the confidence score.",
  ];

  return (
    <div className="page assistant-page">
      <div className="page-hd row">
        <div>
          <div className="sec-kicker">AI ASSISTANT</div>
          <h1>Ask About the Analysis</h1>
          <p>{analysis ? `Discussing results for ${analysis.id}` : "Select an analysis first."}</p>
        </div>
        {analysis && <button className="btn btn-outline" onClick={() => setPage("results")}><ArrowRight size={15} style={{transform:"rotate(180deg)"}} /> Back to Results</button>}
      </div>

      <div className="chat-shell">
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.role}`}>
              {m.role === "assistant" && <div className="chat-avatar"><Bot size={15} /></div>}
              <div className="chat-bubble">{m.text}</div>
            </div>
          ))}
          {loading && <div className="chat-msg assistant"><div className="chat-avatar"><Bot size={15} /></div><div className="chat-bubble typing"><span /><span /><span /></div></div>}
          <div ref={bottomRef} />
        </div>

        {messages.length === 1 && (
          <div className="suggestions">
            {suggestions.map(s => (
              <button key={s} className="suggestion-chip" onClick={() => setInput(s)}>{s}</button>
            ))}
          </div>
        )}

        <form className="chat-input" onSubmit={send}>
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about the analysis results…" disabled={loading} />
          <button type="submit" disabled={loading || !input.trim()} className="btn btn-primary">Send</button>
        </form>
      </div>
    </div>
  );
}

// ─── Settings & About Pages ───────────────────────────────────────────────────
function SettingsPage() {
  return (
    <div className="page" style={{ paddingBottom: "60px" }}>
      <div className="page-hd">
        <div className="sec-kicker">ACCOUNT SETTINGS</div>
        <h1>Profile & Preferences</h1>
        <p>Manage your account details and security settings.</p>
      </div>
      <div className="settings-container" style={{ display: "flex", justifyContent: "center", marginTop: "30px", width: "100%", maxWidth: "900px" }}>
        <UserProfile routing="hash" />
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="page" style={{ paddingBottom: "80px" }}>
      <div className="page-hd">
        <div className="sec-kicker">PROJECT INFO</div>
        <h1>About BrainXAI</h1>
        <p>An Agentic AI-Powered Brain MRI Analysis System built for the Pak Angels Generative & Agentic AI Training — Cohort 11 Final Hackathon.</p>
      </div>

      <div style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        <div className="dash-panel" style={{ padding: "30px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(45,212,191,0.15)", color: "#2dd4bf", display: "flex", alignItems: "center", justifyContent: "center" }}><Brain size={20} /></div>
            <h2 style={{ fontSize: "20px", fontWeight: "700" }}>The Vision</h2>
          </div>
          <p style={{ color: "#475569", lineHeight: "1.7", fontSize: "15px" }}>
            BrainXAI is designed as a diagnostic copilot for neurologists and radiologists. It solves the critical "black-box" AI problem by introducing <strong>Explainable AI (Grad-CAM)</strong> and <strong>Agentic Workflows</strong> (via Groq/Llama3 and PyTorch), ensuring every prediction is verifiable, transparent, and easy to understand through automated clinical reporting.
          </p>
        </div>

        <div className="dash-panel" style={{ padding: "30px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(59,130,246,0.15)", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={20} /></div>
            <h2 style={{ fontSize: "20px", fontWeight: "700" }}>Core Technologies</h2>
          </div>
          <ul style={{ color: "#475569", lineHeight: "1.7", fontSize: "15px", listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            <li><strong>Frontend:</strong> React, Vite, Framer Motion, Vanilla CSS</li>
            <li><strong>Backend:</strong> Python, FastAPI, SQLite</li>
            <li><strong>Computer Vision:</strong> PyTorch (EfficientNetV2-S), OpenCV</li>
            <li><strong>Generative & Agentic AI:</strong> Groq API (Llama 3 70B)</li>
            <li><strong>Security:</strong> Clerk Authentication</li>
          </ul>
        </div>
      </div>

      <div className="dash-panel" style={{ padding: "30px", marginTop: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(139,92,246,0.15)", color: "#8b5cf6", display: "flex", alignItems: "center", justifyContent: "center" }}><Users size={20} /></div>
          <h2 style={{ fontSize: "20px", fontWeight: "700" }}>Team Zaheer (Hackathon Project)</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
          {[
            { name: "Zaheer Ahmed", role: "Team Leader" },
            { name: "Azlan Ahmed", role: "Team Member" },
            { name: "Humaiza", role: "Team Member" },
            { name: "Wajeeha Asad", role: "Team Member" },
            { name: "Ayesha Muazzama", role: "Team Member" },
            { name: "Laiba Saeed", role: "Team Member" },
          ].map(m => (
            <div key={m.name} style={{ padding: "16px", borderRadius: "8px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <strong style={{ display: "block", color: "#1e293b", fontSize: "15px" }}>{m.name}</strong>
              <span style={{ color: "#64748b", fontSize: "13px" }}>{m.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Shared Components ─────────────────────────────────────────────────────────
function Logo() {
  return (
    <div className="logo-container">
      <img src="/logo.jpg" alt="BrainX AI Logo" className="logo-img" />
      <span className="logo-text">BRAINX-AI</span>
    </div>
  );
}

// ─── Auth Pages ───────────────────────────────────────────────────────────────
function AuthContainer({ children, setAuthPage }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", backgroundColor: "#f8fafc" }}>
      {/* Left side: Branding (Desktop Only) */}
      <div className="desktop-only" style={{ flex: 1.2, background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)", color: "#fff", display: "flex", flexDirection: "column", padding: "50px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: "800px", height: "800px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)", top: "-400px", right: "-300px", zIndex: 0 }}></div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ cursor: "pointer", display: "inline-block" }} onClick={() => setAuthPage("landing")}><Logo /></div>
          
          <div style={{ marginTop: "120px", maxWidth: "480px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "11px", fontWeight: "800", letterSpacing: "0.15em", color: "#93c5fd", marginBottom: "16px", textTransform: "uppercase" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2dd4bf" }}></span> Platform Access
            </div>
            <h1 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "20px", lineHeight: "1.1", color: "#fff" }}>Welcome to the Future of MRI Analysis</h1>
            <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: "1.65", marginBottom: "36px" }}>
              BrainX AI is a comprehensive diagnostic copilot combining Computer Vision and Generative AI for instant classifications, explainability heatmaps, and automated reporting.
            </p>
            
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "18px" }}>
              {[
                "Automated Multi-class Tumor Classification",
                "Grad-CAM Heatmap Explanations",
                "AI-Generated Natural Language Reports",
                "Interactive AI Chat Assistant"
              ].map(item => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: "14px", color: "#cbd5e1", fontSize: "15px", fontWeight: "500" }}>
                  <div style={{ width: "22px", height: "22px", flexShrink: 0, borderRadius: "50%", background: "rgba(45,212,191,0.15)", color: "#2dd4bf", display: "flex", alignItems: "center", justifyContent: "center" }}><Check size={14} /></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Right side: Auth Form */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "24px" }}>
          <button className="btn btn-outline" onClick={() => setAuthPage("landing")}>Back to Home</button>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 40px 60px" }}>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [authPage, setAuthPage] = useState("landing");

  return (
    <>
      <SignedOut>
        {authPage === "landing" && <Landing setAuthPage={setAuthPage} />}
        {(authPage === "signin" || authPage === "signup") && (
          <AuthContainer setAuthPage={setAuthPage}>
            <SignUp routing="hash" />
          </AuthContainer>
        )}
      </SignedOut>
      <SignedIn>
        <AppShell />
      </SignedIn>
    </>
  );
}
