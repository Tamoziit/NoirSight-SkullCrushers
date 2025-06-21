import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import timeAgo from '@/utils/timeAgo';
import FeedbackModal from './FeedbackModal';
import { PostProps } from '@/interfaces/interfaces';
import { images } from '@/constants/images';

const PostCard = ({ post: { userId, type, url, modelResult, confidence, createdAt, positiveReviews, negativeReviews }, index }: PostProps) => {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<View className="bg-zinc-900 rounded-2xl overflow-hidden mb-4">
			<View className="flex-row items-center gap-2 px-4 py-3">
				<Image
					source={userId.profilePic ? ({ uri: userId.profilePic }) : (images.placeholderImage)}
					className="w-12 h-12 rounded-full bg-gray-400"
				/>
				<View>
					<Text className="text-white font-semibold">{userId.username}</Text>
					<Text className="text-gray-400 text-xs">{timeAgo(createdAt)}</Text>
				</View>
			</View>

			{type === "video" ? (
				<Video
					source={{ uri: url }}
					style={{ width: '100%', height: 240 }}
					resizeMode={ResizeMode.COVER}
					isLooping
					shouldPlay
					isMuted
					useNativeControls={true}
				/>
			) : (
				<Image
					source={{ uri: url }}
					style={{ width: '100%', height: 240 }}
				/>
			)}

			{modelResult === "fake" ? (
				<View className='flex flex-col gap-0.5 px-3 py-1.5'>
					<View className='flex flex-row items-center gap-1.5'>
						<FontAwesome name="exclamation-circle" size={30} color="#ef4444" />
						<Text className='text-red-500'>This video might potentially be a Deepfake</Text>
					</View>

					<View className='flex flex-row items-center gap-1.5'>
						<Text className='text-gray-500'>Confidence:</Text>
						<Text className='text-gray-500 font-semibold'>{confidence.toFixed(2)}%</Text>
					</View>
				</View>
			) : (
				<View className='flex flex-col gap-0.5 px-3 py-1.5'>
					<View className='flex flex-row items-center gap-1.5'>
						<FontAwesome name="check-circle" size={30} color="#22c55e" />
						<Text className='text-green-500'>This video is authentic</Text>
					</View>

					<View className='flex flex-row items-center gap-1.5'>
						<Text className='text-gray-500'>Confidence:</Text>
						<Text className='text-gray-500 font-semibold'>{confidence.toFixed(2)}%</Text>
					</View>
				</View>
			)}

			<View className='flex flex-col -gap-0.5 px-3 py-1.5'>
				<Text className='text-gray-400 text-base'>User Feedback:</Text>

				{type === "video" ? (
					<View className='flex flex-col -gap-1'>
						<Text className='text-gray-600 text-sm'>{positiveReviews} Users think that this video is Authentic</Text>
						<Text className='text-gray-600 text-sm'>{negativeReviews} Users think that this video is Fake</Text>
					</View>
				) : (
					<View className='flex flex-col -gap-1'>
						<Text className='text-gray-600 text-sm'>{positiveReviews} Users think that this image is Authentic</Text>
						<Text className='text-gray-600 text-sm'>{negativeReviews} Users think that this image is Fake</Text>
					</View>
				)}
			</View>

			<View className='flex w-full items-center py-4'>
				<TouchableOpacity
					className='btn-secondary'
					onPress={() => setModalVisible(true)}
				>
					<Text className='text-light-300'>What do you think?</Text>
				</TouchableOpacity>
			</View>

			{modalVisible && (
				<FeedbackModal
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
				/>
			)}
		</View>
	);
};

export default PostCard;