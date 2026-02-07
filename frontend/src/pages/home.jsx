import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Home = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     AUTH CHECK
  ========================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    setCurrentUser(JSON.parse(storedUser));
  }, [navigate]);

  /* =========================
     FETCH & MATCH USERS
  ========================= */
  useEffect(() => {
    if (!currentUser) return;

    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/user/getAllUsers");
        const data = await res.json();

        const filtered = data.filter(
          (u) =>
            u._id !== currentUser._id &&
            u.skillsHave?.some((skill) =>
              currentUser.skillsWant?.includes(skill)
            )
        );

        setMatchedUsers(filtered);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser]);

  if (loading) return <p className="loading">Finding classroom partners...</p>;

  return (
    <div className="app">
      {/* =========================
          HEADER
      ========================= */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <div className="logo-icon">⚡</div>
            <span className="logo-text">SkillSync</span>
          </div>

          <nav className="nav">
            <a href="#">Classroom</a>
            <a href="#">Connections</a>
            <a href="#">Messages</a>
            <a href="#">Profile</a>
          </nav>

          <button className="btn-primary">New Post</button>
        </div>
      </header>

      {/* =========================
          DASHBOARD
      ========================= */}
      <section className="dashboard-layout">
        {/* LEFT PANEL */}
        <div className="left-panel">
          <div className="feature-card profile-card">
            <h2>Welcome, {currentUser.name} 👋</h2>
            <p className="skills-text">
              <strong>Your Skills:</strong>{" "}
              {currentUser.skillsHave?.join(", ")}
            </p>
            <p className="skills-text">
              <strong>Learning:</strong>{" "}
              {currentUser.skillsWant?.join(", ")}
            </p>
          </div>

          <div className="feature-card">
            <h3>Classroom Insights</h3>
            <p>
              Connect with peers who can teach what you want to learn and grow
              together.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <h2>People Who Can Teach You</h2>

          {matchedUsers.length === 0 ? (
            <p>No matching classroom partners found yet.</p>
          ) : (
            matchedUsers.map((u) => (
              <div key={u._id} className="feature-card">
                <h3>{u.name}</h3>

                <p className="skills-text">
                  <strong>Can teach:</strong>{" "}
                  {u.skillsHave?.join(", ")}
                </p>

                <p className="skills-text">
                  <strong>Wants to learn:</strong>{" "}
                  {u.skillsWant?.join(", ")}
                </p>
                
                <p className="skills-text">
                  <strong>Email:</strong>{" "}
                  {u.email}
                </p>

                <button
                  className="btn-primary"
                  style={{ marginTop: "12px" }}
                  onClick={() => navigate(`/user/${u._id}`)}
                >
                  View Full Profile
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* =========================
          FOOTER
      ========================= */}
      <footer className="footer">
        © {new Date().getFullYear()} SkillSync • Learn Together
      </footer>
    </div>
  );
};

export default Home;
