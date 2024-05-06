import { Link } from "expo-router";
import Header from "@/components/Header";
import { Text, View } from "react-native";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useForm, Controller } from "react-hook-form";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import { useAuth } from "@/services/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen({ navigation }: { navigation: any }) {
  const { onRegister } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  function handleSignUp(data: {
    email: string;
    password: string;
    apelido: string;
    firstName: string;
    lastName: string;
    DDDtelefone: string;
  }) {
    console.log(data);
  }

  const register = async (data: {
    email: string;
    password: string;
    apelido: string;
    firstName: string;
    lastName: string;
    DDDtelefone: string;
  }) => {
    const result = await onRegister!(
      data.email,
      data.password,
      data.apelido,
      data.firstName,
      data.lastName,
      data.DDDtelefone
    );
    if (result && result.error) {
      alert(result.msg);
    }
  };

  return (
    <View className="flex-1 bg-green-500 dark:bg-green-700">
      <Header title="Criar Conta" style={{ height: 200 }} />
      <View className="flex-1 justify-center bg-white dark:bg-purple-800 rounded-t-[50px]">
        {/* Formulário*/}
        <View className="mx-6 gap-4">
          <View className="items-center justify-center gap-4 mb-4">
            <Animated.View
              entering={FadeInUp.duration(1000).springify()}
              exiting={FadeInDown.duration(1000).springify()}
              className="w-full"
            >
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    autoComplete="email"
                    placeholder="Digite seu endereço de e-mail"
                  />
                )}
              />
            </Animated.View>
            <Animated.View
              entering={FadeInUp.delay(200).duration(1000).springify()}
              exiting={FadeInDown.duration(1000).springify()}
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
              entering={FadeInUp.delay(200).duration(1000).springify()}
              exiting={FadeInDown.duration(1000).springify()}
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
                entering={FadeInUp.delay(200).duration(1000).springify()}
                exiting={FadeInDown.duration(1000).springify()}
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
                entering={FadeInUp.delay(200).duration(1000).springify()}
                exiting={FadeInDown.duration(1000).springify()}
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
              entering={FadeInUp.delay(200).duration(1000).springify()}
              exiting={FadeInDown.duration(1000).springify()}
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
                    iconName="logo-whatsapp"
                    placeholder="Digite seu numero de WhatsApp"
                  />
                )}
              />
            </Animated.View>
          </View>

          {/* Botão de Login*/}
          <Animated.View
            entering={FadeInUp.delay(400).duration(1000).springify()}
            exiting={FadeInDown.duration(1000).springify()}
            className="items-center"
          >
            <Button
              label="Criar Conta"
              size="lg"
              onPress={handleSubmit(handleSignUp)}
            />
          </Animated.View>

          {/* Esqueceu sua senha?*/}
          <Animated.View
            entering={FadeInDown.delay(800).duration(1000).springify()}
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
      </View>
    </View>
  );
}
