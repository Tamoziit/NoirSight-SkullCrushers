import { View, Text, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/components/Header';
import * as DocumentPicker from 'expo-document-picker';
import { Video, ResizeMode } from 'expo-av';
import { uploadVideoToCloudinary } from '@/utils/uploadVideoToCloudinary';
import Toast from 'react-native-toast-message';
import { uploadImageToCloudinary } from '@/utils/uploadImageToCloudinary';
import useUploadPost from '@/hooks/useUploadPost';
import { ModelResponse } from '@/interfaces/interfaces';
import ModelResult from '@/components/ModelResult';

const Upload = () => {
  const [fileType, setFileType] = useState<'image' | 'video'>('video');
  const [media, setMedia] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { loading, uploadPost } = useUploadPost();
  const [modelResponse, setModelResponse] = useState<ModelResponse | null>(null);

  const pickFile = async () => {
    try {
      const type = fileType === 'image' ? 'image/*' : 'video/*';

      const result = await DocumentPicker.getDocumentAsync({
        type,
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) return;

      const file = result.assets[0];

      if (fileType === 'video' && !file.mimeType?.startsWith('video/')) {
        Alert.alert('Invalid File', 'Please select a valid video file.');
        return;
      }

      if (fileType === 'image' && !file.mimeType?.startsWith('image/')) {
        Alert.alert('Invalid File', 'Please select a valid image file.');
        return;
      }

      setMedia(file);
    } catch (error) {
      console.error('Error picking file:', error);
      Alert.alert('Error', 'Something went wrong while picking the file.');
    }
  };

  const handleUpload = async () => {
    if (!media) {
      Alert.alert("Error", "Please select a file first");
      return;
    }

    setUploading(true);
    try {
      if (fileType === "video") {
        const uploadedUrl = await uploadVideoToCloudinary(media);
        setMediaUrl(uploadedUrl);

        const data = await uploadPost({
          url: uploadedUrl,
          type: "video"
        });
        setModelResponse(data);
      } else {
        const uploadedUrl = await uploadImageToCloudinary(media);
        setMediaUrl(uploadedUrl);

        const data = await uploadPost({
          url: uploadedUrl,
          type: "image"
        });
        setModelResponse(data);
      }

      Toast.show({
        type: 'success',
        text1: 'Uploaded successfully!',
        position: 'top',
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Upload Failed!',
        position: 'top',
      });
    } finally {
      setUploading(false);
    }
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

        <View className="py-3 px-5">
          <Text className="text-light-300 text-xl font-semibold mb-4">Upload Media</Text>

          <View className="flex-row gap-3 mb-4">
            <TouchableOpacity
              className={`px-4 py-2 rounded-full border ${fileType === 'image' ? 'bg-white/20' : 'border-white'
                }`}
              onPress={() => {
                setFileType('image');
                setMedia(null);
                setMediaUrl(null);
                setModelResponse(null);
              }}
            >
              <Text className="text-white">Image</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`px-4 py-2 rounded-full border ${fileType === 'video' ? 'bg-white/20' : 'border-white'
                }`}
              onPress={() => {
                setFileType('video');
                setMedia(null);
                setMediaUrl(null);
                setModelResponse(null);
              }}
            >
              <Text className="text-white">Video</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="bg-white/10 border border-white rounded-lg px-4 py-3 mb-4"
            onPress={pickFile}
          >
            <Text className="text-white text-base text-center">Pick a {fileType}</Text>
          </TouchableOpacity>

          {media && (
            <View className="mb-4">
              <Text className="text-gray-400 mb-1">Selected {fileType}:</Text>
              <Text className="text-white mb-2">{media.name}</Text>

              {fileType === 'video' ? (
                <Video
                  source={{ uri: media.uri }}
                  style={{ width: '100%', height: 240, borderRadius: 12 }}
                  useNativeControls
                  resizeMode={ResizeMode.COVER}
                  isLooping
                  isMuted
                  shouldPlay
                />
              ) : (
                <Image
                  source={{ uri: media.uri }}
                  style={{ width: '100%', height: 240, borderRadius: 12 }}
                  resizeMode="cover"
                />
              )}
            </View>
          )}

          <TouchableOpacity
            className="btn-secondary"
            onPress={handleUpload}
            disabled={uploading || loading}
          >
            {uploading || loading ? (
              <ActivityIndicator
                size="small"
                color="#ffffff"
              />
            ) : (
              <Text className="text-white text-center text-base">Upload {fileType}</Text>
            )}
          </TouchableOpacity>

          {modelResponse && (
            <ModelResult
              type={modelResponse.type}
              modelResult={modelResponse.modelResult}
              confidence={modelResponse.confidence}
            />
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Upload;