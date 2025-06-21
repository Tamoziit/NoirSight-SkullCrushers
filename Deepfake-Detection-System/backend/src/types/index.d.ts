import { Types } from "mongoose";
import { Request } from "express";

export interface AdminToken {
    password: string
}

export interface UserSignupBody {
    username: string;
    email: string;
    password: string;
    mobileNo: string;
    gender: "M" | "F" | "O";
}

export interface UserLoginBody {
    email: string;
    password: string;
}

export interface User {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    mobileNo: string;
    profilePic?: string | null;
    gender: "M" | "F" | "O";
    uploads: Types.ObjectId[];
}

export interface Uploads {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    videoUrl: string;
    modelResult: "real" | "fake";
    positiveResults: number;
    negativeResults: number;
}

declare module "express" {
    export interface Request {
        user?: User;
    }
}

export interface UploadProps {
    type: "image" | "video";
    url: string;
}

export interface FeedbackProps {
    feedback: "yes" | "no";
    id: Types.ObjectId
}