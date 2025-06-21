import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import timeAgo from '@/utils/timeAgo';
import { ArticleResponse, ThreadProps } from '@/interfaces/interfaces';
import { images } from '@/constants/images';
import ArticleCard from './ArticleCard';
import useFetchAnalysis from '@/hooks/useFetchAnalysis';

const ThreadCard = ({ thread: { userId, text, createdAt }, index }: ThreadProps) => {
	const [analysis, setAnalysis] = useState<ArticleResponse | null>(null);
	const { loading, fetchAnalysis } = useFetchAnalysis();

	const handleAnalysis = async () => {
		if (loading || analysis) return;
		const res = await fetchAnalysis({ text });
		if (!res?.error) setAnalysis(res as ArticleResponse);
	};

	const relevantArticles = analysis?.related_articles?.filter(
		(article) => article.verdict.toLowerCase() !== 'not relevant'
	) || [];

	return (
		<View className="bg-zinc-900 rounded-2xl overflow-hidden mb-4">
			<View className="flex-row items-center gap-2 px-4 py-3">
				<Image
					source={userId.profilePic ? { uri: userId.profilePic } : images.placeholderImage}
					className="w-12 h-12 rounded-full bg-gray-400"
				/>
				<View>
					<Text className="text-white font-semibold">{userId.username}</Text>
					<Text className="text-gray-400 text-xs">{timeAgo(createdAt)}</Text>
				</View>
			</View>

			<View className="px-6 py-2 w-full">
				<Text className="text-light-300">{text}</Text>
			</View>

			<View className="flex w-full items-start py-4 px-6">
				<TouchableOpacity className="btn-secondary" onPress={handleAnalysis} disabled={loading || !!analysis}>
					<Text className="text-light-300">
						{loading ? 'Analyzing...' : analysis ? 'Analysis Complete' : 'Analyse Thread'}
					</Text>
				</TouchableOpacity>
			</View>

			{analysis && (
				<View className="px-6 space-y-2 pb-4">
					<Text className="text-white font-bold">Classification:</Text>
					<Text className="text-indigo-400 capitalize">{analysis.classification}</Text>

					<Text className="text-white font-bold pt-2">Reasons:</Text>
					<View className="space-y-1">
						{analysis.reasons?.map((reason, i) => (
							<Text key={i} className="text-gray-300 text-sm">• {reason}</Text>
						))}
					</View>
				</View>
			)}

			{analysis && (
				<View className="space-y-4 px-6 pb-6">
					{relevantArticles.length > 0 ? (
						<>
							<Text className="text-white font-bold">Related Articles:</Text>
							{relevantArticles.map((article, idx) => (
								<ArticleCard
									key={idx}
									url={article.url}
									verdict={article.verdict}
									gemini_analysis={article.gemini_analysis || ''}
								/>
							))}
						</>
					) : (
						<Text className="text-gray-400 italic">Sorry, no relevant articles found.</Text>
					)}
				</View>
			)}
		</View>
	);
};

export default ThreadCard;