import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Banner = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div
      className="max-w-6xl mx-auto relative rounded-2xl overflow-hidden mt-14"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      {/* Background Image */}
      <img
        src={assets.place_img}
        alt="Banner"
        className="w-full h-52 sm:h-64 md:h-72 lg:h-80 object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-teal-900/45"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center px-6 sm:px-10 lg:px-12">
        <div
          className="text-white max-w-md"
          data-aos="fade-right"
          data-aos-delay="120"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-snug">
            Booking Lapangan Jadi Lebih Mudah & Cepat
          </h2>

          <p className="text-sm sm:text-base mt-2 text-gray-200">
            Daftar sekarang dan nikmati pengalaman sewa lapangan yang praktis,
            friendly, dan tanpa ribet!
          </p>
          {token ? (
            <button
              onClick={() => {
                navigate("/lapangan");
                scrollTo(0, 0);
              }}
              className="bg-white text-gray-700 text-sm sm:text-base px-7 py-2.5 rounded-full mt-5 hover:scale-105 transition-all duration-300 shadow-md font-semibold cursor-pointer"
            >
              Booking Sekarang
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                scrollTo(0, 0);
              }}
              className="bg-white text-gray-700 text-sm sm:text-base px-7 py-2.5 rounded-full mt-5 hover:scale-105 transition-all duration-300 shadow-md font-semibold cursor-pointer"
            >
              Daftar Sekarang
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
