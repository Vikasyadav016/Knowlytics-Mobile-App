import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useContext } from 'react';
import { AuthContext, AuthProvider } from '@/auth/authProvider';

function RootStack() {
  const { isAuthenticated } = useContext(AuthContext);
  console.log("isAuthenticated", isAuthenticated);

  return (
    <Stack
      screenOptions={{
        headerShown: false, // <-- Hide header globally here
      }}
    >
      {isAuthenticated ? (
        // Authenticated users see the main tabs
        <Stack.Screen name="(tabs)" />
      ) : (
        // Unauthenticated users see auth screens
        <Stack.Screen name="(AuthPages)/login" />
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null; // wait for fonts to load
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootStack />
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}

