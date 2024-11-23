import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
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
    email: "joao.silva@medical.com",
    password: "123456",
    role: "doctor",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login, isLoading } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!credentials.email) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!credentials.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (credentials.password.length < 6) {
      newErrors.password = "Senha deve ter no mínimo 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    try {
      if (!validateForm()) return;
      await login(credentials);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao realizar login";
      // Adicione um feedback visual (toast/alert) aqui
      Alert.alert("Erro", message);
      console.error("Erro no login:", error);
    } finally {
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-6">
          {/* Header Section */}
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="space-y-2 mb-8"
          >
            <Text className="text-2xl font-bold text-center text-black">
              Entrar
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
                <Text className="text-base font-medium mb-2">Email</Text>
                <Input
                  className="w-full"
                  inputClasses="bg-gray-100 rounded-xl h-12 px-4"
                  placeholder="exemplo@email.com"
                  value={credentials.email}
                  onChangeText={(text) =>
                    setCredentials((prev) => ({ ...prev, email: text }))
                  }
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                {errors.email && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </Text>
                )}
              </View>

              <View>
                <Text className="text-base font-medium mb-2">Senha</Text>
                <Input
                  className="w-full"
                  inputClasses="bg-gray-100 rounded-xl h-12 px-4"
                  placeholder="••••••••"
                  value={credentials.password}
                  onChangeText={(text) =>
                    setCredentials((prev) => ({ ...prev, password: text }))
                  }
                  secureTextEntry
                />
                {errors.password && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </Text>
                )}
              </View>

              <View>
                <Text className="text-base font-medium mb-2">
                  Tipo de Usuário
                </Text>
                <View className="flex-row space-x-4">
                  <TouchableOpacity
                    onPress={() =>
                      setCredentials((prev) => ({ ...prev, role: "doctor" }))
                    }
                    className={`flex-1 p-3 rounded-xl ${
                      credentials.role === "doctor"
                        ? "bg-blue-500"
                        : "bg-gray-200"
                    }`}
                  >
                    <Text
                      className={`text-center ${
                        credentials.role === "doctor"
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                    >
                      Médico
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      setCredentials((prev) => ({ ...prev, role: "patient" }))
                    }
                    className={`flex-1 p-3 rounded-xl ${
                      credentials.role === "patient"
                        ? "bg-blue-500"
                        : "bg-gray-200"
                    }`}
                  >
                    <Text
                      className={`text-center ${
                        credentials.role === "patient"
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                    >
                      Paciente
                    </Text>
                  </TouchableOpacity>
                </View>
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
