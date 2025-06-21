import { Stack } from "expo-router";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <>
      <AuthContextProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <Toast />
      </AuthContextProvider>
    </>
  );
}
