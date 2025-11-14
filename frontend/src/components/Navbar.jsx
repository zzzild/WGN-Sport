import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/assets"; // ← pastikan logo ada di sini

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = true;
  const [showMenu, setShowMenu] = useState(false)

  const shouldHaveBg = () => {
  // exact match
  const exactMatch = [
    "/login",
    "/my-profile",
    "/my-booking"
  ];

  if (exactMatch.includes(location.pathname)) return true;


  return false;
};



  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full transition-all duration-300 ${
      isActive
        ? "bg-teal-500/20 text-teal-400 font-semibold"
        : "text-white hover:text-slate-300"
    }`;

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {


    const handleScroll = () => {
      setIsFixed(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`left-0 top-0 z-10 flex w-full items-center
    ${
      shouldHaveBg()
        ? "fixed bg-[#0d1b1e]/90 backdrop-blur-md shadow-inner"
        : isFixed
        ? "fixed bg-[#0d1b1e]/90 backdrop-blur-md shadow-inner"
        : "absolute"
    }
  `}
    >
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 w-full mx-auto">
        <div className="relative flex h-20 items-center justify-between">
          {/* === LOGO === */}
          <div className="flex items-center gap-3">
            <NavLink to="/" className="block">
              <img
                src={assets.logoNoBg} // ← ganti sesuai lokasi logo kamu
                alt="Logo"
                className="w-20 sm:w-24 object-contain"
                draggable={false}
              />
            </NavLink>
          </div>

          {/* === MENU === */}
          <nav className="hidden md:block" aria-label="Global">
            <ul className="flex items-center gap-10 text-sm font-medium">
              <li>
                <NavLink to="/" className={navLinkClass}>
                  Beranda
                </NavLink>
              </li>
              <li>
                <NavLink to="/lapangan" className={navLinkClass}>
                  Lapangan
                </NavLink>
              </li>
              <li>
                <NavLink to="/tentang" className={navLinkClass}>
                  Tentang
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* === BUTTON MASUK === */}
          <div className="flex items-center gap-4">
            {token ? (
              <div className="flex items-center gap-2 cursor-pointer group relative">
                <img
                  className="w-8 h-8 rounded-full"
                  src={assets.profile_pic}
                  alt=""
                />
                <img className="w-2.5" src={assets.dropdown_icon} alt="" />
                <div className="absolute w-56 top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                  <div className=" bg-white shadow-lg divide-y divide-gray-100 rounded flex flex-col gap-4 p-2">
                    <p
                      onClick={() => navigate("my-profile")}
                      className=" cursor-pointer text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg px-4 py-2"
                    >
                      Profile Saya
                    </p>
                    <p
                      onClick={() => navigate("my-booking")}
                      className="cursor-pointer text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg px-4 py-2"
                    >
                      Jadwal Saya
                    </p>
                    <p
                      // onClick={logout}
                      className="cursor-pointer text-red-700 hover:bg-red-50 rounded-lg px-4 py-2"
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
                className="rounded-sm bg-white p-2 text-gray-700 transition hover:bg-white/80"
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
      {/* === MOBILE NAV MENU FULLSCREEN === */}
<div
  className={`fixed inset-0 z-[9998] md:hidden bg-[#0d1b1e] bg-opacity-95 backdrop-blur-md transform transition-all duration-300 ${
    showMenu ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"
  }`}
>
  <div className="flex items-center justify-between px-5 py-6 border-b border-white/10">
    <img className="w-32" src={assets.logoNoBg} alt="Logo" />
    <button onClick={() => setShowMenu(false)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  <ul className="flex flex-col items-center gap-4 mt-10 text-white font-medium text-lg">
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
            `block px-6 py-3 rounded-full transition-all duration-300 ${
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

    {/* Tombol Masuk (kalau belum login) */}
    {!token && (
      <button
        onClick={() => {
          setShowMenu(false);
          navigate("/login");
        }}
        className="mt-8 w-[80%] py-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition"
      >
        Masuk
      </button>
    )}
  </ul>
</div>

    </header>
  );
};

export default Navbar;
