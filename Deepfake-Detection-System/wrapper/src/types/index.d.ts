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

export interface RelatedArticles {
    url: string;
    verdict: string;
    gemini_analysis?: string | null;
}

export interface ArticleResponse {
    classification: "contextual" | "factual";
    reasons: string[];
    related_articles: RelatedArticles[];
}