import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import PaymentModal from "../components/PaymentModal";

const EXPIRE_MS = 2 * 60 * 60 * 1000; // 2 jam

const MyBooking = () => {
  const { booking, getUserBooking, cancelBooking } = useContext(AppContext);
  const [, forceUpdate] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

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

  useEffect(() => {
    getUserBooking();

    // refresh countdown tiap 1 menit
    const interval = setInterval(() => {
      forceUpdate((v) => v + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const slotDateFormT = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const formatRupiah = (angka) => "Rp " + angka.toLocaleString("id-ID");

  const getRemainingTime = (bookingDate) => {
    const expireAt = bookingDate + EXPIRE_MS;
    const diff = expireAt - Date.now();

    if (diff <= 0) return null;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `${hours}j ${minutes}m`;
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 py-16 pt-20 mt-16 bg-white text-gray-700">
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b text-lg">
        Jadwal saya
      </p>

      {booking.length === 0 ? (
        <p className="text-center text-zinc-500 py-6">
          Belum membooking lapangan
        </p>
      ) : (
        booking.slice(0, 5).map((item, index) => {
          const remaining = !item.payment ? getRemainingTime(item.date) : null;

          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-4 mt-4 flex flex-col sm:flex-row gap-4 border border-zinc-200"
            >
              {/* IMAGE */}
              <div className="sm:w-40 w-full flex justify-center">
                <img
                  className="w-32 sm:w-40 rounded-lg object-cover"
                  src={item.lapanganData.image}
                  alt="Lapangan"
                />
              </div>

              {/* INFO */}
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-900 text-xl font-semibold">
                  {item.lapanganData.name}
                </p>

                {/* STATUS */}
                <span
                  className={`inline-block mt-1 px-2 py-[2px] text-xs rounded-full ${
                    item.payment
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.payment ? "Selesai" : "Menunggu Pembayaran"}
                </span>

                {/* ANNOUNCEMENT EXPIRED */}
                {!item.payment && (
                  <div className="mt-2 text-xs">
                    {remaining ? (
                      <p className="text-red-600 font-medium">
                        ⏳ Batas pembayaran: {remaining} lagi
                      </p>
                    ) : (
                      <p className="text-gray-400 italic">
                        Booking kedaluwarsa
                      </p>
                    )}
                  </div>
                )}

                <p className="mt-2">
                  {slotDateFormT(item.slotDate)} |{" "}
                  <span className="font-medium">
                    {item.slotTime.join(", ")}
                  </span>
                </p>

                <p className="text-xs text-zinc-500">
                  Durasi: {item.slotTime.length} jam
                </p>

                <p className="text-teal-600 font-semibold mt-2">
                  {formatRupiah(item.amount)}
                </p>
              </div>

              {/* BUTTON */}
              <div className="flex flex-col gap-2 justify-end sm:items-end">
                {/* BELUM UPLOAD BUKTI */}
                {!item.payment && !item.paymentProof && remaining && (
                  <button
                    onClick={() => {
                      setSelectedBooking(item);
                      setShowModal(true);
                    }}
                    className="text-sm bg-teal-500 text-white w-full sm:w-48 py-2 rounded-lg hover:bg-teal-600"
                  >
                    Lakukan Pembayaran
                  </button>
                )}

                {/* SUDAH UPLOAD BUKTI */}
                {!item.payment && item.paymentProof && (
                  <button
                    disabled
                    className="text-sm w-full sm:w-48 py-2 rounded-lg bg-blue-200 text-gray-500 cursor-not-allowed"
                  >
                    Menunggu Verifikasi
                  </button>
                )}

                {/* BATAL HANYA JIKA BELUM UPLOAD */}
                {!item.payment && !item.paymentProof && (
                  <button
                    onClick={() => cancelBooking(item.bookingId)}
                    className="text-sm w-full sm:w-48 py-2 rounded-lg border border-red-400 text-red-500 hover:bg-red-50"
                  >
                    Batalkan
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}

      <PaymentModal
        isOpen={showModal}
        booking={selectedBooking}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default MyBooking;
