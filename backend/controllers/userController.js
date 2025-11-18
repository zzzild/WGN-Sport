import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import lapanganModel from '../models/lapanganModel';
import userModel from '../models/userModel';
import bookingModel from '../models/bookingModel';

// API REGIST USER
const registerUser = async (req, res) => {
    try {
        const {name, email, password, address, gender, phone} = req.body;

    if (!name || !email || !password || !address || !gender || !phone) {
            return res.json({success : false, message: "Missing detail"});
        }
    
    // validate email format
    if (!validator.isEmail(email)) {
        return res.json({success : false, message: "Enter a valid email"});
    }   

    // validate strong password
    if (password.length < 8) {
        return res.json({success : false, message: "Enter a strong password"});
    }   
    
    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)

    const userData = {
        name, email, hashedPassword,
        address, gender, phone
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({id: user.userId}, process.env.JWT_SECRET);

    res.json({success: true, token})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success: false, message:"User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user.userId}, process.env.JWT_SECRET);
            res.json({success: true, token})
        } else {
            res.json({success: false, message: "Invalid credentials"});
        }

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})       
    }
}

export { loginUser, registerUser}