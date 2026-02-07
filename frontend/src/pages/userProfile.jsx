import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const [profileData, setProfileData] = useState({
    name: loggedInUser?.name || "",
    email: loggedInUser?.email || "",
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

    if (!token) {
      alert("Session expired. Please login again.");
      navigate("/login");
      return;
    }


    try {
      const response = await fetch("http://localhost:3000/user/editProfile", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // ✅ The bouncer checks this
        },
        body: JSON.stringify(profileData) // ✅ userId is removed from here
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user)); 
        alert("Profile updated!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="edit-profile-wrapper">
      <div className="edit-profile-card">
        <h2>Edit Profile</h2>
        <form className="edit-profile-form" onSubmit={handleUpdate}>
          {/* Read-only fields don't need name or onChange */}
          <input type="text" value={profileData.name} readOnly className="bg-gray-100" />
          <input type="email" value={profileData.email} readOnly className="bg-gray-100" />

          <input
            type="text"
            name="skillsHave"
            value={profileData.skillsHave}
            placeholder="Skills I Have (comma separated)"
            onChange={handleChange}
          />
          <input
            type="text"
            name="skillsWant"
            value={profileData.skillsWant}
            placeholder="Skills I Want (comma separated)"
            onChange={handleChange}
          />
          <input
            type="text"
            name="bio"
            value={profileData.bio}
            placeholder="Bio"
            onChange={handleChange}
          />
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;