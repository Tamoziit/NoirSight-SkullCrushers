import mongoose from "mongoose";

const ThreadSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    text: {
        type: String,
        min: 3,
        required: true
    }
}, { timestamps: true });

const Thread = mongoose.model("Thread", ThreadSchema);
export default Thread;