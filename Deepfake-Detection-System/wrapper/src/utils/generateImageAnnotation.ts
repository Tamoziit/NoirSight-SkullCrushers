/**
 * Adds text overlay to Cloudinary URL
 * @param originalUrl - The original Cloudinary URL
 * @param label - The label to overlay ("deepfake", "authentic", or other)
 * @returns The processed Cloudinary URL with text overlay
 * @throws Error if not a valid Cloudinary URL or invalid format
 */
function generateImageAnnotation(originalUrl: string, label: string): string {
    if (!originalUrl.includes("res.cloudinary.com")) {
        throw new Error("Not a valid Cloudinary URL");
    }

    let bgColor: string;
    let textColor: string;
    let text: string;

    if (label.toLowerCase() === "fake") {
        bgColor = "FF0000";
        textColor = "FFFFFF";
        text = "Deepfake";
    } else if (label.toLowerCase() === "real") {
        bgColor = "00FF00";
        textColor = "000000";
        text = "Authentic";
    } else {
        bgColor = "808080";
        textColor = "FFFFFF";
    }

    const parts = originalUrl.split("/upload/");
    if (parts.length !== 2) {
        throw new Error("Invalid Cloudinary URL format");
    }

    const baseUrl = parts[0] + "/upload/";
    const resourcePath = parts[1];

    const mediaOverlay =
        `l_text:Arial_22_bold:${label.toUpperCase()},` +
        `co_rgb:${textColor},` +
        `b_rgb:${bgColor},` +
        `g_north_east,` +
        `x_15,y_15,` +
        `o_100/`;

    const processedUrl = baseUrl + mediaOverlay + resourcePath;
    return processedUrl;
}

export default generateImageAnnotation;