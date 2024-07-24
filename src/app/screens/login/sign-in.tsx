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
  DDDtelefone: string;
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
    DDDtelefone: string;
    password: string;
  }) => {
    setLoading(true);

    try {
      const result = await onLogin!(data.DDDtelefone, data.password);
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
    <View className="flex-1 bg-primary-500 dark:bg-primary-800">
      <Header style={{ height: 50 }} />

      <RoundedView>
        <Animated.View entering={FadeInUp.springify()} className="w-full ">
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
                  <Text className="text-white py-1 text-center bg-red-500 w-full rounded-xl top-2">
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
              <Button label="Carregando..." className="w-60">
                <Loading />
              </Button>
            ) : (
              <Button
                label="Entrar"
                className="w-60"
                onPress={handleSubmit(handleSignIn)}
              />
            )}
          </Animated.View>
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
              onPress={() => navigation.navigate("SignUp")}
            />
          </Animated.View>
        </View>
      </RoundedView>
    </View>
  );
}
