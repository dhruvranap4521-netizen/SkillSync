import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./pages.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="brand">
        <div className="Label"><h1 >Skill Sync</h1></div>
        <p>Connect skills, collaborate smarter, and grow faster.</p>
      </div>

      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button type="submit" className="primary-btn">
          Login →
        </button>

        New to Skill Sync? <Link to ="/register" className="link-btn"  onClick={() => navigate("/register")}> 
        register →
        </Link>
        
      </form>
    </div>
  );
};

export default Login;
