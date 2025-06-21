import { View, Text } from 'react-native';
import React from 'react';
import { UploadFlagProps } from '@/interfaces/interfaces';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ModelResult = ({ type, modelResult, confidence }: UploadFlagProps) => {
	return (
		<View className='w-full bg-dark-200 rounded-lg p-1 mt-3'>
			{modelResult === "fake" ? (
				<View className='flex flex-col gap-0.5 px-3 py-1.5'>
					<View className='flex flex-row items-center gap-1.5'>
						<FontAwesome name="exclamation-circle" size={30} color="#ef4444" />
						<Text className='text-red-500'>This {type} might potentially be a Deepfake</Text>
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
						<Text className='text-green-500'>This {type} is authentic</Text>
					</View>

					<View className='flex flex-row items-center gap-1.5'>
						<Text className='text-gray-500'>Confidence:</Text>
						<Text className='text-gray-500 font-semibold'>{confidence.toFixed(2)}%</Text>
					</View>
				</View>
			)}
		</View>
	)
}

export default ModelResult;