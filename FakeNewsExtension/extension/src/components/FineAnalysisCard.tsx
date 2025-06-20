import type { FineAnalysis } from "../types";

const FineAnalysisCard = ({ ciLow, ciHigh, confidence }: FineAnalysis) => {
	return (
		<div className="flex flex-col gap-2 justify-center items-center w-full mt-2">
			<h1 className="text-base font-light text-gray-300 uppercase">Fine-Tuned Analysis</h1>
			<div className="h-[0.5px] bg-gray-400 w-[100%] -mt-1 mb-1" />

			<div className="flex flex-col gap-0.5 justify-center items-start w-full">
				<p className="text-base text-gray-300">The Accuracy of the article lies between:</p>
				<span className="text-lg font-medium text-blue-400/70">{ciLow}% - {ciHigh}%</span>
			</div>

			<div className="flex gap-1 justify-start items-center w-full">
				<p className="text-base font-medium text-gray-300">Confidence:</p>
				<span className="text-lg font-semibold text-blue-400/80">{confidence}%</span>
			</div>
		</div>
	)
}

export default FineAnalysisCard;