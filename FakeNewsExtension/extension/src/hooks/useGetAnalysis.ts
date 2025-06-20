import { useState } from "react"
import toast from "react-hot-toast";

const useGetAnalysis = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log(apiUrl);

    const analyse = async (url: string) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/detect`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    url
                })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            if (data) {
                return data;
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                console.log(error);
            } else {
                console.log("An unknown error occurred", error);
            }
        } finally {
            setLoading(false);
        }
    }
    return { loading, analyse };
}

export default useGetAnalysis;