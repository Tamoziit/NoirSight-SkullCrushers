import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import { Link } from 'expo-router';
import useSignup from '@/hooks/useSignup';

const Signup = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    mobileNo: "",
    gender: ""
  });
  const { loading, signup } = useSignup();

  const handleInputChange = (key: keyof typeof inputs, value: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    await signup(inputs);
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
              <Image source={icons.person} className="size-5" tintColor="#3B82F6" />
              <Text className="text-light-100 text-lg">Username</Text>
            </View>
            <TextInput
              className="input-primary px-6 py-4"
              placeholder="Enter your username"
              placeholderTextColor="#6B7280"
              value={inputs.username}
              onChangeText={text => handleInputChange('username', text)}
            />
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

          <View className="gap-2 w-full">
            <View className="flex flex-row items-center gap-2">
              <Image source={icons.mobile} className="size-5" tintColor="#3B82F6" />
              <Text className="text-light-100 text-lg">Mobile Number</Text>
            </View>
            <TextInput
              className="input-primary px-6 py-4"
              placeholder="Enter your mobile number"
              placeholderTextColor="#6B7280"
              value={inputs.mobileNo}
              onChangeText={text => handleInputChange('mobileNo', text)}
            />
          </View>

          <View className="gap-2 w-full">
            <View className="flex flex-row items-center gap-2">
              <Image source={icons.gender} className="size-5" tintColor="#3B82F6" />
              <Text className="text-light-100 text-lg">Gender</Text>
            </View>

            <View className="flex flex-row justify-between mt-2">
              {["Male", "Female", "Other"].map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleInputChange("gender", option[0])}
                  className="flex flex-row items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    backgroundColor: inputs.gender === option[0] ? "#3B82F6" : "#1F2937",
                    borderColor: "#3B82F6",
                    borderWidth: 1,
                  }}
                >
                  <View
                    className="w-4 h-4 rounded-full border-2"
                    style={{
                      borderColor: "#fff",
                      backgroundColor: inputs.gender === option ? "#fff" : "transparent",
                    }}
                  />
                  <Text className="text-light-100">{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
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
                <Text className="text-lg font-semibold">Signup</Text>
              )}
            </TouchableOpacity>

            <Link href="/(auth)/Login">
              <Text className="text-blue-400/80 text-center">
                Already have an account? Login
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default Signup;