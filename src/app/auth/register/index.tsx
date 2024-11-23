import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Link } from "expo-router";

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "doctor" | "patient";
}

export default function Register() {
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register, isLoading } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!credentials.name) {
      newErrors.name = "Nome é obrigatório";
    }

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

    if (credentials.password !== credentials.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    try {
      if (!validateForm()) return;
      await register(credentials);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao realizar cadastro";
      Alert.alert("Erro", message);
      console.error("Erro no cadastro:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-6 justify-center">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="gap-2 mb-8"
          >
            <Text className="text-2xl font-bold text-center text-foreground">
              Criar Conta
            </Text>
            <Text className="text-base text-muted-foreground text-center">
              Preencha seus dados para começar
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.duration(1000).springify()}
            className="gap-6"
          >
            <View className="gap-4">
              <Input
                label="Nome completo"
                placeholder="João Silva"
                value={credentials.name}
                onChangeText={(text) =>
                  setCredentials((prev) => ({ ...prev, name: text }))
                }
                error={errors.name}
              />

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

              <Input
                label="Confirmar senha"
                placeholder="••••••••"
                value={credentials.confirmPassword}
                onChangeText={(text) =>
                  setCredentials((prev) => ({ ...prev, confirmPassword: text }))
                }
                secureTextEntry
                error={errors.confirmPassword}
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
              label="Criar conta"
              onPress={handleRegister}
              disabled={isLoading}
            />

            <View className="flex-row justify-center">
              <Text className="text-muted-foreground">Já tem uma conta? </Text>
              <Link href="/auth/login">
                <Text className="text-primary font-medium">Faça login</Text>
              </Link>
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
