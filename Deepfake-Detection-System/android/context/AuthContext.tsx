import { AuthContextType, AuthProviderProps, AuthUser } from "@/interfaces/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const defaultAuthContext: AuthContextType = {
    authUser: null,
    setAuthUser: () => { },
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
    const [authUser, setAuthUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        const getStoredUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem("NS-user");
                if (storedUser) {
                    setAuthUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error("Error fetching user from storage:", error);
            }
        };

        getStoredUser();
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
