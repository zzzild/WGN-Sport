import bookingModel from "../models/bookingModel.js";
import lapanganModel from "../models/lapanganModel.js";

const bookingCleanup = () => {
  setInterval(async () => {
    const now = new Date();

    const expiredBookings = await bookingModel.find({
      payment: false,
      cancelled: false,
      expiredAt: { $lte: now },
    });

    for (const booking of expiredBookings) {
      booking.cancelled = true;
      await booking.save();

      // 🔥 LEPAS SLOT
      await lapanganModel.updateOne(
        { lapanganId: booking.lapanganId },
        {
          $pull: {
            [`slots_pending.${booking.slotDate}`]: {
              $in: booking.slotTime,
            },
          },
        }
      );

      console.log("⏰ Booking expired:", booking.bookingId);
    }
  }, 60 * 1000); // cek tiap 1 menit
};

export default bookingCleanup;
