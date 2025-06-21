import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import { Link } from 'expo-router';
import useLogin from '@/hooks/useLogin';

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const { loading, login } = useLogin();

  const handleInputChange = (key: 'email' | 'password', value: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    await login(inputs);
  }

  return (
    <LinearGradient
      colors={['#000000', '#000000', '#0a0f2c']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 10
        }}
      >
        <View className='flex flex-col bg-dark-100 p-5 gap-6 rounded-lg w-full items-center'>
          <View className="flex flex-row gap-3 items-center justify-center">
            <Image source={images.Logo} className="size-16 mx-auto" />
            <View className="flex flex-row gap-0.5 items-center">
              <Text className="text-light-200 text-2xl font-medium">Noir</Text>
              <Text className="text-blue-400 text-2xl font-medium">•</Text>
              <Text className="text-light-200 text-2xl font-medium">Media</Text>
            </View>
          </View>

          <View className="gap-2 w-full">
            <View className="flex flex-row items-center gap-2">
              <Image source={icons.email} className="size-5" tintColor="#3B82F6" />
              <Text className="text-light-100 text-lg">Email</Text>
            </View>
            <TextInput
              className="input-primary px-6 py-4"
              placeholder="Enter your email"
              placeholderTextColor="#6B7280"
              value={inputs.email}
              onChangeText={text => handleInputChange('email', text)}
            />
          </View>

          <View className="gap-2 w-full">
            <View className="flex flex-row items-center gap-2">
              <Image source={icons.password} className="size-5" tintColor="#3B82F6" />
              <Text className="text-light-100 text-lg">Password</Text>
            </View>
            <TextInput
              className="input-primary px-6 py-4"
              placeholder="Enter your password"
              placeholderTextColor="#6B7280"
              secureTextEntry
              value={inputs.password}
              onChangeText={text => handleInputChange('password', text)}
            />
          </View>

          <View className='w-full flex items-center gap-3 flex-col'>
            <TouchableOpacity
              className="btn-primary items-center w-full"
              style={{
                paddingVertical: 10,
                marginTop: 10
              }}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color="#3b82f6"
                />
              ) : (
                <Text className="text-lg font-semibold">Login</Text>
              )}
            </TouchableOpacity>

            <Link href="/(auth)/Signup">
              <Text className="text-blue-400/80 text-center">
                Don't have an account? Sign up
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default Login;