import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { LogoutModal } from "@/components/common/LogoutModal";
import { Link } from "expo-router";
import { Card } from "@/components/common/Card";

export default function DoctorProfile() {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  if (!user) return null;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="p-6">
        <Text className="text-xl font-semibold text-center mb-6 text-foreground">
          Perfil
        </Text>

        <View className="items-center mb-6">
          <View className="relative">
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
              className="w-24 h-24 rounded-full"
            />
            <View className="absolute bottom-0 right-0 bg-primary p-2 rounded-full">
              <Ionicons name="camera" size={20} color="white" />
            </View>
          </View>
          <Text className="text-xl font-semibold mt-4 text-foreground">
            {user.name}
          </Text>
        </View>

        <View className="gap-4">
          <TouchableOpacity
            className="flex-row items-center bg-card p-4 rounded-xl"
            onPress={() => setShowLogoutModal(true)}
          >
            <View className="w-10 h-10 bg-muted rounded-full items-center justify-center">
              <Ionicons
                name="log-out-outline"
                size={24}
                color="hsl(var(--primary))"
              />
            </View>
            <Text className="flex-1 ml-4 text-card-foreground font-medium">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <LogoutModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={logout}
      />
    </SafeAreaView>
  );
}
