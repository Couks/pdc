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
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Link } from "expo-router";
import { useMutation } from "@tanstack/react-query";

// Interface que define os campos necessários para o registro
interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "doctor" | "patient";
}

export default function Register() {
  // Estado para armazenar os dados do formulário
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
  });

  // Estado para armazenar mensagens de erro de validação
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register } = useAuth();

  // Mutation para realizar o registro do usuário
  const registerMutation = useMutation({
    mutationFn: (credentials: RegisterCredentials) => register(credentials),
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : "Erro ao realizar cadastro";
      Alert.alert("Erro", message);
      console.error("Erro no cadastro:", error);
    },
  });

  // Função que valida os campos do formulário
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

  // Função que lida com o envio do formulário
  const handleRegister = () => {
    if (!validateForm()) return;
    registerMutation.mutate(credentials);
  };

  // Renderiza o formulário de registro
  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-8 justify-center">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            layout={LinearTransition.springify()}
            className="gap-3 mb-10"
          >
            <Text className="text-3xl font-bold tracking-tight text-center text-foreground">
              Criar Conta
            </Text>
            <Text className="text-base text-muted-foreground text-center">
              Preencha seus dados para começar
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.duration(1000).springify()}
            layout={LinearTransition.springify()}
            className="gap-8"
          >
            <View className="gap-6">
              <Input
                label="Nome completo"
                placeholder="João Silva"
                value={credentials.name}
                onChangeText={(text) =>
                  setCredentials((prev) => ({ ...prev, name: text }))
                }
                error={errors.name}
                labelClasses="text-base font-medium"
                inputClasses="h-12 rounded-lg"
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
                labelClasses="text-base font-medium"
                inputClasses="h-12 rounded-lg"
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
                labelClasses="text-base font-medium"
                inputClasses="h-12 rounded-lg"
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
                labelClasses="text-base font-medium"
                inputClasses="h-12 rounded-lg"
              />

              <View>
                <Text className="text-base font-medium text-foreground mb-3">
                  Tipo de Usuário
                </Text>
                <View className="flex-row gap-4">
                  <Button
                    variant={
                      credentials.role === "doctor" ? "default" : "outline"
                    }
                    className="flex-1 rounded-lg"
                    label="Médico"
                    onPress={() =>
                      setCredentials((prev) => ({ ...prev, role: "doctor" }))
                    }
                  />

                  <Button
                    variant={
                      credentials.role === "patient" ? "default" : "outline"
                    }
                    className="flex-1 rounded-lg"
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
              className="w-full h-12 rounded-lg"
              label={
                registerMutation.isPending ? "Criando conta..." : "Criar conta"
              }
              onPress={handleRegister}
              disabled={registerMutation.isPending}
            />

            <View className="flex-row justify-center">
              <Text className="text-base text-muted-foreground">
                Já tem uma conta?{" "}
              </Text>
              <Link href="/auth/login">
                <Text className="text-base text-primary font-medium">
                  Faça login
                </Text>
              </Link>
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
