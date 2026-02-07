import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import "./pages.css"; // reuse same CSS

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    region: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/editProfile");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      {/* BRAND */}

      <div className="brand">
        <div className="Label"><h1>Skill Sync</h1></div>
        <p>Connect skills, collaborate smarter, and grow faster.</p>
      </div>

      {/* CARD */}
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          onChange={handleChange}
        />
        <div className="select-wrapper">
          <select name="region" required onChange={handleChange}>
          <option value="">Select Region</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="Europe">Europe</option>
          <option value="Other">Other</option>
        </select>

        </div>

        <button type="submit" className="primary-btn">
          Join Skill Sync →
        </button>

        Already have an account? <Link to ="/login" className="link-btn"  onClick={() => navigate("/login")}> 
        login →
        </Link>
        
      </form>
    </div>
  );
};

export default Register;
