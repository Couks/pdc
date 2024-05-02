import { Text, TouchableOpacity, View } from "react-native";

export default function CategoryEditScreen({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Edit Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("CategoryList")}>
        <Text>Teste</Text>
      </TouchableOpacity>
    </View>
  );
}
