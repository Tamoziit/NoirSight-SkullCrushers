import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import Toast from 'react-native-toast-message';
import cleanUpToken from "@/utils/cleanUpToken";
import { EXPO_API_URL } from "@/configs/env";

const useGetFeed = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();
    const apiUrl = EXPO_API_URL;

    const getFeed = async () => {
        const token = await cleanUpToken();
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/upload/feed/${authUser?._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            if (data) {
                return data.uploads;
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

    return { loading, getFeed }
}

export default useGetFeed;