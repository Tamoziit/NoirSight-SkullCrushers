import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    baseSoundBtn: {
        position: 'absolute',
        top: 12,
        right: 10,
        width: 30,
        height: 30,
        padding: 2,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4
    },
    muted: {
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
    },
    unmuted: {
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
    },
});