
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Interview from "./pages/Interview";
import "./App.css";

const modules = [
  {
    icon: "🎯",
    title: "AI Mock Interview",
    description:
      "Practice role-specific interview questions and receive AI-powered feedback.",
    action: "Start Interview",
    color: "purple",
    path: "/interview",
  },
  {
    icon: "📄",
    title: "Resume & ATS Analysis",
    description:
      "Analyze your resume and identify skills relevant to your target job.",
    action: "Analyze Resume",
    color: "blue",
  },
  {
    icon: "💻",
    title: "Coding Practice",
    description:
      "Practice programming problems and evaluate your solutions.",
    action: "Practice Coding",
    color: "green",
  },
  {
    icon: "🧭",
    title: "Company Roadmaps",
    description:
      "Prepare for company-specific hiring processes and interview rounds.",
    action: "Explore Roadmaps",
    color: "orange",
  },
  {
    icon: "📊",
    title: "Skill Gap Analysis",
    description:
      "Identify the skills you need to improve for your target role.",
    action: "Analyze Skills",
    color: "pink",
  },
  {
    icon: "🚀",
    title: "Job Recommendations",
    description:
      "Explore relevant career opportunities and improve your profile.",
    action: "Explore Jobs",
    color: "cyan",
  },
];

function Dashboard() {
  const [activeModule, setActiveModule] = useState("");
  const navigate = useNavigate();

  function openModule(module) {
    if (module.path) {
      navigate(module.path);
    } else {
      setActiveModule(module.title);
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">AI</span>
          <div>
            <h2>CareerPilot</h2>
            <span>Interview Intelligence</span>
          </div>
        </div>

        <p className="nav-heading">WORKSPACE</p>

        <nav className="navigation">
          <Link to="/" className="nav-item active">
            <span>▦</span> Dashboard
          </Link>

          <Link to="/interview" className="nav-item">
            <span>◎</span> Mock Interview
          </Link>

          <button
            className="nav-item"
            onClick={() => openModule({ title: "Resume & ATS Analysis" })}
          >
            <span>▤</span> Resume Analysis
          </button>

          <button
            className="nav-item"
            onClick={() => openModule({ title: "Coding Practice" })}
          >
            <span>⌘</span> Coding Practice
          </button>

          <button
            className="nav-item"
            onClick={() => openModule({ title: "Company Roadmaps" })}
          >
            <span>◇</span> Company Roadmaps
          </button>

          <button
            className="nav-item"
            onClick={() => openModule({ title: "Skill Gap Analysis" })}
          >
            <span>↗</span> Skill Analysis
          </button>

          <button
            className="nav-item"
            onClick={() => openModule({ title: "Job Recommendations" })}
          >
            <span>✧</span> Job Recommendations
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="profile-avatar">S</div>
          <div>
            <strong>Candidate</strong>
            <span>Interview preparation</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">Workspace / Dashboard</div>

          <div className="topbar-right">
            <span className="status-dot" />
            <span>Development Preview</span>
            <div className="small-avatar">S</div>
          </div>
        </header>

        <section className="welcome">
          <div>
            <p className="eyebrow">YOUR CAREER, YOUR NEXT STEP</p>
            <h1>Prepare smarter. Interview better.</h1>
            <p className="welcome-text">
              Build confidence, strengthen your skills, and prepare for your
              next opportunity.
            </p>
          </div>

          <div className="welcome-art" aria-hidden="true">
            <div className="art-circle">AI</div>
            <span className="art-star star-one">✦</span>
            <span className="art-star star-two">✧</span>
            <span className="art-orbit" />
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <div>
              <h2>Your preparation workspace</h2>
              <p>Choose a module to continue your preparation.</p>
            </div>

            <span className="module-count">6 modules</span>
          </div>

          <div className="module-grid">
            {modules.map((module) => (
              <article className="module-card" key={module.title}>
                <div className={`module-icon ${module.color}`}>
                  {module.icon}
                </div>

                <h3>{module.title}</h3>
                <p>{module.description}</p>

                <button
                  className="module-action"
                  onClick={() => openModule(module)}
                >
                  {module.action} <span>→</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="bottom-panel">
          <div>
            <p className="eyebrow">YOUR NEXT MILESTONE</p>
            <h2>Every interview is an opportunity to improve.</h2>
            <p>
              Start with a mock interview and use your feedback to guide your
              preparation.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={() => navigate("/interview")}
          >
            Begin preparation <span>→</span>
          </button>
        </section>

        <footer>
          AI-Powered Interview Preparation and Candidate Evaluation Platform
          <span>Stage-I Development</span>
        </footer>
      </main>

      {activeModule && (
        <div
          className="modal-overlay"
          onClick={() => setActiveModule("")}
        >
          <section
            className="module-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="module-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close-button"
              aria-label="Close"
              onClick={() => setActiveModule("")}
            >
              ×
            </button>

            <div className="module-icon purple">✦</div>
            <p className="eyebrow">PROJECT MODULE</p>
            <h2 id="module-modal-title">{activeModule}</h2>
            <p>
              This module is planned for implementation. Its functional
              workflow will be connected as development progresses.
            </p>

            <button
              className="primary-button"
              onClick={() => setActiveModule("")}
            >
              Back to dashboard
            </button>
          </section>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/interview" element={<Interview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
