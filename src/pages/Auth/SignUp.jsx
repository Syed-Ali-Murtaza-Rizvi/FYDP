import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, CalendarDays, User } from "lucide-react";
import "./Signup.css";
import signupImage from "../../assets/signup.png"; // your PNG image

const Signup = () => {
  const [role, setRole] = useState("admin");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    organization: "",
    society: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    if (!form.email || !form.password) {
      alert("Please fill required fields");
      return;
    }

    const newUser = {
      role,
      ...form,
      createdAt: new Date().toISOString(),
    };

    const key =
      role === "admin"
        ? "orgAdmins"
        : role === "eventAdmin"
        ? "eventAdmins"
        : "participants";

    const existing = JSON.parse(localStorage.getItem(key)) || [];
    existing.push(newUser);
    localStorage.setItem(key, JSON.stringify(existing));

    alert("Signup successful!");
  };

  return (
    <div className="signup-page">
      <div className="signup-container">

        {/* LEFT SIDE ROLE MENU */}
        <div className="signup-sidebar">
          <br></br>
          <h3>Sign up</h3>
          <button
            className={role === "admin" ? "role active" : "role"}
            onClick={() => setRole("admin")}
          >
            <Building2 size={20} className="role-icon" /> Organization Admin
          </button>

          <button
            className={role === "eventAdmin" ? "role active" : "role"}
            onClick={() => setRole("eventAdmin")}
          >
            <CalendarDays size={20} className="role-icon" /> Event Admin
          </button>

          <button
            className={role === "participant" ? "role active" : "role"}
            onClick={() => setRole("participant")}
          >
             <User size={20} className="role-icon" /> Participant
          </button>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="signup-form-area">

          <div className="form-section">
            <h2>
              {role === "admin" && "Sign up as Organization Admin"}
              {role === "eventAdmin" && "Sign up as Event Admin"}
              {role === "participant" && "Sign up as Participant"}
            </h2>

           <p className="login-link">
          Already have an account?{" "}
        <Link to="/login" className="login-link-text">
          Login here
        </Link>
        </p>

            {/* ROLE SPECIFIC FIELDS */}

            {role === "admin" && (
              <input
                name="organization"
                placeholder="Organization Name"
                value={form.organization}
                onChange={handleChange}
              />
            )}

            {role === "eventAdmin" && (
              <input
                name="society"
                placeholder="Society Name"
                value={form.society}
                onChange={handleChange}
              />
            )}

            {role === "participant" && (
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
              />
            )}

            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            <button className="submit-btn" onClick={handleSignup}>
              Submit
            </button>
          </div>

          {/* IMAGE SIDE */}
          <div className="signup-image">
            <img src={signupImage} alt="signup illustration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;