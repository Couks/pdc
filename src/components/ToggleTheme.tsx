import { Text, View, Switch } from "react-native";
import { useColorScheme } from "nativewind";

import colors from "tailwindcss/colors";
import { Feather } from "@expo/vector-icons";

export function ToggleTheme() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-row items-center">
      <Feather
        name="moon"
        size={20}
        className="dark:text-white light:text-green-700"
      />
      <Switch
        trackColor={{ true: colors.green[700], false: colors.purple[500] }}
        thumbColor={
          colorScheme === "light" ? colors.green[500] : colors.purple[700]
        }
        onValueChange={toggleColorScheme}
        value={colorScheme === "light"}
      />

      <Feather
        name="sun"
        size={20}
        className="dark:text-white light:text-green-700"
      />
    </View>
  );
}
