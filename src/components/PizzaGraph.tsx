import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import { PieChart } from "react-native-gifted-charts";
import { useColorScheme } from "nativewind";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withSpring,
} from "react-native-reanimated";

export default function PizzaGraph() {
  const { colorScheme } = useColorScheme();
  const [selectedItem, setSelectedItem] = useState(null);

  const animation = useSharedValue(0);

  useEffect(() => {
    animation.value = 1;
  }, []);

  const pieData = [
    { value: 8, color: "#ff0000", text: "Transporte" },
    { value: 12, color: "#00ff00", text: "Moradia" },
    { value: 30, color: "#0000ff", text: "Lazer" },
    { value: 4, color: "#ffff00", text: "Saude" },
    { value: 6, color: "#ff00ff", text: "Geral" },
    { value: 20, color: "#00ffff", text: "Estudos" },
    { value: 15, color: "#ffa500", text: "Gastos Pessoais" },
    { value: 2, color: "#008000", text: "Alimentacao" },
    { value: 3, color: "#800080", text: "Investimentos" },
  ];

  // Função para lidar com o pressionamento de uma fatia do gráfico
  const handlePiePress = (index) => {
    setSelectedItem(pieData[index]);
    animation.value = 0; // Reseta a animação
    animation.value = withSpring(1); // Inicia a animação
  };

  const animatedValueStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animation.value, [0, 1], [0, 1]),
      transform: [{ scale: interpolate(animation.value, [0, 1], [0.5, 1]) }],
    };
  });

  const renderDot = (value, color) => {
    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: animation.value,
        transform: [{ scale: animation.value }],
      };
    });

    return (
      <Animated.View
        className="size-4 rounded-full"
        style={[animatedStyle, { backgroundColor: color }]}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <View className="flex-row flex-wrap gap-4 justify-center">
        {pieData.map((data, index) => (
          <View key={index} className="flex-row items-center gap-2">
            {renderDot(data.value, data.color)}
            <Text className="text-purple-800 dark:text-white">{data.text}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <>
      <View className="items-center justify-center rounded-full p-6 mb-4">
        <PieChart
          data={pieData.map((item) => ({
            ...item,
            value: item.value * animation.value,
          }))}
          donut
          showGradient
          onPress={(data, index) => handlePiePress(index)}
          radius={100}
          innerRadius={80}
          innerCircleColor={colorScheme == "light" ? "#00D09E" : "#2E1A46"}
          centerLabelComponent={() =>
            selectedItem && (
              <View className="items-center justify-center">
                <Animated.Text
                  className="text-3xl text-white font-bold"
                  style={[animatedValueStyle]}
                >
                  {selectedItem.value}%
                </Animated.Text>
                <Animated.Text
                  className="text-2xl text-white font-semibold"
                  style={[animatedValueStyle]}
                >
                  {selectedItem.text}
                </Animated.Text>
              </View>
            )
          }
        />
      </View>
      {renderLegendComponent()}
    </>
  );
}
