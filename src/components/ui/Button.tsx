import { cn } from "../../lib/utils";
import { Pressable, Text } from "react-native";
import { type VariantProps, cva } from "class-variance-authority";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const buttonVariants = cva(
  "flex-row gap-2 items-center justify-center rounded-2xl py-2  w-60",
  {
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
  }
);

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
  iconName?: string;
}

function Button({
  label,
  labelClasses,
  className,
  variant,
  size,
  iconName,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity>
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
        <Ionicons name={iconName} size={20} />
      </Pressable>
    </TouchableOpacity>
  );
}

export { Button, buttonVariants, buttonTextVariants };
