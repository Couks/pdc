import Animated, { FadeInDown, ReduceMotion } from "react-native-reanimated";

interface RoundedViewProps {
  children: React.ReactNode;
}

export function RoundedView({ children }: RoundedViewProps) {
  return (
    <Animated.View
      entering={FadeInDown.springify()}
      className="flex-1 justify-center bg-white dark:bg-secondary-800 pt-4 px-4 gap-4 rounded-t-[30px] pb-24"
    >
      {children}
    </Animated.View>
  );
}
