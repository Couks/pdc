import { Button } from "@/components/Button";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Categories({ navigation }: { navigation: any }) {
  return (
    <View className="flex-1 items-center justify-center gap-12">
      <Text>Categorias</Text>
      <Button
        label="categoria"
        onPress={() => navigation.navigate("CategoryScreen")}
      ></Button>
    </View>
  );
}
