import { useState } from "react";
import { Link } from "react-router-dom";
import ThreeBackground from "../components/ThreeBackground";
import useCreateProject from "@/hooks/useCreateProject";
import ApiKeyCard from "./ApiKeyCard";
import { ApiKeyData } from "@/types";

const ApiKeyPage = () => {
  const [inputs, setInputs] = useState({
    company: "",
    projectName: ""
  });
  const [apiData, setApiData] = useState<ApiKeyData | null>(null);
  const { loading, createProject } = useCreateProject();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await createProject(inputs);
    if (data) {
      setApiData(data);
    }
  }

  console.log(apiData);

  return (
    <div className="min-h-screen bg-black text-white">
      <ThreeBackground />

      <nav className="relative z-10 w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/eye.png" alt="Logo" className="w-6 h-6" />
            <span className="geist-font text-xl font-bold text-white">Noir Sight</span>
          </div>
          <Link to="/" className="enhanced-primary-button px-4 py-2 rounded-md text-white text-sm">
            ← Back to Home
          </Link>
        </div>
      </nav>

      <div className="relative z-10 px-6 py-20 max-w-4xl mx-auto">
        <h1 className="text-4xl geist-font font-semibold mb-6">🔐 Generate API Key</h1>
        <p className="text-gray-200 font-semibold inter-font mb-6">Create a new API key by entering your project name below.</p>

        <form className="glass-card rounded-xl p-6 relative z-50" onSubmit={handleSubmit} style={{ pointerEvents: "auto" }}>
          <div className="w-full">
            <label className="block text-base text-gray-400 mb-2 inter-font">Company</label>
            <input
              type="text"
              value={inputs.company}
              onChange={(e) => setInputs({ ...inputs, company: e.target.value })}
              placeholder="Enter your company name"
              className="w-full relative z-50 px-4 py-2 mb-4 rounded-md bg-black/40 border border-white/20 text-white inter-font focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ pointerEvents: "auto" }}
              autoComplete="off"
            />
          </div>

          <div className="w-full">
            <label className="block text-base text-gray-400 mb-2 inter-font">Project Name</label>
            <input
              type="text"
              value={inputs.projectName}
              onChange={(e) => setInputs({ ...inputs, projectName: e.target.value })}
              placeholder="Enter your project name"
              className="w-full relative z-50 px-4 py-2 mb-4 rounded-md bg-black/40 border border-white/20 text-white inter-font focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ pointerEvents: "auto" }}
              autoComplete="off"
            />
          </div>

          <button
            className="enhanced-primary-button px-4 py-2 rounded-md text-sm text-white relative z-50"
            disabled={loading}
            style={{ pointerEvents: "auto" }}
            type="submit"
          >
            {loading ? "Generating..." : "🔑 Generate API Key"}
          </button>
        </form>

        {apiData && (
          <ApiKeyCard {...apiData} />
        )}
      </div>
    </div>
  )
}

export default ApiKeyPage