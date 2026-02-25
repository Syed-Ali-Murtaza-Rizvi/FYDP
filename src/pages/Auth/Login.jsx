import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import teacherData from "../../data/TeacherData";
import adminData from "../../data/AdminData";
import "./Login.css";

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
    <div className="flex justify-center items-center min-h-[80vh] p-4">
      <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8 bg-white">
        <div className="text-[#2f5fa7] text-center mb-6 text-4xl font-semibold">
          Login
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block text-[#2f5fa7] text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleOnChange}
            required
            className="w-full border px-4 py-2 rounded mb-3"
          />

          <label className="block text-[#2f5fa7] text-sm">Password</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleOnChange}
            required
            className="w-full border px-4 py-2 rounded mb-3"
          />

          <label className="block text-[#2f5fa7] text-sm">Login as</label>
          <select
            name="role"
            value={data.role}
            onChange={handleOnChange}
            className="w-full border px-4 py-2 rounded mb-4"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="orgadmin">Organization Admin</option>
            <option value="advisor">Event Admin</option>
            <option value="participant">Participant</option>
          </select>

          <button className="w-full bg-[#3f6fb6] hover:bg-[#2f5fa7] text-white py-2 rounded">
            Login
          </button>

          <div className="text-center mt-3">
            <Link to="/forgot-password" className="text-[#2f5fa7] text-sm">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;