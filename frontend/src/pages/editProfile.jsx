import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

return (
  <div className="edit-profile-wrapper">
    <div className="edit-profile-card">
      <h2>Edit Profile</h2>

      <form className="edit-profile-form" onSubmit={handleUpdate}>
        <input
          type="text"
          name="name"
          value={profileData.name}
          placeholder="Username"
          readOnly
        />

        <input
          type="email"
          name="email"
          value={profileData.email}
          placeholder="Email"
          readOnly
        />

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