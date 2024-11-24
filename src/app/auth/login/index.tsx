import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  FadeInDown,
  FadeInUp,
  LinearTransition,
} from "react-native-reanimated";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { LoginCredentials } from "@/types/auth.types";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Link } from "expo-router";

export default function Login() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "joao.silva@medical.com",
    password: "123456",
    role: "doctor",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login, isLoading } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!credentials.email) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!credentials.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (credentials.password.length < 6) {
      newErrors.password = "Senha deve ter no mínimo 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    try {
      if (!validateForm()) return;
      await login(credentials);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao realizar login";
      Alert.alert("Erro", message);
      console.error("Erro no login:", error);
    } finally {
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-6 justify-center ">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            layout={LinearTransition.springify()}
            className="gap-2 mb-8"
          >
            <Text className="text-2xl font-bold text-center text-foreground dark:text-foreground">
              Olá! Seja bem vindo!
            </Text>
            <Text className="text-base text-muted-foreground text-center">
              Faça login para continuar
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.duration(1000).springify()}
            layout={LinearTransition.springify()}
            className="gap-6"
          >
            <View className="gap-4">
              <Input
                label="Email"
                placeholder="exemplo@email.com"
                value={credentials.email}
                onChangeText={(text) =>
                  setCredentials((prev) => ({ ...prev, email: text }))
                }
                autoCapitalize="none"
                keyboardType="email-address"
                error={errors.email}
              />

              <Input
                label="Senha"
                placeholder="••••••••"
                value={credentials.password}
                onChangeText={(text) =>
                  setCredentials((prev) => ({ ...prev, password: text }))
                }
                secureTextEntry
                error={errors.password}
              />

              <View>
                <Text className="text-md font-medium text-foreground mb-2">
                  Tipo de Usuário
                </Text>
                <View className="flex-row gap-4">
                  <Button
                    variant={
                      credentials.role === "doctor" ? "default" : "secondary"
                    }
                    className="flex-1"
                    label="Médico"
                    onPress={() =>
                      setCredentials((prev) => ({ ...prev, role: "doctor" }))
                    }
                  />

                  <Button
                    variant={
                      credentials.role === "patient" ? "default" : "secondary"
                    }
                    className="flex-1"
                    label="Paciente"
                    onPress={() =>
                      setCredentials((prev) => ({ ...prev, role: "patient" }))
                    }
                  />
                </View>
              </View>
            </View>

            <Button
              variant="default"
              className="w-full"
              label="Entrar"
              onPress={handleLogin}
              disabled={isLoading}
            />

            <View className="flex-row justify-center">
              <Text className="text-muted-foreground">Não tem uma conta? </Text>
              <Link href="/auth/register">
                <Text className="text-primary font-medium">Cadastre-se</Text>
              </Link>
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
