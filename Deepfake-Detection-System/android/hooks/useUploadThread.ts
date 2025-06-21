import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import Toast from 'react-native-toast-message';
import { UploadThreadProps } from "@/interfaces/interfaces";
import cleanUpToken from "@/utils/cleanUpToken";
import { EXPO_API_URL } from "@/configs/env";

const useUploadThread = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();
    const apiUrl = EXPO_API_URL;

    const uploadThread = async ({ text }: UploadThreadProps) => {
        const success = handleInputErrors({ text });

        if (!success) return;

        const token = await cleanUpToken();
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/threads/post-thread/${authUser?._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ text })
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

    return { loading, uploadThread }
}

export default useUploadThread;


function handleInputErrors({ text }: UploadThreadProps) {
    if (!text) {
        Toast.show({
            type: 'error',
            text1: "Couldn't post Thread, text is required",
            position: 'top',
        });
        return false;
    }

    if (text.length < 3) {
        Toast.show({
            type: 'error',
            text1: "Text should be minimum of length 3",
            position: 'top',
        });
        return false;
    }

    return true;
}