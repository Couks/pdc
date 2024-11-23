import { Text, TouchableOpacity } from "react-native";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost";
  className?: string;
  textClass?: string;
  label: string;
  onPress?: () => void;
  disabled?: boolean;
}

export function Button({
  variant = "default",
  className,
  textClass,
  label,
  onPress,
  disabled,
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={cn(
        "flex-row items-center justify-center rounded-2xl px-4 py-3",
        {
          "bg-primary": variant === "default",
          "bg-secondary": variant === "secondary",
          "bg-destructive": variant === "destructive",
          "border border-input": variant === "outline",
          "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
          "opacity-50": disabled,
        },
        className
      )}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        className={cn(
          "text-base font-semibold",
          {
            "text-primary-foreground": variant === "default",
            "text-secondary-foreground": variant === "secondary",
            "text-destructive-foreground": variant === "destructive",
            "text-foreground": variant === "outline" || variant === "ghost",
          },
          textClass
        )}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
