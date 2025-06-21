import { PostResponse } from "../types";

const refineConfidence = ({ label, confidence }: PostResponse) => {
    let newLabel = label;
    let newConfidence = confidence;

    // Invert only for low confidence
    if (label === "real" && confidence > 0.3) {
        newConfidence = 1 - confidence;
    }

    if (newConfidence <= 0.3) {
        newLabel = label === "real" ? "fake" : "real";
        newConfidence = 1 - newConfidence;
    }

    return {
        label: newLabel,
        confidence: newConfidence
    };
}

export default refineConfidence;