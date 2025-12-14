import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import teacherData from "../data/TeacherData";


const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "student",
  });
  
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /* --------------------------
       STUDENT LOGIN
       -------------------------- */
  if (data.role === "student") {
      const students = JSON.parse(localStorage.getItem("students")) || [];
      const student = students.find(
        (s) =>
          s.id === data.email ||
          (s.email === data.email && s.password === data.password)
      );

      if (student && student.password === data.password) {
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

    /* --------------------------
       TEACHER LOGIN (FIXED)
    -------------------------- */

    // Ensure teachers is ALWAYS an array
    /* --------------------------
   TEACHER LOGIN (CORRECT)
-------------------------- */
if (data.role === "teacher") {
  console.log("Teacher data:", teacherData);

  // ✅ Authenticate from teacherData (SOURCE OF TRUTH)
  const teacher = teacherData.find(
    (t) =>
      t.profile.email === data.email &&
      t.profile.password === data.password
  );

  console.log("Matched teacher:", teacher);

  if (teacher) {
    // ✅ Save current user
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        role: "teacher",
        id: teacher.profile.teacherId,
        name: teacher.profile.name,
        email: teacher.profile.email,
      })
    );

    // ✅ Save teachers in format expected by TeacherDashboard
    localStorage.setItem(
      "teachers",
      JSON.stringify([
        {
          id: teacher.profile.teacherId,
          name: teacher.profile.name,
          dept: teacher.profile.department,
          courses: teacher.profile.coursesTeaching.join(","),
        },
      ])
    );

    navigate("/teacher");
    return;
  }

  alert("Invalid teacher credentials");
  return;
}


    /* --------------------------
       ADVISOR LOGIN
    -------------------------- */
    if (data.role === "advisor") {
      alert("Advisor module not created. Redirecting to teacher dashboard.");
      navigate("/teacher");
      return;
    }

    alert("Invalid teacher credentials");
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-4">
      <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8 bg-white">
        <div className="text-red-900 text-center mb-6 text-4xl font-semibold">
          Login
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block text-red-800 text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleOnChange}
            required
            className="w-full border px-4 py-2 rounded mb-3"
          />

          <label className="block text-red-800 text-sm">Password</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleOnChange}
            required
            className="w-full border px-4 py-2 rounded mb-3"
          />

          <label className="block text-red-800 text-sm">Login as</label>
          <select
            name="role"
            value={data.role}
            onChange={handleOnChange}
            className="w-full border px-4 py-2 rounded mb-4"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="advisor">Advisor</option>
          </select>

          <button className="w-full bg-red-900 text-white py-2 rounded">
            Login
          </button>

          <div className="text-center mt-3">
            <Link to="/forgot-password" className="text-red-900 text-sm">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;