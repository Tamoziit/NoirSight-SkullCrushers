import crypto from "crypto";

function generateApiKey(company: string, projectName: string): string {
    const base = `${company}-${projectName}-${Date.now()}`;
    const hash = crypto.createHash("sha256").update(base).digest("hex").slice(0, 16);
    return `sk-${hash}`;
}

export default generateApiKey;