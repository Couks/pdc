import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4">Meu Perfil</Text>

        <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <Text className="text-lg font-semibold mb-2">
            Informações Pessoais
          </Text>
          <Text>Nome: {user.name}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Telefone: {user.phone}</Text>
          <Text>Endereço: {user.address}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
