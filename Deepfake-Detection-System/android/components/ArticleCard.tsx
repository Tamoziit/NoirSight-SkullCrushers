import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

interface ArticleCardProps {
	url: string;
	verdict:
	| 'strongly relevant and consistent'
	| 'strongly relevant but inconsistent'
	| 'weakly relevant'
	| 'not relevant';
	gemini_analysis: string;
}

const getFavicon = (url: string) => {
	const domain = new URL(url).hostname;
	return `https://www.google.com/s2/favicons?domain=${domain}`;
};

const getVerdictStyle = (verdict: string) => {
	switch (verdict.toLowerCase()) {
		case 'strongly relevant and consistent':
			return { label: '✅ Strong & Consistent', color: 'bg-green-600' };
		case 'strongly relevant but inconsistent':
			return { label: '⚠️ Strong but Inconsistent', color: 'bg-yellow-600' };
		case 'weakly relevant':
			return { label: '🟠 Weakly Relevant', color: 'bg-orange-500' };
		case 'not relevant':
			return { label: '❌ Not Relevant', color: 'bg-red-600' };
		default:
			return { label: 'Unknown', color: 'bg-gray-600' };
	}
};

const ArticleCard: React.FC<ArticleCardProps> = ({ url, verdict, gemini_analysis }) => {
	const handlePress = () => {
		WebBrowser.openBrowserAsync(url);
	};

	const { label, color } = getVerdictStyle(verdict);

	return (
		<TouchableOpacity
			onPress={handlePress}
			className="bg-dark-200 p-4 rounded-xl space-y-2 flex-row items-start m-2"
		>
			<Image
				source={{ uri: getFavicon(url) }}
				style={{ width: 32, height: 32, marginRight: 12, borderRadius: 4 }}
			/>

			<View className="flex-1 space-y-2">
				<Text className="text-white font-semibold text-sm break-words">
					{new URL(url).hostname}
				</Text>

				<View className={`self-start px-2 py-1 rounded-md ${color}`}>
					<Text className="text-white text-xs font-bold">{label}</Text>
				</View>

				<Text className="text-gray-300 text-xs">
					{gemini_analysis.split('\n')[1]?.replace('Analysis: ', '')}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default ArticleCard;
