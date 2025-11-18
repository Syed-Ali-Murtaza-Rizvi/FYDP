import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import students from "../data/StudentData";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "student", // default role
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple demo login: check the demo `students` data for a matching email/password
    if (data.role === "student") {
      const student = students.find(
        (s) => s.email.toLowerCase() === data.email.toLowerCase() && s.password === data.password
      );

      if (student) {
        // store minimal info about logged-in user
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ role: "student", studentId: student.profile.studentId, email: student.email })
        );
        navigate("/student");
        return;
      }

      alert("Invalid student credentials");
      return;
    }

    // For non-student roles, just navigate to their dashboard (demo only)
    if (data.role === "teacher") {
      navigate("/teacher");
      return;
    }

    if (data.role === "advisor") {
      // No demo advisor route; fallback to teacher
      navigate("/teacher");
      return;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-4">
      <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <div className="text-red-900 text-center mb-6 text-4xl">
          <p className="font-semibold">Login</p>
          <div className="w-50 mx-auto mt-8 mb-5 border-b-2 border-gray-300"></div>
        </div>
        <form onSubmit={handleSubmit}>

          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              <strong>Email</strong>
            </label>
            <input
              className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-red-900 focus:border-red-900"
              type="email"
              value={data.email}
              placeholder="Enter Email"
              name="email"
              required
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label className="text-gray-800 text-sm mb-2 block pt-3">
              <strong>Password</strong>
            </label>

            <input
              className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-red-900 focus:border-red-900"
              type="password"
              value={data.password}
              placeholder="Enter Password"
              name="password"
              required
              onChange={handleOnChange}
            />
          </div>



          <div className="mb-2 mt-3">
            <label className="text-gray-800 text-sm mb-2 block">
              <strong>Login as</strong>
            </label>
            <select
              name="role"
              value={data.role}
              onChange={handleOnChange}
              className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md  outline-red-900"
            >
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
              <option value="advisor">Advisor</option>
            </select>
          </div>

          {/* Login Button */}
          <div className="!mt-5">
            <button className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-red-900 hover:bg-red-800 focus:outline-none">
              Login
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-center mt-3">
            <Link
              to="/forgot-password"
              className="text-red-900 hover:text-red-800 text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;
