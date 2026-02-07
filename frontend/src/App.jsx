import { Routes, Route, Link } from "react-router-dom";
import EditProfile from "./pages/editProfile";
import Dashboard from "./pages/dashboard";
import Chat from "./pages/chat";
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
        <Route path="/chat/:receiverId" element={<Chat />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/register" element={<Register />} />
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
                    <a href="#community">Community</a>
                    <a href="#contact">Contact</a>
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
                    <Link to="/login" className="btn-secondary btn-lg">
                      View Demo
                    </Link>
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
                    <div className="feature-card" key={i}>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <section className="cta">
                <h2>Ready to sync up?</h2>
                <p>Join a growing community of developers worldwide.</p>
                <Link to="/register" className="btn-primary btn-xl">
                  Join Skill Sync
                </Link>
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
