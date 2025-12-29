import validator from "validator";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import lapanganModel from "../models/lapanganModel.js";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import bookingModel from "../models/bookingModel.js";

// Login admin
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // cek apakah email ada
    const admin = await userModel.findOne({ email });

    if (!admin) {
      return res.json({ success: false, message: "Admin not found" });
    }

    // cek apakah dia admin
    if (admin.role !== "admin") {
      return res.json({ success: false, message: "Access denied" });
    }

    // cek password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET
    );

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, secretKey } = req.body;

    // secret key khusus admin
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.json({ success: false, message: "Unauthorized access" });
    }

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing fields" });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new userModel({
      email,
      name,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();

    res.json({ success: true, message: "Admin registered successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const addLapangan = async (req, res) => {
  try {
    const { name, price } = req.body;
    const imageFile = req.file;

    // checking
    if (!name || !price) {
      return res.json({ success: false, message: "Missing detail" });
    }

    // upload image
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const lapanganData = {
      name,
      price,
      image: imageUrl,
    };

    const newLapangan = new lapanganModel(lapanganData);
    await newLapangan.save();

    return res.json({ success: true, message: "lapangan added" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const allLapangan = async (req, res) => {
  try {
    const lapangan = await lapanganModel.find({}).select("-password");
    res.json({ success: true, lapangan });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const getLapanganById = async (req, res) => {
  try {
    const { lapanganId } = req.params;

    const lapangan = await lapanganModel.findOne({ lapanganId });

    if (!lapangan) {
      return res.json({
        success: false,
        message: "Lapangan tidak ditemukan",
      });
    }

    res.json({
      success: true,
      lapangan,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const adminDashboard = async (req, res) => {
  try {
    const lapangan = await lapanganModel.find({});
    const user = await userModel.find({});
    const booking = await bookingModel.find({});
    

    let earning = 0

    booking.map((item) => {
      if (item.isCompleted || item.payment) {
        earning += item.amount
      }
    })

    const dashData = {
      earning,
      lapangan: lapangan.length,
      booking: booking.length,
      client: user.length,
      latestBooking: booking.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: error.message });
  }
};

const bookingAdmin = async (req, res) => {
  try {
    const booking = await bookingModel.find({});
    res.json({ success: true, booking });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const bookingComplete = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const bookingData = await bookingModel.findOne({ bookingId });
    if (!bookingData) {
      return res.json({ success: false, message: "Booking Not Found" });
    }

    // optional validation
    if (bookingData.paymentStatus !== "waiting") {
      return res.json({
        success: false,
        message: "Booking belum dalam status menunggu verifikasi",
      });
    }

    await bookingModel.findOneAndUpdate(
      { bookingId },
      {
        paymentStatus: "approved",
        payment: true,
        isCompleted: true,
      }
    );

    return res.json({
      success: true,
      message: "Pembayaran disetujui & booking dikonfirmasi",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};




const bookingCancel = async (req, res) => {
    try {
    const { bookingId } = req.body;

    const bookingData = await bookingModel.findOne({ bookingId });
    if (!bookingData) {
      return res.json({ success: false, message: "Booking tidak ditemukan" });
    }

    await bookingModel.findOneAndUpdate(
      { bookingId },
      {
        paymentStatus: "rejected",
        paymentProof: null, // biar user upload ulang
      }
    );

    res.json({
      success: true,
      message: "Pembayaran ditolak, user dapat upload ulang bukti",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
  // try {
  //   const { bookingId } = req.body;

  //   const bookingData = await bookingModel.findOne({ bookingId });

  //   if (!bookingData) {
  //     return res.json({ success: false, message: "Booking tidak ditemukan" });
  //   }

  //   await bookingModel.findOneAndUpdate(
  //     { bookingId },
  //     { cancelled: true }
  //   );

  //   const { lapanganId, slotDate, slotTime } = bookingData;

  //   const lapanganData = await lapanganModel.findOne({ lapanganId });

  //   let slots_booked = lapanganData.slots_booked;

  //   slots_booked[slotDate] = slots_booked[slotDate].filter(
  //     (time) => !slotTime.includes(time)
  //   );

  //   // bersihin tanggal kosong
  //   if (slots_booked[slotDate].length === 0) {
  //     delete slots_booked[slotDate];
  //   }

  //   await lapanganModel.findOneAndUpdate(
  //     { lapanganId },
  //     { slots_booked }
  //   );

  //   res.json({ success: true, message: "Booking dibatalkan & slot dirilis" });

  // } catch (error) {
  //   res.json({ success: false, message: error.message });
  // }
};


const deletelapangan = async (req, res) => {
  try {
    const { lapanganId } = req.body;
    if (!lapanganId) {
      return res.json({ success: false, message: "Lapangan is required" });
    }

    const deleted = await lapanganModel.findOneAndDelete({ lapanganId });

    if (!deleted) {
      return res.json({ success: false, message: "Lapangan not found" });
    }

    res.json({ success: true, message: "Lapangan deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const changeAvailability = async (req, res) => {
  try {
    const {lapanganId} = req.body
    const lapanganData = await lapanganModel.findOne({lapanganId})

    if (!lapanganData) {
      return res.json({success: false, message: "Lapangan tidak ditemukan"})
    }

    await lapanganModel.findOneAndUpdate(
      {lapanganId},
      {available: !lapanganData.available} 
    )

    res.json({success: true, message: 'Availability changed'})
  } catch (error) {
    console.log(error)
    res.json({success: false, message: error.message})
  }
}

// Probably get eror
const updateLapangan = async (req, res) => {
  try {
    const {name, image, price, available} = req.body
    const lapanganId = req.lapanganId;

    await lapanganModel.findOneAndUpdate({lapanganId}, {name, image, price, available})

    res.json({success: true, message: 'Lapangan update'})
  } catch (error) {
    console.log(error)
    res.json({success: false, message: error.message})
  }
}



export {
  loginAdmin,
  registerAdmin,
  addLapangan,
  allLapangan,
  getLapanganById,
  adminDashboard,
  bookingCancel,
  bookingAdmin,
  deletelapangan,
  changeAvailability,
  updateLapangan,
  bookingComplete
};
