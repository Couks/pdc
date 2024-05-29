import Animated, { FadeInDown } from "react-native-reanimated";

interface RoundedViewProps {
  children: React.ReactNode;
}

export function RoundedView({ children }: RoundedViewProps) {
  return (
    <Animated.View
      entering={FadeInDown.delay(400).duration(800).springify()}
      className="flex-1 bg-white dark:bg-purple-800 items-center justify-center p-6 gap-4 rounded-t-[30px]"
    >
      {children}
    </Animated.View>
  );
}
