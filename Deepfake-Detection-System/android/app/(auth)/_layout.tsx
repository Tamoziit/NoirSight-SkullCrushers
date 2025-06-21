import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuthContext } from '@/context/AuthContext';

const _layout = () => {
  const { authUser } = useAuthContext();

  if (authUser) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    />
  )
}

export default _layout