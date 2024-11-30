import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import "../global.css";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutContent() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      const inAuthGroup = segments[0] === "auth";

      if (!user && !inAuthGroup) {
        router.replace("/auth");
      } else if (user && inAuthGroup) {
        router.replace(user.role === "doctor" ? "/doctor" : "/patient");
      }
    }
  }, [user, segments, isLoading]);

  const onLayoutRootView = useCallback(async () => {
    if (!isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} className="flex-1 bg-background">
      <StatusBar style="dark" />
      <Slot />
    </View>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <AuthProvider>
            <RootLayoutContent />
          </AuthProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
