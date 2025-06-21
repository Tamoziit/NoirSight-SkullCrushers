import { useState } from "react"
import Toast from 'react-native-toast-message';
import { FeedbackProps, UploadProps } from "@/interfaces/interfaces";
import cleanUpToken from "@/utils/cleanUpToken";
import { EXPO_API_URL } from "@/configs/env";

const usePostFeedback = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = EXPO_API_URL;

    const postFeedback = async ({ feedback, id }: FeedbackProps) => {
        const success = handleInputErrors({ feedback, id });

        if (!success) return;

        const token = await cleanUpToken();
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/upload/feedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    feedback,
                    id
                })
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

    return { loading, postFeedback }
}

export default usePostFeedback;


function handleInputErrors({ feedback, id }: FeedbackProps) {
    if (!feedback) {
        Toast.show({
            type: 'error',
            text1: "Please enter your feedback",
            position: 'top',
        });
        return false;
    }

    if (!id) {
        Toast.show({
            type: 'error',
            text1: "Couldn't find Post ID",
            position: 'top',
        });
        return false;
    }

    if (feedback !== "yes" && feedback !== "no") {
        Toast.show({
            type: 'error',
            text1: "Please enter a valid feedback",
            position: 'top',
        });
        return false;
    }

    return true;
}