import TabRoutes from "@/routes/tab.routes";
import { NavigationContainer } from "@react-navigation/native";
import { Link } from "expo-router";
import { View, Image, Text, Pressable } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-white gap-6 dark:bg-green-700">
      <View className="items-center mb-4">
        <Image
          source={require("../assets/logo.png")}
          alt="Logo"
          style={{
            resizeMode: "contain",
            height: 200,
            width: 700,
          }}
        />
      </View>

      <Link
        href="/screens/login/LoginScreen"
        className="w-60 bg-green-500 py-4 px-8 rounded-2xl items-center"
        asChild
      >
        <Pressable>
          <Text className="text-white text-2xl font-bold"> Fazer Login </Text>
        </Pressable>
      </Link>

      <Link
        href="/screens/login/SignupScreen"
        className="w-60 bg-green-200 py-4 px-8 rounded-2xl items-center"
        asChild
      >
        <Pressable>
          <Text className="text-green-500 text-2xl font-bold">Criar Conta</Text>
        </Pressable>
      </Link>

      <Link href="/screens/login/(forgotPassword)/ForgotPassword" asChild>
        <Pressable>
          <Text className="dark:text-white text-md text-purple-800 font-bold">
            Esqueceu sua senha?
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
