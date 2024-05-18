import { ActivityIndicator } from "react-native";
import { colors } from "@/styles/colors";

export function Loading() {
  return (
    <ActivityIndicator
      className="flex-1"
      color={colors.green[500]}
      size="large"
    />
  );
}
