// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    universityName: "",
    adminName: "",
    email: "",
    password: "",
    programs: "",
    courses: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    if (!form.universityName || !form.adminName || !form.email || !form.password) {
      alert("Please fill all required fields");
      return;
    }

    const admin = {
      id: Date.now(),
      role: "admin",
      universityName: form.universityName,
      adminName: form.adminName,
      email: form.email,
      password: form.password,
      programs: form.programs.split(",").map(p => p.trim()),
      courses: form.courses.split(",").map(c => c.trim())
    };

    localStorage.setItem("universityAdmin", JSON.stringify(admin));
    localStorage.setItem("currentUser", JSON.stringify(admin));

    alert("University Admin Registered Successfully ✅");
    navigate("/admin");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>University Admin Signup</h2>

        <input
          name="universityName"
          placeholder="University Name *"
          value={form.universityName}
          onChange={handleChange}
        />

        <input
          name="adminName"
          placeholder="Admin Name *"
          value={form.adminName}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email *"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password *"
          value={form.password}
          onChange={handleChange}
        />

        <input
          name="programs"
          placeholder="Programs (e.g. BSCS, BSIT, AI)"
          value={form.programs}
          onChange={handleChange}
        />


        <button onClick={handleSignup}>Submit</button>
      </div>
    </div>
  );
};

export default Signup;
