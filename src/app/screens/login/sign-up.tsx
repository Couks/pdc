import Animated, {
  FadeInUp,
  FadeInDown,
  FadeInRight,
  FadeInLeft,
} from "react-native-reanimated";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";
import { Loading } from "@/components/ui/Loading";
import { useAuth } from "@/hooks/auth/AuthContext";
import { useForm, Controller } from "react-hook-form";
import { ToastProvider, useToast } from "@/components/ui/Toast";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { RoundedView } from "@/components/ui/RoundedView";

interface FormData {
  email: string;
  DDDtelefone: string;
  password: string;
  apelido: string;
  firstName: string;
  lastName: string;
}

export function SignUp({ navigation }: { navigation: any }) {
  const { toast } = useToast();
  const { onRegister } = useAuth();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({});

  const handleSignUp = async (data: FormData) => {
    setLoading(true);

    try {
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
        toast("Conta criada com sucesso!", "success");

        setTimeout(() => {
          navigation.navigate("SignIn");
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <ToastProvider>
      <View className="flex-1 bg-primary-500 dark:bg-primary-800">
        <Header />

        {loading ? (
          <Loading />
        ) : (
          <RoundedView>
            {success ? (
              <View className="flex-1 items-center justify-center gap-6 px-8">
                <Text className="dark:text-white text-primary-500 text-3xl text-center">
                  Parabens, sua conta foi criada!
                </Text>
              </View>
            ) : (
              <View className="gap-4">
                <View className="items-center justify-center gap-4 mb-4">
                  <Animated.View
                    entering={FadeInUp.delay(0).springify()}
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
                        <>
                          <Input
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            iconName="mail-outline"
                            keyboardType="email-address"
                            autoComplete="email"
                            placeholder="Digite seu endereço de e-mail"
                          />
                          {errors.email && (
                            <Text className="text-white py-1 text-center bg-red-500 w-full rounded-xl top-2">
                              {errors.email.message?.toString()}
                            </Text>
                          )}
                        </>
                      )}
                    />
                  </Animated.View>
                  <Animated.View
                    entering={FadeInUp.delay(200).springify()}
                    className="w-full"
                  >
                    <Controller
                      control={control}
                      rules={{
                        required: "O número de telefone é obrigatório",
                      }}
                      name="DDDtelefone"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <>
                          <Input
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            iconName="logo-whatsapp"
                            keyboardType="phone-pad"
                            placeholder="Digite seu número de WhatsApp"
                          />
                          {errors.DDDtelefone && (
                            <Text className="text-white py-1 text-center bg-red-500 w-full rounded-xl top-2">
                              {errors.DDDtelefone.message?.toString()}
                            </Text>
                          )}
                        </>
                      )}
                    />
                  </Animated.View>
                  <Animated.View
                    entering={FadeInUp.delay(400).springify()}
                    className="w-full"
                  >
                    <Controller
                      control={control}
                      rules={{ required: "A senha é obrigatória" }}
                      name="password"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <>
                          <Input
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            iconName="lock-closed-outline"
                            secureTextEntry={true}
                            placeholder="Digite sua senha"
                          />
                          {errors.password && (
                            <Text className="text-white py-1 text-center bg-red-500 w-full rounded-xl top-2">
                              {errors.password.message?.toString()}
                            </Text>
                          )}
                        </>
                      )}
                    />
                  </Animated.View>
                  <Animated.View
                    entering={FadeInUp.delay(600).springify()}
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
                          iconName="person-outline"
                          placeholder="Digite seu apelido"
                        />
                      )}
                    />
                  </Animated.View>

                  <View className="flex-row gap-4 justify-between w-full">
                    <Animated.View
                      entering={FadeInLeft.delay(800).springify()}
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
                      entering={FadeInRight.delay(800).springify()}
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
                </View>

                {/* Botão de Login*/}
                <Animated.View
                  entering={FadeInUp.delay(1200).springify()}
                  className="items-center"
                >
                  {loading ? (
                    <Button label="Carregando..." className="w-60">
                      <Loading />
                    </Button>
                  ) : (
                    <Button
                      label="Criar Conta"
                      className="w-60"
                      onPress={handleSubmit(handleSignUp)}
                    />
                  )}
                </Animated.View>

                <Animated.View
                  entering={FadeInDown.delay(1400).springify()}
                  className="w-full items-center"
                >
                  <Text className="text-secondary-800 dark:text-white">
                    Já tem uma conta?
                  </Text>
                </Animated.View>

                <Animated.View
                  entering={FadeInDown.delay(1600).springify()}
                  className="w-full items-center -mt-4"
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SignIn")}
                  >
                    <Text className="text-primary-500 ">
                      Clique para realizar seu login
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            )}
          </RoundedView>
        )}
      </View>
    </ToastProvider>
  );
}
