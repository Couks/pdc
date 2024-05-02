import { TextInput, TextInputProps, View } from "react-native";

import { colors } from "@/styles/colors";

export function Input({ ...rest }: TextInputProps) {
  return (
    <View className="bg-green-200 p-4 rounded-2xl w-full">
      <TextInput
        placeholderTextColor={colors.gray[300]}
        className="w-full h-8 text-gray-200 font-normal text-md"
        {...rest}
      />
    </View>
  );
}
