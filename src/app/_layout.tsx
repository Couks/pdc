import { Slot } from "expo-router";
import { AuthProvider } from "@/hooks/auth/AuthContext";
import { ToastProvider } from "@/components/ui/Toast";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Slot />
      </ToastProvider>
    </AuthProvider>
  );
}
