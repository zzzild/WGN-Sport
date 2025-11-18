import mongoose from "mongoose";
import { nanoid } from "nanoid";

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    default: () => nanoid(10),
    unique: true,
    required: true,
  },
  userId: { type: String, required: true },
  lapanganId: { type: String, required: true },
  slotDate: { type: String, required: true, maxlength: 20 },
  slotTime: { type: String, required: true, maxlength: 20 },
  userData: { type: Object, required: true },
  lapanganData: { type: Object, required: true },
  amount: { type: Object, required: true },
  date: { type: Number, required: true, maxlength: 20 },
  cancelled: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
});

const bookingModel =
  mongoose.models.booking || mongoose.model("booking", bookingSchema);

export default bookingModel;
