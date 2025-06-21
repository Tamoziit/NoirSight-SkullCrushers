import { useState } from "react";
import Toast from 'react-native-toast-message';
import cleanUpToken from "@/utils/cleanUpToken";
import { EXPO_API_URL } from "@/configs/env";
import { UploadThreadProps } from "@/interfaces/interfaces";

const useFetchAnalysis = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = EXPO_API_URL;

    const fetchAnalysis = async ({ text }: UploadThreadProps) => {
        const token = await cleanUpToken();
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/threads/analyze-article`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ text })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            if (data) {
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

    return { loading, fetchAnalysis }
}

export default useFetchAnalysis;