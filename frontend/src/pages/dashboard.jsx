import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import"../App.css";


const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  
  if (!storedUser || storedUser === "undefined" || storedUser === "null") {
    navigate("/login");
  } else {
    try {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser && parsedUser.name) {
        setUser(parsedUser);
      } else {
        navigate("/login");
      }
    } catch (e) {
      console.error("Error parsing user", e);
      navigate("/login");
    }
  }
}, [navigate]);

  if (!user) return <p className="text-center mt-10">user does not exit.</p>;

    return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <div className="logo-icon">SS</div>
            <span className="logo-text">Skill Sync</span>
          </div>

          <nav className="nav">
            <a href="/dashboard">Dashboard</a>
            <a href="/feed">Feed</a>
            <a href="/home">Home</a>
          </nav>
        </div>
      </header>

      {/* DASHBOARD */}
      <section className="dashboard-layout">

        {/* LEFT PANEL */}
        <div className="left-panel">
          <div className="feature-card profile-card">
            <h2>👋 Welcome, {user.name}</h2>

            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Bio:</strong> {user.bio || "No bio yet"}</p>

            <button
              className="das.btn-secondary profile-btn"
              onClick={() => navigate("/editProfile")}
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">

          <div className="feature-card">
            <h3>💡 Skills I Have</h3>
            <p className="skills-text">
              {user.skillsHave?.length
                ? user.skillsHave.join(", ")
                : "No skills added"}
            </p>
          </div>

          <div className="feature-card">
            <h3>🎯 Skills I Want</h3>
            <p className="skills-text">
              {user.skillsWant?.length
                ? user.skillsWant.join(", ")
                : "No skills added"}
            </p>
          </div>

          <button
            className="das.btn-primary partner-btn"
            onClick={() => navigate("/feed")}
          >
            Find Partners
          </button>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © {new Date().getFullYear()} Skill Sync. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;