import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/components/Header';

const Threads = () => {
	return (
		<SafeAreaView className="flex-1 bg-black">
			<LinearGradient
				colors={['#000000', '#000000', '#0a0f2c']}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				style={{ flex: 1 }}
			>
				<Header />
			</LinearGradient>
		</SafeAreaView>
	)
}

export default Threads;