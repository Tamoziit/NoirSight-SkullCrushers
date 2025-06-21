export interface PostResponse {
    label: "real" | "fake";
    confidence: number;
}

export interface WrapperError {
    error: true;
    status?: number;
    data?: any;
    message: string;
    detail?: string;
}