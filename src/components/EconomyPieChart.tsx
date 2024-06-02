import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Svg, Circle, G } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const radius = width * 0.12;
const strokeWidth = 5;
const circumference = 2 * Math.PI * radius;

const EconomyPieChart = ({ percentage }) => {
  const animatedPercentage = useSharedValue(0);

  animatedPercentage.value = withTiming(percentage, {
    duration: 1500,
    easing: Easing.out(Easing.ease),
  });

  const strokeDashoffset = useAnimatedStyle(() => {
    return {
      strokeDashoffset: withTiming(
        circumference - (circumference * animatedPercentage.value) / 100,
        {
          duration: 1500,
          easing: Easing.out(Easing.ease),
        }
      ),
    };
  });

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Svg
        width={radius * 2 + strokeWidth * 2}
        height={radius * 2 + strokeWidth * 2}
        viewBox={`0 0 ${radius * 2 + strokeWidth * 2} ${
          radius * 2 + strokeWidth * 2
        }`}
      >
        <G
          rotation="-90"
          origin={`${radius + strokeWidth}, ${radius + strokeWidth}`}
        >
          <Circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="#D3D3D3"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <AnimatedCircle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="#FFD700"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            style={strokeDashoffset}
          />
        </G>
      </Svg>
      <Text className="absolute text-lg text-gray-500 dark:text-white">
        {percentage.toFixed(1)}%
      </Text>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default EconomyPieChart;
