import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import useGetAnalysis from "./hooks/useGetAnalysis";
import AnalysisCard from "./components/AnalysisCard";
import getGrossAnalysis from "./utils/getGrossAnalysis";
import GrossScoreCard from "./components/GrossScoreCard";
import getFineAnalysis from "./utils/getFineAnalysis";
import FineAnalysisCard from "./components/FineAnalysisCard";
import type { FineAnalysis, OutputProps } from "./types";
import SpyLoader from "./components/SpyLoader";
import HeaderAnimation from "./components/HeaderAnimation";

function App() {
  const [url, setUrl] = useState("");
  const [outputs, setOutputs] = useState<OutputProps[]>();
  const [grossScore, setGrossScore] = useState<number>(69);
  const [fineAnalysis, setFineAnalysis] = useState<FineAnalysis>(
    {
      ciLow: 0,
      ciHigh: 0,
      confidence: 0
    }
  );
  const { loading, analyse } = useGetAnalysis();

  const getTab = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Skipping if URL is restricted
    if (
      !tab?.id ||
      !tab.url ||
      tab.url.startsWith("chrome://") ||
      tab.url.startsWith("chrome-extension://")
    ) {
      console.log("Blocked: Cannot inject into this type of tab URL.");
      toast.error("Sorry! We cannot analyse this Webpage");
      return;
    }

    // Getting the current URL from the page context
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.location.href,
    });

    const sourceUrl = results[0]?.result;
    if (sourceUrl)
      setUrl(sourceUrl);
  };

  const getAnalysis = async () => {
    const data = await analyse(url);
    setOutputs(data);

    // Analysing results
    const counters = {
      C: 0,
      P: 0,
      I: 0
    }

    for (const item of data) {
      if (item.flag === "consistent") counters.C++;
      else if (item.flag === "partially-consistent") counters.P++;
      else if (item.flag === "inconsistent") counters.I++;
    }

    // Gross Analysis
    const score = getGrossAnalysis({ ...counters });
    setGrossScore(score);

    // Fine-tuned Heuristics
    const heuristics = getFineAnalysis({ ...counters });
    setFineAnalysis(heuristics);
  }

  useEffect(() => {
    getTab();
  }, []);

  console.log(url);
  console.log(outputs);
  console.log(fineAnalysis)

  return (
    <>
      <div className="min-h-screen w-[350px] p-4 bg-gradient-to-br from-gray-900 via-slate-900 to-black">
        <Header />

        <div className="pt-45 flex flex-col items-center justify-center w-full">
          {outputs ?
            outputs.length > 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 pb-4">
                {grossScore && <GrossScoreCard
                  grossScore={grossScore}
                />}

                {fineAnalysis && <FineAnalysisCard
                  {...fineAnalysis}
                />}

                <h1 className="text-base font-light text-gray-300 uppercase">Relevant Articles</h1>
                <div className="h-[0.5px] bg-gray-400 w-[100%] -mt-1 mb-1" />

                {outputs.map((item, _idx) => (
                  <AnalysisCard
                    key={_idx}
                    {...item}
                  />
                ))}
              </div>
            ) : (
              <div>
                <span>No Relevant Article found!</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3">
                {loading ? (
                  <SpyLoader />
                ) : (
                  <>
                    <HeaderAnimation />

                    <button
                      className="btn-primary px-6 py-3 text-xl font-semibold"
                      onClick={getAnalysis}
                      disabled={loading}
                    >
                      Analyse Article
                    </button>

                    <p className="text-center text-sm text-gray-400 pb-4">Know about the Factual & Circumstantial Authenticity of this Article with our curated AI-powered Fake New Detector</p>
                  </>
                )}
              </div>
            )}
        </div>
      </div>

      <Toaster />
    </>
  );
}

export default App;