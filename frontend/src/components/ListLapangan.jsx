import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";

const ListLapangan = () => {
  const navigate = useNavigate();
  const { lapangan } = useContext(AppContext);

  useEffect(() => {}, [lapangan]);

  return (
    <div className="w-full">
      {/* HERO SECTION (ada background image) */}
      <div
        className="relative w-full h-[50vh] bg-cover bg-center rounded-b-[2vw] flex items-center justify-center text-center px-6"
        style={{ backgroundImage: `url(${assets.header_img})` }}
      >
        {/* Overlay gelap */}
        <div className="absolute inset-0 bg-black/50 rounded-b-[2vw]" />

        {/* Text di atas background */}
        <div className="relative  text-white max-w-[800px]">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-wide">
            <span className="text-teal-400">Lapangan</span> — WGN Sport
          </h1>
          <p className="text-sm md:text-base text-gray-200 mt-2">
            Temukan berbagai pilihan lapangan terbaik kami.
          </p>
        </div>
      </div>

      {/* SECTION LIST LAPANGAN (background putih biasa) */}
      <div
        className="flex flex-col max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 gap-4 py-16 text-gray-800 bg-white"
        id="speciallity"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h1 className="text-4xl font-semibold">Pilihan Lapangan untuk Anda</h1>
        <p className="sm:w-1/2 text-sm text-gray-600">
          Pilih lapangan yang sesuai dengan kebutuhanmu dan rasakan pengalaman
          bermain yang nyaman di WGN Sport.
        </p>

        {/* GRID LAPANGAN */}
        <div className="grid grid-cols-1 gap-6 pt-5 w-full">
          {lapangan.map((item, index) => (
            <article
              key={index}
              
              className="flex bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* BADGE VERTICAL */}
              <div className="rotate-180 p-3 [writing-mode:vertical-lr]">
                <div
                  className={`flex items-center justify-between gap-4 text-[10px] font-bold uppercase
            ${item.available ? "text-teal-600" : "text-red-600"}
          `}
                >
                  <span>{item.available ? "AVAILABLE" : "BOOKED"}</span>
                  <span className="w-px flex-1 bg-gray-300"></span>
                  <span className="opacity-60">WGN</span>
                </div>
              </div>

              {/* IMAGE */}
              <div className="hidden sm:block sm:basis-56">
                <img
                  alt={item.name}
                  src={item.image}
                  className="aspect-square h-full w-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col justify-between">
                <div className="border-s border-gray-200 p-4 sm:border-l-transparent sm:p-6">
                  {/* NAMA */}
                  <h3 className="font-bold text-lg text-gray-900">
                    {item.name}
                  </h3>

                  {/* HARGA */}
                  <p className="mt-1 text-sm text-gray-600">
                    Harga mulai dari{" "}
                    <span className="font-semibold text-teal-600">
                      Rp {item.price.toLocaleString()}
                    </span>{" "}
                    / jam.
                  </p>

                  {/* MINI DIVIDER */}
                  <div className="mt-4 w-14 h-[3px] bg-teal-500 rounded-full"></div>

                  {/* LUAS LAPANGAN */}
                  <p className="mt-3 text-sm text-gray-700">
                    Luas lapangan:{" "}
                    <span className="font-medium text-gray-900">
                      {item.size || "13m × 6m"}
                    </span>
                  </p>

                  {/* HIGHLIGHT */}
                  <ul className="mt-3 text-sm text-gray-600 flex flex-wrap gap-4">
                    <li className="flex items-center gap-1">
                      ✔ <span>Penerangan terang</span>
                    </li>
                    <li className="flex items-center gap-1">
                      ✔ <span>Lantai anti-slip</span>
                    </li>
                    <li className="flex items-center gap-1">
                      ✔ <span>Kondisi bersih</span>
                    </li>
                  </ul>
                </div>

                {/* CTA BUTTON */}
                <div className="sm:flex sm:items-end sm:justify-end">
                  <button
                    className="block bg-teal-500 px-6 py-3 text-center text-xs font-bold text-white uppercase 
                       transition hover:bg-teal-600 cursor-pointer" onClick={() => navigate(`/booking/${item.lapanganId}`)}
                  >
                    Booking Sekarang
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListLapangan;
