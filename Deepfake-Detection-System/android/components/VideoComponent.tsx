import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useVideoPlayer, VideoView } from 'expo-video';
import { styles } from '@/constants/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface MediaProps {
	url: string | null;
}

const VideoComponent = ({ url }: MediaProps) => {
	const [isMuted, setIsMuted] = useState(true);

	const player = useVideoPlayer(url || null, (player) => {
		if (url) {
			player.loop = true;
			player.play();
			player.muted = true;
		}
	});

	useEffect(() => {
		if (player && url) {
			player.muted = isMuted;
		}
	}, [player, isMuted, url]);

	const toggleMute = () => {
		setIsMuted(!isMuted);
	};

	return (
		<View className="relative">
			<VideoView
				player={player}
				style={{ width: '100%', height: 240 }}
				contentFit="contain"
				showsTimecodes={true}
				allowsFullscreen={true}
				allowsPictureInPicture={true}
			/>

			<TouchableOpacity
				style={{
					...styles.baseSoundBtn,
					...(isMuted ? styles.muted : styles.unmuted),
				}}
				onPress={toggleMute}
			>
				<Text className="text-sm">
					{isMuted ? (<FontAwesome name="volume-off" size={20} color="#ffffff" />) : <FontAwesome name="volume-up" size={20} color="#000000" />}
				</Text>
			</TouchableOpacity>
		</View>
	)
}

export default VideoComponent;