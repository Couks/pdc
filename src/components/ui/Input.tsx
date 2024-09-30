import { useColorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, TextInputProps, View } from "react-native";
import { colors } from "@/assets/styles/colors";

interface InputProps extends TextInputProps {
  iconName?: string;
}

export function Input({ iconName, ...rest }: InputProps) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-row items-center justify-center bg-primary-200 dark:bg-secondary-500 px-6 py-2 gap-2 rounded-full">
      <TextInput
        placeholderTextColor={
          colorScheme == "light" ? colors.primary[900] : colors.white
        }
        className="dark:text-white text-xl flex-1"
        {...rest}
      />
      <Ionicons
        name={iconName}
        size={24}
        color={colorScheme == "light" ? "black" : "white"}
      />
    </View>
  );
}
