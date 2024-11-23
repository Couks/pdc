import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { LogoutModal } from "@/components/common/LogoutModal";
import { Link } from "expo-router";

export default function PatientProfile() {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  if (!user) return null;

  const menuItems = [
    {
      icon: "person-outline",
      label: "Profile",
      href: "/patient/profile/details",
    },
    {
      icon: "heart-outline",
      label: "Favorite",
      href: "/patient/profile/favorites",
    },
    {
      icon: "card-outline",
      label: "Payment Method",
      href: "/patient/profile/payment",
    },
    {
      icon: "lock-closed-outline",
      label: "Privacy Policy",
      href: "/patient/profile/privacy",
    },
    {
      icon: "settings-outline",
      label: "Settings",
      href: "/patient/profile/settings",
    },
    {
      icon: "help-circle-outline",
      label: "Help",
      href: "/patient/profile/help",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-6">
        <Text className="text-xl font-semibold text-center mb-6">
          My Profile
        </Text>

        <View className="items-center mb-6">
          <View className="relative">
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
              className="w-24 h-24 rounded-full"
            />
            <View className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full">
              <Ionicons name="camera" size={20} color="white" />
            </View>
          </View>
          <Text className="text-xl font-semibold mt-4">{user.name}</Text>
        </View>

        <View className="gap-4">
          {menuItems.map((item) => (
            <Link href={item.href} key={item.label} asChild>
              <TouchableOpacity className="flex-row items-center bg-blue-50 p-4 rounded-xl">
                <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                  <Ionicons name={item.icon as any} size={24} color="#3b82f6" />
                </View>
                <Text className="flex-1 ml-4 text-gray-800 font-medium">
                  {item.label}
                </Text>
                <Ionicons name="chevron-forward" size={24} color="#3b82f6" />
              </TouchableOpacity>
            </Link>
          ))}

          <TouchableOpacity
            className="flex-row items-center bg-blue-50 p-4 rounded-xl"
            onPress={() => setShowLogoutModal(true)}
          >
            <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
              <Ionicons name="log-out-outline" size={24} color="#3b82f6" />
            </View>
            <Text className="flex-1 ml-4 text-gray-800 font-medium">
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
