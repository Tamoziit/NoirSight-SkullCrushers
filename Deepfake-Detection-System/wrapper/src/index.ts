import axios, { Axios } from "axios";
import { PostResponse, WrapperError } from "./types";
import refineConfidence from "./utils/refineConfidence";

export class NoirSight {
    public apiKey: string;
    public baseUrl: string;

    constructor(apiKey: string, baseUrl = "http://127.0.0.1:8000/api") {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }
}

export class DeepfakeVideoAnalyser extends NoirSight {
    private url: string;

    constructor(apiKey: string, url: string) {
        super(apiKey);
        this.url = url;
    }

    async analyseVideo(): Promise<PostResponse | WrapperError> {
        try {
            if (!this.apiKey) {
                throw new Error("Cannot find API KEY");
            }

            const response = await axios.post(`${this.baseUrl}/predict/video/url`, {
                url: this.url
            });
            const result = refineConfidence({ ...response.data });

            return result;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    return {
                        error: true,
                        status: error.response.status,
                        data: error.response.data,
                        message: error.response.data?.error || 'Something went wrong! Please try again later'
                    };
                } else if (error.request) {
                    return {
                        error: true,
                        message: 'No response from server. Network issue?'
                    };
                }
            }

            return {
                error: true,
                message: 'Unexpected error occurred.',
                detail: (error as Error).message
            };
        }
    }
}

export class DeepfakeImageAnalyser extends NoirSight {
    private url: string;

    constructor(apiKey: string, url: string) {
        super(apiKey);
        this.url = url;
    }

    async analyseImage(): Promise<PostResponse | WrapperError> {
        try {
            if (!this.apiKey) {
                throw new Error("Cannot find API KEY");
            }

            const response = await axios.post(`${this.baseUrl}/predict/image/url`, {
                url: this.url
            });
            const result = refineConfidence({ ...response.data });
            
            return result;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    return {
                        error: true,
                        status: error.response.status,
                        data: error.response.data,
                        message: error.response.data?.error || 'Something went wrong! Please try again later'
                    };
                } else if (error.request) {
                    return {
                        error: true,
                        message: 'No response from server. Network issue?'
                    };
                }
            }

            return {
                error: true,
                message: 'Unexpected error occurred.',
                detail: (error as Error).message
            };
        }
    }
}