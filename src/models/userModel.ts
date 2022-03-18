import mongoose from "mongoose";

const schema = mongoose.Schema

const UserSchema = new schema({
    _id: {
        type: String,
    },
    name: {
        type: String,
        unique: [true, 'That username is taken.'],
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    }
},
{ collection: 'users' })

export default mongoose.model("users", UserSchema)