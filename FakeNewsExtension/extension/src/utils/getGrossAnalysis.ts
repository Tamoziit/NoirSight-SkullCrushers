/* 
    Weighted Scores of each Flag:
    1. Consistent = 1.0
    2. Partially-Consistent = 0.5
    3. Inconsistent = 0.0
*/

import type { CounterProps } from "../types";

const getGrossAnalysis = ({ C, P, I }: CounterProps) => {
    const total = C + P + I;
    if (total === 0) return 0;

    const score = (((1.0 * C) + (0.5 * P) + (0 * I)) / total) * 100.0;
    return Math.round(score * 100) / 100; // rounded to 2 decimals
}

export default getGrossAnalysis;