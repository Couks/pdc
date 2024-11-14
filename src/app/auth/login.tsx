import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { LoginCredentials } from "@/types/auth.types";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    try {
      await login(credentials);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header Back Button */}
        <View className="px-4 py-2">
          <Link href="..">
            <Ionicons name="chevron-back" size={24} color="#0066FF" />
          </Link>
        </View>

        <View className="flex-1 px-6">
          {/* Header Section */}
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="space-y-2 mb-8"
          >
            <Text className="text-2xl font-bold text-center text-[#0066FF]">
              Log In
            </Text>
            <Text className="text-base text-gray-500 text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </Animated.View>

          {/* Form Section */}
          <Animated.View
            entering={FadeInUp.duration(1000).springify()}
            className="space-y-6"
          >
            <View className="space-y-4">
              <View>
                <Text className="text-base font-medium mb-2">
                  Email or Mobile Number
                </Text>
                <Input
                  className="w-full"
                  inputClasses="bg-gray-100 rounded-xl h-12 px-4"
                  placeholder="example@example.com"
                  value={credentials.email}
                  onChangeText={(text) =>
                    setCredentials((prev) => ({ ...prev, email: text }))
                  }
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View>
                <Text className="text-base font-medium mb-2">Password</Text>
                <Input
                  className="w-full"
                  inputClasses="bg-gray-100 rounded-xl h-12 px-4"
                  placeholder="••••••••••"
                  value={credentials.password}
                  onChangeText={(text) =>
                    setCredentials((prev) => ({ ...prev, password: text }))
                  }
                  secureTextEntry
                />
                <Link href="/auth/forgot-password" className="mt-2">
                  <Text className="text-[#0066FF] text-right">
                    Forgot Password?
                  </Text>
                </Link>
              </View>
            </View>

            {/* Login Button */}
            <Button
              variant="default"
              className="w-full bg-[#0066FF] rounded-xl h-12"
              onPress={handleLogin}
              disabled={isLoading}
              label="Log In"
            >
              <Text className="text-base font-semibold text-white">Log In</Text>
            </Button>

            {/* Social Login Section */}
            <View className="space-y-4">
              <View className="flex-row items-center">
                <View className="flex-1 h-[1px] bg-gray-200" />
                <Text className="mx-4 text-gray-500">or sign up with</Text>
                <View className="flex-1 h-[1px] bg-gray-200" />
              </View>

              <View className="flex-row justify-center space-x-4">
                <Button
                  variant="secondary"
                  className="w-12 h-12 rounded-full bg-gray-100"
                  onPress={() => {}}
                >
                  <Ionicons name="logo-google" size={20} color="#666" />
                </Button>
                <Button
                  variant="secondary"
                  className="w-12 h-12 rounded-full bg-gray-100"
                  onPress={() => {}}
                >
                  <Ionicons name="logo-facebook" size={20} color="#666" />
                </Button>
                <Button
                  variant="secondary"
                  className="w-12 h-12 rounded-full bg-gray-100"
                  onPress={() => {}}
                >
                  <Ionicons
                    name="finger-print-outline"
                    size={20}
                    color="#666"
                  />
                </Button>
              </View>
            </View>

            {/* Sign Up Link */}
            <View className="flex-row justify-center">
              <Text className="text-gray-500">Don't have an account? </Text>
              <Link href="/auth/register">
                <Text className="text-[#0066FF] font-medium">Sign Up</Text>
              </Link>
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
