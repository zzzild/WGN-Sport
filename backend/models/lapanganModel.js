import mongoose from "mongoose";
import { nanoid } from "nanoid";

const lapanganSchema = new mongoose.Schema({
    lapanganId: {
        type: String,
        default: () => nanoid(8),
        unique: true,
        required: true
    },
    name: {type: String, require:true, maxLength:20},
    image: {type: String, require:true},
    price: {type: Number, require:true, maxLength:20},
    available: {type: Boolean, default:true},
    slots_booked: {type: Object, default:{}},
}, {minimize:false})

const lapanganModel = mongoose.models.lapaangan || mongoose.model('lapangan', lapanganSchema)

export default lapanganModel