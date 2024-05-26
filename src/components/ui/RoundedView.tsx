import { View } from "react-native";

interface RoundedViewProps {
  children: React.ReactNode;
}

export function RoundedView({ children }: RoundedViewProps) {
  return (
    <View className="flex-1 bg-white dark:bg-purple-800 items-center p-6 gap-4 rounded-t-[30px]">
      {children}
    </View>
  );
}
