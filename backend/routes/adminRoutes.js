import express from 'express'
import { addLapangan, allLapangan, loginAdmin, registerAdmin } from '../controllers/adminController.js'
import authAdmin from '../middlewares/authAdmin.js'
import upload from '../middlewares/multer.js'

const adminRouter = express.Router()

adminRouter.post('/login', loginAdmin)
adminRouter.post('/regist', registerAdmin)
adminRouter.post('/add-lapangan', authAdmin, upload.single('image'), addLapangan)
adminRouter.get('/all-lapangan', authAdmin, allLapangan)

export default adminRouter