import { Ionicons } from "@expo/vector-icons";
import { TextInput, TextInputProps, View } from "react-native";

import colors from "tailwindcss/colors";

interface InputProps {
  iconName?: string;
}

export function Input({ ...rest }: TextInputProps, { iconName }: InputProps) {
  return (
    <View className="flex-row items-center justify-center bg-green-200 px-4 py-2 rounded-2xl">
      <TextInput
        placeholderTextColor={colors.gray[500]}
        className="text-gray-500 text-lg flex-1"
        {...rest}
      />
      <Ionicons name={iconName} size={24} color={"black"} />
    </View>
  );
}
