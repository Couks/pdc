import { DefaultTheme } from "styled-components/native";

export interface Theme extends DefaultTheme {
  mode: "light" | "dark";
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
    warning: string;
  };
}

export const lightTheme: Theme = {
  mode: "light",
  colors: {
    primary: "#7B68EE",
    secondary: "#FF4444",
    background: "#F5F5F5",
    surface: "#FFFFFF",
    text: "#000000",
    textSecondary: "#666666",
    border: "#E5E5E5",
    error: "#FF0000",
    success: "#4CAF50",
    warning: "#FFC107",
  },
};

export const darkTheme: Theme = {
  mode: "dark",
  colors: {
    primary: "#9D8FFF",
    secondary: "#FF6B6B",
    background: "#121212",
    surface: "#1E1E1E",
    text: "#FFFFFF",
    textSecondary: "#AAAAAA",
    border: "#333333",
    error: "#FF4444",
    success: "#66BB6A",
    warning: "#FFCA28",
  },
};

export const colors = {
  primary: "#7B68EE",
  secondary: "#FF4444",
  background: "#F5F5F5",
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    light: "#E5E5E5",
    medium: "#999999",
    dark: "#666666",
  },
  error: "#FF0000",
  success: "#4CAF50",
  warning: "#FFC107",
};

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
  weights: {
    regular: "400",
    medium: "500",
    bold: "700",
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
