export const videoAnalyzer = `import { DeepfakeVideoAnalyser } from "noirsight"

const videoAnalyser = new DeepfakeVideoAnalyser(
	process.env.NOIRSIGHT_API_KEY, 
	process.env.NOIRSIGHT_USER_ID
); // Initialize Video Analyzer Class

const response = await videoAnalyser.analyseVideo(videoUrl);
// Handle the response below:
console.log(response);`


export const imageAnalyzer = `import { DeepfakeImageAnalyser } from "noirsight"

const imageAnalyser = new DeepfakeImageAnalyser(
	process.env.NOIRSIGHT_API_KEY, 
	process.env.NOIRSIGHT_USER_ID
); // Initialize Image Analyzer Class

const response = await imageAnalyser.analyseImage(imageUrl);
// Handle the response below:
console.log(response);`


export const articleAnalyzer = `import { ArticleAnalyser } from "noirsight"

const articleAnalyzer = new ArticleAnalyser(
    process.env.NOIRSIGHT_API_KEY
    process.env.NOIRSIGHT_USER_ID
); // Initialize Article Analyzer Class

const response = await articleAnalyzer.analyseArticle(text)
// Handle the response below:
console.log(response);`


export const installation = `npm install noirsight`


export const mediaResponse = `{
    "label": "real" | "fake",
    "confidence": 0.92
}`


export const articleResponse = `{
    "classification": "contextual",
    "reasons": [
        "The paragraph expresses an opinion about a world mourning in pain, which is subjective.",
        "The terms \"ViswaGuru\" and \"Bootlickers\" are used to describe individuals, indicating a biased interpretation rather than objective facts."
    ],
    "related_articles": [
        {
            "url": "https://punchng.com/tinubu-mourns-victims-of-tragic-air-india-plane-crash/",
            "verdict": "weakly relevant",
            "gemini_analysis": "Relevance Check: The reference article discusses a plane crash involving Air India and expresses condolences from President Tinubu to Prime Minister Modi. The user submission also mentions a plane crash and PM Modi. Therefore, the article is topically relevant.\nAnalysis: The article confirms that a plane crash occurred and that PM Modi is involved, as he received condolences. However, the user submission expresses opinions about Modi's actions and calls people \"bootlickers,\" which are not addressed or supported by the reference article. The article focuses on the tragedy and condolences, not on any alleged photoshoot or calls for resignation.\nVerdict: \"weakly relevant\""
        },
        {
            "url": "https://timesofindia.indiatimes.com/city/ahmedabad/ahmedabad-air-india-plane-crash-news-live-air-india-london-flight-crash-sardar-vallabhbhai-patel-international-airport-deaths-injured-rescue-operation-latest-updates/liveblog/121799226.cms",
            "verdict": "weakly relevant",
            "gemini_analysis": "Relevance Check: The reference article discusses a plane crash in Ahmedabad involving an Air India flight. The user submission mentions a \"plane crash\" and uses hashtags related to political figures. While there's a keyword overlap (\"plane crash\"), the user's statement seems to be using the event to make a political point, whereas the article focuses on the details of the crash itself.\nAnalysis: The article provides factual information about the plane crash, including the flight details, timeline, and initial response. It does not mention anything about political figures, resignations, or the user's implied political commentary. Therefore, the article neither supports nor contradicts the user's claims; it simply ignores them. The article is primarily focused on reporting the event, not on any political ramifications.\nVerdict: \"weakly relevant\""
        }
    ]
}`