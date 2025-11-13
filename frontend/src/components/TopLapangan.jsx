import React from "react";
import { useNavigate } from "react-router-dom";
import { lapangan } from "../assets/assets";

const TopLapangan = () => {
  const navigate = useNavigate();

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
        Pilih lapangan yang sesuai dengan kebutuhanmu dan rasakan pengalaman bermain yang nyaman di WGN Sport.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-5 w-full">
        {top4.map((item) => (
          <a
            key={item.id}
            href="#"
            className="block rounded-lg p-4 shadow-xs shadow-indigo-100 transition-all duration-300 hover:-translate-y-2 cursor-pointer
             hover:shadow-lg"
          >
            <img
              alt=""
              src={item.image}
              className="h-56 w-full rounded-md object-cover"
            />

            <div className="mt-2">
              <dl>
                <div>
                  <dt className="sr-only">Price</dt>
                  <dd className="text-sm text-gray-500">{item.price}</dd>
                </div>

                <div>
                  <dt className="sr-only">Address</dt>
                  <dd className="font-medium">{item.name}</dd>
                </div>
              </dl>

              <div className="mt-6 flex items-center gap-12 text-xs">
                {/* 1. Parking */}
                <div className="mt-6 flex items-center justify-between gap-4 text-xs">
                  {/* Parkir */}
                  <div className="inline-flex shrink-0 items-center gap-2">
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
                  <div className="inline-flex shrink-0 items-center gap-2">
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
                  <div className="inline-flex shrink-0 items-center gap-2">
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
                  <div className="inline-flex shrink-0 items-center gap-2">
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
                        d="M3 8h18M3 8l1.8 12.6A2 2 0 006.8 22h10.4a2 2 0 002-1.4L21 8M3 8h18M14 3h-4v2h4V3z"
                      />
                    </svg>
                    <p className="text-gray-500">Kantin</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
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
