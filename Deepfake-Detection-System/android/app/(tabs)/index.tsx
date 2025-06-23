import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { icons } from "@/constants/icons";
import useGetFeed from "@/hooks/useGetFeed";
import { Post } from "@/interfaces/interfaces";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [feed, setFeed] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const { loading, getFeed } = useGetFeed();
  const [refreshing, setRefreshing] = useState(false);

  const fetchMyFeed = async (pageNum: number = 1, isRefresh: boolean = false) => {
    try {
      const data = await getFeed(pageNum);
      
      // Pagination
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
      console.error('Error fetching feed:', error);
      if (pageNum > 1) {
        setHasMoreData(false);
      }
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setHasMoreData(true);
    await fetchMyFeed(1, true);
    setRefreshing(false);
  }, []);

  const loadMoreData = useCallback(async () => {
    if (!hasMoreData || loadingMore || loading) return;
    
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchMyFeed(nextPage);
    setLoadingMore(false);
  }, [page, hasMoreData, loadingMore, loading]);

  const onEndReached = useCallback(() => {
    if (hasMoreData && !loading && !loadingMore) {
      loadMoreData();
    }
  }, [hasMoreData, loading, loadingMore, loadMoreData]);

  useEffect(() => {
    fetchMyFeed();
  }, []);

  const renderFooter = () => {
    if (loadingMore) {
      return (
        <View className="flex items-center justify-center py-4">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text className="text-gray-600 text-sm mt-2">Loading Posts...</Text>
        </View>
      );
    }

    if (!hasMoreData && feed.length > 0) {
      return (
        <View className="flex flex-col mt-3 mb-6 gap-1 w-full items-center justify-center">
          <Text className="text-sm text-gray-600">No more posts found</Text>
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
              <PostCard post={item} index={index} />
            )}
            ListEmptyComponent={
              !loading ? (
                <Text className="text-white text-center mt-10">No feed available for you</Text>
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
  );
}