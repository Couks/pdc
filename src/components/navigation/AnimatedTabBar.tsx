import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useCallback, useEffect } from "react";
import { Platform, Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface TabConfig {
  name: string;
  icon: string;
  label: string;
}

interface AnimatedTabBarProps extends BottomTabBarProps {
  scrollY: Animated.SharedValue<number>;
  tabs: TabConfig[];
}

export function AnimatedTabBar({
  state,
  navigation,
  scrollY,
  tabs,
}: AnimatedTabBarProps) {
  const insets = useSafeAreaInsets();
  const tabPositions = tabs.map(() => useSharedValue(0));

  const animatedTabBarStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value, [0, 50], [0, 100], "clamp");

    return {
      transform: [{ translateY }],
    };
  });

  const handleTabPress = useCallback((index: number, route: string) => {
    tabs.forEach((_, i) => {
      if (i !== index) {
        tabPositions[i].value = withTiming(0);
      }
    });
    tabPositions[index].value = withSpring(1, {
      damping: 10,
      stiffness: 100,
    });
    navigation.navigate(route);
  }, []);

  useEffect(() => {
    tabPositions[state.index].value = withSpring(1, {
      damping: 10,
      stiffness: 100,
    });
  }, []);

  return (
    <Animated.View
      className="absolute bottom-6 left-5 right-5"
      style={animatedTabBarStyle}
    >
      <View
        className="flex-row items-center justify-around rounded-2xl bg-background shadow-2xl"
        style={{
          height: 60 + (Platform.OS === "ios" ? insets.bottom : 0),
          paddingBottom: Platform.OS === "ios" ? insets.bottom : 0,
        }}
      >
        {tabs.map((tab, index) => {
          const isActive = state.index === index;

          const animatedIconContainerStyle = useAnimatedStyle(() => {
            return {
              backgroundColor: withTiming(
                isActive ? "hsl(var(--primary))" : "transparent",
                {
                  duration: 350,
                }
              ),
              transform: [
                {
                  scale: withSpring(tabPositions[index].value * 0.1 + 1),
                },
              ],
            };
          });

          return (
            <Pressable
              key={tab.name}
              onPress={() => handleTabPress(index, tab.name)}
              className="flex-1 items-center justify-center"
            >
              <Animated.View
                className="items-center justify-center rounded-full p-2"
                style={animatedIconContainerStyle}
              >
                <Ionicons
                  name={tab.icon as any}
                  size={32}
                  color={isActive ? "white" : "black"}
                />
              </Animated.View>
            </Pressable>
          );
        })}
      </View>
    </Animated.View>
  );
}
