import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DoctorProfile() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold">Perfil do Médico</Text>
      </View>
    </SafeAreaView>
  );
}
