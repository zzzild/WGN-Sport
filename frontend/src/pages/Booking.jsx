import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Booking = () => {
  const { lapanganId } = useParams();
  const navigate = useNavigate();

  const { lapanganInfo, fetchLapanganInfo, lapanganSlots, slotIndex, slotTime, setSlotIndex, setSlotTime, generateSlots, toggleSlotTime, makeBooking} =
    useContext(AppContext);

  const daysOfWeek = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);

  // Ambil data lapangan
  useEffect(() => {
    fetchLapanganInfo(lapanganId);
  }, [lapanganId]);

  useEffect(() => {
     generateSlots();
  }, [lapanganInfo]);

  if (!lapanganInfo) return <p>Loading...</p>;

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto px-4 mt-16 sm:px-6 lg:px-8 gap-4 py-12 text-gray-800">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* GAMBAR */}
        <div>
          <img
            className="w-full sm:max-w-72 rounded-lg shadow-md"
            src={lapanganInfo.image}
            alt={lapanganInfo.name}
          />
        </div>

        {/* DETAIL */}
        <div className="flex-1 p-8 bg-white rounded-2xl shadow-md border border-gray-200 mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <h2 className="text-2xl font-bold text-gray-900">
            {lapanganInfo.name}
          </h2>

          <p className="mt-2 text-gray-600">
            Harga mulai dari{" "}
            <span className="text-teal-600 font-semibold">
              {formatRupiah(lapanganInfo.price)}
            </span>{" "}
            / jam.
          </p>

          <div className="w-24 h-1 bg-teal-500 rounded-full mt-3"></div>

          <p className="mt-4 text-gray-700">
            Luas lapangan:{" "}
            <span className="font-bold">
              {lapanganInfo.size?.width || "13"}m ×{" "}
              {lapanganInfo.size?.height || "6"}m
            </span>
          </p>

          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-purple-500 text-lg">✔</span>
              <p>Penerangan terang</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-purple-500 text-lg">✔</span>
              <p>Lantai anti-slip</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-purple-500 text-lg">✔</span>
              <p>Kondisi bersih</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="font-semibold text-gray-800 mb-1">Tentang Lapangan</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {lapanganInfo.description || "Belum ada deskripsi."}
            </p>
          </div>
        </div>
      </div>

      {/* PILIH TANGGAL */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Pilih Tanggal</p>

        <div className="flex gap-3 items-center overflow-x-scroll mt-4">
          {lapanganSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSlotIndex(index);
                setSlotTime([]); // Reset pilihan jam saat pindah hari
              }}
              className={`text-center py-6 min-w-20 rounded-2xl cursor-pointer ${
                slotIndex === index
                  ? "bg-teal-600 text-white"
                  : "border border-gray-300"
              }`}
            >
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* PILIH JAM */}
        <div className="flex gap-3 overflow-x-scroll mt-4">
          {lapanganSlots[slotIndex]?.length === 0 ? (
            <p className="text-sm text-red-500">
              Tidak ada slot tersedia untuk hari ini.
            </p>
          ) : (
            lapanganSlots[slotIndex]?.map((item, index) => (
              <p
                key={index}
                onClick={() => toggleSlotTime(item.time)}
                className={`px-5 py-2 rounded-full cursor-pointer ${
                  slotTime.includes(item.time)
                    ? "bg-teal-500 text-white"
                    : "border border-gray-400"
                }`}
              >
                {item.time}
              </p>
            ))
          )}
        </div>

        {/* BUTTON */}
        <button
          onClick={() => makeBooking(lapanganId, navigate)}
          className="bg-teal-600 text-white text-sm px-14 py-3 rounded-full my-6 cursor-pointer"
        >
          Booking Sekarang
        </button>
      </div>
    </div>
  );
};

export default Booking;
