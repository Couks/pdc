import { type VariantProps, cva } from "class-variance-authority";
import { Pressable, Text } from "react-native";

import { cn } from "../lib/utils";

const buttonVariants = cva(
  "flex flex-row items-center justify-center rounded-2xl py-4 w-auto",
  {
    variants: {
      variant: {
        default: "bg-green-500",
        light: "bg-green-200",
        link: "bg-purple-500",
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
  }
);

const buttonTextVariants = cva("text-center font-bold", {
  variants: {
    variant: {
      default: "text-white",
      light: "text-green-700",
      link: "text-green-700",
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
  );
}

export { Button, buttonVariants, buttonTextVariants };
