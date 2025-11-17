import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const MyBooking = () => {
  const [booking, setBooking] = useState([]);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const navigate = useNavigate();

  const slotDateFormT = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-16 bg-white text-gray-700">
    <p className="pb-3 mt-12 font-medium text-zinc-700 border-b text-lg">
      Jadwal saya
    </p>

    <div>
      {booking.length === 1 ? (
        <p className="text-center text-zinc-500 py-6">
          Belum membooking lapangan
        </p>
      ) : (
        <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 mt-4 flex flex-col sm:flex-row gap-4 border border-zinc-200 hover:shadow-lg transition-shadow duration-300">
          
          {/* IMAGE */}
          <div className="sm:w-40 w-full flex justify-center sm:block">
            <img
              className="w-32 sm:w-40 rounded-lg bg-indigo-50 object-cover"
              src={assets.lapangan1_img}
              alt="Lapangan"
            />
          </div>

          {/* TEXT SECTION */}
          <div className="flex-1 text-sm text-zinc-600 flex flex-col justify-between">
            <div>
              <p className="text-neutral-900 text-xl font-semibold">
                Lapangan 1
              </p>
              <p className="text-teal-600 font-semibold text-[15px] mt-1">
                Rp 50.000 / jam
              </p>

              <p className="mt-2 text-[15px]">
                {slotDateFormT("2025_02_10")} | <span className="font-medium">14:00</span>
              </p>
            </div>
          </div>

          {/* BUTTON SECTION */}
          <div className="flex flex-col gap-2 justify-end sm:items-end">
            <button className="text-sm bg-teal-500 text-white text-center w-full sm:w-48 py-2 rounded-lg hover:bg-teal-600 transition-all duration-300 shadow-sm">
              Lakukan Pembayaran
            </button>

            <button className="text-sm w-full sm:w-48 py-2 rounded-lg border border-red-400 text-red-500 hover:bg-red-50 transition-all duration-300">
              Batalkan
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default MyBooking;
