import { View, Switch } from "react-native";
import { useColorScheme } from "nativewind";
import { colors as defaultColors } from "@/assets/styles/colors";
import { Feather } from "@expo/vector-icons";

export function ToggleTheme() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-row items-center gap-1">
      <Feather
        name="moon"
        size={20}
        color={colorScheme === "light" ? "black" : "white"}
      />
      <Switch
        trackColor={{
          true: defaultColors.primary[700],
          false: defaultColors.secondary[700],
        }}
        thumbColor={
          colorScheme === "light"
            ? defaultColors.primary[500]
            : defaultColors.secondary[500]
        }
        onValueChange={toggleColorScheme}
        value={colorScheme === "light"}
      />

      <Feather
        name="sun"
        size={22}
        color={colorScheme === "light" ? "black" : "white"}
      />
    </View>
  );
}
