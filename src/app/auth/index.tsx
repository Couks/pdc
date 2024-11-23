import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AuthIndex() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-6 justify-center">
        {/* Header/Logo Section */}
        <View className="items-center mb-12">
          <Ionicons name="medical" size={80} color="#3b82f6" />
          <Text className="text-3xl font-bold mt-4 text-center">
            Medical App
          </Text>
          <Text className="text-gray-500 text-center mt-2">
            Gerencie seus exames e consultas de forma simples
          </Text>
        </View>

        {/* Buttons Section */}
        <View className="space-y-4">
          <Link href="/auth/login" asChild>
            <TouchableOpacity className="bg-blue-500 p-4 rounded-xl">
              <Text className="text-white text-center text-lg font-semibold">
                Entrar
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/auth/register" asChild>
            <TouchableOpacity className="bg-white border border-blue-500 p-4 rounded-xl">
              <Text className="text-blue-500 text-center text-lg font-semibold">
                Criar Conta
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Footer Section */}
        <View className="mt-8">
          <Text className="text-gray-500 text-center text-sm">
            Ao continuar, você concorda com nossos{" "}
            <Text className="text-blue-500">Termos de Serviço</Text> e{" "}
            <Text className="text-blue-500">Política de Privacidade</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
