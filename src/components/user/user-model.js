import mongoose from "mongoose"

const { Schema } = mongoose
const userSchema = new Schema({
    name: {
        type: String
    },
    first_name: {
        type: String
    },
    pseudonyme: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const user = mongoose.model('user', userSchema)

export default user