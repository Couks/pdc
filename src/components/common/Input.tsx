import { forwardRef } from "react";
import { Text, TextInput, View } from "react-native";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  labelClasses?: string;
  inputClasses?: string;
  error?: string;
}
const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, labelClasses, inputClasses, error, ...props }, ref) => (
    <View className={cn("flex flex-col gap-2", className)}>
      {label && (
        <Text
          className={cn(
            "text-md font-medium text-foreground dark:text-foreground",
            labelClasses
          )}
        >
          {label}
        </Text>
      )}
      <TextInput
        ref={ref}
        className={cn(
          "flex h-10 rounded-md border border-input bg-background px-4 py-2 text-md text-foreground",
          "dark:bg-background dark:text-foreground dark:border-input",
          "placeholder:text-muted-foreground dark:placeholder:text-muted-foreground",
          "disabled:opacity-50",
          inputClasses
        )}
        placeholderTextColor="hsl(var(--muted-foreground))"
        {...props}
      />
      {error && (
        <Text className="text-destructive dark:text-destructive text-md">
          {error}
        </Text>
      )}
    </View>
  )
);

export { Input };
