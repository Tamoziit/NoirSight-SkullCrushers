import { useState } from 'react';
import { Copy, Check, Eye, EyeOff, Calendar, Building } from 'lucide-react';
import toast from 'react-hot-toast';
import { ApiKeyData } from '@/types';

const ApiKeyCard = ({ apiKey, company, projectName, userId, validity }: ApiKeyData) => {
	const [copiedField, setCopiedField] = useState<string | null>(null);
	const [showApiKey, setShowApiKey] = useState(false);
	const [showUserId, setShowUserId] = useState(false);

	const copyToClipboard = async (text: string, fieldName: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedField(fieldName);
			toast.success(`${fieldName} copied to clipboard!`);

			setTimeout(() => {
				setCopiedField(null);
			}, 2000);
		} catch (err) {
			toast.error('Failed to copy to clipboard');
			console.error('Copy failed:', err);
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	const maskText = (text: string, visibleChars: number = 4) => {
		if (text.length <= visibleChars * 2) return text;
		return `${text.slice(0, visibleChars)}${'*'.repeat(text.length - visibleChars * 2)}${text.slice(-visibleChars)}`;
	};

	const CopyButton = ({ text, fieldName, className = "" }: { text: string; fieldName: string; className?: string }) => (
		<button
			onClick={() => copyToClipboard(text, fieldName)}
			className={`p-2 rounded-lg transition-all duration-200 hover:bg-white/10 active:scale-95 ${className} z-10`}
			title={`Copy ${fieldName}`}
		>
			{copiedField === fieldName ? (
				<Check className="w-4 h-4 text-green-400" />
			) : (
				<Copy className="w-4 h-4 text-gray-400 hover:text-white" />
			)}
		</button>
	);

	const ToggleVisibilityButton = ({
		isVisible,
		onClick,
		className = ""
	}: {
		isVisible: boolean;
		onClick: () => void;
		className?: string;
	}) => (
		<button
			onClick={onClick}
			className={`p-2 rounded-lg transition-all duration-200 hover:bg-white/10 active:scale-95 ${className} z-20`}
			title={isVisible ? "Hide" : "Show"}
		>
			{isVisible ? (
				<EyeOff className="w-4 h-4 text-gray-400 hover:text-white" />
			) : (
				<Eye className="w-4 h-4 text-gray-400 hover:text-white" />
			)}
		</button>
	);

	return (
		<div className="glass-card rounded-xl p-6 mt-10 border border-white/10 backdrop-blur-sm bg-white/5">
			<div className="space-y-6">
				<div className="flex items-center gap-3 mb-6">
					<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
						<Building className="w-5 h-5 text-white" />
					</div>
					<div>
						<h3 className="text-xl font-semibold text-white">{projectName}</h3>
						<p className="text-gray-400 text-sm">{company}</p>
					</div>
				</div>

				<div className="space-y-3">
					<label className="text-sm font-medium text-gray-300">API Key</label>
					<div className="flex items-center gap-2 p-3 rounded-lg bg-black/20 border border-white/10">
						<code className="flex-1 text-white font-mono text-sm break-all">
							{showApiKey ? apiKey : maskText(apiKey)}
						</code>
						<div className="flex items-center gap-1">
							<ToggleVisibilityButton
								isVisible={showApiKey}
								onClick={() => setShowApiKey(!showApiKey)}
							/>
							<CopyButton text={apiKey} fieldName="API Key" />
						</div>
					</div>
				</div>

				<div className="space-y-3">
					<label className="text-sm font-medium text-gray-300">User ID</label>
					<div className="flex items-center gap-2 p-3 rounded-lg bg-black/20 border border-white/10">
						<code className="flex-1 text-white font-mono text-sm break-all">
							{showUserId ? userId : maskText(userId)}
						</code>
						<div className="flex items-center gap-1">
							<ToggleVisibilityButton
								isVisible={showUserId}
								onClick={() => setShowUserId(!showUserId)}
							/>
							<CopyButton text={userId} fieldName="User ID" />
						</div>
					</div>
				</div>

				<div className="space-y-3">
					<label className="text-sm font-medium text-gray-300">Valid Until</label>
					<div className="flex items-center gap-2 p-3 rounded-lg bg-black/20 border border-white/10">
						<Calendar className="w-4 h-4 text-gray-400" />
						<span className="flex-1 text-white text-sm">
							{formatDate(validity)}
						</span>
						<CopyButton text={validity} fieldName="Validity Date" />
					</div>
				</div>

				<div className="flex gap-3 pt-4 border-t border-white/10">
					<button
						onClick={() => copyToClipboard(apiKey, "API Key")}
						className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 text-white font-medium z-20"
					>
						<Copy className="w-4 h-4" />
						Copy API Key
					</button>
					<button
						onClick={() => copyToClipboard(userId, "User ID")}
						className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors duration-200 text-white font-medium z-20"
					>
						<Copy className="w-4 h-4" />
						Copy User ID
					</button>
				</div>
			</div>
		</div>
	);
};

export default ApiKeyCard;