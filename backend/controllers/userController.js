import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import lapanganModel from "../models/lapanganModel.js";
import userModel from "../models/userModel.js";
import bookingModel from "../models/bookingModel.js";
import { now } from "mongoose";

// API REGIST USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password, address, gender, phone } = req.body;

    if (!name || !email || !password || !address || !gender || !phone) {
      return res.json({ success: false, message: "Missing detail" });
    }

    // validate name
    if (!/^[a-zA-Z\s]{3,50}$/.test(name)) {
      return res.json({ success: false, message: "Enter a valid full name" });
    }

    // CHECK IF EMAIL ALREADY EXISTS
    const emailExist = await userModel.findOne({ email });
    if (emailExist) {
      return res.json({ success: false, message: "Email already registered" });
    }

    // PHONE NUMBER VALIDATION (Indonesia standard)
    if (!/^(08)[0-9]{8,12}$/.test(phone)) {
      return res.json({
        success: false,
        message: "Enter a valid phone number",
      });
    }

    // validate strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
      address,
      gender,
      phone,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    // Validate password length
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    if (!user) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel
      .findOne({ userId: req.userId })
      .select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name,  address, gender, phone } = req.body;
    const userId = req.userId;
    const imageFile = req.file;

    if (!name ||  !address || !gender || !phone) {
      return res.json({ success: false, message: "Missing detail" });
    }

    // validate name
    if (!/^[a-zA-Z\s]{3,50}$/.test(name)) {
      return res.json({ success: false, message: "Enter a valid full name" });
    }

    await userModel.findOneAndUpdate(
      {userId},
      {
        name, phone, address, gender, 
      }
    );

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image"
      });
      const imageUrl = imageUpload.secure_url;

      await userModel.findOneAndUpdate({userId}, {image: imageUrl});
    }

    res.json({success: true, message: "Profile Updated"});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const bookingLapangan = async (req, res) => {
  try {
    const {lapanganId, slotTime, slotDate} = req.body;
  const userId = req.userId

  const lapanganDataFull = await lapanganModel.findOne({lapanganId}).select("-password")

  if (!lapanganDataFull || !lapanganDataFull.available) {
    return res.json({success: false, message:"Lapangan tidak tersediaa"});
  }

  let slots_booked = {...lapanganDataFull.slots_booked};

  if (slots_booked[slotDate]) {
    if (slots_booked[slotDate].includes(slotTime)) {
      return res.json({success: false, message:"Slot tidak tersedia"})
    } else {
      slots_booked[slotDate].push(slotTime);
    }
  } else {
    slots_booked[slotDate] = [slotTime];
  }

  const userData = await userModel.findOne({userId}).select("-password");

  const bookingData = {
    userId,
    lapanganId,
    userData,
    lapanganData: {
      name: lapanganDataFull.name,
      image: lapanganDataFull.image
    },
    amount: lapanganDataFull.price,
    slotTime,
    slotDate,
    date: Date.now()
  };
  const newBooking = new bookingModel(bookingData);
  await newBooking.save();

  await lapanganModel.findOneAndUpdate({lapanganId}, {slots_booked});

  res.json({success:true, message: "Booking berhasil"})

  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
  }
};

export { loginUser, registerUser, getProfile, updateProfile, bookingLapangan };
