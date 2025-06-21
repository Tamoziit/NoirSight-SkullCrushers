
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThreeSpyModel from './ThreeSpyModel';
import TypingEffect from './TypingEffect';
import LoginOverlay from './LoginOverlay';
import SignupOverlay from './SignupOverlay';
import { Eye, Shield, Search, AlertTriangle } from 'lucide-react';
import ThreeBackground from './ThreeBackground';
import { UserButton } from '@civic/auth/react';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetStarted = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-black">
      <ThreeBackground />
      <ThreeSpyModel />
      
      {/* Navigation */}
      <nav className="relative z-10 w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/eye.png" alt="Noir Sight Logo" className="w-6 h-6" />
            <span className="geist-font text-xl font-bold text-white">Noir Sight</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-gray-300 hover:text-white transition-colors inter-font text-sm"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-gray-300 hover:text-white transition-colors inter-font text-sm"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-gray-300 hover:text-white transition-colors inter-font text-sm"
            >
              Contact
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <UserButton />
          </div>
          {/* <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowLogin(true)}
              className="enhanced-primary-button px-4 py-2 text-white rounded-lg font-medium text-sm inter-font"
            >
              Login
            </button>
            <button 
              onClick={() => setShowSignup(true)}
              className="enhanced-glass-button px-4 py-2 rounded-lg text-white text-sm font-medium inter-font"
            >
              Sign Up
            </button>
          </div> */}
        </div>
      </nav>

      <div className="relative z-10 divider"></div>

      {/* Typing Effect Section */}
      <div className="relative z-10 w-full px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white geist-font tracking-tight">
            <TypingEffect
              prefix="Real-time"
              words={[
                "Deepfake Detection System",
                "Fake News Verification Engine",
                "AI-Powered Media Scanner",
                "Content Authenticity Analyzer",
                "Visual Integrity Assessment Tool"
              ]}
              typingSpeed={80}
              deletingSpeed={40}
              pauseDuration={2500}
            />
          </h1>
          <p className="text-gray-300 inter-font text-lg mt-4 max-w-2xl">
            Real-time surveillance powered by cutting-edge AI technology
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
            <h1 className="text-4xl text-center py-6 font-bold">Noir Sight — Eye of Truth</h1>
            <EyeViewer />
          </div> */}
          <div className="mb-8 float-animation">
            <p className="md:text-xl max-w-3xl leading-relaxed inter-font text-lg font-light text-gray-300 mx-auto mb-8">
              Cutting-edge surveillance technology powered by AI. Monitor, analyze, and detect threats 
              with precision and stealth in real-time environments.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => scrollToSection('about')}
              className="enhanced-primary-button px-6 py-3 text-white rounded-lg font-medium text-sm min-w-40 inter-font"
            >
              Learn More
            </button>
            {/* <button 
              onClick={() => setShowSignup(true)}
              className="enhanced-glass-button min-w-40 inter-font text-sm font-medium text-white rounded-lg pt-3 pr-6 pb-3 pl-6"
            >
              Sign Up
            </button> */}
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="relative z-10 w-full py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Feature Card */}
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <img src="/eye.png" alt="Detection Icon" className="w-8 h-8 mr-3" />
                <h3 className="text-2xl font-bold text-white geist-font">Authenticity Intelligence</h3>
              </div>
              <p className="text-gray-300 inter-font leading-relaxed mb-6">
                Noir Sight uses cutting-edge AI to detect deepfakes, analyze media integrity, and flag misleading content in real-time.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                  <span className="text-gray-300 inter-font text-sm">AI-driven deepfake detection</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  <span className="text-gray-300 inter-font text-sm">Fake news validation using LLMs</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                  <span className="text-gray-300 inter-font text-sm">Reverse image lookup across the web</span>
                </div>
              </div>
            </div>

            {/* About Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6 geist-font tracking-tight">
                About <span className="gradient-text">Noir Sight</span>
              </h2>
              <p className="text-gray-300 inter-font text-lg leading-relaxed mb-6">
                Noir Sight is a hackathon-built AI-powered system that exposes fake visuals and misinformation with speed and accuracy.
                Built by a team passionate about truth and safety, we aim to provide automated tools to spot fake media before it spreads.
              </p>
              <p className="text-gray-300 inter-font leading-relaxed mb-8">
                From detecting tampered videos and AI-generated faces to validating news snippets against trustworthy sources,
                Noir Sight combines computer vision, natural language models, and search intelligence in a single modular system.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* Centered Get Started Button */}
      <div className="relative z-10 w-full py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <button
            onClick={handleGetStarted}
            className="enhanced-primary-button px-8 py-4 text-white rounded-lg font-medium text-lg inter-font"
          >
            Get Started Now
          </button>
        </div>
      </div>

      <div className="relative z-10 divider my-16"></div>

      {/* Services Section */}
      <section id="services" className="relative z-10 w-full py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6 geist-font tracking-tight">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-gray-300 inter-font text-lg max-w-3xl mx-auto">
              Comprehensive security solutions powered by cutting-edge AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-3 geist-font">Real-time Monitoring</h3>
              <p className="text-gray-300 text-sm inter-font">
                24/7 surveillance with instant threat detection and automatic alert systems for immediate response.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-3 geist-font">Behavioral Analysis</h3>
              <p className="text-gray-300 text-sm inter-font">
                Advanced AI algorithms analyze patterns and behaviors to predict and prevent security incidents.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-3 geist-font">Threat Prevention</h3>
              <p className="text-gray-300 text-sm inter-font">
                Proactive security measures that identify and neutralize threats before they can cause damage.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-3 geist-font">Incident Response</h3>
              <p className="text-gray-300 text-sm inter-font">
                Rapid response protocols with detailed incident reports and recovery assistance services.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 divider my-16"></div>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 w-full py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6 geist-font tracking-tight">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-300 inter-font text-lg mb-12">
            Ready to enhance your security? Contact our team of experts today.
          </p>
          
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 inter-font"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 inter-font"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 inter-font"
              />
              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 resize-none inter-font"
              ></textarea>
              <button
                type="submit"
                className="enhanced-primary-button w-full px-6 py-3 text-white rounded-lg font-medium text-sm inter-font"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3">
              <img src="/eye.png" alt="Noir Sight Logo" className="w-6 h-6" />
              <span className="geist-font text-xl font-bold text-white">Noir Sight</span>
            </div>
            <div className="text-gray-400 inter-font text-sm text-center md:text-right">
              <p>© 2024 Noir Sight. All rights reserved.</p>
              <p className="mt-1">Advanced Detection Intelligence System</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Login/Signup Overlays */}
      {showLogin && <LoginOverlay onClose={() => setShowLogin(false)} onSwitchToSignup={() => { setShowLogin(false); setShowSignup(true); }} />}
      {showSignup && <SignupOverlay onClose={() => setShowSignup(false)} onSwitchToLogin={() => { setShowSignup(false); setShowLogin(true); }} />}
    </div>
  );
};

export default LandingPage;
