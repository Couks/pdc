import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  LinearTransition,
} from "react-native-reanimated";
import { useState } from "react";
import { Link } from "expo-router";
import { LoginCredentials } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { useMutation } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  // Estado para armazenar as credenciais de login
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "medico@medical.com",
    password: "123456",
    role: "doctor",
  });

  // Estado para armazenar erros de validação
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login } = useAuth();

  // Mutation para realizar o login do usuário
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : "Erro ao realizar login";
      Alert.alert("Erro", message);
      console.error("Erro no login:", error);
    },
  });

  // Função que valida os campos do formulário
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

  // Função que lida com o envio do formulário
  const handleLogin = async () => {
    if (!validateForm()) return;
    loginMutation.mutate(credentials);
  };

  // Função que altera o tipo de usuário e preenche credenciais padrão
  const handleRoleChange = (role: "doctor" | "patient") => {
    const newCredentials = {
      email: role === "doctor" ? "medico@medical.com" : "patient@patient.com",
      password: "123456",
      role,
    };
    setCredentials(newCredentials);
  };

  // Renderiza o formulário de login
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
              Bem vindo de volta
            </Text>
            <Text className="text-base text-muted-foreground text-center">
              Entre com suas credenciais para acessar sua conta
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.duration(1000).springify()}
            layout={LinearTransition.springify()}
            className="gap-8"
          >
            <View className="gap-6">
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
                    onPress={() => handleRoleChange("doctor")}
                  />

                  <Button
                    variant={
                      credentials.role === "patient" ? "default" : "outline"
                    }
                    className="flex-1 rounded-lg"
                    label="Paciente"
                    onPress={() => handleRoleChange("patient")}
                  />
                </View>
              </View>
            </View>

            <Button
              variant="default"
              className="w-full h-12 rounded-lg"
              label={loginMutation.isPending ? "Entrando..." : "Entrar"}
              onPress={handleLogin}
              disabled={loginMutation.isPending}
            />

            <View className="flex-row justify-center">
              <Text className="text-base text-muted-foreground">
                Não tem uma conta?{" "}
              </Text>
              <Link href="/auth/register">
                <Text className="text-base text-primary font-medium">
                  Cadastre-se
                </Text>
              </Link>
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
