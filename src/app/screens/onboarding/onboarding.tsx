import { Button } from "@/components/Button";
import React, { useEffect } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import Animated, {
  FadeInDown,
  FadeOutDown,
  PinwheelIn,
  PinwheelOut,
} from "react-native-reanimated";
import Swiper from "react-native-swiper";

const swiperData = [
  {
    title: "Bem vindo ao seu gestor de Gastos",
    image: require("@/assets/hand-coins.png"),
  },
  {
    title: "Está pronto para tomar controle das suas finanças?",
    image: require("@/assets/cellphone.png"),
  },
];

export function Onboarding({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Home");
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Swiper
      className="flex-1"
      loop={false}
      showsPagination={false}
      activeDot={true}
    >
      {swiperData.map((item, index) => (
        <View key={index} className="flex-1">
          <View className="flex-1 bg-green-500 dark:bg-green-700 relative items-center">
            <Animated.Text
              entering={FadeInDown.duration(1000).springify()}
              exiting={FadeOutDown.duration(1000).springify()}
              className="font-bold text-3xl pt-16 px-12 text-center text-purple-800 dark:text-white"
            >
              {item.title}
            </Animated.Text>
            <View className="w-full bottom-0 h-3/4 rounded-t-[50px] bg-white dark:bg-purple-800 items-center justify-center gap-12 absolute">
              <View className="items-center justify-center bg-green-200 rounded-full w-60 h-60 overflow-visible">
                <Animated.Image
                  entering={PinwheelIn.delay(1200).duration(1000).springify()}
                  exiting={PinwheelOut.delay(1600).duration(1000)}
                  source={item.image}
                  style={{ width: 230, height: 200, resizeMode: "cover" }}
                />
              </View>

              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                exiting={FadeOutDown.duration(1000).springify()}
                className="items-center justify-center gap-6"
              >
                <Text className="text-3xl font-bold text-purple-800 text-white">
                  Próximo
                </Text>

                <View className="flex-row gap-6">
                  {[...Array(swiperData.length)].map((_, i) => (
                    <View
                      key={i}
                      className="size-4 rounded-full"
                      style={{
                        backgroundColor: i === index ? "#00D09E" : "#9F5FED",
                      }}
                    />
                  ))}
                </View>
                {index === 1 && (
                  <View className="items-center mt-4">
                    <Button
                      label="Fazer login"
                      size="lg"
                      onPress={() => navigation.navigate("Home")}
                    />
                  </View>
                )}
              </Animated.View>
            </View>
          </View>
        </View>
      ))}
    </Swiper>
  );
}
