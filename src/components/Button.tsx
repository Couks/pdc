import { type VariantProps, cva } from "class-variance-authority";
import { Pressable, Text } from "react-native";

import { cn } from "../lib/utils";
import Animated, {
  BounceIn,
  BounceOut,
  ColorSpace,
} from "react-native-reanimated";

const buttonVariants = cva("items-center justify-center rounded-2xl py-4", {
  variants: {
    variant: {
      default: "bg-green-500 dark:bg-purple-500",
      light:
        "bg-green-200 dark:bg-purple-100 border-2 border-green-500 dark:border-purple-500",
    },
    size: {
      default: "px-8 ",
      sm: "px-6",
      lg: "px-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const buttonTextVariants = cva("text-center font-bold", {
  variants: {
    variant: {
      default: "text-white",
      light: "text-green-500 dark:text-purple-500",
    },
    size: {
      default: "text-xl",
      sm: "text-lg",
      lg: "text-2xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof buttonVariants> {
  label: string;
  labelClasses?: string;
}
function Button({
  label,
  labelClasses,
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <Animated.View
      entering={BounceIn.delay(200).duration(1000)}
      exiting={BounceOut.delay(200).duration(1000)}
    >
      <Pressable
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        <Text
          className={cn(
            buttonTextVariants({ variant, size, className: labelClasses })
          )}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

export { Button, buttonVariants, buttonTextVariants };
