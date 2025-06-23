import { View, Text, ActivityIndicator, FlatList, RefreshControl, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/components/Header';
import useGetThreads from '@/hooks/useGetThreads';
import ThreadCard from '@/components/ThreadCard';
import { Thread } from '@/interfaces/interfaces';
import { icons } from '@/constants/icons';

const Threads = () => {
	const [feed, setFeed] = useState<Thread[]>([]);
	const [page, setPage] = useState<number>(1);
	const [hasMoreData, setHasMoreData] = useState<boolean>(true);
	const [loadingMore, setLoadingMore] = useState<boolean>(false);
	const { loading, getThreads } = useGetThreads();
	const [refreshing, setRefreshing] = useState(false);

	const fetchMyThreads = async (pageNum: number = 1, isRefresh: boolean = false) => {
		try {
			const data = await getThreads(pageNum);

			if (isRefresh) {
				setFeed(data || []);
				setPage(1);
				setHasMoreData(data && data.length > 0);
			} else {
				if (pageNum === 1) {
					setFeed(data || []);
				} else {
					if (data && data.length > 0) {
						setFeed(prevFeed => [...prevFeed, ...data]);
					} else {
						setHasMoreData(false);
					}
				}
			}

			if (pageNum > 1 && (!data || data.length === 0)) {
				setHasMoreData(false);
			}
		} catch (error) {
			console.error('Error fetching threads:', error);
			if (pageNum > 1) {
				setHasMoreData(false);
			}
		}
	};

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		setHasMoreData(true);
		await fetchMyThreads(1, true);
		setRefreshing(false);
	}, []);

	const loadMoreData = useCallback(async () => {
		if (!hasMoreData || loadingMore || loading) return;

		setLoadingMore(true);
		const nextPage = page + 1;
		setPage(nextPage);
		await fetchMyThreads(nextPage);
		setLoadingMore(false);
	}, [page, hasMoreData, loadingMore, loading]);

	const onEndReached = useCallback(() => {
		if (hasMoreData && !loading && !loadingMore) {
			loadMoreData();
		}
	}, [hasMoreData, loading, loadingMore, loadMoreData]);

	useEffect(() => {
		fetchMyThreads();
	}, []);

	const renderFooter = () => {
		if (loadingMore) {
			return (
				<View className="flex items-center justify-center py-4">
					<ActivityIndicator size="large" color="#0000ff" />
					<Text className="text-gray-600 text-sm mt-2">Loading Threads...</Text>
				</View>
			);
		}

		if (!hasMoreData && feed.length > 0) {
			return (
				<View className="flex flex-col mt-3 mb-6 gap-1 w-full items-center justify-center">
					<Text className="text-sm text-gray-600">No more threads to load</Text>
				</View>
			);
		}

		if (hasMoreData && feed.length > 0) {
			return (
				<View className="flex flex-col mt-3 mb-6 gap-1 w-full items-center justify-center">
					<TouchableOpacity
						className="flex flex-col items-center border border-gray-600 rounded-full p-2"
						onPress={loadMoreData}
					>
						<Image
							source={icons.plus}
							tintColor="#4b5563"
							className='size-6'
						/>
					</TouchableOpacity>
					<Text className="text-sm text-gray-600">...See More...</Text>
				</View>
			);
		}

		return null;
	};

	return (
		<SafeAreaView className="flex-1 bg-black">
			<LinearGradient
				colors={['#000000', '#000000', '#0a0f2c']}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				style={{ flex: 1 }}
			>
				<Header />

				{loading && page === 1 ? (
					<ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
				) : (
					<FlatList
						data={feed}
						keyExtractor={(item) => item._id.toString()}
						renderItem={({ item, index }) => (
							<ThreadCard thread={item} index={index} />
						)}
						ListEmptyComponent={
							!loading ? (
								<Text className="text-white text-center mt-10">No threads available for you</Text>
							) : null
						}
						ListFooterComponent={renderFooter}
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
						onEndReached={onEndReached}
						onEndReachedThreshold={0.1}
					/>
				)}
			</LinearGradient>
		</SafeAreaView>
	)
}

export default Threads;