import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pages.css"

const EditProfile = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const [profileData, setProfileData] = useState({
    name: loggedInUser?.name || "",
    email: loggedInUser?.email || "",
    // password: "",
    skillsHave: loggedInUser?.skillsHave?.join(", ") || "",
    skillsWant: loggedInUser?.skillsWant?.join(", ") || "",
    bio: loggedInUser?.bio || ""
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

const handleUpdate = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  // Create a clean object to send
  const updatedData = {
    bio: profileData.bio,
    skillsHave: profileData.skillsHave,
    skillsWant: profileData.skillsWant
    // Don't send 'name' or 'email' if the backend isn't set up to update them
  };

  try {
    const response = await fetch("http://localhost:3000/user/editProfile", {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(updatedData) 
    });

    const data = await response.json();
    if (response.ok) { // Check response.ok instead of just data.success
      localStorage.setItem("user", JSON.stringify(data.user)); 
      alert("Profile updated!");
      navigate("/dashboard");
    } else {
      console.error("Server Error:", data.message);
      alert(`Error: ${data.message}`);
    }
  } catch (err) {
    console.error("Network Error:", err);
  }
};

// --- DELETE ACCOUNT FUNCTION ---
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure? This will permanently delete your account."
    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/user/deleteAccount", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account deleted successfully");

        // Clear local storage
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        // Redirect to landing page/login
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert("error in deleting account");
    }
  };

  return (
    <div className="auth-page">
      <div className="brand">
        <div className="Label">
          <h1>Skill Sync</h1>
        </div>
        <p>Update your profile details</p>
      </div>

      <form className="auth-card" onSubmit={handleUpdate}>
        <h2>Edit Profile</h2>

        <input type="text" value={profileData.name} readOnly />

        <input type="email" value={profileData.email} readOnly />

        {/* SKILLS HAVE */}
        <input
          type="text"
          name="skillsHave"
          placeholder="Skills you have : C,C++"
          value={profileData.skillsHave}
          onChange={handleChange}
        />

        {/* SKILLS WANT */}
        <input
          type="text"
          name="skillsWant"
          placeholder="Skills you want : CSS,Node.js"
          value={profileData.skillsWant}
          onChange={handleChange}
        />

        <input
          type="text"
          name="bio"
          placeholder="Short bio"
          value={profileData.bio}
          onChange={handleChange}
        />

        <button type="submit">Save Changes →</button>

        <button
          type="button"
          className="login-link"
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </button>

        {/* DANGER ZONE */}
        <div
          className="auth-card"
          style={{ marginTop: "2rem", border: "1px solid #fee2e2" }}
        >
          <h2 style={{ color: "red" }}>Danger Zone</h2>

          <p style={{ color: "#475569", fontSize: "0.9rem" }}>
            Permanently remove your profile and all data.
          </p>

          <button
            type="button"
            onClick={handleDeleteAccount}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "1rem",
              borderRadius: "1.4rem",
              fontWeight: "600",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;