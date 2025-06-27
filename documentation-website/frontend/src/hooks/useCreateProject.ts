import { useState } from "react"
import toast from "react-hot-toast";

const useCreateProject = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const createProject = async (sessionId: string) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/project/create-project/${sessionId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            if (data) {
                toast.success("API Key generated successfully");
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

    return { loading, createProject }
}

export default useCreateProject;