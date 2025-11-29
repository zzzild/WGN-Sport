import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopLapangan = () => {
  const navigate = useNavigate();
  const { lapangan } = useContext(AppContext);

  const top4 = lapangan.slice(0, 3);

  return (
    <div
      className="flex flex-col max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 gap-4 py-12 text-gray-800"
      id="speciallity"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <h1 className="text-5xl font-medium">Pilihan Lapangan untuk Anda</h1>
      <p className="sm:w-1/2 text-sm">
        Pilih lapangan yang sesuai dengan kebutuhanmu dan rasakan pengalaman
        bermain yang nyaman di WGN Sport.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-5 w-full">
        {top4.map((item, index) => (
          <article
            key={index}
            onClick={() => (navigate(`/booking/${item.lapanganId}`), window.scrollTo(0, 0))}
            className="overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
          >
            {/* IMAGE */}
            <img
              alt={item.name}
              src={item.image}
              className="h-56 w-full object-cover"
            />

            <div className="p-4 sm:p-5">
              {/* NAME */}
              <h3 className="text-lg font-semibold text-gray-900">
                {item.name}
              </h3>

              <div className="w-10 h-[3px] bg-teal-400 rounded-full mt-2 mb-3"></div>

              <p className="text-sm text-gray-500 line-clamp-2">
                Lapangan nyaman dengan fasilitas lengkap untuk bermain badminton
                kapan saja.
              </p>

              <p className="text-sm font-semibold text-gray-500 mt-4">
                <span className="text-teal-600">
                  Rp {item.price.toLocaleString()}
                </span>{" "}
                /Jam
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => {
            navigate("/lapangan");
            scrollTo(0, 0);
          }}
          data-aos="fade-up"
          data-aos-delay="1000"
          className="bg-teal-500/20 text-teal-400 font-semibold px-8 py-2 rounded-full hover:scale-105 transition-all duration-300 text-sm cursor-pointer"
        >
          Selengkapnya
        </button>
      </div>
    </div>
  );
};

export default TopLapangan;
