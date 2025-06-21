import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import Toast from 'react-native-toast-message';
import { UploadProps } from "@/interfaces/interfaces";
import cleanUpToken from "@/utils/cleanUpToken";
import { EXPO_API_URL } from "@/configs/env";

const useUploadPost = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();
    const apiUrl = EXPO_API_URL;

    const uploadPost = async ({ url, type }: UploadProps) => {
        const success = handleInputErrors({ url, type });

        if (!success) return;

        const token = await cleanUpToken();
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/upload/upload-post/${authUser?._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ url, type })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            if (data) {
                Toast.show({
                    type: 'success',
                    text1: 'Post uploaded successfully!',
                    position: 'top',
                });
                return data;
            }
        } catch (error) {
            if (error instanceof Error) {
                Toast.show({
                    type: 'error',
                    text1: error.message,
                    position: 'top',
                });
                console.log(error);
            } else {
                console.log("An unknown error occurred", error);
            }
        } finally {
            setLoading(false);
        }
    }

    return { loading, uploadPost }
}

export default useUploadPost;


function handleInputErrors({ url, type }: UploadProps) {
    if (!url) {
        Toast.show({
            type: 'error',
            text1: "Couldn't upload image, error in parsing url",
            position: 'top',
        });
        return false;
    }

    if (type !== "image" && type !== "video") {
        Toast.show({
            type: 'error',
            text1: "Select an image or a video",
            position: 'top',
        });
        return false;
    }

    return true;
}