import ApiKeyCard from "@/components/ApiKeyCard";
import ThreeBackground from "@/components/ThreeBackground";
import useCreateProject from "@/hooks/useCreateProject";
import { ApiKeyData } from "@/types";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaCheck, FaSpinner } from "react-icons/fa";

const PaymentSuccess = () => {
	const [searchParams] = useSearchParams();
	const sessionId = searchParams.get("session_id");
	const [apiData, setApiData] = useState<ApiKeyData>();
	const { loading, createProject } = useCreateProject();
	const hasFetched = useRef(false);

	const fetchApiData = async () => {
		if (!sessionId) return;
		const data = await createProject(sessionId);
		setApiData(data);
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
					<Link to="/home" className="enhanced-primary-button px-4 py-2 rounded-md text-white text-sm">
						← Back to Home
					</Link>
				</div>
			</nav>

			<div className="relative z-10 px-6 py-20 max-w-4xl mx-auto">
				{apiData ? (
					<ApiKeyCard
						{...apiData}
					/>
				) : (
					<div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8 max-w-2xl mx-auto">
						<div className="text-center mb-8">
							<div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
								<FaCheck className="w-8 h-8 text-green-400" />
							</div>
							<h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
							<p className="text-gray-400">Thank you for your subscription. Please confirm your payment details below.</p>
						</div>

						<div className="space-y-6">
							<div className="bg-gray-800/50 rounded-lg p-6">
								<h2 className="text-xl font-semibold text-white mb-4">Subscription Details</h2>
								
								<div className="space-y-3">
									<div className="flex justify-between">
										<span className="text-gray-400">Type:</span>
										<span className="text-white font-medium">Pro</span>
									</div>
									
									<div className="flex justify-between">
										<span className="text-gray-400">Duration:</span>
										<span className="text-white font-medium">3 months</span>
									</div>
									
									<div className="flex justify-between">
										<span className="text-gray-400">Amount:</span>
										<span className="text-white font-medium text-lg">₹299.99</span>
									</div>
								</div>
							</div>

							<div className="bg-gray-800/50 rounded-lg p-6">
								<h3 className="text-lg font-semibold text-white mb-3">Services Included</h3>
								<ul className="space-y-2">
									<li className="flex items-center text-gray-300">
										<FaCheck className="w-4 h-4 text-green-400 mr-3" />
										Deepfake Video Detection
									</li>
									<li className="flex items-center text-gray-300">
										<FaCheck className="w-4 h-4 text-green-400 mr-3" />
										Deepfake Image Detection
									</li>
									<li className="flex items-center text-gray-300">
										<FaCheck className="w-4 h-4 text-green-400 mr-3" />
										Article & Thread Contextual Analyzer
									</li>
								</ul>
							</div>

							{sessionId && (
								<div className="bg-gray-800/50 rounded-lg p-6">
									<h3 className="text-lg font-semibold text-white mb-3">Session Details</h3>
									<div className="flex flex-col justify-between items-start">
										<span className="text-gray-400">Session ID:</span>
										<code className="text-sm text-blue-400 bg-gray-700/50 px-2 py-1 rounded">
											{sessionId}
										</code>
									</div>
								</div>
							)}

							<button
								onClick={fetchApiData}
								disabled={loading || !sessionId}
								className="w-full enhanced-primary-button py-3 px-6 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
							>
								{loading ? (
									<div className="flex items-center justify-center">
										<FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
										Confirming Payment...
									</div>
								) : (
									"Confirm Payment"
								)}
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default PaymentSuccess;