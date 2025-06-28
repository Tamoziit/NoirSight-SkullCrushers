import ThreeBackground from '../components/ThreeBackground';
import { Link } from 'react-router-dom';
import { UserButton } from '@civic/auth-web3/react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black">
      <ThreeBackground />

      {/* Navigation */}
      <nav className="relative z-10 w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/eye.png" alt="Noir Sight Logo" className="w-6 h-6" />
            <span className="geist-font text-xl font-bold text-white">Noir Sight</span>
          </div>
          <div className="flex items-center space-x-4">
            <UserButton />
          </div>
        </div>
      </nav>



      {/* 404 Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="geist-font text-8xl font-bold text-white mb-4 tracking-tight">404</h1>
          <h2 className="geist-font text-3xl md:text-4xl font-light text-white mb-6">Page Not Found</h2>
          <p className="inter-font text-gray-300 max-w-lg mx-auto mb-10 text-sm md:text-base">
            Oops! The page you’re looking for doesn’t exist or has been moved. But don’t worry —
            our AI is on the case.
          </p>

          <Link
            to="/"
            className="enhanced-primary-button px-6 py-3 text-white rounded-lg font-medium text-sm min-w-40 inter-font"
          >
            🔙 Back to Home
          </Link>
        </div>

        {/* Optional fun glass card */}
        <div className="glass-card rounded-2xl p-6 mt-12 text-center max-w-sm">
          <div className="project-image rounded-xl h-32 mb-4 flex items-center justify-center bg-gradient-to-br from-pink-400/20 to-purple-400/10">
            <span className="text-white text-4xl">🤖</span>
          </div>
          <h3 className="text-lg font-medium text-white mb-2 geist-font">AI at Work</h3>
          <p className="text-gray-300 text-sm inter-font">
            We’re constantly scanning the web for misinformation — even lost pages like this!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
