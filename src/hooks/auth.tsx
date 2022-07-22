import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect
} from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
import * as AuthSession from 'expo-auth-session'
 //import * as GoogleAuthentication from 'expo-google-app-auth';
import * as GoogleAuthentication from 'expo-auth-session';
//import * as AppleAuthentication from 'expo-apple-authentication';

// Link de autorização do Google (comum a todos os projetos)
//const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';

// Pegar no https://console.cloud.google.com/apis/credentials/oauthclient
const GOOGLE_CLIENT_ID = '179126139991-s072jh24qu2piqh325pu9rmcg9jiv6av.apps.googleusercontent.com';

const EXPO_REDIRECT_URI = 'https://auth.expo.io/@cxrocha/ligax1';

//const GOOGLE_RESPONSE_TYPE = 'token';
//const GOOGLE_SCOPE = 'profile email'; 
//const GOOGLE_RESPONSE_ALT = 'json';

//const GOOGLE_AUTH_RESPONSE_URL = 'https://www.googleapis.com/oauth2/v1/userinfo';
  
//const USER_LOCAL_STORAGE_USER_KEY = "@ligax1:users";

//const { GOOGLE_CLIENT_ID } = process.env
//const EXPO_REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: true })
const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_RESPONSE_TYPE = 'token'
const GOOGLE_SCOPE = 'profile email'
const GOOGLE_RESPONSE_ALT = 'json'
const GOOGLE_AUTH_RESPONSE_URL = 'https://www.googleapis.com/oauth2/v1/userinfo'

const USER_LOCAL_STORAGE_USER_KEY = '@ligax1:users'


type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  isLogging: boolean;
  user: UserProps | null;
  userStorageLoading: boolean;
  signInWithGoogle: () => Promise<void>;
//  signInWithApple: () => Promise<void>;
}

interface UserProps {
  id: string;
  name: string;
  provider: string;
  email?: string;
  photo?: string;
  locale?: string;
  verified_email?: boolean;
  isAdmin?: boolean;
}

interface AuthorizationResponse {
  params: {
      access_token: string;
  };
  type: string;
}

type AuthProviderProps = { children: ReactNode; }

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps|null>({} as UserProps);
  const [userStorageLoading, setUserStorageLoading] = useState(true);
  const [isLogging, setIsLogging] = useState(false);
  
  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert('Login', 'Informe o e-mail e a senha.');
    }
    setIsLogging(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(account => {
        firestore()
          .collection('users')
          .doc(account.user.uid)
          .get()
          .then(async (profile) => {
            const { name, isAdmin } = profile.data() as UserProps;
            if (profile.exists) {
              const userData = {
                id: account.user.uid,
                name,
                provider: 'firebase',
                isAdmin
              };
              await AsyncStorage.setItem(USER_LOCAL_STORAGE_USER_KEY, JSON.stringify(userData));
              setUser(userData);
            }
          })
          .catch(() => Alert.alert('Login', 'Não foi possível buscar os dados de perfil do usuário.'));
      })
      .catch(error => {
        const { code } = error;
        console.log("Erro de Login: ", error);
        if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
          return Alert.alert('Login', 'E-mail e/ou senha inválida.');
        } else {
          return Alert.alert('Login', 'Não foi possível realizar o login.');
        }
      })
      .finally(() => setIsLogging(false));
  }
   
  async function signInWithGoogle() {
    try {
        const AUTH_URL = `${GOOGLE_AUTH_URL}?`;
        const CLIENT_ID = `client_id=${GOOGLE_CLIENT_ID}`;
        const REDIRECT_URI = `&redirect_uri=${EXPO_REDIRECT_URI}`;
        const RESPONSE_TYPE = `&response_type=${GOOGLE_RESPONSE_TYPE}`;
        const SCOPE = `&scope=${encodeURI(GOOGLE_SCOPE)}`;
  
        const authUrl = `${AUTH_URL}${CLIENT_ID}${REDIRECT_URI}${RESPONSE_TYPE}${SCOPE}`;
        console.log("authUrl: ", authUrl);
        const res = (await AuthSession.startAsync({
            authUrl
        })) as AuthorizationResponse;
        console.log("res: ", res);
        const { params, type} = res;
        console.log("params: ", params, "\n  type: ", type);
        if (type === 'success') {
            const response = await fetch(
                `${GOOGLE_AUTH_RESPONSE_URL}?alt=${GOOGLE_RESPONSE_ALT}&access_token=${params.access_token}`
            );
            const userInfo = await response.json();
   
            const userLogged = {
                id: userInfo.id,
                name: userInfo.given_name,
                provider: 'google',
                email: userInfo.email,
                photo: userInfo.picture,
                locale: userInfo.locale,
                verified_email: userInfo.verified_email
            };
            console.log("userLogged: ", userLogged);
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

/*
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
            const bg = theme.COLORS.SHAPE;
            const color = theme.COLORS.PRIMARY;

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
*/

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

  async function signOut() {
    if (user?.provider=="firebase") { await auth().signOut(); };
    if (user?.provider=="google")   { AuthSession.revokeAsync; };
    await AsyncStorage.removeItem(USER_LOCAL_STORAGE_USER_KEY);
    setUser(null);
  }

  async function forgotPassword(email: string) {
    if (!email) {
      return Alert.alert('Redefinir Senha', 'Informe o e-mail.');
    }
    auth()
      .sendPasswordResetEmail(email)
      .then(() =>
        Alert.alert(
          'Redefinir Senha',
          'Enviamos um link no seu e-mail para você redefinir sua senha.',
        ),
      )
      .catch(() =>
        Alert.alert(
          'Redefinir Senha',
          'Não foi possível enviar o e-mail para redefinição da senha.',
        ),
      );
  }

  useEffect(() => {
    loadUserStorage();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signOut,
      isLogging,
      forgotPassword,
      userStorageLoading,
      signInWithGoogle,
//      signInWithApple,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };