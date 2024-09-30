import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";

interface RoundedViewProps {
  children: React.ReactNode;
}

export function RoundedView({ children }: RoundedViewProps) {
  return (
    <Animated.View
      entering={FadeInRight.springify()}
      className="h-screen justify-center bg-white dark:bg-secondary-800 pt-4 px-4 gap-4 pb-24 rounded-t-3xl"
    >
      {children}
    </Animated.View>
  );
}
