
import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Yellowtail_400Regular } from '@expo-google-fonts/yellowtail';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider} from 'styled-components/native';
import theme from "./src/theme";

import { Routes } from './src/routes';
import { AuthProvider, useAuth } from './src/hooks/auth';

export default function App() {
  const  [fontsLoad] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium, 
    Poppins_700Bold,
    Yellowtail_400Regular
  });

  const { userStorageLoading } = useAuth();
  
  if (!fontsLoad || userStorageLoading) {
    SplashScreen.preventAutoHideAsync()
    .then(result => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
    .catch(console.warn); // it's good to explicitly catch and inspect any error
  }
  else {
    SplashScreen.hideAsync();
    console.log(`SplashScreen.hideAsync`);
  }

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider theme={theme}>
          <StatusBar style="light" translucent backgroundColor="#BE0303" />
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
  );
}     