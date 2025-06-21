import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import timeAgo from '@/utils/timeAgo';
import { ThreadProps } from '@/interfaces/interfaces';
import { images } from '@/constants/images';

const ThreadCard = ({ thread: { userId, text, createdAt }, index }: ThreadProps) => {
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

            <View className='px-6 py-2 w-full'>
                <Text className='text-light-300'>
                    {text}
                </Text>
            </View>

            <View className='flex w-full items-start py-4 px-6'>
                <TouchableOpacity
                    className='btn-secondary'
                >
                    <Text className='text-light-300'>Analyse Thread</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ThreadCard;