import { useState } from 'react';
import { Copy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import ThreeBackground from './ThreeBackground';
import DocumentationNav from './DocumentationNav';

const Documentation = () => {
	const [copied, setCopied] = useState<string | null>(null);

	const handleCopy = (text: string, type: string) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopied(type);
			setTimeout(() => setCopied(null), 2000);
		});
	};

	return (
		<>
			<DocumentationNav />
			<div className="relative min-h-screen bg-black text-white px-6 py-12 overflow-hidden">
				<div className="absolute inset-0 z-0">
					<ThreeBackground />
				</div>

				<div className="relative z-10 max-w-6xl mx-auto space-y-16">
					{/* Wrapper: Deepfake Video Detection */}
					<section>
						<h1 className="text-4xl md:text-5xl font-light mb-4 geist-font">
							Deepfake <span className="gradient-text">Video Detection</span>
						</h1>
						<p className="text-gray-300 inter-font text-lg leading-relaxed mb-8">
							Analyze a video to detect synthetic content using our deepfake detection engine. Upload an `.mp4` file and receive AI-based verdict with confidence levels.
						</p>

						<h1 className='text-xl font-semibold mb-1'>Installation</h1>
						<div className="relative bg-white/5 border border-white/10 rounded-lg p-4 mb-8">
							<code className="text-sm text-gray-200">
								npm install noirsight
							</code>
							<button
								onClick={() =>
									handleCopy(
										'npm install noirsight',
										'video'
									)
								}
								className="absolute top-3 right-3 text-white text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md"
							>
								{copied === 'video' ? 'Copied' : <Copy className="w-4 h-4" />}
							</button>
						</div>

						<h1 className='text-xl font-semibold mb-1'>Detect Deepfake Video</h1>
						<div className="relative bg-white/5 border border-white/10 rounded-lg p-4 mb-8">
							<pre className="text-sm text-gray-200 whitespace-pre-wrap font-mono">
								{`import { DeepfakeVideoAnalyser } from "noirsight"

const videoAnalyser = new DeepfakeVideoAnalyser(
	process.env.NOIRSIGHT_API_KEY, 
	url
);

const response = await videoAnalyser.analyseVideo();
// Handle the response below:
console.log(response);`}
							</pre>
							<button
								onClick={() =>
									handleCopy(
										`import { DeepfakeVideoAnalyser } from "noirsight"

const videoAnalyser = new DeepfakeVideoAnalyser(
	process.env.NOIRSIGHT_API_KEY, 
	url
);

const response = await videoAnalyser.analyseVideo();
// Handle the response below:
console.log(response);`,
										'video'
									)
								}
								className="absolute top-3 right-3 text-white text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md"
							>
								{copied === 'video' ? 'Copied' : <Copy className="w-4 h-4" />}
							</button>
						</div>

						<Card className="bg-white/5 border border-white/10 rounded-2xl p-6">
							<h3 className="text-xl mb-4 font-semibold gradient-text">JSON Output</h3>
							<pre className="bg-black text-green-400 text-sm p-4 rounded-lg overflow-auto">
								{`{
    "label": "real" | "fake",
    "confidence": 0.92
}`}
							</pre>
						</Card>
					</section>

					{/* Wrapper: Deepfake Image Detection */}
					<section>
						<h1 className="text-4xl md:text-5xl font-light mb-4 geist-font">
							Deepfake <span className="gradient-text">Image Detection</span>
						</h1>
						<p className="text-gray-300 inter-font text-lg leading-relaxed mb-8">
							Scan images to detect facial morphing, GAN-generated visuals, or tampered photos. Our model analyzes subtle patterns to catch AI-edited fakes.
						</p>

						<h1 className='text-xl font-semibold mb-1'>Installation</h1>
						<div className="relative bg-white/5 border border-white/10 rounded-lg p-4 mb-8">
							<code className="text-sm text-gray-200">
								npm install noirsight
							</code>
							<button
								onClick={() =>
									handleCopy(
										'npm install noirsight',
										'image'
									)
								}
								className="absolute top-3 right-3 text-white text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md"
							>
								{copied === 'image' ? 'Copied' : <Copy className="w-4 h-4" />}
							</button>
						</div>

						<h1 className='text-xl font-semibold mb-1'>Detect Deepfake Video</h1>
						<div className="relative bg-white/5 border border-white/10 rounded-lg p-4 mb-8">
							<pre className="text-sm text-gray-200 whitespace-pre-wrap font-mono">
								{`import { DeepfakeImageAnalyser } from "noirsight"

const imageAnalyser = new DeepfakeImageAnalyser(
	process.env.NOIRSIGHT_API_KEY, 
	url
);

const response = await imageAnalyser.analyseImage();
// Handle the response below:
console.log(response);`}
							</pre>
							<button
								onClick={() =>
									handleCopy(
										`import { DeepfakeImageAnalyser } from "noirsight"

const imageAnalyser = new DeepfakeImageAnalyser(
	process.env.NOIRSIGHT_API_KEY, 
	url
);

const response = await imageAnalyser.analyseImage();
// Handle the response below:
console.log(response);`,
										'image'
									)
								}
								className="absolute top-3 right-3 text-white text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md"
							>
								{copied === 'video' ? 'Copied' : <Copy className="w-4 h-4" />}
							</button>
						</div>

						<Card className="bg-white/5 border border-white/10 rounded-2xl p-6">
							<h3 className="text-xl mb-4 font-semibold gradient-text">JSON Output</h3>
							<pre className="bg-black text-green-400 text-sm p-4 rounded-lg overflow-auto">
								{`{
    "label": "real" | "fake",
    "confidence": 0.92
}`}
							</pre>
						</Card>
					</section>

					{/* Wrapper: Article Analysis */}
					<section>
						<h1 className="text-4xl md:text-5xl font-light mb-4 geist-font">
							Article <span className="gradient-text">Content Validation</span>
						</h1>
						<p className="text-gray-300 inter-font text-lg leading-relaxed mb-8">
							Validate whether an article is potentially misleading, AI-generated, or factually incorrect. Use the endpoint below to send plain text or a URL.
						</p>

						<h1 className='text-xl font-semibold mb-1'>Installation</h1>
						<div className="relative bg-white/5 border border-white/10 rounded-lg p-4 mb-8">
							<code className="text-sm text-gray-200">
								npm install noirsight
							</code>
							<button
								onClick={() =>
									handleCopy(
										'npm install noirsight',
										'video'
									)
								}
								className="absolute top-3 right-3 text-white text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md"
							>
								{copied === 'video' ? 'Copied' : <Copy className="w-4 h-4" />}
							</button>
						</div>

						<h1 className='text-xl font-semibold mb-1'>Detect Deepfake Video</h1>
						<div className="relative bg-white/5 border border-white/10 rounded-lg p-4 mb-8">
							<pre className="text-sm text-gray-200 whitespace-pre-wrap font-mono">
								{`import { ArticleAnalyser } from "noirsight"

const articleAnalyzer = new ArticleAnalyser(process.env.NOIRSIGHT_API_KEY);
const response = await articleAnalyzer.analyseArticle(text)

// Handle the response below:
console.log(response);`}
							</pre>
							<button
								onClick={() =>
									handleCopy(
										`import { ArticleAnalyser } from "noirsight"

const articleAnalyzer = new ArticleAnalyser(process.env.NOIRSIGHT_API_KEY);
const response = await articleAnalyzer.analyseArticle(text)

// Handle the response below:
console.log(response);`,
										'article'
									)
								}
								className="absolute top-3 right-3 text-white text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md"
							>
								{copied === 'article' ? 'Copied' : <Copy className="w-4 h-4" />}
							</button>
						</div>

						<Card className="bg-white/5 border border-white/10 rounded-2xl p-6">
							<h3 className="text-xl mb-4 font-semibold gradient-text">JSON Output</h3>
							<pre className="bg-black text-green-400 text-sm p-4 rounded-lg overflow-auto">
								{`{
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
}`}
							</pre>
						</Card>
					</section>

					{/* NoirSight Extension Section */}
					<section>
						<h1 className="text-4xl md:text-5xl font-light mb-4 geist-font">
							NoirSight <span className="gradient-text">Browser Extension</span>
						</h1>
						<p className="text-gray-300 inter-font text-lg leading-relaxed mb-8">
							The NoirSight Extension lets you fact-check news articles in real-time while browsing. Use our AI to verify article credibility instantly on any webpage.
						</p>

						<div className="space-y-12">
							{/* Step 1 */}
							<div className="flex flex-col md:flex-row items-start md:items-center gap-6">
								<div className="md:w-2/3">
									<h3 className="text-xl font-semibold gradient-text mb-2">Step 1: Install</h3>
									<p className="text-gray-300 inter-font">
										Install the NoirSight Extension from the Chrome Web Store and pin it to your toolbar.
									</p>
								</div>
								<div className="md:w-1/3">
									<Card className="bg-white/5 border border-white/10 rounded-2xl p-3">
										<img
											src="eye.png"
											alt="Install Extension"
											className="rounded-lg border border-white/10 w-full"
										/>
									</Card>
								</div>
							</div>

							{/* Step 2 */}
							<div className="flex flex-col md:flex-row items-start md:items-center gap-6">
								<div className="md:w-2/3">
									<h3 className="text-xl font-semibold gradient-text mb-2">Step 2: Scan Article</h3>
									<p className="text-gray-300 inter-font">
										While reading an article, click the extension icon. 
									</p>
								</div>
								<div className="md:w-1/3">
									<Card className="bg-white/5 border border-white/10 rounded-2xl p-3">
										<img
											src="/ss1.png"
											alt="Scan Article"
											className="rounded-lg border border-white/10 w-full"
										/>
									</Card>
								</div>
							</div>

							{/* Step 3 */}
							<div className="flex flex-col md:flex-row items-start md:items-center gap-6">
								<div className="md:w-2/3">
									<h3 className="text-xl font-semibold gradient-text mb-2">Step 3: See Statistics</h3>
									<p className="text-gray-300 inter-font">
										You'll instantly see AI-verified credibility scores right below the headline. 
									</p>
								</div>
								<div className="md:w-1/3">
									<Card className="bg-white/5 border border-white/10 rounded-2xl p-3">
										<img
											src="/ss2.png"
											alt="Scan Article"
											className="rounded-lg border border-white/10 w-full"
										/>
									</Card>
								</div>
							</div>
						</div>
					</section>



				</div>
			</div>
		</>
	);
};

export default Documentation;