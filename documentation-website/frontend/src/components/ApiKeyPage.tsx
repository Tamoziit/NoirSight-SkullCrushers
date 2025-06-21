import { useState } from "react";
import { Link } from "react-router-dom";
import ThreeBackground from "../components/ThreeBackground";

const ApiKeyPage = () => {
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const handleGenerateKey = () => {
    if (!projectName.trim()) return alert("Please enter a project name.");
    
    setLoading(true);
    setApiKey(null);

    setTimeout(() => {
      const dummyKey = `sk_${Math.random().toString(36).substring(2, 10)}${Date.now().toString().slice(-6)}`;
      setApiKey(dummyKey);
      setLoading(false);
    }, 2000); 
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <ThreeBackground />

      {/* Top Nav */}
      <nav className="relative z-10 w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/eye.png" alt="Logo" className="w-6 h-6" />
            <span className="geist-font text-xl font-bold text-white">Noir Sight</span>
          </div>
          <Link
            to="/"
            className="enhanced-primary-button px-4 py-2 rounded-md text-white text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* API Key Section */}
      <div className="relative z-10 px-6 py-20 max-w-4xl mx-auto">
        <h1 className="text-4xl geist-font font-semibold mb-6">🔐 Generate API Key</h1>
        <p className="text-gray-300 inter-font mb-6">
          Create a new API key by entering your project name below.
        </p>

        <div className="glass-card rounded-xl p-6">
          <label className="block text-sm text-gray-400 mb-2 inter-font">Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter your project name"
            className="w-full z-[60] px-4 py-2 mb-4 rounded-md bg-black/40 border border-white/20 text-white inter-font"
          />

          <button
            onClick={handleGenerateKey}
            className="enhanced-primary-button px-4 py-2 rounded-md text-sm text-white"
            disabled={loading}
          >
            {loading ? "Generating..." : "🔑 Generate API Key"}
          </button>

          {apiKey && (
            <div className="mt-6 text-sm text-gray-300 font-mono">
              <span className="text-gray-400">Your API Key:</span><br />
              <code className="text-lime-400">{apiKey}</code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiKeyPage;
