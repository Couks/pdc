import React, { Component, ErrorInfo, ReactNode } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          className="gap-4 p-4"
        >
          <View className="bg-destructive/20 p-4 rounded-full">
            <Ionicons
              name="alert-circle"
              size={48}
              color="hsl(var(--destructive))"
            />
          </View>
          <Text className="text-xl font-bold text-destructive text-center">
            Ops! Algo deu errado
          </Text>
          <Text className="text-muted-foreground text-center">
            Desculpe pelo inconveniente. Por favor, tente novamente mais tarde.
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}
