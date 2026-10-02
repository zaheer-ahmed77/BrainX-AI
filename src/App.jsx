import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Brain,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileText,
  FlaskConical,
  History,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Plus,
  ScanLine,
  Settings,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  X,
} from "lucide-react";

const steps = [
  { n: "01", title: "Upload", text: "Add a brain MRI scan." },
  { n: "02", title: "Analyze", text: "Classify the scan with AI." },
  { n: "03", title: "Explain", text: "See what influenced the model." },
  { n: "04", title: "Report", text: "Turn the result into a clear report." },
];

const capabilities = [
  { icon: Brain, title: "Brain tumor classification", text: "Analyze an MRI and return the model's predicted class and confidence." },
  { icon: ScanLine, title: "Explainable AI", text: "Visualize model attention with Grad-CAM so the output is easier to understand." },
  { icon: Sparkles, title: "GenAI explanations", text: "Translate technical model output into human-readable language." },
  { icon: Activity, title: "Agentic workflow", text: "Coordinate analysis, explanation and reporting as one connected workflow." },
];

function Logo({ light = false }) {
  return (
    <div className={"brand " + (light ? "brand-light" : "")}>
      <span className="brand-mark"><Brain size={18} strokeWidth={2.2} /></span>
      <span>Brain<span className="brand-accent">X</span> AI</span>
    </div>
  );
}

function Landing({ onStart }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="landing">
      <nav className="landing-nav container">
        <Logo />
        <div className={"nav-links " + (menuOpen ? "open" : "")}>
          <a href="#how">How it works</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#trust">Trust & limits</a>
          <button className="nav-signin" onClick={onStart}>Sign in</button>
        </div>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      <main>
        <section className="hero container">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> AI BRAIN MRI ANALYSIS COPILOT</div>
            <h1>See the scan.<br /><span>Understand the AI.</span></h1>
            <p>
              BrainX connects MRI classification, explainable AI and Generative AI
              into one guided analysis workflow — from scan to understandable report.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-lg" onClick={onStart}>
                Start analysis <ArrowRight size={17} />
              </button>
              <button className="btn btn-secondary btn-lg" onClick={onStart}>
                Try demo
              </button>
            </div>
            <div className="hero-note">
              <ShieldCheck size={15} />
              Preliminary AI analysis · Not a medical diagnosis
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-glow" />
            <div className="scan-card">
              <div className="scan-topbar">
                <span><span className="mini-live" /> LIVE ANALYSIS PREVIEW</span>
                <span>BX-2048</span>
              </div>
              <div className="brain-art">
                <div className="brain-ring ring-one" />
                <div className="brain-ring ring-two" />
                <div className="brain-core">
                  <div className="brain-half left" />
                  <div className="brain-half right" />
                  <div className="attention attention-one" />
                  <div className="attention attention-two" />
                </div>
                <div className="scan-line" />
                <div className="axis-label x">R</div>
                <div className="axis-label y">L</div>
              </div>
              <div className="scan-footer">
                <div>
                  <span className="label">MODEL OUTPUT</span>
                  <strong>Glioma</strong>
                </div>
                <div className="confidence">
                  <span>94.2%</span>
                  <div className="confidence-bar"><i /></div>
                </div>
              </div>
            </div>
            <div className="floating-chip chip-analysis"><Activity size={14} /> Analysis complete</div>
            <div className="floating-chip chip-xai"><ScanLine size={14} /> Grad-CAM ready</div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-inner">
            <span>ONE WORKSPACE</span>
            <i />
            <span>COMPUTER VISION</span>
            <i />
            <span>EXPLAINABLE AI</span>
            <i />
            <span>GENAI</span>
            <i />
            <span>AGENTIC WORKFLOW</span>
          </div>
        </section>

        <section className="workflow section container" id="how">
          <div className="section-heading">
            <div>
              <span className="section-kicker">HOW BRAINX WORKS</span>
              <h2>One scan. Four connected stages.</h2>
            </div>
            <p>The interface keeps every stage visible, so the intelligence behind the result never feels like a black box.</p>
          </div>
          <div className="workflow-grid">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                className="workflow-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <span className="step-number">{step.n}</span>
                <div className="step-icon">{i === 0 ? <UploadCloud /> : i === 1 ? <FlaskConical /> : i === 2 ? <ScanLine /> : <FileText />}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                {i < steps.length - 1 && <ChevronRight className="workflow-arrow" size={18} />}
              </motion.div>
            ))}
          </div>
        </section>

        <section className="capabilities section" id="capabilities">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-kicker">BUILT FOR UNDERSTANDING</span>
                <h2>More than a prediction.</h2>
              </div>
              <p>BrainX brings the documented CV, XAI, GenAI and agentic components together into one experience.</p>
            </div>
            <div className="cap-grid">
              {capabilities.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.article className="cap-card" key={item.title} whileHover={{ y: -4 }} transition={{ duration: .2 }}>
                    <div className="cap-icon"><Icon size={19} /></div>
                    <span className="cap-index">0{i + 1}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <ArrowRight size={17} className="cap-arrow" />
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="trust-section section container" id="trust">
          <div className="trust-panel">
            <div className="trust-icon"><ShieldCheck size={22} /></div>
            <div>
              <span className="section-kicker">DESIGNED WITH LIMITS IN MIND</span>
              <h2>Clear about what the AI can — and cannot — tell you.</h2>
              <p>
                BrainX presents model outputs, confidence and explainability together,
                while clearly separating AI assistance from clinical diagnosis.
              </p>
            </div>
            <button className="text-button" onClick={onStart}>Explore demo <ArrowRight size={16} /></button>
          </div>
        </section>

        <section className="final-cta container">
          <div>
            <span className="section-kicker">READY TO ANALYZE?</span>
            <h2>Turn an MRI into an understandable AI report.</h2>
          </div>
          <button className="btn btn-primary btn-lg" onClick={onStart}>Open BrainX <ArrowRight size={17} /></button>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="container footer-inner">
          <Logo />
          <span>AI Brain MRI Analysis Copilot</span>
          <span>Preliminary AI analysis · Not a medical diagnosis</span>
        </div>
      </footer>
    </div>
  );
}

function Sidebar({ active, setActive, mobileOpen, setMobileOpen }) {
  const nav = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "new", label: "New analysis", icon: Plus },
    { id: "history", label: "Analysis history", icon: History },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "assistant", label: "AI assistant", icon: MessageCircle },
  ];
  return (
    <>
      {mobileOpen && <div className="drawer-backdrop" onClick={() => setMobileOpen(false)} />}
      <aside className={"sidebar " + (mobileOpen ? "mobile-open" : "")}>
        <div className="sidebar-top">
          <Logo />
          <button className="close-sidebar" onClick={() => setMobileOpen(false)}><X size={18} /></button>
        </div>
        <button className="new-analysis-btn" onClick={() => { setActive("new"); setMobileOpen(false); }}>
          <Plus size={17} /> New analysis
        </button>
        <div className="sidebar-label">WORKSPACE</div>
        <nav>
          {nav.map(item => {
            const Icon = item.icon;
            return (
              <button key={item.id} className={"side-item " + (active === item.id ? "active" : "")}
                onClick={() => { setActive(item.id); setMobileOpen(false); }}>
                <Icon size={17} />
                {item.label}
                {item.id === "new" && <span className="shortcut">N</span>}
              </button>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <button className="side-item"><Settings size={17} /> Settings</button>
          <button className="side-item"><CircleHelp size={17} /> About BrainX</button>
          <div className="account-mini">
            <div className="avatar">W</div>
            <div><strong>Demo workspace</strong><span>Demo mode</span></div>
            <ChevronRight size={15} />
          </div>
        </div>
      </aside>
    </>
  );
}

function Header({ onMenu }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <button className="mobile-header-menu" onClick={onMenu}><Menu size={21} /></button>
        <div className="breadcrumb"><span>Workspace</span><ChevronRight size={14} /><strong>Overview</strong></div>
      </div>
      <div className="header-right">
        <div className="system-status"><span className="status-dot" /> AI system ready</div>
        <span className="demo-badge">DEMO MODE</span>
        <div className="avatar">W</div>
      </div>
    </header>
  );
}

function Dashboard({ setActive }) {
  const recent = [
    { file: "brain_scan_04.png", result: "Glioma", confidence: "94.2%", time: "Today, 10:42", state: "Completed" },
    { file: "mri_case_03.jpg", result: "No Tumor", confidence: "91.8%", time: "Yesterday, 16:18", state: "Completed" },
    { file: "scan_sample_02.png", result: "Meningioma", confidence: "88.6%", time: "Sep 30, 14:06", state: "Completed" },
  ];

  return (
    <div className="dashboard-page">
      <div className="page-intro">
        <div>
          <span className="section-kicker">BRAINX WORKSPACE</span>
          <h1>Good afternoon, Wajeeha.</h1>
          <p>Start a new analysis or continue exploring your recent MRI results.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setActive("new")}><Plus size={17} /> New analysis</button>
      </div>

      <section className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <div className="hero-badge"><span className="status-dot" /> READY FOR ANALYSIS</div>
          <h2>Turn a brain MRI into an explainable AI result.</h2>
          <p>Upload a scan and BrainX will guide the workflow through classification, explainability, GenAI interpretation and report generation.</p>
          <button className="btn btn-light" onClick={() => setActive("new")}>Start new analysis <ArrowRight size={17} /></button>
        </div>
        <div className="dashboard-orbit">
          <div className="orbit-ring ring-a" />
          <div className="orbit-ring ring-b" />
          <div className="orbit-center"><Brain size={43} /></div>
          <span className="orbit-node node-1"><ScanLine size={15} /></span>
          <span className="orbit-node node-2"><Sparkles size={15} /></span>
          <span className="orbit-node node-3"><FileText size={15} /></span>
        </div>
      </section>

      <section className="stats-row">
        <div className="stat-card"><div className="stat-icon blue"><ScanLine size={18} /></div><div><span>Analyses</span><strong>12</strong></div><small>+3 this week</small></div>
        <div className="stat-card"><div className="stat-icon teal"><FileText size={18} /></div><div><span>Reports</span><strong>8</strong></div><small>67% of analyses</small></div>
        <div className="stat-card"><div className="stat-icon slate"><Clock3 size={18} /></div><div><span>Last analysis</span><strong>2h</strong></div><small>Today at 10:42</small></div>
      </section>

      <section className="dashboard-grid">
        <div className="recent-panel panel">
          <div className="panel-header">
            <div><span className="section-kicker">RECENT</span><h3>Analysis history</h3></div>
            <button className="text-button" onClick={() => setActive("history")}>View all <ArrowRight size={15} /></button>
          </div>
          <div className="analysis-list">
            {recent.map((r, i) => (
              <button className="analysis-row" key={r.file} onClick={() => setActive("results")}>
                <div className="file-thumb"><Brain size={20} /></div>
                <div className="analysis-main"><strong>{r.file}</strong><span>{r.time}</span></div>
                <div className="result-pill"><span />{r.result}</div>
                <div className="confidence-small">{r.confidence}</div>
                <ChevronRight className="row-arrow" size={17} />
              </button>
            ))}
          </div>
        </div>

        <div className="workflow-panel panel">
          <div className="panel-header">
            <div><span className="section-kicker">WORKFLOW</span><h3>What happens next?</h3></div>
          </div>
          <div className="mini-flow">
            {steps.map((s, i) => (
              <div className="mini-flow-row" key={s.n}>
                <span className={"mini-step " + (i === 0 ? "current" : "")}>{i === 0 ? <Check size={14} /> : s.n}</span>
                <div><strong>{s.title}</strong><span>{s.text}</span></div>
                {i < 3 && <div className="mini-connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="dashboard-disclaimer"><ShieldCheck size={15} /> BrainX provides preliminary AI-based analysis and should not be treated as a medical diagnosis.</div>
    </div>
  );
}

function NewAnalysis({ setActive }) {
  return (
    <div className="simple-page">
      <span className="section-kicker">NEW ANALYSIS</span>
      <h1>Upload a brain MRI.</h1>
      <p className="page-subtitle">Start the BrainX workflow with a scan you are authorized to analyze.</p>
      <div className="upload-card">
        <div className="upload-icon"><UploadCloud size={25} /></div>
        <h2>Drop your MRI here</h2>
        <p>or browse files from your device</p>
        <button className="btn btn-primary" onClick={() => setActive("processing")}>Browse files</button>
        <span className="upload-meta">JPG · JPEG · PNG · File limits depend on backend configuration</span>
      </div>
      <div className="demo-preview-note"><Sparkles size={16} /><span><strong>Demo path:</strong> Use the Browse files button to preview the next workflow screen without a backend connection.</span></div>
    </div>
  );
}

function Processing({ setActive }) {
  const stages = ["MRI received", "AI model analyzing image", "Tumor classification", "Grad-CAM generation", "GenAI explanation", "Report preparation"];
  return (
    <div className="processing-page">
      <span className="section-kicker">AGENTIC WORKFLOW</span>
      <h1>BrainX is analyzing the scan.</h1>
      <p className="page-subtitle">The demo timeline makes each stage of the workflow visible.</p>
      <div className="processing-layout">
        <div className="processing-card">
          {stages.map((s, i) => (
            <div className={"process-step " + (i < 3 ? "done" : i === 3 ? "active" : "")} key={s}>
              <span className="process-dot">{i < 3 ? <Check size={13} /> : i === 3 ? <span className="pulse" /> : i + 1}</span>
              <div><strong>{s}</strong><span>{i < 3 ? "Completed" : i === 3 ? "Processing now..." : "Waiting"}</span></div>
            </div>
          ))}
        </div>
        <div className="processing-info">
          <div className="processing-orb"><Brain size={42} /></div>
          <h3>Agentic analysis</h3>
          <p>Classification, explainability and GenAI interpretation are coordinated as one workflow.</p>
          <button className="text-button" onClick={() => setActive("results")}>Preview results <ArrowRight size={15} /></button>
        </div>
      </div>
    </div>
  );
}

function Results({ setActive }) {
  return (
    <div className="results-page">
      <div className="page-intro">
        <div><span className="section-kicker">ANALYSIS / BX-2048</span><h1>Analysis results</h1><p>Illustrative demo result — connect these fields to the actual model response.</p></div>
        <span className="complete-badge"><Check size={14} /> Completed</span>
      </div>
      <div className="prediction-card">
        <div><span className="label">MODEL PREDICTION</span><h2>Glioma</h2><p>Predicted class</p></div>
        <div className="prediction-confidence"><span>Model confidence</span><strong>94.2%</strong><div><i /></div><small>Model confidence, not clinical probability.</small></div>
        <div className="prediction-actions"><button className="btn btn-primary" onClick={() => setActive("reports")}>Generate report <FileText size={16} /></button><button className="btn btn-secondary" onClick={() => setActive("assistant")}>Ask AI <MessageCircle size={16} /></button></div>
      </div>
      <div className="result-images">
        <div className="result-image-card"><div className="result-image-header"><span>ORIGINAL MRI</span><button>Open</button></div><div className="fake-mri"><Brain size={74} /></div></div>
        <div className="result-image-card"><div className="result-image-header"><span>GRAD-CAM OVERLAY</span><button>Open</button></div><div className="fake-mri heat"><Brain size={74} /></div></div>
      </div>
      <div className="explanation-card">
        <div className="explanation-icon"><Sparkles size={18} /></div>
        <div><span className="section-kicker">GENAI EXPLANATION</span><h3>What does this result mean?</h3><p>The classification model assigned this scan to the Glioma class. The accompanying visualization can help show image regions that influenced the model's output. This result requires review by a qualified medical professional.</p><button className="text-button" onClick={() => setActive("assistant")}>Ask about this result <ArrowRight size={15} /></button></div>
      </div>
      <div className="result-warning"><ShieldCheck size={16} /><span><strong>Important:</strong> BrainX provides preliminary AI-based analysis and is not a medical diagnosis.</span></div>
    </div>
  );
}

function Placeholder({ active, setActive }) {
  const titles = { history: "Analysis history", reports: "AI reports", assistant: "AI assistant" };
  const icons = { history: History, reports: FileText, assistant: MessageCircle };
  const Icon = icons[active] || History;
  return (
    <div className="simple-page placeholder-page">
      <div className="placeholder-icon"><Icon size={26} /></div>
      <span className="section-kicker">BRAINX WORKSPACE</span>
      <h1>{titles[active]}</h1>
      <p className="page-subtitle">This screen is scaffolded and ready for your backend integration.</p>
      {active === "assistant" && <button className="btn btn-primary" onClick={() => setActive("results")}>Open current analysis</button>}
      {active === "reports" && <button className="btn btn-primary" onClick={() => setActive("results")}>View demo report source</button>}
    </div>
  );
}

function AppShell({ onExit }) {
  const [active, setActive] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = {
    dashboard: <Dashboard setActive={setActive} />,
    new: <NewAnalysis setActive={setActive} />,
    processing: <Processing setActive={setActive} />,
    results: <Results setActive={setActive} />,
    history: <Placeholder active="history" setActive={setActive} />,
    reports: <Placeholder active="reports" setActive={setActive} />,
    assistant: <Placeholder active="assistant" setActive={setActive} />,
  }[active] || <Dashboard setActive={setActive} />;

  return (
    <div className="app-shell">
      <Sidebar active={active} setActive={setActive} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="app-main">
        <Header onMenu={() => setMobileOpen(true)} />
        <main className="app-content">{content}</main>
        <button className="exit-demo" onClick={onExit}>Back to landing</button>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("landing");
  return (
    <AnimatePresence mode="wait">
      {view === "landing" ? (
        <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Landing onStart={() => setView("app")} />
        </motion.div>
      ) : (
        <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <AppShell onExit={() => setView("landing")} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}