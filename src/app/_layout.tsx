import { Slot } from "expo-router";
import { AuthProvider } from "@/hooks/auth/AuthContext";
import { ToastProvider } from "@/components/ui/Toast";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ToastProvider>
        <StatusBar style="auto" translucent animated />
        <Slot />
      </ToastProvider>
    </AuthProvider>
  );
}
