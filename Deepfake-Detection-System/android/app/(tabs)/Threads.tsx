import { View, Text, ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/components/Header';
import useGetThreads from '@/hooks/useGetThreads';
import ThreadCard from '@/components/ThreadCard';
import { Thread } from '@/interfaces/interfaces';

const Threads = () => {
	const [feed, setFeed] = useState<Thread[]>();
	const { loading, getThreads } = useGetThreads();
	const [refreshing, setRefreshing] = useState(false);

	const fetchMyThreads = async () => {
		const data = await getThreads();
		setFeed(data);
	};

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		fetchMyThreads();
		setRefreshing(false);
	}, [])

	useEffect(() => {
		fetchMyThreads();
	}, []);

	return (
		<SafeAreaView className="flex-1 bg-black">
			<LinearGradient
				colors={['#000000', '#000000', '#0a0f2c']}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				style={{ flex: 1 }}
			>
				<Header />

				{loading ? (
					<ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
				) : (
					<FlatList
						data={feed}
						keyExtractor={(item) => item._id.toString()}
						renderItem={({ item, index }) => (
							<ThreadCard thread={item} index={index} />
						)}
						ListEmptyComponent={
							<Text className="text-white text-center mt-10">No feed available for you</Text>
						}
						ItemSeparatorComponent={() => <View className="h-4" />}
						contentContainerStyle={{
							paddingBottom: 50,
							paddingHorizontal: 10,
							paddingTop: 14
						}}
						refreshControl={
							<RefreshControl
								refreshing={refreshing}
								onRefresh={onRefresh}
								colors={['#9Bd35A', '#0000ff']}
								tintColor="#000"
							/>
						}
						showsVerticalScrollIndicator={false}
					/>
				)}
			</LinearGradient>
		</SafeAreaView>
	)
}

export default Threads;