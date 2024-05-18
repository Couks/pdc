import { cn } from "../../lib/utils";
import { Pressable, Text } from "react-native";
import { type VariantProps, cva } from "class-variance-authority";
import { TouchableOpacity } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const buttonVariants = cva("items-center justify-center rounded-2xl py-2", {
  variants: {
    variant: {
      default: "bg-green-500 ",
      light: "bg-green-200 ",
    },
    size: {
      default: "px-8",
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
      light: "text-green-700",
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
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
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
  const height = useSharedValue(30);
  const width = useSharedValue(150);

  function onPressIn() {
    height.value = withSpring(50);
    width.value = withSpring(180);
  }

  function onPressOut() {
    height.value = withSpring(30);
    width.value = withSpring(150);
  }

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
    height: height.value,
  }));

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <Animated.View
        style={[
          { alignItems: "center", justifyContent: "center" },
          animatedStyle,
        ]}
      >
        <Text
          className={cn(
            buttonTextVariants({ variant, size, className: labelClasses })
          )}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

export { Button, buttonVariants, buttonTextVariants };
