import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    name: {
        type:String,
        required:true
    }
},{timestamps:true})

export const User = mongoose.model("User", userSchema);