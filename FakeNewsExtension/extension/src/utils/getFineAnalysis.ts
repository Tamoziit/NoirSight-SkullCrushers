/* 
    Heuristic Analysis:
    Confidence intervals for 95% z-score.
*/

import type { CounterProps } from "../types";

const getFineAnalysis = ({ C, P, I }: CounterProps) => {
    const z = 1.96; // 95% confidence score (Z-score)
    let p;
    const n = C + P + I;
    if (n === 0)
        p = 0;
    else
        p = ((1 * C) + (0.5 * P) + (0 * I)) / n;

    const denominator = 1 + (z ** 2) / n;
    const center = p + (z ** 2) / (2 * n);
    const margin = z * Math.sqrt((p * (1 - p)) / n + (z ** 2) / (4 * n ** 2));

    const ciLow = (center - margin) / denominator;
    const ciHigh = (center + margin) / denominator;

    return {
        ciLow: Math.round(ciLow * 10000) / 100,
        ciHigh: Math.round(ciHigh * 10000) / 100,
        confidence: 95.0
    }
}

export default getFineAnalysis;