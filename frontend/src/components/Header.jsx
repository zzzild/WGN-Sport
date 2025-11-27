import React from "react";
import { assets } from "../assets/assets";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div
      className="relative w-full h-[100vh] bg-cover bg-center flex items-center justify-center text-center px-6"
      style={{ backgroundImage: `url(${assets.header_img})` }}
    >
      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black/50 rounded-b-[2vw]" />

      {/* Text di atas background */}
      <div className="relative text-white max-w-[800px]">
        <p className="uppercase tracking-widest text-sm font-medium mb-3">
          Ayo Saatnya Turun ke Lapangan!
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Main Badminton di <span className="text-teal-600">WGN Sport</span> Jadi Makin Seru!
        </h1>
        <p className="text-base md:text-sm opacity-90">
          Pesan lapangan lebih cepat dan mudah, supaya waktu berkumpul bareng teman jadi lebih menyenangkan!
        </p>

        <button
          className="
            px-6 py-2 mt-4 rounded-full
            border border-white/60
            bg-white/10 backdrop-blur-md
            text-white font-medium
            hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.15)
            transition-all duration-300 cursor-pointer
          "
        >
          Booking Sekarang ❯❯
          
        </button>
      </div>
    </div>
  );
};

export default Header;
