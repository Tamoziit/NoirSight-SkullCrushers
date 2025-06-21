import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/components/Header';
import useUploadThread from '@/hooks/useUploadThread';
import Toast from 'react-native-toast-message';

const UploadThread = () => {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { loading, uploadThread } = useUploadThread();

  const handleSubmit = async () => {
    if (!text.trim()) {
      Alert.alert('Error', 'Please write something before submitting.');
      return;
    }

    setSubmitting(true);
    try {
      await uploadThread({ text });

      Toast.show({
        type: 'success',
        text1: 'Thread posted successfully!',
      });

      setText('');
    } catch (err) {
      console.error(err);
      Toast.show({
        type: 'error',
        text1: 'Failed to post thread!',
      });
    } finally {
      setSubmitting(false);
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

        <View className="flex-1 px-5 py-4">
          <Text className="text-white text-xl font-semibold mb-3">Write a Thread</Text>

          <TextInput
            className="bg-white/10 text-white px-4 py-3 rounded-lg mb-4"
            placeholder="Write your thoughts here..."
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={8}
            value={text}
            onChangeText={setText}
          />

          <TouchableOpacity
            className="btn-secondary"
            onPress={handleSubmit}
            disabled={submitting || loading}
          >
            {submitting || loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text className="text-white text-center text-base">Post Thread</Text>
            )}
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default UploadThread;