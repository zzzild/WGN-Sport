import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";

const AllBooking = () => {
  const {
    aToken,
    booking,
    getAllBooking,
    slotDateFormT,
    cancelBooking,
    completeBooking,
  } = useContext(AdminContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    if (aToken) getAllBooking();
  }, [aToken]);

  const openModalImg = (img) => {
    setModalImg(img);
    setModalOpen(true);
  };

  const closeModalImg = () => {
    setModalOpen(false);
    setModalImg(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-5">Semua Jadwal</h2>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* HEADER */}
        <div
          className="sticky top-0 hidden sm:grid
          grid-cols-[40px_2fr_1.2fr_1.2fr_3fr_1fr_1fr_1fr]
          px-6 py-4 text-gray-500 text-sm font-medium bg-white z-10"
        >
          <p>#</p>
          <p>Client</p>
          <p>Pembayaran</p>
          <p>Lapangan</p>
          <p>Tanggal & Waktu</p>
          <p>Biaya</p>
          <p>Bukti</p>
          <p className="text-center">Tindakan</p>
        </div>

        {/* DATA */}
        <div className="max-h-[70vh] overflow-y-auto">
          {booking
            .slice()
            .reverse()
            .map((item, index) => (
              <React.Fragment key={item.bookingId}>
                <div
                  className="hidden sm:grid
                  grid-cols-[40px_2fr_1.2fr_1.2fr_3fr_1fr_1fr_1fr]
                  px-6 py-4 items-center text-sm
                  hover:bg-gray-50/70 transition"
                >
                  {/* NO */}
                  <p className="text-gray-400">{index + 1}</p>

                  {/* CLIENT */}
                  <div className="flex items-center gap-3">
                    <img
                      src={item.userData.image}
                      alt=""
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <p className="font-medium text-gray-800">
                      {item.userData.name}
                    </p>
                  </div>

                  {/* PAYMENT */}
                  <span
                    className={`w-fit px-3 py-1 text-xs rounded-full font-medium
                    ${
                      item.payment
                        ? "bg-blue-50 text-blue-600"
                        : "bg-yellow-50 text-yellow-600"
                    }`}
                  >
                    {item.payment ? "Success" : "Pending"}
                  </span>

                  {/* LAPANGAN */}
                  <p className="text-gray-700">{item.lapanganData.name}</p>

                  {/* DATE */}
                  <p className="text-gray-600">
                    {slotDateFormT(item.slotDate)},{" "}
                    {Array.isArray(item.slotTime)
                      ? item.slotTime.join(" , ")
                      : item.slotTime}
                  </p>

                  {/* AMOUNT */}
                  <p className="font-medium text-gray-800">
                    Rp {item.amount.toLocaleString("id-ID")}
                  </p>

                  {/* PROOF */}
                  <div>
                    {item.paymentProof ? (
                      <img
                        src={item.paymentProof}
                        alt="Bukti Pembayaran"
                        onClick={() => openModalImg(item.paymentProof)}
                        className="w-14 h-14 rounded-xl object-cover cursor-pointer
                        hover:scale-105 transition shadow-sm"
                      />
                    ) : (
                      <span className="text-xs text-gray-400 italic">
                        Tidak ada
                      </span>
                    )}
                  </div>

                  {/* ACTION */}
                  <div className="flex justify-center gap-3">
                    {item.cancelled ? (
                      <span className="text-xs text-red-500 font-medium">
                        Dibatalkan
                      </span>
                    ) : item.isCompleted ? (
                      <span className="text-xs text-green-600 font-medium">
                        Selesai
                      </span>
                    ) : (
                      <>
                        <img
                          onClick={() => cancelBooking(item.bookingId)}
                          src={assets.cancel_icon}
                          alt=""
                          className="w-7 opacity-70 hover:opacity-100 hover:scale-110 transition cursor-pointer"
                        />
                        <img
                          onClick={() => completeBooking(item.bookingId)}
                          src={assets.tick_icon}
                          alt=""
                          className="w-7 opacity-70 hover:opacity-100 hover:scale-110 transition cursor-pointer"
                        />
                      </>
                    )}
                  </div>
                </div>

                <div className="h-px bg-gray-100 mx-6" />
              </React.Fragment>
            ))}
        </div>
      </div>

      {/* ===== MODAL IMAGE ===== */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
          onClick={closeModalImg}
          role="dialog"
          aria-modal="true"
        >
          <img
            src={modalImg}
            alt="Foto Bukti Besar"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default AllBooking;
