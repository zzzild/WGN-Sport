import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full h-[100vh] bg-cover bg-center flex items-center justify-center text-center px-6"
      style={{ backgroundImage: `url(${assets.header_img})` }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 rounded-b-[2vw]"
        data-aos="fade"
      />

      {/* Content */}
      <div className="relative text-white max-w-[800px]">
        <p
          className="uppercase tracking-widest text-sm font-medium mb-3"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          Ayo Saatnya Turun ke Lapangan!
        </p>

        <h1
          className="text-4xl md:text-6xl font-bold leading-tight mb-4"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          Main Badminton di{" "}
          <span className="text-teal-500">WGN Sport</span> Jadi Makin Seru!
        </h1>

        <p
          className="text-base md:text-sm opacity-90"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          Pesan lapangan lebih cepat dan mudah, supaya waktu berkumpul bareng
          teman jadi lebih menyenangkan!
        </p>

        <button
          data-aos="fade-up"
          data-aos-delay="800"
          className="
            px-6 py-2 mt-6 rounded-full
            border border-white/60
            bg-white/10 backdrop-blur-md
            text-white font-medium
            hover:scale-[1.05] active:scale-[0.95]
            transition-all duration-300
            shadow-[0_0_15px_rgba(255,255,255,0.2)]
            cursor-pointer
          "
          onClick={() => {
            navigate("/lapangan");
            window.scrollTo(0, 0);
          }}
        >
          Booking Sekarang ❯❯
        </button>
      </div>
    </div>
  );
};

export default Header;
