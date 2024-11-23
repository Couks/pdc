import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function Register() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-4 justify-center">
        <Text className="text-3xl font-bold mb-8 text-center">Cadastro</Text>

        <View className="space-y-4">
          <TextInput
            className="w-full p-4 border border-gray-300 rounded-lg bg-white"
            placeholder="Nome completo"
          />

          <TextInput
            className="w-full p-4 border border-gray-300 rounded-lg bg-white"
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            className="w-full p-4 border border-gray-300 rounded-lg bg-white"
            placeholder="Senha"
            secureTextEntry
          />

          <TextInput
            className="w-full p-4 border border-gray-300 rounded-lg bg-white"
            placeholder="Confirmar senha"
            secureTextEntry
          />

          <TouchableOpacity className="w-full bg-blue-500 p-4 rounded-lg">
            <Text className="text-white text-center font-bold">Cadastrar</Text>
          </TouchableOpacity>

          <Link href="/auth/login" asChild>
            <TouchableOpacity className="mt-4">
              <Text className="text-blue-500 text-center">
                Já tem uma conta? Faça login
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
