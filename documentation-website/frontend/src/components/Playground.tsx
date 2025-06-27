import { useState } from "react";
import ThreeBackground from "./ThreeBackground";
import TypingText from "./TypingText";
import { UserButton } from "@civic/auth-web3/react";
import { uploadBlobToCloudinary } from "@/utils/uploadToCloudinary";
import { ArticleAnalyser, DeepfakeImageAnalyser, DeepfakeVideoAnalyser } from "noirsight";

// Types
interface Thread {
  user: {
    type: string;
    content: string;
    mediaType?: "image" | "video";
  };
  model: {
    content: string;
    loading?: boolean;
  };
}

interface ArticleResponse {
  classification: string;
  reasons: string[];
  related_articles: Array<{
    url: string;
    verdict: string;
  }>;
}

type UtilityType = "Article" | "Image" | "Video";

const Playground = () => {
  const [selectedUtility, setSelectedUtility] = useState<UtilityType>("Article");
  const [inputValue, setInputValue] = useState("");
  const [threads, setThreads] = useState<Thread[]>([]);
  
  const API_KEY = import.meta.env.VITE_NOIR_SIGHT_API_KEY;
  const USER_ID = import.meta.env.VITE_NOIR_SIGHT_USER_ID;

  const createThread = (userEntry: Thread["user"], initialModelContent = "Processing...") => {
    const newThread: Thread = {
      user: userEntry,
      model: { content: initialModelContent, loading: true }
    };
    setThreads(prev => [...prev, newThread]);
    return threads.length; // Return index for updating later
  };

  const updateThread = (index: number, modelContent: string) => {
    setThreads(prev => {
      const updated = [...prev];
      updated[index].model = { content: modelContent };
      return updated;
    });
  };

  const handleArticleAnalysis = async (text: string) => {
    try {
      const articleAnalyzer = new ArticleAnalyser(API_KEY, USER_ID);
      const response = await articleAnalyzer.analyseArticle(text);

      if ("error" in response) {
        throw new Error(response.message || "Failed to analyze article.");
      }

      const { classification, reasons, related_articles } = response as ArticleResponse;

      const relevantArticles = related_articles.filter(
        article => article.verdict.toLowerCase() !== "not relevant"
      );

      const modelOutput = [
        `🧠 Classification: ${classification}`,
        `📌 Reasons:\n${reasons.map(r => `• ${r}`).join("\n")}`,
        relevantArticles.length > 0
          ? `🔗 Related Articles:\n${relevantArticles
              .map(a => `- ${a.url} (${a.verdict})`)
              .join("\n")}`
          : `🚫 No relevant articles found.`
      ].join("\n\n");

      return modelOutput;
    } catch (error) {
      throw new Error(`❌ Failed to analyze article. ${(error as Error).message}`);
    }
  };

  const handleMediaAnalysis = async (url: string, mediaType: "image" | "video") => {
    try {
      let response;

      if (mediaType === "video") {
        const videoAnalyser = new DeepfakeVideoAnalyser(API_KEY, USER_ID);
        response = await videoAnalyser.analyseVideo(url);
      } else {
        const imageAnalyser = new DeepfakeImageAnalyser(API_KEY, USER_ID);
        response = await imageAnalyser.analyseImage(url);
      }

      const { label, confidence } = response;
      return `🧠 *AI Verdict:* ${label}\n🔍 *Confidence:* ${(confidence * 100).toFixed(2)}%`;
    } catch (error) {
      throw new Error("❌ Failed to analyze media. Please try again later.");
    }
  };

  const handleSubmit = async () => {
    if (!inputValue || selectedUtility !== "Article") return;

    const userEntry = { type: selectedUtility, content: inputValue };
    const threadIndex = createThread(userEntry);
    setInputValue("");

    try {
      const result = await handleArticleAnalysis(inputValue);
      updateThread(threadIndex, result);
    } catch (error) {
      updateThread(threadIndex, (error as Error).message);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const mediaURL = URL.createObjectURL(file);
    const mediaType: "image" | "video" = file.type.startsWith("image") ? "image" : "video";
    const userEntry: Thread["user"] = { 
      type: selectedUtility, 
      content: mediaURL, 
      mediaType 
    };

    const threadIndex = createThread(userEntry, "Processing media...");

    try {
      // Upload to Cloudinary
      const uploadedUrl = await uploadBlobToCloudinary(mediaURL, mediaType);
      
      if (!uploadedUrl) {
        throw new Error("Failed to upload media");
      }

      // Analyze using NoirSight
      const result = await handleMediaAnalysis(uploadedUrl, mediaType);
      updateThread(threadIndex, result);
    } catch (error) {
      updateThread(threadIndex, (error as Error).message);
      console.error("Media analysis error:", error);
    }
  };

  const renderMediaContent = (thread: Thread) => {
    if (thread.user.mediaType === "image") {
      return (
        <img 
          src={thread.user.content} 
          alt="uploaded" 
          className="rounded-md max-h-40 mx-auto" 
        />
      );
    }
    
    if (thread.user.mediaType === "video") {
      return (
        <video 
          src={thread.user.content} 
          controls 
          className="rounded-md max-h-40 mx-auto" 
        />
      );
    }
    
    return <span>{thread.user.content}</span>;
  };

  const utilityOptions = [
    { value: "Article", label: "📰 Article" },
    { value: "Image", label: "📷 Image" },
    { value: "Video", label: "🎥 Video" }
  ];

  return (
    <div className="min-h-screen bg-black">
      <ThreeBackground />

      {/* Navigation */}
      <nav className="relative z-10 w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            className="enhanced-primary-button px-4 py-2 rounded-md text-white text-sm inter-font"
            onClick={() => window.history.back()}
          >
            ← Go Back
          </button>
          <div className="flex items-center space-x-4">
            <UserButton />
          </div>
        </div>
      </nav>

      {/* Threads Display */}
      <div className="relative z-10 max-w-5xl mx-auto mt-8 px-6 space-y-6 pb-40">
        {threads.map((thread, idx) => (
          <div key={idx} className="space-y-4">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="glass-card p-4 rounded-xl max-w-md text-right text-white inter-font">
                <strong className="block mb-1 text-gray-400">You:</strong>
                {renderMediaContent(thread)}
              </div>
            </div>

            {/* AI Response */}
            <div className="flex justify-start">
              <div className="glass-card p-4 rounded-xl max-w-md text-left text-gray-300 inter-font">
                <strong className="block mb-1 text-white">NoirSight:</strong>
                {thread.model.loading ? (
                  <span className="italic text-gray-400">Typing...</span>
                ) : (
                  <TypingText text={thread.model.content} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className={`z-10 px-6 ${
        threads.length === 0
          ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          : "fixed bottom-4 left-0 right-0"
      }`}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Utility Selector */}
          <div className="relative w-full sm:w-auto">
            <select
              value={selectedUtility}
              onChange={(e) => setSelectedUtility(e.target.value as UtilityType)}
              className="glass-card bg-black/40 text-white border border-white/20 px-4 py-2 rounded-md text-sm appearance-none w-full pr-10"
            >
              {utilityOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
              ▼
            </div>
          </div>

          {/* Input Based on Selected Utility */}
          {selectedUtility === "Article" ? (
            <div className="flex w-full">
              <input
                type="text"
                className="flex-1 px-4 py-2 rounded-l-md inter-font bg-black/50 text-white border border-white/20"
                placeholder="Paste article URL..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              />
              <button 
                onClick={handleSubmit} 
                className="enhanced-primary-button px-4 rounded-r-md"
                disabled={!inputValue.trim()}
              >
                📨
              </button>
            </div>
          ) : (
            <label className="enhanced-primary-button px-6 py-2 text-white rounded-lg cursor-pointer mx-auto">
              Upload {selectedUtility}
              <input
                type="file"
                accept={selectedUtility === "Image" ? "image/*" : "video/*"}
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playground;