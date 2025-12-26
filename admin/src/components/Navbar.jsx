import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router";

const Navbar = () => {
  const { aToken, setAtoken } = useContext(AdminContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("aToken");
    setAtoken(false); 
    navigate("/login");
  };

  return (
    <div className="flex border-none shadow justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img className="w-36 sm:w-40 cursor-pointer" src={assets.logo} alt="" />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          Admin
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-teal-500 text-white text-sm px-10 py-2 rounded-full"
      >
        Keluar
      </button>
    </div>
  );
};

export default Navbar;
