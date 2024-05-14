import { Link } from "expo-router";
import Header from "@/components/Header";
import { Alert, Text, View, ActivityIndicator } from "react-native";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";
import { ToastProvider, useToast } from "@/components/Toast";

import { useForm, Controller } from "react-hook-form";
import Animated, {
  FadeInUp,
  FadeInDown,
  FadeInRight,
  FadeInLeft,
} from "react-native-reanimated";
import { useAuth } from "@/services/AuthContext";
import { useState } from "react";

export default function SignUpScreen({ navigation }: { navigation: any }) {
  const { toast } = useToast();
  const { onRegister } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  async function handleSignUp(data: {
    email: string;
    password: string;
    apelido: string;
    firstName: string;
    lastName: string;
    DDDtelefone: string;
  }) {
    setLoading(true);
    const result = await onRegister!(
      data.email,
      data.password,
      data.apelido,
      data.firstName,
      data.lastName,
      data.DDDtelefone
    );
    setLoading(false);

    if (result && result.error) {
      Alert.alert(result.msg);
    } else {
      setSuccess(true);
      toast("Conta criada com sucesso! 😁", "success", 5000);

      setTimeout(() => {
        navigation.navigate("SignInScreen");
      }, 3000);
    }
  }

  return (
    <ToastProvider>
      <View className="flex-1 bg-green-500 dark:bg-green-700">
        <Header title="Criar Conta" style={{ height: 200 }} />

        {loading ? (
          <Loading />
        ) : (
          <View className="flex-1 justify-center bg-white dark:bg-purple-800 rounded-t-[50px]">
            {success ? (
              <View className="flex-1 items-center justify-center gap-6 px-8">
                <Text className="dark:text-white text-green-500 text-3xl text-center">
                  Parabens, sua conta foi criada
                </Text>
              </View>
            ) : (
              <View className="mx-6 gap-4">
                <View className="items-center justify-center gap-4 mb-4">
                  <Animated.View
                    entering={FadeInUp.duration(1000).springify()}
                    className="w-full"
                  >
                    <Controller
                      control={control}
                      rules={{
                        required: "O e-mail é obrigatório",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "E-mail inválido",
                        },
                      }}
                      name="email"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                          keyboardType="email-address"
                          autoComplete="email"
                          placeholder="Digite seu endereço de e-mail"
                        />
                      )}
                    />
                  </Animated.View>
                  <Animated.View
                    entering={FadeInUp.delay(200).duration(1000).springify()}
                    className="w-full"
                  >
                    <Controller
                      control={control}
                      name="password"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                          secureTextEntry={true}
                          placeholder="Digite sua senha"
                        />
                      )}
                    />
                  </Animated.View>
                  <Animated.View
                    entering={FadeInUp.delay(400).duration(1000).springify()}
                    className="w-full"
                  >
                    <Controller
                      control={control}
                      name="apelido"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                          placeholder="Digite seu apelido"
                        />
                      )}
                    />
                  </Animated.View>

                  <View className="flex-row gap-4 justify-between w-full">
                    <Animated.View
                      entering={FadeInLeft.delay(600)
                        .duration(1000)
                        .springify()}
                      className="flex-1"
                    >
                      <Controller
                        control={control}
                        name="firstName"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="Nome"
                          />
                        )}
                      />
                    </Animated.View>
                    <Animated.View
                      entering={FadeInRight.delay(600)
                        .duration(1000)
                        .springify()}
                      className="flex-1"
                    >
                      <Controller
                        control={control}
                        name="lastName"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="Sobrenome"
                          />
                        )}
                      />
                    </Animated.View>
                  </View>

                  <Animated.View
                    entering={FadeInUp.delay(800).duration(1000).springify()}
                    className="w-full"
                  >
                    <Controller
                      control={control}
                      name="DDDtelefone"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                          keyboardType="phone-pad"
                          iconName="logo-whatsapp"
                          placeholder="Digite seu numero de WhatsApp"
                        />
                      )}
                    />
                  </Animated.View>
                </View>

                {/* Botão de Login*/}
                <Animated.View
                  entering={FadeInUp.delay(1000).duration(1000).springify()}
                  className="items-center"
                >
                  <Button
                    label="Criar Conta"
                    onPress={handleSubmit(handleSignUp)}
                  />
                </Animated.View>

                {/* Esqueceu sua senha?*/}
                <Animated.View
                  entering={FadeInDown.delay(1200).duration(1000).springify()}
                  className="w-full items-center"
                >
                  <Text className="text-medium text-purple-600 dark:text-white">
                    Já tem uma conta?
                  </Text>

                  <Link href="/login/SignInScreen">
                    <Text className="text-green-500">
                      Clique para realizar seu login
                    </Text>
                  </Link>
                </Animated.View>
              </View>
            )}
          </View>
        )}
      </View>
    </ToastProvider>
  );
}
