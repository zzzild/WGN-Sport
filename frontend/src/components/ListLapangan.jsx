import React from "react";
import { assets } from "../assets/assets";
import { useNavigate }  from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";

const ListLapangan = () => {
  const navigate = useNavigate();
  const {lapangan} = useContext(AppContext);

  useEffect(() => {

  }, [lapangan])

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-5 w-full">
          {lapangan.map((item) => (
            <div
              onClick={() => navigate(`/booking/${item.id}`)}
              key={item.index}
              href="#"
              className="block rounded-lg p-4 bg-white shadow-xs shadow-indigo-100 transition-all duration-300 hover:-translate-y-2 cursor-pointer hover:shadow-lg"
            >
              <img
                alt={item.name}
                src={item.image}
                className="h-56 w-full rounded-md object-cover"
              />

              <div className="mt-2">
                <dl>
                  <div>
                    <dt className="sr-only">Name</dt>
                    <dd className="font-medium">{item.name}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Price</dt>
                    <dd className="text-sm text-gray-500">{item.price}</dd>
                  </div>

                </dl>

                {/* Fasilitas */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs">
                  {/* Parkir */}
                  <div className="inline-flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.8"
                      stroke="currentColor"
                      className="size-4 text-teal-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 10h18M3 6h18M5 6v12m14-12v12M8 6v12m8-12v12M12 14.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
                      />
                    </svg>
                    <p className="text-gray-500">Parkir</p>
                  </div>

                  {/* Toilet */}
                  <div className="inline-flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.8"
                      stroke="currentColor"
                      className="size-4 text-teal-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM20 6a3 3 0 11-6 0 3 3 0 016 0zM8 21v-6a3 3 0 00-6 0v6M22 21v-6a3 3 0 00-6 0v6"
                      />
                    </svg>
                    <p className="text-gray-500">Toilet</p>
                  </div>

                  {/* Musholah */}
                  <div className="inline-flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.8"
                      stroke="currentColor"
                      className="size-4 text-teal-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3l6 4.5V21H6V7.5L12 3z"
                      />
                    </svg>
                    <p className="text-gray-500">Musholah</p>
                  </div>

                  {/* Kantin */}
                  <div className="inline-flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.8"
                      stroke="currentColor"
                      className="size-4 text-teal-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8h18M3 8l1.8 12.6A2 2 0 006.8 22h10.4a2 2 0 002-1.4L21 8M14 3h-4v2h4V3z"
                      />
                    </svg>
                    <p className="text-gray-500">Kantin</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListLapangan;
