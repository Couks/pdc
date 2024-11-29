import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useCallback, useEffect } from "react";
import { Platform, Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
  Easing,
  SlideInLeft,
  SlideInRight,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

interface TabConfig {
  name: string;
  icon: string;
  label: string;
}

interface AnimatedTabBarProps extends BottomTabBarProps {
  tabs: TabConfig[];
}

export function AnimatedTabBar({
  state,
  navigation,
  tabs,
}: AnimatedTabBarProps) {
  const insets = useSafeAreaInsets();
  const tabPositions = tabs.map(() => useSharedValue(0));

  const handleTabPress = useCallback((index: number, route: string) => {
    tabs.forEach((_, i) => {
      if (i !== index) {
        tabPositions[i].value = withTiming(0, {
          duration: 400,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
      }
    });

    tabPositions[index].value = withSpring(1, {
      damping: 15,
      stiffness: 80,
      mass: 1.2,
      velocity: 4,
    });

    navigation.navigate(route);
  }, []);

  useEffect(() => {
    tabPositions[state.index].value = withSpring(1, {
      damping: 10,
      stiffness: 50,
      mass: 2,
    });
  }, []);

  return (
    <Animated.View
      className="rounded-t-xl"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      }}
    >
      <BlurView
        intensity={40}
        experimentalBlurMethod="dimezisBlurView"
        tint="light"
        className="border-t border-gray-200"
      >
        <View
          className="flex-row items-center"
          style={{
            height: 60 + (Platform.OS === "ios" ? insets.bottom : 0),
            paddingBottom: Platform.OS === "ios" ? insets.bottom : 0,
          }}
        >
          {tabs.map((tab, index) => {
            const isActive = state.index === index;
            const enteringAnimation =
              index > state.index ? SlideInRight : SlideInLeft;

            const animatedIconStyle = useAnimatedStyle(() => {
              return {
                transform: [
                  {
                    scale: withSpring(tabPositions[index].value * 0.3 + 1, {
                      damping: 15,
                      stiffness: 80,
                    }),
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
                  className="items-center justify-center p-2"
                  style={animatedIconStyle}
                  entering={enteringAnimation.duration(600)}
                >
                  <Ionicons
                    name={tab.icon as any}
                    size={24}
                    color={isActive ? "#0066FF" : "#71717A"}
                  />
                </Animated.View>
              </Pressable>
            );
          })}
        </View>
      </BlurView>
    </Animated.View>
  );
}
