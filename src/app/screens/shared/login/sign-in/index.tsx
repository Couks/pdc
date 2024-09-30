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
import { RoundedView } from "@/components/ui/RoundedView";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Alert, Text, TouchableOpacity, View } from "react-native";

interface FormData {
  email: string;
  password: string;
}
export function SignIn({ navigation }: { navigation: any }) {
  const { toast } = useToast();
  const { onLogin } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const handleSignIn: SubmitHandler<FieldValues & FormData> = async (data: {
    email: string;
    password: string;
  }) => {
    setLoading(true);

    try {
      const result = await onLogin!(data.email, data.password);
      setLoading(false);
      if (result && result.error) {
        Alert.alert(result.msg);
        toast("Erro ao realizar login!", "error");
      } else {
        setTimeout(() => {
          navigation.navigate("SignIn");
        }, 5000);
      }
    } catch (error) {
      console.error("Error on login:", error);
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-primary-500 dark:bg-secondary-900">
      <RoundedView>
        <Animated.View entering={FadeInUp.springify()} className="w-full ">
          <Controller
            control={control}
            rules={{
              required: "O e-mail é obrigatório",
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
                  placeholder="Email "
                />
                {errors.email && (
                  <Text className="text-white py-1 text-center bg-red-500 w-full rounded-full top-2">
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
                  <Text className="text-white py-1 text-center bg-red-500 w-full rounded-full top-2">
                    {errors.password.message?.toString()}
                  </Text>
                )}
              </>
            )}
          />
        </Animated.View>

        <View className="items-center justify-center gap-6 mt-8">
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
          <Animated.View
            entering={FadeInUp.delay(600).springify()}
            className="w-full items-center"
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text className="text-secondary-900 dark:text-white text-xl">
                Esqueceu sua senha?
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(800).springify()}>
            <Button
              label="Cadastre-se"
              variant="light"
              onPress={() => navigation.navigate("SignUp")}
            />
          </Animated.View>
        </View>
      </RoundedView>
    </View>
  );
}
