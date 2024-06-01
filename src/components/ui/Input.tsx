import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { TextInput, TextInputProps, View } from "react-native";

import colors from "tailwindcss/colors";
import { colors as defaultColors } from "@/assets/styles/colors";

interface InputProps extends TextInputProps {
  iconName?: string;
}

export function Input({ iconName, ...rest }: InputProps) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-row items-center justify-center bg-primary-200 px-6 py-2 gap-2 rounded-3xl">
      <TextInput
        placeholderTextColor={colors.gray[800]}
        className="text-gray-800 text-lg flex-1"
        {...rest}
      />
      <Ionicons
        name={iconName}
        size={18}
        color={
          colorScheme == "light" ? defaultColors.primary[500] : defaultColors.secondary[800]
        }
      />
    </View>
  );
}
