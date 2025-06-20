export interface OutputProps {
    url: string;
    flag: "consistent" | "partially-consistent" | "inconsistent";
    reasons: string[];
}

export interface CounterProps {
    C: number;
    P: number;
    I: number;
}

export interface GrossScoreProps {
    grossScore: number;
}

export interface FineAnalysis {
    ciLow: number;
    ciHigh: number;
    confidence: number;
}