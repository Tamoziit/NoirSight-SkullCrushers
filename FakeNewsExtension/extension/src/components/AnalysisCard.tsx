import { FiExternalLink } from "react-icons/fi";
import type { OutputProps } from "../types";
import { flagStyles } from "../constants/constants";

const AnalysisCard = ({ url, flag, reasons }: OutputProps) => {
	const styles = flagStyles[flag];
	const urlHost = new URL(url).hostname.replace("www.", "");
	const Icon = styles.icon;

	return (
		<div className="rounded-2xl border p-4 shadow-sm transition hover:shadow-lg glassmorphic-2 flex flex-col gap-3">
			<a href={url} target="_blank" rel="noopener noreferrer" className="relative group">
				<img
					src={`https://www.google.com/s2/favicons?sz=128&domain_url=${url}`}
					alt="preview"
					className="rounded-xl w-full h-30 object-cover"
				/>
				<div className="absolute inset-0 bg-black/10 rounded-xl group-hover:bg-black/20 transition" />
			</a>

			<div className="flex items-center gap-2">
				<Icon className={`text-2xl ${styles.color}`} />
				<span className={`text-base font-semibold ${styles.color} bg-transparent`}>{styles.label}</span>
			</div>

			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className="text-sm text-blue-500 hover:underline flex items-center gap-1 truncate"
			>
				{urlHost}
				<FiExternalLink />
			</a>

			<ul className="list-disc list-inside text-sm text-gray-400 pl-2 space-y-1">
				{reasons.map((reason, i) => (
					<li key={i}>{reason}</li>
				))}
			</ul>
		</div>
	)
}

export default AnalysisCard;