import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const PaymentModal = ({ isOpen, onClose, booking }) => {
  const { submitPayment, getUserBooking } = useContext(AppContext);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen || !booking) return null;

  const handleSubmit = async () => {
    if (!file) return toast.error("Upload bukti pembayaran terlebih dahulu");

    setLoading(true);
    const success = await submitPayment(booking.bookingId, file);
    setLoading(false);

    if (success) {
      toast.success("Bukti pembayaran berhasil dikirim");
      await getUserBooking();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white w-full max-w-md rounded-xl overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <span className="font-semibold text-zinc-700">WGN SPORT</span>
          <button
            onClick={onClose}
            className="text-xl text-zinc-400 hover:text-zinc-600"
          >
            ✕
          </button>
        </div>

        {/* TOTAL */}
        <div className="bg-zinc-100 px-4 py-3">
          <p className="text-sm text-zinc-500">Total Pembayaran</p>
          <p className="text-lg font-semibold text-zinc-800">
            Rp {booking.amount.toLocaleString("id-ID")}
          </p>
        </div>

        {/* CONTENT */}
        <div className="px-4 py-4 space-y-4 text-sm">

          {/* REKENING */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-1">Transfer ke rekening:</p>
            <p>🏦 <b>BCA</b></p>
            <p className="font-semibold tracking-wide">
              1234 5678 9012
            </p>
            <p className="text-xs text-zinc-500">
              a.n <b>WGN SPORT</b>
            </p>
          </div>

          {/* UPLOAD */}
          <div>
            <p className="font-medium mb-1">Upload Bukti Pembayaran</p>

            {!file ? (
              <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-zinc-50">
                <span className="text-zinc-500 text-sm">
                  Klik untuk upload bukti pembayaran
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            ) : (
              <div className="flex items-center justify-between border rounded-lg p-3">
                <span className="text-xs text-zinc-600 truncate">
                  {file.name}
                </span>
                <button
                  onClick={() => setFile(null)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Ganti
                </button>
              </div>
            )}
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition disabled:opacity-60"
          >
            {loading ? "Mengirim..." : "Kirim Bukti Pembayaran"}
          </button>

          <p className="text-xs text-center text-zinc-400">
            Bukti pembayaran akan diverifikasi oleh admin
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
