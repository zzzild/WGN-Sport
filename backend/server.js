import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'

const app = express()
const port = 4000
connectDB()
connectCloudinary

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get('/', (res, req) => {
    res.setEncoding('Api Working')
})

app.listen(port, () => console.log("Server Running...."))