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

export { loginAdmin, registerAdmin, addLapangan, allLapangan, getLapanganById };
