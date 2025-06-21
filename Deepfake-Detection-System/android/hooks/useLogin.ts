import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import Toast from 'react-native-toast-message';
import { LoginParams } from "@/interfaces/interfaces";
import cleanUpToken from "@/utils/cleanUpToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXPO_API_URL } from "@/configs/env";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const apiUrl = EXPO_API_URL;

    const login = async ({ email, password }: LoginParams) => {
        const success = handleInputErrors({ email, password });

        if (!success) return;

        const token = await cleanUpToken();
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            if (data) {
                // Storing user data with expiry
                const now = new Date().getTime();
                const expiry = now + 30 * 24 * 60 * 60 * 1000; // 30 days

                await Promise.all([
                    AsyncStorage.setItem("NS-token", data.token),
                    AsyncStorage.setItem("NS-user", JSON.stringify(data)),
                    AsyncStorage.setItem("NS-expiry", expiry.toString())
                ]);
                setAuthUser(data);

                Toast.show({
                    type: 'success',
                    text1: 'Logged in successfully!',
                    text2: 'Welcome back to Noir Media',
                    position: 'top',
                });
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

    return { loading, login }
}

export default useLogin;


function handleInputErrors({ email, password }: LoginParams) {
    if (!email || !password) {
        Toast.show({
            type: 'error',
            text1: "Please fill all the fields",
            position: 'top',
        });
        return false;
    }

    if (password.length < 6) {
        Toast.show({
            type: 'error',
            text1: "Password should be atleast 6 characters long",
            position: 'top',
        });
        return false;
    }

    return true;
}