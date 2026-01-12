import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const ListLapangan = () => {
  const navigate = useNavigate();
  const { lapangan, token } = useContext(AppContext);

  const handleBookingClick = (lapanganId) => {
    if (!token) {
      toast.info("Silakan login terlebih dahulu untuk melakukan booking.");
    }
    navigate(`/booking/${lapanganId}`)
  }

  useEffect(() => {}, [lapangan]);

  return (
    <div className="w-full overflow-hidden">
      {/* HERO */}
      <div
        className="relative w-full h-[50vh] bg-cover bg-center rounded-b-[2vw] flex items-center justify-center text-center px-6"
        style={{ backgroundImage: `url(${assets.header_img})` }}
        data-aos="fade-down"
        data-aos-duration="1200"
        data-aos-once="true"
      >
        <div className="absolute inset-0 bg-black/50 rounded-b-[2vw]" />

        <div className="relative text-white max-w-[800px]">
          <h1
            className="text-2xl md:text-3xl font-semibold tracking-wide"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-once="true"
          >
            <span className="text-teal-400">Lapangan</span> — WGN Sport
          </h1>

          <p
            className="text-sm md:text-base text-gray-200 mt-2"
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-once="true"
          >
            Temukan berbagai pilihan lapangan terbaik kami.
          </p>
        </div>
      </div>

      {/* LIST */}
      <div
        className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-4 py-16 bg-white" data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="true"
      >
        <h1
          className="text-4xl font-semibold"
        >
          Pilihan Lapangan untuk Anda
        </h1>

        <p
          className="sm:w-1/2 text-sm text-gray-600"
        >
          Pilih lapangan yang sesuai dengan kebutuhanmu dan rasakan pengalaman
          bermain yang nyaman di WGN Sport.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 pt-8">
          {lapangan.map((item, index) => (
            <article
              key={index}
              className="flex bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* STATUS */}
              <div className="rotate-180 p-3 [writing-mode:vertical-lr]">
                <div
                  className={`flex items-center justify-between gap-4 text-[10px] font-bold uppercase
                  ${item.available ? "text-teal-600" : "text-red-600"}`}
                >
                  <span>{item.available ? "Tersedia" : "Tidak Tersedia"}</span>
                  <span className="w-px flex-1 bg-gray-300" />
                  <span className="opacity-60">WGN</span>
                </div>
              </div>

              {/* IMAGE */}
              <div
                className="hidden sm:block sm:basis-56"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="aspect-square h-full w-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col justify-between">
                <div className="border-s border-gray-200 p-4 sm:border-l-transparent sm:p-6">
                  <h3 className="font-bold text-lg text-gray-900">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-600">
                    Harga mulai dari{" "}
                    <span className="font-semibold text-teal-600">
                      Rp {item.price.toLocaleString()}
                    </span>{" "}
                    / jam.
                  </p>

                  <div className="mt-4 w-14 h-[3px] bg-teal-500 rounded-full" />

                  <p className="mt-3 text-sm text-gray-700">
                    Luas lapangan:{" "}
                    <span className="font-medium text-gray-900">
                      {item.size || "13m × 6m"}
                    </span>
                  </p>

                  <ul className="mt-3 text-sm text-gray-600 flex flex-wrap gap-4">
                    <li>✔ Penerangan terang</li>
                    <li>✔ Lantai anti-slip</li>
                    <li>✔ Kondisi bersih</li>
                  </ul>
                </div>

                {/* CTA */}
                {item.available && (
                  <div
                    className="sm:flex sm:items-end sm:justify-end"
                  >
                    <button
                      onClick={() =>
                        handleBookingClick(item.lapanganId)}
                      className="block bg-teal-500 px-6 py-3 text-xs font-bold text-white uppercase
                      transition hover:bg-teal-600 cursor-pointer"
                    >
                      Booking Sekarang
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListLapangan;
