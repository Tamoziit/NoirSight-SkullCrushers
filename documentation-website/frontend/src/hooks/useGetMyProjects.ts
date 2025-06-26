import { useUser } from "@civic/auth/react";
import { useState } from "react"
import toast from "react-hot-toast";

const useGetProjects = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useUser()
    const apiUrl = import.meta.env.VITE_API_URL;

    const getProjects = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/project/get-projects/${user.email}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
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
                toast.error(error.message);
                console.log(error);
            } else {
                console.log("An unknown error occurred", error);
            }
        } finally {
            setLoading(false);
        }
    }

    return { loading, getProjects }
}

export default useGetProjects;