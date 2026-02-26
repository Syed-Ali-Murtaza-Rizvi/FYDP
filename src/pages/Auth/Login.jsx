import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import teacherData from "../../data/TeacherData";
import adminData from "../../data/AdminData";
import "./Login.css";
import loginImage from "../../assets/login_Image.png";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  useEffect(() => {
    document.body.classList.add("login-bg");

    return () => {
      document.body.classList.remove("login-bg");
    };
  }, []);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /* =========================
       STUDENT LOGIN
    ========================= */
    if (data.role === "student") {
      const students = JSON.parse(localStorage.getItem("students")) || [];

      const student = students.find(
        (s) =>
          (s.email === data.email || s.id === data.email) &&
          s.password === data.password
      );

      if (student) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            role: "student",
            id: student.id,
            name: student.name,
            email: student.email,
          })
        );

        navigate("/student");
        return;
      }

      alert("Invalid student credentials");
      return;
    }

    /* =========================
       TEACHER LOGIN
    ========================= */
    if (data.role === "teacher") {
      const teacher = teacherData.find(
        (t) =>
          t.profile.email === data.email &&
          t.profile.password === data.password
      );

      if (teacher) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            role: "teacher",
            id: teacher.profile.teacherId,
            name: teacher.profile.name,
            email: teacher.profile.email,
          })
        );

        navigate("/teacher");
        return;
      }

      alert("Invalid teacher credentials");
      return;
    }

    /* =========================
       ADMIN LOGIN
    ========================= */
    if (data.role === "orgadmin") {
      const admin = adminData.profile;

      if (
        admin.email === data.email &&
        admin.password === data.password
      ) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            role: "orgadmin",
            id: admin.adminId,
            name: admin.name,
            email: admin.email,
            department: admin.department,
          })
        );

        navigate("/orgadmin");
        return;
      }

      alert("Invalid admin credentials");
      return;
    }

  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card-left">
          <div className="login-left-inner">
            <div className="login-heading">Login</div>

            <form className="login-form" onSubmit={handleSubmit}>
              <label className="login-label" htmlFor="login-email">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                required
                className="login-input"
              />

              <label className="login-label" htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleOnChange}
                required
                className="login-input"
              />

              <label className="login-label" htmlFor="login-role">
                Login as
              </label>
              <select
                id="login-role"
                name="role"
                value={data.role}
                onChange={handleOnChange}
                className="login-input"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="orgadmin">Organization Admin</option>
                <option value="advisor">Event Admin</option>
                <option value="participant">Participant</option>
              </select>

              <button className="login-button" type="submit">
                Login
              </button>

              <div className="login-forgot-wrap">
                <Link to="/forgot-password" className="login-forgot">
                  Forgot Password?
                </Link>
              </div>
            </form>
          </div>
        </div>

        <div className="login-card-right" aria-hidden="true">
          <img className="login-image" src={loginImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;