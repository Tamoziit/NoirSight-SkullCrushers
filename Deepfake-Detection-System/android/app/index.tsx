import { Redirect } from "expo-router";
import { useAuthContext } from "@/context/AuthContext";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
	const { authUser } = useAuthContext();

	return <Redirect href={authUser ? "/(tabs)" : "/(auth)/Login"} />;
}
