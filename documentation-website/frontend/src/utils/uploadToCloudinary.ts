import toast from "react-hot-toast";

export const uploadBlobToCloudinary = async (
  fileUrl: string,
  type: "image" | "video"
): Promise<string | null> => {
  const cloudinaryUrl =
    type === "image"
      ? "https://api.cloudinary.com/v1_1/dhjyjsyvt/image/upload"
      : "https://api.cloudinary.com/v1_1/dhjyjsyvt/video/upload";

  const uploadPreset = "NoirSight";
  const formData = new FormData();
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch blob: ${response.status}`);
    }
    const blob = await response.blob();

    const fileName = type === "image" ? "upload.png" : "upload.mp4";
    const fileFromBlob = new File([blob], fileName, {
      type: blob.type,
      lastModified: Date.now(),
    });

    formData.append("file", fileFromBlob);

    const res = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Cloudinary Error: ", data);
      throw new Error(`Cloudinary upload failed: ${res.statusText}`);
    }

    console.log("Cloudinary URL:", data.secure_url);
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading file: ", error);
    toast.error("Couldn't upload file");
    return null;
  }
};
