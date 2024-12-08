// Importações necessárias para o funcionamento do app
import "../global.css";
import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Slot, SplashScreen, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Instância do cliente React Query para gerenciamento de estado
const queryClient = new QueryClient();

// Componente que gerencia o conteúdo principal e lógica de autenticação
function RootLayoutContent() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // Controla redirecionamentos baseados no estado de autenticação
  useEffect(() => {
    if (!isLoading) {
      const inAuthGroup = segments[0] === "auth";
      const inAppGroup = segments[0] === "(app)";

      if (!user && !inAuthGroup) {
        router.replace("/home");
      } else if (user && !inAppGroup) {
        const route =
          user.role === "doctor" ? "/(app)/doctor" : "/(app)/patient";
        router.replace(route);
      }
    }
  }, [user, segments, isLoading]);

  // Esconde a splash screen quando o app termina de carregar
  const onLayoutRootView = useCallback(async () => {
    if (!isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

  return (
    <View onLayout={onLayoutRootView} className="flex-1 bg-background">
      <StatusBar style="dark" />
      <Slot />
    </View>
  );
}

// Componente raiz que configura os provedores globais do app
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
