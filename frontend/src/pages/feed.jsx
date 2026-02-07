import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

const Feed = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/user/getAllUsers")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Error fetching users:", err));
  }, []);

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <div className="logo-icon">⚡</div>
            <span className="logo-text">Skill Sync</span>
          </div>

          <nav className="nav">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/feed">Discover</Link>
            <Link to="/messages">Messages</Link>
          </nav>
        </div>
      </header>

      {/* DASHBOARD GRID */}
      <div className="dashboard-layout">

        {/* LEFT SIDE */}
        <div className="left-panel">
          <div className="intro-card">
            <h2>Find Your Learning Partner</h2>
            <p>Connect with people who match your skills.</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-panel">

          {users.length === 0 ? (
            <p className="loading">No users found yet.</p>
          ) : (
            <div className="users-grid">
              {users.map((u) => (
                <div key={u._id} className="user-card">

                  <h3>{u.name}</h3>

                  <p>
                    <strong>Expert in:</strong>{" "}
                    {u.skillsHave?.length ? u.skillsHave.join(", ") : "No skills listed"}
                  </p>

                  <p>
                    <strong>Wants to Learn:</strong>{" "}
                    {u.skillsWant?.length ? u.skillsWant.join(", ") : "No skills listed"}
                  </p>

                  <button
                    className="btn-primary"
                    onClick={() => navigate(`/profile/${u._id}`)}
                  >
                    View Full Profile
                  </button>

                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Feed;
