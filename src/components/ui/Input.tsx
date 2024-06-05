import colors from "tailwindcss/colors";
import { useColorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  iconName?: string;
}

export function Input({ iconName, ...rest }: InputProps) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-row items-center justify-center bg-primary-200 dark:bg-secondary-500 px-6 py-2 gap-2 rounded-3xl">
      <TextInput
        placeholderTextColor={
          colorScheme == "light" ? colors.gray[800] : colors.gray[200]
        }
        className="text-gray-800 dark:text-white text-lg flex-1"
        {...rest}
      />
      <Ionicons
        name={iconName}
        size={18}
        color={colorScheme == "light" ? "black" : "white"}
      />
    </View>
  );
}
