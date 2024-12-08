import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

// Componente principal de layout que envolve toda a aplicação
// Configura o estilo base e a barra de status do dispositivo
// Utiliza o Slot do expo-router para renderizar as rotas filhas
export default function RootLayoutContent() {
  return (
    <View className="flex-1 bg-background">
      <StatusBar style="dark" />
      <Slot />
    </View>
  );
}
