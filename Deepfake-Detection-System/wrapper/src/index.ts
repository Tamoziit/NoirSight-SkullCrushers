import axios, { Axios } from "axios";
import { ArticleResponse, PostResponse, WrapperError } from "./types";
import refineConfidence from "./utils/refineConfidence";
import generateImageAnnotation from "./utils/generateImageAnnotation";

export class NoirSight {
    public apiKey: string;
    public userId: string;
    public baseUrl: string;

    constructor(apiKey: string, userId: string, baseUrl = "http://127.0.0.1:8000/api") {
        this.apiKey = apiKey;
        this.userId = userId;
        this.baseUrl = baseUrl;
    }
}

export class DeepfakeVideoAnalyser extends NoirSight {
    constructor(apiKey: string, userId: string) {
        super(apiKey, userId);
    }

    async analyseVideo(url: string): Promise<PostResponse | WrapperError> {
        try {
            if (!this.apiKey) {
                throw new Error("Cannot find API KEY");
            }
            if (!this.userId) {
                throw new Error("Cannot find User ID");
            }

            const response = await axios.post(`${this.baseUrl}/predict/video/url`,
                {
                    url
                },
                {
                    headers: {
                        "x-user-id": this.userId,
                        "x-api-key": this.apiKey
                    }
                }
            );
            const result = refineConfidence({ ...response.data });
            const annotedUrl = generateImageAnnotation(url, result.label);

            return {
                ...result,
                annotedUrl,
            };
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
    constructor(apiKey: string, userId: string) {
        super(apiKey, userId);
    }

    async analyseImage(url: string): Promise<PostResponse | WrapperError> {
        try {
            if (!this.apiKey) {
                throw new Error("Cannot find API KEY");
            }
            if (!this.userId) {
                throw new Error("Cannot find User ID");
            }

            const response = await axios.post(`${this.baseUrl}/predict/image/url`,
                {
                    url
                },
                {
                    headers: {
                        "x-user-id": this.userId,
                        "x-api-key": this.apiKey
                    }
                }
            );
            const result = refineConfidence({ ...response.data });
            const annotedUrl = generateImageAnnotation(url, result.label);

            return {
                ...result,
                annotedUrl,
            };
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

export class ArticleAnalyser extends NoirSight {
    constructor(apiKey: string, userId: string) {
        super(apiKey, userId);
    }

    async analyseArticle(text: string): Promise<ArticleResponse | WrapperError> {
        try {
            if (!this.apiKey) {
                throw new Error("Cannot find API KEY");
            }
            if (!this.userId) {
                throw new Error("Cannot find User ID");
            }

            const response = await axios.post(`${this.baseUrl}/analyze`,
                {
                    text
                },
                {
                    headers: {
                        "x-user-id": this.userId,
                        "x-api-key": this.apiKey
                    }
                }
            );

            return response.data;
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