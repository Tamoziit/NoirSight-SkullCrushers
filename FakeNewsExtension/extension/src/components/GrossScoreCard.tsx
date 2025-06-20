import { grossAnalysis } from "../constants/constants";
import type { GrossScoreProps } from "../types";

const GrossScoreCard = ({ grossScore }: GrossScoreProps) => {
	const getDetails = () => {
		if (grossScore >= 70.0 && grossScore <= 100) return grossAnalysis[0];
		else if (grossScore >= 40.0 && grossScore < 70.0) return grossAnalysis[1];
		else return grossAnalysis[2];
	};

	return (
		<div className="flex flex-col gap-2 justify-center items-center w-full">
			<span className={`text-5xl font-bold ${getDetails().color}`}>
				{grossScore}%
			</span>
			<p
				className="text-lg text-gray-200 text-center"
				dangerouslySetInnerHTML={{ __html: getDetails().message as string }}
			/>
		</div>
	);
};

export default GrossScoreCard;
