import express from 'express'
import { allLapangan } from '../controllers/adminController.js'

const lapanganRouter = express.Router()

lapanganRouter.get('/all-lapangan',  allLapangan)

export default lapanganRouter