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

            <div className="relative bg-white/5 border border-white/10 rounded-lg p-4 mb-8">
                <code className="text-sm text-gray-200">
                curl -X POST https://api.noirsight.ai/deepfake/analyze-video <br />
                &nbsp;&nbsp;-H "x-api-key: YOUR_API_KEY" <br />
                &nbsp;&nbsp;-F "file=@path/to/video.mp4"
                </code>
                <button
                onClick={() =>
                    handleCopy(
                    'curl -X POST https://api.noirsight.ai/deepfake/analyze-video -H "x-api-key: YOUR_API_KEY" -F "file=@path/to/video.mp4"',
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
    "result": "Deepfake Detected",
    "confidence": 0.92,
    "timestamp": "2025-06-21T12:34:56Z"
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

            <div className="relative bg-white/5 border border-white/10 rounded-lg p-4 mb-8">
                <code className="text-sm text-gray-200">
                curl -X POST https://api.noirsight.ai/deepfake/analyze-image <br />
                &nbsp;&nbsp;-H "x-api-key: YOUR_API_KEY" <br />
                &nbsp;&nbsp;-F "file=@path/to/image.jpg"
                </code>
                <button
                onClick={() =>
                    handleCopy(
                    'curl -X POST https://api.noirsight.ai/deepfake/analyze-image -H "x-api-key: YOUR_API_KEY" -F "file=@path/to/image.jpg"',
                    'image'
                    )
                }
                className="absolute top-3 right-3 text-white text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md"
                >
                {copied === 'image' ? 'Copied' : <Copy className="w-4 h-4" />}
                </button>
            </div>

            <Card className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl mb-4 font-semibold gradient-text">JSON Output</h3>
                <pre className="bg-black text-green-400 text-sm p-4 rounded-lg overflow-auto">
    {`{
    "result": "Image Verified as Authentic",
    "confidence": 0.87,
    "timestamp": "2025-06-21T13:10:22Z"
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

            <div className="relative bg-white/5 border border-white/10 rounded-lg p-4 mb-8">
                <code className="text-sm text-gray-200 whitespace-pre-wrap font-mono">
                {`curl -X POST https://api.noirsight.ai/deepfake/analyze-article
                -H "x-api-key: YOUR_API_KEY"
                -H "Content-Type: application/json"
                -d '{"url": "https://example.com/news.html"}'`}
                </code>

                <button
                onClick={() =>
                    handleCopy(
                    `curl -X POST https://api.noirsight.ai/deepfake/analyze-article -H "x-api-key: YOUR_API_KEY" -H "Content-Type: application/json" -d '{\"url\": \"https://example.com/news.html\"}'`,
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
    "result": "Potentially AI-Generated",
    "confidence": 0.78,
    "source": "LLM cross-reference",
    "timestamp": "2025-06-21T14:22:08Z"
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
            <h3 className="text-xl font-semibold gradient-text mb-2">Step 2: Sign In</h3>
            <p className="text-gray-300 inter-font">
            Click the NoirSight icon and sign in using your wallet or Google to activate protection.
            </p>
        </div>
        <div className="md:w-1/3">
            <Card className="bg-white/5 border border-white/10 rounded-2xl p-3">
            <img
                src="/screenshots/step2.png"
                alt="Sign in"
                className="rounded-lg border border-white/10 w-full"
            />
            </Card>
        </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="md:w-2/3">
            <h3 className="text-xl font-semibold gradient-text mb-2">Step 3: Scan Article</h3>
            <p className="text-gray-300 inter-font">
            While reading an article, click the extension icon. You'll instantly see AI-verified credibility scores right below the headline.
            </p>
        </div>
        <div className="md:w-1/3">
            <Card className="bg-white/5 border border-white/10 rounded-2xl p-3">
            <img
                src="/screenshots/step3.png"
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