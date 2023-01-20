import mongoose from "mongoose"

const { Schema } = mongoose

const equipmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    aperture: {
        type: Number,
        required: true
    },
    focal: {
        type: Number,
        required: true
    },
    lens: {
        type: [Number]
    },
    photography: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref:'user',
        required: true
    }
}, 
{
    timestamps: true
})

const equipment = mongoose.model('equipment', equipmentSchema)

export default equipment