import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import * as GoogleAuthentication from 'expo-google-app-auth';
import * as GoogleAuthentication from 'expo-auth-session';
//import * as AppleAuthentication from 'expo-apple-authentication';

import {
    GOOGLE_AUTH_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_AUTH_RESPONSE_URL,
    EXPO_REDIRECT_URI,
    GOOGLE_RESPONSE_TYPE,
    GOOGLE_SCOPE,
    GOOGLE_RESPONSE_ALT,
    USER_LOCAL_STORAGE_KEY,
    USER_LOCAL_STORAGE_USER_KEY,
    APPLE_CLIENT_ID
} from 'react-native-dotenv';

import theme from '../theme';

interface AuthProviderProps {
    children: ReactNode;
}

interface UserProps {
    id: string;
    name: string;
    email: string;
    photo?: string;
    locale?: string;
    verified_email?: boolean;
}

interface IAuthContextData {
    user: UserProps;
    userStorageLoading: boolean;
    signInWithGoogle: () => Promise<void>;
//    signInWithApple: () => Promise<void>;
    signOut: () => Promise<void>;
}

interface AuthorizationResponse {
    params: {
        access_token: string;
    };
    type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [userStorageLoading, setUserStorageLoading] = useState(true);

    async function signInWithGoogle() {
        try {
            const AUTH_URL = `${GOOGLE_AUTH_URL}?`;
            const CLIENT_ID = `client_id=${GOOGLE_CLIENT_ID}`;
            const REDIRECT_URI = `&redirect_uri=${EXPO_REDIRECT_URI}`;
            const RESPONSE_TYPE = `&response_type=${GOOGLE_RESPONSE_TYPE}`;
            const SCOPE = `&scope=${encodeURI(GOOGLE_SCOPE)}`;

            const authUrl = `${AUTH_URL}${CLIENT_ID}${REDIRECT_URI}${RESPONSE_TYPE}${SCOPE}`;

            const { params, type } = (await GoogleAuthentication.startAsync({
                authUrl
            })) as AuthorizationResponse;

            if (type === 'success') {
                const response = await fetch(
                    `${GOOGLE_AUTH_RESPONSE_URL}?alt=${GOOGLE_RESPONSE_ALT}&access_token=${params.access_token}`
                );
                const userInfo = await response.json();

                const userLogged = {
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.given_name,
                    photo: userInfo.picture,
                    locale: userInfo.locale,
                    verified_email: userInfo.verified_email
                };

                setUser(userLogged);

                await AsyncStorage.setItem(
                    USER_LOCAL_STORAGE_USER_KEY,
                    JSON.stringify(userLogged)
                );
            }
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async function signInWithApple() {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ]
            });

            if (credential) {
                const name = credential.fullName!.givenName!;
                const bg = theme.colors.shape;
                const color = theme.colors.primary;

                const photo = `https://ui-avatars.com/api/?name=${name}&background=${bg}&color=${color}&length=1`;

                const userLogged = {
                    id: String(credential.user),
                    email: credential.email!,
                    name,
                    photo
                };

                setUser(userLogged);
                await AsyncStorage.setItem(
                    USER_LOCAL_STORAGE_KEY,
                    JSON.stringify(userLogged)
                );
            }
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async function signOut() {
        setUser({} as UserProps);
        await AsyncStorage.removeItem(USER_LOCAL_STORAGE_USER_KEY);
    }
    async function loadUserStorage() {
        const userStorage = await AsyncStorage.getItem(
            USER_LOCAL_STORAGE_USER_KEY
        );

        if (userStorage) {
            const userLogged = JSON.parse(userStorage) as UserProps;
            setUser(userLogged);
        }
        setUserStorageLoading(false);
    }

    useEffect(() => {
        loadUserStorage();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                userStorageLoading,
                signInWithGoogle,
                signInWithApple,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };
