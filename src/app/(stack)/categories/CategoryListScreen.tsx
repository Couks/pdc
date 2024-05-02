import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

export default function CategoryListScreen({ navigation }: Props) {
  // Cria um array com 10 elementos e usa o método map para renderizar
  const icons = [...Array(9).keys()].map((i) => (
    <TouchableOpacity
      key={i}
      onPress={() => navigation.navigate("CategoryEdit")}
    >
      <View className="bg-purple-500 size-28 rounded-3xl items-center justify-center">
        <Ionicons name="fast-food" size={50} color="white" />
      </View>
    </TouchableOpacity>
  ));

  return (
    <>
      <Header title="Categorias">
        <View></View>
      </Header>
      <View className="flex-1 flex-row flex-wrap py-12 px-2 gap-6 items-center justify-around">
        {icons}
      </View>
    </>
  );
}
