import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/trustmark.png";

const Navbar = () => {
  const navigate = useNavigate();

  let currentUser = null;
  try {
    const raw = localStorage.getItem("currentUser");
    currentUser = raw ? JSON.parse(raw) : null;
  } catch (err) {
    currentUser = null;
  }

  const isLoggedIn = Boolean(currentUser);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="w-full bg-white h-18 shadow-md flex items-center justify-between px-4">
      {/* Logo */}
      <img
        src={logo}
        alt="TrustMark Logo"
        className="w-40 h-27 object-contain cursor-pointer "
      />

      {/* Auth actions */}
      <div className="flex items-center gap-2">
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded border border-blue-900 text-blue-900"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded bg-blue-900 text-white"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-blue-900 text-white"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
