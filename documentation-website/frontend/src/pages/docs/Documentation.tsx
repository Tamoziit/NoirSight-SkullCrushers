import { useState } from 'react';
import { Copy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import ThreeBackground from '../../components/ThreeBackground';
import DocumentationNav from '../../components/DocumentationNav';
import { articleAnalyser, articleResponse, imageAnalyser, imageResponse, installation, videoAnalyser, videoResponse } from '@/constants/code';
import CodeBlock from '@/components/CodeBlock';

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
							Analyse a video to detect synthetic content using our deepfake detection engine. Upload an `.mp4` file and receive AI-based verdict with confidence levels.
						</p>

						<h1 className='text-xl font-semibold mb-1'>Installation</h1>
						<div className="relative bg-white/5 border border-white/10 rounded-lg pt-8 px-4 pb-4 mb-8">
							<CodeBlock
								code={installation}
								language="bash"
							/>
							<button
								onClick={() =>
									handleCopy(
										installation,
										'video-ins'
									)
								}
								className="absolute top-3 right-3 text-white text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md"
							>
								{copied === 'video-ins' ? 'Copied' : <Copy className="w-4 h-4" />}
							</button>
						</div>

						<h1 className='text-xl font-semibold mb-1'>Detect Deepfake Video</h1>
						<div className="relative bg-white/5 border border-white/10 rounded-lg pt-8 px-4 pb-4 mb-8">
							<CodeBlock
								code={videoAnalyser}
								language="typescript"
							/>
							<button
								onClick={() =>
									handleCopy(
										videoAnalyser,
										'video-code'
									)
								}
								className="absolute top-3 right-3 text-white text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md"
							>
								{copied === 'video-code' ? 'Copied' : <Copy className="w-4 h-4" />}
							</button>
						</div>

						<Card className="bg-white/5 border border-white/10 rounded-2xl p-6">
							<h3 className="text-xl mb-4 font-semibold gradient-text">JSON Output</h3>
							<CodeBlock
								code={videoResponse}
								language="json"
							/>
						</Card>
					</section>

					{/* Wrapper: Deepfake Image Detection */}
					<section>
						<h1 className="text-4xl md:text-5xl font-light mb-4 geist-font">
							Deepfake <span className="gradient-text">Image Detection</span>
						</h1>
						<p className="text-gray-300 inter-font text-lg leading-relaxed mb-8">
							Scan images to detect facial morphing, GAN-generated visuals, or tampered photos. Our model analyses subtle patterns to catch AI-edited fakes.
						</p>

						<h1 className='text-xl font-semibold mb-1'>Installation</h1>
						<div className="relative bg-white/5 border border-white/10 rounded-lg pt-8 px-4 pb-4 mb-8">
							<CodeBlock
								code={installation}
								language="bash"
							/>
							<button
								onClick={() =>
									handleCopy(
										installation,
										'image-ins'
									)
								}
								className="absolute top-3 right-3 text-white text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md"
							>
								{copied === 'image-ins' ? 'Copied' : <Copy className="w-4 h-4" />}
							</button>
						</div>

						<h1 className='text-xl font-semibold mb-1'>Detect Deepfake Image</h1>
						<div className="relative bg-white/5 border border-white/10 rounded-lg pt-8 px-4 pb-4 mb-8">
							<CodeBlock
								code={imageAnalyser}
								language="typescript"
							/>
							<button
								onClick={() =>
									handleCopy(
										imageAnalyser,
										'image-code'
									)
								}
								className="absolute top-3 right-3 text-white text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md"
							>
								{copied === 'image-code' ? 'Copied' : <Copy className="w-4 h-4" />}
							</button>
						</div>

						<Card className="bg-white/5 border border-white/10 rounded-2xl p-6">
							<h3 className="text-xl mb-4 font-semibold gradient-text">JSON Output</h3>
							<CodeBlock
								code={imageResponse}
								language="json"
							/>
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
						<div className="relative bg-white/5 border border-white/10 rounded-lg pt-8 px-4 pb-4 mb-8">
							<CodeBlock
								code={installation}
								language="bash"
							/>
							<button
								onClick={() =>
									handleCopy(
										installation,
										'article-ins'
									)
								}
								className="absolute top-3 right-3 text-white text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md"
							>
								{copied === 'article-ins' ? 'Copied' : <Copy className="w-4 h-4" />}
							</button>
						</div>

						<h1 className='text-xl font-semibold mb-1'>Detect Deepfake Video</h1>
						<div className="relative bg-white/5 border border-white/10 rounded-lg pt-8 px-4 pb-4 mb-8">
							<CodeBlock
								code={articleAnalyser}
								language="typescript"
							/>
							<button
								onClick={() =>
									handleCopy(
										articleAnalyser,
										'article-code'
									)
								}
								className="absolute top-3 right-3 text-white text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md"
							>
								{copied === 'article-code' ? 'Copied' : <Copy className="w-4 h-4" />}
							</button>
						</div>

						<Card className="bg-white/5 border border-white/10 rounded-2xl p-6">
							<h3 className="text-xl mb-4 font-semibold gradient-text">JSON Output</h3>
							<CodeBlock
								code={articleResponse}
								language="json"
							/>
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
							<div className="flex flex-col md:flex-row justify-between items-center gap-6">
								<div className="w-full md:w-1/2">
									<h3 className="text-2xl font-semibold gradient-text mb-2">Step 1: Install</h3>
									<p className="text-gray-300 text-lg inter-font">
										Install the NoirSight Extension from the Chrome Web Store and pin it to your toolbar.
									</p>
								</div>
								<div className="w-full md:w-1/2 flex justify-end">
									<Card className="bg-white/5 border border-white/10 rounded-2xl p-3 w-full md:w-[80%]">
										<img
											src="eye.png"
											alt="Install Extension"
											className="rounded-lg border border-white/10 w-full"
										/>
									</Card>
								</div>
							</div>

							{/* Step 2 */}
							<div className="flex flex-col md:flex-row justify-between items-center gap-6">
								<div className="w-full md:w-1/2">
									<h3 className="text-2xl font-semibold gradient-text mb-2">Step 2: Scan Article</h3>
									<p className="text-gray-300 text-lg inter-font">
										While reading an article, click the extension icon.
									</p>
								</div>
								<div className="w-full md:w-1/2 flex justify-end">
									<Card className="bg-white/5 border border-white/10 rounded-2xl p-3 w-full md:w-[80%]">
										<img
											src="/ss1.png"
											alt="Scan Article"
											className="rounded-lg border border-white/10 w-full"
										/>
									</Card>
								</div>
							</div>

							{/* Step 3 */}
							<div className="flex flex-col md:flex-row justify-between items-center gap-6">
								<div className="w-full md:w-1/2">
									<h3 className="text-2xl font-semibold gradient-text mb-2">Step 3: See Statistics</h3>
									<p className="text-gray-300 text-lg inter-font">
										You'll instantly see AI-verified credibility scores right below the headline.
									</p>
								</div>
								<div className="w-full md:w-1/2 flex justify-end">
									<Card className="bg-white/5 border border-white/10 rounded-2xl p-3 w-full md:w-[80%]">
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