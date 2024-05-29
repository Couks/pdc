import Animated, {
  FadeInDown,
  FadeInUp,
  PinwheelIn,
} from "react-native-reanimated";
import Swiper from "react-native-swiper";
import { Text, View } from "react-native";
import { Button } from "@/components/ui/Button";
import React, { useEffect, useState } from "react";

const swiperData = [
  {
    title: "Bem vindo ao seu gestor de Gastos",
    image: require("@/assets/images/hand-coins.png"),
  },
  {
    title: "Está pronto para tomar controle das suas finanças?",
    image: require("@/assets/images/cellphone.png"),
  },
];

export function OnboardingScreen({ navigation }: { navigation: any }) {
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    if (!buttonClicked) {
      const timer = setTimeout(() => {
        navigation.navigate("Home");
      }, 20000);

      return () => clearTimeout(timer);
    }
  }, [buttonClicked, navigation]);

  const handleButtonClick = () => {
    setButtonClicked(true);
    navigation.navigate("Home");
  };

  return (
    <Swiper
      className="flex-1"
      loop={false}
      showsPagination={false}
      activeDot={true}
    >
      {swiperData.map((item, index) => (
        <View key={index} className="flex-1">
          <View className="flex-1 bg-green-500 dark:bg-green-700 items-center">
            <Animated.Text
              entering={FadeInUp.springify()}
              className="font-bold text-3xl pt-16 px-12 text-center text-purple-800 dark:text-white"
            >
              {item.title}
            </Animated.Text>
            <View className="w-full bottom-0 h-3/4 rounded-t-[30px] bg-white dark:bg-purple-800 items-center justify-center gap-12 absolute">
              <View className="items-center justify-center bg-green-200 rounded-full w-60 h-60 overflow-visible">
                <Animated.Image
                  entering={PinwheelIn.delay(400).springify()}
                  source={item.image}
                  style={{ width: 230, height: 200, resizeMode: "cover" }}
                />
              </View>

              <Animated.View
                entering={FadeInDown.springify()}
                className="items-center justify-center gap-6"
              >
                <Text className="text-3xl font-bold text-purple-800 dark:text-white">
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
              </Animated.View>
              {index === 1 && (
                <View className="items-center ">
                  <Button
                    label="Fazer login"
                    size="sm"
                    onPress={handleButtonClick}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      ))}
    </Swiper>
  );
}
