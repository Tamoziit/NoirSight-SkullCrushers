import { useState } from "react";
import ThreeBackground from "./ThreeBackground";
import TypingText from "./TypingText.tsx";
import { UserButton } from "@civic/auth-web3/react";
import { uploadBlobToCloudinary } from "@/utils/uploadToCloudinary";
import { ArticleAnalyser, DeepfakeImageAnalyser, DeepfakeVideoAnalyser } from "noirsight";

const Playground = () => {
  const [selectedUtility, setSelectedUtility] = useState("Article");
  const [inputValue, setInputValue] = useState("");
  const [threads, setThreads] = useState<any[]>([]);

  const handleSubmit = async () => {
    if (!inputValue && selectedUtility === "Article") return;

    const userEntry = { type: selectedUtility, content: inputValue };
    const placeholder = { user: userEntry, model: { content: "Processing...", loading: true } };

    setThreads((prev) => [...prev, placeholder]);
    setInputValue("");

    if (selectedUtility === "Article") {
      try {
        const articleAnalyzer = new ArticleAnalyser("gjyygscsc333");
        const response = await articleAnalyzer.analyseArticle(inputValue);

        if ("error" in response) {
          throw new Error(response.message || "Failed to analyze article.");
        }

        const { classification, reasons, related_articles } = response as any;

        const relevantArticles = related_articles.filter(
          (article) => article.verdict.toLowerCase() !== "not relevant"
        );

        const modelOutput = [
          `🧠 Classification: ${classification}`,
          `📌 Reasons:\n${reasons.map((r) => `• ${r}`).join("\n")}`,
          relevantArticles.length > 0
            ? `🔗 Related Articles:\n${relevantArticles
              .map((a) => `- ${a.url} (${a.verdict})`)
              .join("\n")}`
            : `🚫 No relevant articles found.`
        ].join("\n\n");

        setThreads((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].model = { content: modelOutput };
          return updated;
        });
      } catch (err) {
        setThreads((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].model = {
            content: `❌ Failed to analyze article. ${(err as Error).message}`
          };
          return updated;
        });
      }
    } else {
      // Fallback for non-article types
      setTimeout(() => {
        const modelResponse = {
          content: `Analyzing the ${selectedUtility.toLowerCase()}...`,
        };

        setThreads((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].model = modelResponse;
          return updated;
        });
      }, 2000);
    }
  };

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const mediaURL = URL.createObjectURL(file);
    const mediaType = file.type.startsWith("image") ? "image" : "video";
    const userEntry = { type: selectedUtility, content: mediaURL, mediaType };

    const placeholder = {
      user: userEntry,
      model: { content: "Processing media...", loading: true },
    };
    setThreads((prev) => [...prev, placeholder]);

    // Upload to Cloudinary
    const uploadedUrl = await uploadBlobToCloudinary(mediaURL, mediaType);
    if (!uploadedUrl) return;

    // Analyze using NoirSight
    try {
      const apiKey = "hbcjfgdsgfeufw";
      let response;

      if (mediaType === "video") {
        const videoAnalyser = new DeepfakeVideoAnalyser(apiKey, uploadedUrl);
        response = await videoAnalyser.analyseVideo();
      } else {
        const imageAnalyser = new DeepfakeImageAnalyser(apiKey, uploadedUrl);
        response = await imageAnalyser.analyseImage();
      }

      const { label, confidence } = response;

      const modelResponse = {
        content: `🧠 *AI Verdict:* ${label}\n🔍 *Confidence:* ${(confidence * 100).toFixed(2)}%`,
      };

      setThreads((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].model = modelResponse;
        return updated;
      });
    } catch (error) {
      setThreads((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].model = {
          content: "❌ Failed to analyze media. Please try again later.",
        };
        return updated;
      });
      console.error("Media analysis error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <ThreeBackground />

      {/* Top Nav */}
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

      {/* Threads Section */}
      <div className="relative z-10 max-w-5xl mx-auto mt-8 px-6 space-y-6 pb-40">
        {threads.map((thread, idx) => (
          <div key={idx} className="space-y-4">
            <div className="flex justify-end">
              <div className="glass-card p-4 rounded-xl max-w-md text-right text-white inter-font">
                <strong className="block mb-1 text-gray-400">You:</strong>
                {thread.user.mediaType === "image" ? (
                  <img src={thread.user.content} alt="uploaded" className="rounded-md max-h-40 mx-auto" />
                ) : thread.user.mediaType === "video" ? (
                  <video src={thread.user.content} controls className="rounded-md max-h-40 mx-auto" />
                ) : (
                  <span>{thread.user.content}</span>
                )}
              </div>
            </div>

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

      {/* Bottom Input Area */}
      <div
        className={`z-10 px-6 ${threads.length === 0
          ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          : "fixed bottom-4 left-0 right-0"
          }`}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="relative w-full sm:w-auto">
            <select
              value={selectedUtility}
              onChange={(e) => setSelectedUtility(e.target.value)}
              className="glass-card bg-black/40 text-white border border-white/20 px-4 py-2 rounded-md text-sm appearance-none w-full pr-10"
            >
              <option value="Article">📰 Article</option>
              <option value="Image">📷 Image</option>
              <option value="Video">🎥 Video</option>
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
              ▼
            </div>
          </div>

          {selectedUtility === "Article" ? (
            <div className="flex w-full">
              <input
                type="text"
                className="flex-1 px-4 py-2 rounded-l-md inter-font bg-black/50 text-white border border-white/20"
                placeholder="Paste article URL..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button onClick={handleSubmit} className="enhanced-primary-button px-4 rounded-r-md">
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