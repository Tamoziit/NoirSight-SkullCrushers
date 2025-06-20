import mongoose from "mongoose";

const UploadSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    type: {
        type: String,
        enum: ["image", "video"],
        required: true
    },
    url: {
        type: String,
        required: true
    },
    modelResult: {
        type: String,
        enum: ["real", "fake"],
        required: true
    },
    confidence: {
        type: Number,
        required: true
    },
    positiveReviews: {
        type: Number,
        default: 0,
        required: true
    },
    negativeReviews: {
        type: Number,
        default: 0,
        required: true
    }
}, { timestamps: true });

const Upload = mongoose.model("Upload", UploadSchema);
export default Upload;