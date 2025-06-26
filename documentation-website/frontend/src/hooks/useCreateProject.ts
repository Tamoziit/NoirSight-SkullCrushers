import { ProjectCreationProps } from "@/types";
import { useUser } from "@civic/auth/react";
import { useState } from "react"
import toast from "react-hot-toast";

const useCreateProject = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useUser()
    const apiUrl = import.meta.env.VITE_API_URL;

    const createProject = async ({ company, projectName }: ProjectCreationProps) => {
        const success = handleInputErrors({ company, projectName });

        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/project/create-project`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    company,
                    projectName,
                    email: user.email
                })
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


function handleInputErrors({ company, projectName }: ProjectCreationProps) {
    if (!company || !projectName) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (projectName.length < 2) {
        toast.error("Project Name should be atleast 2 characters long");
        return false;
    }

    return true;
}