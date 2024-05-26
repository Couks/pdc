import { Ionicons } from "@expo/vector-icons";
import { TextInput, TextInputProps, View } from "react-native";
import { useColorScheme } from "nativewind";

import colors from "tailwindcss/colors";

interface InputProps extends TextInputProps {
  iconName?: string;
}

export function Input({ iconName, ...rest }: InputProps) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-row items-center justify-center bg-green-200 px-6 py-2 gap-2 rounded-2xl">
      <TextInput
        placeholderTextColor={colors.purple[900]}
        className="text-gray-800 text-lg flex-1"
        {...rest}
      />
      <Ionicons
        name={iconName}
        size={18}
        color={colorScheme == "light" ? colors.green[500] : colors.purple[800]}
      />
    </View>
  );
}
