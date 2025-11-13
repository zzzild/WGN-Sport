import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { assets } from "../assets/assets";

const NavbarItem = () => {
  const navigate = useNavigate();
  const token = false;
  const [showMenu, setShowMenu] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full transition-all duration-300 ${
      isActive
        ? "bg-teal-500/20 text-teal-400 font-semibold"
        : "text-white hover:text-teal-300"
    }`;

  return (
    <header className="fixed top-0 left-0 z-[9999] w-full bg-[#0d1b1e]/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* === LOGO === */}
          <div className="flex items-center gap-3">
            <NavLink to="/" className="block">
              <img
                src={assets.logoNoBg}
                alt="Logo"
                className="w-20 sm:w-24 object-contain"
                draggable={false}
              />
            </NavLink>
          </div>

          {/* === MENU DESKTOP === */}
          <nav className="hidden md:block" aria-label="Global">
            <ul className="flex items-center gap-10 text-sm font-medium">
              <li><NavLink to="/" className={navLinkClass}>Beranda</NavLink></li>
              <li><NavLink to="/lapangan" className={navLinkClass}>Lapangan</NavLink></li>
              <li><NavLink to="/tentang" className={navLinkClass}>Tentang</NavLink></li>
            </ul>
          </nav>

          {/* === BUTTON MASUK / PROFIL === */}
          <div className="flex items-center gap-4">
{token ? (
    <div className="flex items-center gap-2 cursor-pointer group relative">
      {/* Foto profil + ikon dropdown */}
      <img
        className="w-8 h-8 rounded-full border border-white/20"
        src={assets.profile_pic}
        alt="profile"
      />
      <img className="w-2.5" src={assets.dropdown_icon} alt="dropdown icon" />

      {/* === DROPDOWN MENU === */}
      <div className="absolute w-56 top-0 right-0 pt-14 text-base font-medium z-20 hidden group-hover:block animate-fadeIn">
        <div className="bg-[#0d1b1e]/95 backdrop-blur-md border border-white/10 shadow-lg rounded-xl flex flex-col gap-2 p-2">
          <p
            onClick={() => navigate("my-profile")}
            className="cursor-pointer text-gray-300 hover:text-teal-400 hover:bg-white/10 rounded-lg px-4 py-2 transition-all"
          >
            Profile Saya
          </p>
          <p
            onClick={() => navigate("my-appointments")}
            className="cursor-pointer text-gray-300 hover:text-teal-400 hover:bg-white/10 rounded-lg px-4 py-2 transition-all"
          >
            Jadwal Saya
          </p>
          <p
            className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg px-4 py-2 transition-all"
          >
            Keluar
          </p>
        </div>
      </div>
    </div>
  ) : (
    <NavLink
      to="/login"
      className="rounded-full bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-teal-700"
    >
      Masuk
    </NavLink>
  )}

            {/* === MOBILE MENU BUTTON === */}
            <div className="block md:hidden">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="rounded-sm bg-white p-2 text-gray-700 transition hover:bg-white/20"
              >
                {showMenu ? (
                  // Ikon X
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  // Ikon Menu
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* === MOBILE NAV MENU === */}
      {showMenu && (
  <div
    className={`absolute top-full left-0 w-full bg-[#0d1b1e]/90 backdrop-blur-xl border-t border-white/10 
    shadow-lg transform transition-all duration-300 ease-out 
    ${showMenu ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"} md:hidden z-[9998]`}
  >
    <ul className="flex flex-col items-center py-6 space-y-3 text-white font-medium text-base">
      {[
        { to: "/", label: "Beranda" },
        { to: "/lapangan", label: "Lapangan" },
        { to: "/tentang", label: "Tentang" },
      ].map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            onClick={() => setShowMenu(false)}
            className={({ isActive }) =>
              `block px-6 py-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-teal-500/20 text-teal-400 font-semibold shadow-md"
                  : "hover:bg-white/10 hover:text-teal-300"
              }`
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
)}


    </header>
  );
};

export default NavbarItem;
