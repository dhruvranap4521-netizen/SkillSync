import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import EditProfile from "./pages/editProfile";
import Dashboard from "./pages/dashboard";
import ChatPage from './pages/chat';
import Register from "./pages/register";
import Login from "./pages/login";
import Feed from "./pages/feed";
import UserProfile from "./pages/userProfile";
import "./App.css";
import Home from "./pages/home";


function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/home" element={<Home />} />

        <Route
          path="/"
          element={
            <>
              {/* HEADER */}
              <header className="header">
                <div className="header-container">
                  <div className="logo">
                    <div className="logo-icon">⚡</div>
                    <span className="logo-text">Skill Sync</span>
                  </div>

                  <nav className="nav">
                    <a href="#features">Features</a>
                    <a href="#about">about</a>
                  </nav>

                  <Link to="/login" className="btn-primary">
                    Login
                  </Link>
                </div>
              </header>

              {/* HERO */}
              <section className="hero">
                <div className="hero-container">
                  <span className="hero-badge">
                    🚀 Join 10,000+ Developers
                  </span>

                  <h1>
                    Connect skills, collaborate smarter,
                    <br />
                    <span className="text-primary">grow faster.</span>
                  </h1>

                  <p className="hero-text">
                    Skill Sync connects developers based on the skills they know
                    and the stacks they want to learn.
                  </p>

                  <div className="hero-actions">
                    <Link to="/register" className="btn-primary btn-lg">
                      Get Started
                    </Link>
                  </div>
                </div>
              </section>
              
              {/* ABOUT */}
            <section id="about" className="about">
              <div className="about-container">

                <div className="about-left">
                  <h2>Why Skill Sync Exists</h2>
                  <p>
                    Learning to code alone is hard. Tutorials end, motivation drops,
                    and most developers never build real projects.
                  </p>

                  <p>
                    Skill Sync connects developers based on what they know and what
                    they want to learn — so they can collaborate, practice and grow
                    together instead of struggling alone.
                  </p>

                  <div className="about-points">
                    <div>👨‍💻 Find learning partners instantly</div>
                    <div>🚀 Build real portfolio projects</div>
                    <div>🧠 Learn faster through collaboration</div>
                  </div>
                </div>

                <div className="about-right">
                  <div className="about-card">
                    <h3>Our Mission</h3>
                    <p>
                      Help developers stop consuming tutorials and start building
                      real world experience through teamwork.
                    </p>
                  </div>

                  <div className="about-card">
                    <h3>Our Vision</h3>
                    <p>
                      A world where every developer has a teammate, mentor,
                      and opportunity to grow — no matter their background.
                    </p>
                  </div>
                </div>

              </div>
            </section>

              {/* FEATURES */}
              <section id="features" className="features">
                <div className="features-container">
                  {[
                    {
                      title: "Skill Matching",
                      desc: "Find developers who know what you want to learn."
                    },
                    {
                      title: "Real-time Collaboration",
                      desc: "Chat, pair program and collaborate instantly."
                    },
                    {
                      title: "Verified Profiles",
                      desc: "Showcase GitHub and project-based credibility."
                    }
                  ].map((item, i) => (
                    <div className="about-card" key={i}>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* FOOTER */}
              <footer className="footer">
                © 2024 Skill Sync. All rights reserved.
              </footer>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
