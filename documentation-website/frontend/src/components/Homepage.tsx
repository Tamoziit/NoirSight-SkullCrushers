import ThreeBackground from './ThreeBackground';
import { Link } from 'react-router-dom';
import { UserButton } from '@civic/auth-web3/react';


const Homepage = () => {
  return (
    <div className="min-h-screen bg-black">
      <ThreeBackground />

      {/* Navigation */}
      <nav className="relative z-10 w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left: Logo */}
          <div className="flex items-center space-x-3">
            <img src="/eye.png" alt="Noir Sight Logo" className="w-6 h-6" />
            <span className="geist-font text-xl font-bold text-white">Noir Sight</span>
          </div>

          {/* Center: Docs & Playground */}
          <div className="flex space-x-6">
            <Link
              to="/docs"
              className="text-sm text-gray-300 hover:text-white transition-colors inter-font"
            >
              Docs
            </Link>
            <Link
              to="/playground"
              className="text-sm text-gray-300 hover:text-white transition-colors inter-font"
            >
              Playground
            </Link>
          </div>

          {/* Right: User Button */}
          <div className="flex items-center space-x-4">
            <UserButton />
          </div>
        </div>
      </nav>



      <div className="relative z-10 divider"></div>

      {/* Hero Section */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8 float-animation">
            <h1 className="md:text-6xl lg:text-7xl leading-[1.1] geist-font text-5xl font-light text-white tracking-tight mb-4">
              Combating Digital Deception with
              <span className="gradient-text block tracking-tight">AI-Powered Detection</span>
            </h1>
            <p className="md:text-xl max-w-3xl leading-relaxed inter-font text-lg font-light text-gray-300 mr-auto ml-auto">
              We're building a next-gen platform to detect deepfake media and verify news authenticity in real time.
              Using advanced machine learning and vision models, we aim to empower users against misinformation.
            </p>
          </div>
          <div className='flex flex-col sm:flex-row justify-center items-center gap-2'>
            <Link
              to="/playground"
              className="enhanced-primary-button px-6 py-3 text-white rounded-lg font-medium text-sm min-w-40 inter-font"
            >
              Go to Playground
            </Link>
            <Link
              to="/apikey"
              className="enhanced-primary-button px-6 py-3 text-white rounded-lg font-medium text-sm min-w-40 inter-font ml-4"
            >
              Create API Key
            </Link>
          </div>


          <div className="mb-16"></div>

          {/* Featured Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">

            {/* Fake News Detection Extension */}
            <div className="glass-card rounded-2xl p-6 text-left">
              <div className="project-image rounded-xl h-32 mb-4 flex items-center justify-center bg-gradient-to-br from-red-400/20 to-yellow-400/10">
                <span className="text-white text-xl font-semibold">📰</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2 geist-font">Fake News Detection Extension</h3>
              <p className="text-gray-300 text-sm inter-font mb-4">
                A browser extension that flags misleading news content by verifying sources using Google Search and LLM summaries.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="skill-badge px-2 py-1 rounded text-xs text-gray-300">Gemini API</span>
                <span className="skill-badge px-2 py-1 rounded text-xs text-gray-300">Google CSE</span>
                <span className="skill-badge px-2 py-1 rounded text-xs text-gray-300">Chrome Extension</span>
              </div>
            </div>

            {/* Deepfake Wrapper API */}
            <div className="glass-card rounded-2xl p-6 text-left">
              <div className="project-image rounded-xl h-32 mb-4 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/10">
                <span className="text-white text-xl font-semibold">🎭</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2 geist-font">Deepfake Detection Wrapper</h3>
              <p className="text-gray-300 text-sm inter-font mb-4">
                A backend API service that identifies manipulated media using image forensics and video frame analysis.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="skill-badge px-2 py-1 rounded text-xs text-gray-300">OpenCV</span>
                <span className="skill-badge px-2 py-1 rounded text-xs text-gray-300">Flask</span>
                <span className="skill-badge px-2 py-1 rounded text-xs text-gray-300">YOLOv8</span>
              </div>
            </div>

            {/* Thread Analyzer */}
            <div className="glass-card rounded-2xl p-6 text-left">
              <div className="project-image rounded-xl h-32 mb-4 flex items-center justify-center bg-gradient-to-br from-blue-400/20 to-cyan-400/10">
                <span className="text-white text-xl font-semibold">🔍</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2 geist-font">Thread Analyzer</h3>
              <p className="text-gray-300 text-sm inter-font mb-4">
                Analyzes comment threads and article responses to detect toxicity, bias, and bot-like behavior in real time.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="skill-badge px-2 py-1 rounded text-xs text-gray-300">NLP</span>
                <span className="skill-badge px-2 py-1 rounded text-xs text-gray-300">Transformers</span>
                <span className="skill-badge px-2 py-1 rounded text-xs text-gray-300">Perspective API</span>
              </div>
            </div>

            {/* Interactive Playground */}
            <div className="glass-card rounded-2xl p-6 text-left">
              <div className="project-image rounded-xl h-32 mb-4 flex items-center justify-center bg-gradient-to-br from-green-400/20 to-lime-400/10">
                <span className="text-white text-xl font-semibold">🧪</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2 geist-font">Detection Playground</h3>
              <p className="text-gray-300 text-sm inter-font mb-4">
                A sandbox to test your own images, videos, or links and see if they’re real or AI-generated—live and modular.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="skill-badge px-2 py-1 rounded text-xs text-gray-300">React</span>
                <span className="skill-badge px-2 py-1 rounded text-xs text-gray-300">Flask</span>
                <span className="skill-badge px-2 py-1 rounded text-xs text-gray-300">API Integration</span>
              </div>
            </div>

          </div>


          <div className="divider mb-16"></div>


          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-light text-white mb-1 geist-font tracking-tight">99.2%</div>
              <div className="text-gray-400 text-sm inter-font font-normal">Image Detection Accuracy</div>
            </div>

            <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

            <div>
              <div className="text-3xl md:text-4xl font-light text-white mb-1 geist-font tracking-tight">Real-Time</div>
              <div className="text-gray-400 text-sm inter-font font-normal">Fake News Verification</div>
            </div>

            <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400">
        </div>
      </div>
    </div>
  );
};

export default Homepage;