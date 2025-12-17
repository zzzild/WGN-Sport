import express from 'express'
import { allLapangan, getLapanganById } from '../controllers/adminController.js'

const lapanganRouter = express.Router()

lapanganRouter.get('/all-lapangan',  allLapangan)
lapanganRouter.get("/:lapanganId", getLapanganById)

export default lapanganRouter