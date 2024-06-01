import { colors } from "@/assets/styles/colors";
import { ActivityIndicator } from "react-native";

export function Loading() {
  return (
    <ActivityIndicator
      className="flex-1"
      color={colors.primary[500]}
      size="large"
    />
  );
}
