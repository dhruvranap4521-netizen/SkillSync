import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:3000/user/profile/${id}`);
        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "User not found");
          navigate("/discover");
          return;
        }

        setUser(data);
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading profile...</p>;

  return (
    <div className="auth-page">

      <div className="brand">
        <div className="Label"><h1 >Skill Sync</h1></div>
        <p>Public Profile</p>
      </div>

      <div className="auth-card">

        <h2>{user.name}</h2>
        <p style={{ color: "#64748b" }}>{user.email}</p>

        <div className="profile-section">
          <h4>Skills Have</h4>
          <p>{user.skillsHave?.join(", ") || "None listed"}</p>
        </div>

        <div className="profile-section">
          <h4>Skills Want</h4>
          <p>{user.skillsWant?.join(", ") || "None listed"}</p>
        </div>

        <div className="profile-section">
          <h4>Email</h4>
          <p>{user.email || "None listed"}</p>
        </div>

        <div className="profile-section">
          <h4>Bio</h4>
          <p>{user.bio || "No bio added"}</p>
        </div>

        <button
          type="button"
          className="login-link"
          onClick={() => navigate(-1)}
        >
          ← Go Back
        </button>

      </div>

    </div>
  );
};

export default UserProfile;