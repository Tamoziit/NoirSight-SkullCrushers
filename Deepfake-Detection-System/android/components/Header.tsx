import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import useLogout from '@/hooks/useLogout'

const Header = () => {
	const {loading, logout} = useLogout();

	return (
		<View className='flex flex-row w-full items-center justify-between py-3 px-6'>
			<View className="flex flex-row gap-3 items-center justify-center">
				<Image source={images.Logo} className="size-10 mx-auto" />
				<View className="flex flex-row gap-0.5 items-center">
					<Text className="text-light-200 text-xl font-medium">Noir</Text>
					<Text className="text-blue-400 text-xl font-medium">•</Text>
					<Text className="text-light-200 text-xl font-medium">Media</Text>
				</View>
			</View>

			<TouchableOpacity
				onPress={logout}
				disabled={loading}
			>
				{loading ? (
					<ActivityIndicator
						size="small"
						color="#3b82f6"
					/>
				) : (
					<Image source={icons.logout} tintColor="#ffffff" className='size-6' />
				)}
			</TouchableOpacity>
		</View>
	)
}

export default Header