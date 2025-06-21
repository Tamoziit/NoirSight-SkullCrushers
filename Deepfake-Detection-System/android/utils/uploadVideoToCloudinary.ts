import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_VIDEO_URL } from "@/configs/env";
import { DocumentPickerAsset } from "expo-document-picker";

export const uploadVideoToCloudinary = async (file: DocumentPickerAsset): Promise<string> => {
    const cloudinaryUrl = CLOUDINARY_VIDEO_URL;
    const uploadPreset = CLOUDINARY_UPLOAD_PRESET;

    try {
        if (!file.uri) {
            throw new Error("Invalid file URI");
        }

        console.log('Starting upload for file:', file.name, 'Size:', file.size);

        const formData = new FormData();

        // Pass the file directly instead of creating a blob
        formData.append("file", {
            uri: file.uri,
            type: file.mimeType || 'video/mp4',
            name: file.name || 'video.mp4',
        } as any);

        formData.append("upload_preset", uploadPreset);
        formData.append("resource_type", "video");

        console.log('Uploading to Cloudinary...');
        const uploadRes = await fetch(cloudinaryUrl, {
            method: "POST",
            body: formData,
            // Don't set Content-Type header
        });

        const result = await uploadRes.json();
        console.log('Cloudinary response:', result);

        if (!uploadRes.ok) {
            console.error("Upload failed with status:", uploadRes.status);
            console.error("Error details:", result);
            throw new Error(`Cloudinary upload failed: ${result.error?.message || 'Unknown error'}`);
        }

        console.log('Upload successful, secure URL:', result.secure_url);
        return result.secure_url;
    } catch (error) {
        console.error("Cloudinary upload error:", error);

        if (error instanceof TypeError && error.message.includes('Network request failed')) {
            throw new Error("Network error - check your internet connection and Android permissions");
        }

        throw new Error(`Failed to upload video: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};