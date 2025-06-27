import { useState } from "react"
import toast from "react-hot-toast";
import { PaymentProps } from "../types";
import { useUser } from "@civic/auth/react";

const usePaymentHandler = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const apiUrl = import.meta.env.VITE_API_URL;

    const payment = async ({ company, projectName }: PaymentProps) => {
        const success = handleInputErrors({ company, projectName });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/payments/handle-subscription`, {
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

    return { loading, payment }
}

export default usePaymentHandler;


function handleInputErrors({ company, projectName }: PaymentProps) {
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