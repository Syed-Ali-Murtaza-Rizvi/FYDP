import React from "react";
import logo from "../assets/trustmark.png";


const Navbar = () => {
  return (
    <nav className="w-full bg-white h-20 shadow-md flex items-center">
      
      {/* Logo */}
      <img 
        src={logo} 
        alt="TrustMark Logo" 
        className="h-40 w-auto object-contain ml-4"
      />

    </nav>
  );
};

export default Navbar;
