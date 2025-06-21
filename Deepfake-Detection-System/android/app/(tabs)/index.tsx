import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import useGetFeed from "@/hooks/useGetFeed";
import { Post } from "@/interfaces/interfaces";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [feed, setFeed] = useState<Post[]>();
  const { loading, getFeed } = useGetFeed();
  const [refreshing, setRefreshing] = useState(false);

  const fetchMyFeed = async () => {
    const data = await getFeed();
    setFeed(data);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchMyFeed();
    setRefreshing(false);
  }, [])

  useEffect(() => {
    fetchMyFeed();
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
              <PostCard post={item} index={index} />
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
  );
}
