import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/ui/Header";
import { useToast } from "@/components/ui/Toast";
import { Loading } from "@/components/ui/Loading";
import { useAuth } from "@/hooks/auth/AuthContext";
import { handleAuthentication } from "@/hooks/auth/AuthBiometry";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { RoundedView } from "@/components/ui/RoundedView";

interface FormData {
  DDDtelefone: string;
  password: string;
}
export function SignInScreen({ navigation }: { navigation: any }) {
  const { toast } = useToast();
  const { onLogin } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const handleSignIn: SubmitHandler<FieldValues & FormData> = async (data: {
    DDDtelefone: string;
    password: string;
  }) => {
    setLoading(true);

    try {
      const result = await onLogin!(data.DDDtelefone, data.password);
      setLoading(false);

      if (result && result.error) {
        Alert.alert(result.msg);
      } else {
        toast("Login realizado!", "success", 2000);

        setTimeout(() => {
          navigation.navigate("SignInScreen");
        }, 5000);
      }
    } catch (error) {
      console.error("Error on login:", error);
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-primary-500 dark:bg-primary-800">
      <Header style={{ height: 50 }} />

      <RoundedView>
        <View className="items-center gap-4 mb-8">
          <Animated.View entering={FadeInUp.springify()} className="w-full">
            <Controller
              control={control}
              rules={{ required: true }}
              name="DDDtelefone"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  iconName="logo-whatsapp"
                  autoComplete="tel"
                  keyboardType="phone-pad"
                  placeholder="Digite seu contato WhatsApp"
                />
              )}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(200).springify()}
            className="w-full"
          >
            <Controller
              control={control}
              rules={{ required: true }}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  iconName="key"
                  secureTextEntry={true}
                  placeholder="Digite sua senha"
                />
              )}
            />
          </Animated.View>
        </View>

        <View className="items-center justify-center gap-6">
          {/* Botão de Login*/}
          <Animated.View
            entering={FadeInUp.delay(400).springify()}
            className="items-center"
          >
            {loading ? (
              <Button label="Carregando...">
                <Loading />
              </Button>
            ) : (
              <Button label="Entrar" onPress={handleSubmit(handleSignIn)} />
            )}
          </Animated.View>
          {/* Esqueceu sua senha?*/}
          <Animated.View
            entering={FadeInUp.delay(600).springify()}
            className="w-full items-center"
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text className="dark:text-white text-md text-secondary-800 font-bold">
                Esqueceu sua senha?
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(800).springify()}>
            <Button
              label="Cadastre-se"
              variant="light"
              onPress={() => navigation.navigate("SignUpScreen")}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(1000).springify()}
            className="items-center flex-row"
          >
            <Text className="text-secondary-800 dark:text-white font-semibold text-md">
              Use Sua{" "}
            </Text>

            <TouchableOpacity onPress={() => handleAuthentication()}>
              <Text className="font-bold text-primary-500 text-md">
                Biometria
              </Text>
            </TouchableOpacity>

            <Text className="text-secondary-800 dark:text-white font-semibold text-md">
              {" "}
              Para Acessar
            </Text>
          </Animated.View>
        </View>
      </RoundedView>
    </View>
  );
}
