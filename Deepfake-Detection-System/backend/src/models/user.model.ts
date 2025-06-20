import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        min: 2,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
    mobileNo: {
        type: String,
        min: 10,
        max: 10,
        required: true
    },
    profilePic: {
        type: String
    },
    gender: {
        type: String,
        enum: ["M", "F", "O"],
        required: true
    },
    uploads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Uploads"
        }
    ]
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;