import mongoose from "mongoose"

const { Schema } = mongoose
const sessionSchema = new Schema({
    organizer: {
        type: Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    participants: {
        type: [Schema.Types.ObjectId],
        ref:'user'
    },
    equipments: {
        type: [Schema.Types.ObjectId],
        ref:'equipment'
    },
    targets: {
        type: [String]
    },
    session_date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number
    },
    place: {
        lat: {type: Number},
        long: {type: Number}
    },
    rdv: {
        lat: {type: Number},
        long: {type: Number}
    }
})

const session = mongoose.model('session', sessionSchema)

export default session