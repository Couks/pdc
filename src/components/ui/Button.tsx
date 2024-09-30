import { cn } from "../../lib/utils";
import { Text, TouchableOpacity } from "react-native";
import { type VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
  "flex-row gap-2 items-center justify-center rounded-full py-2 w-auto",
  {
    variants: {
      variant: {
        default: "bg-primary-500 dark:bg-secondary-600",
        destructive: "bg-red-500",
        light:
          "bg-primary-100 border-2 border-primary-600 dark:bg-secondary-200 dark:border-0",
      },
      size: {
        default: "px-12",
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
      destructive: "text-white",
      light: "text-primary-800",
    },
    size: {
      default: "text-2xl",
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
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
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
    </TouchableOpacity>
  );
}

export { Button, buttonVariants, buttonTextVariants };
