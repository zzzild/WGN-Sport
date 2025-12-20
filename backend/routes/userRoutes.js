import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile, bookingLapangan, listBooking, cancelBooking } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRoute = express.Router()

userRoute.post('/register', registerUser)
userRoute.post('/login', loginUser)

userRoute.get('/get-profile', authUser, getProfile)
userRoute.post('/update-profile', upload.single('image'),authUser, updateProfile)
userRoute.post('/booking-lapangan', authUser, bookingLapangan)
userRoute.get('/list-booking', authUser, listBooking)
userRoute.post('/cancel-booking', authUser, cancelBooking)



export default userRoute