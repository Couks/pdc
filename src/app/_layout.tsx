import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ExamProvider } from "@/context/ExamContext";
import "../global.css";
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutContent() {
  const { user, isLoading } = useAuth();

  const onLayoutRootView = useCallback(async () => {
    if (!isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} className="flex-1">
      <Stack screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        ) : user.role === "doctor" ? (
          <Stack.Screen name="doctor" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="patient" options={{ headerShown: false }} />
        )}
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <AuthProvider>
            <ExamProvider>
              <StatusBar style="auto" />
              <RootLayoutContent />
            </ExamProvider>
          </AuthProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
