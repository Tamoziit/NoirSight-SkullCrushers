import { Types } from "mongoose";
import { Request } from "express";

export interface AdminToken {
    password: string
}

export interface ProjectBody {
    company: string;
    projectName: string;
    email: string;
}

export interface ProjectProps {
    _id: Types.ObjectId;
    company: string;
    projectName: string;
    apiKey: string;
    validity: Date;
}

export interface CompanyProps {
    _id: Types.ObjectId;
    projects: ProjectProps[];
    email: string;
}