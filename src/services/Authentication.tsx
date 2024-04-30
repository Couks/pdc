import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";

export async function handleAuthentication({
  setIsLogedIn,
}: {
  setIsLogedIn: boolean;
}) {
  // Verifica se há hardware de autenticação e tipos suportados
  const compatible = await LocalAuthentication.hasHardwareAsync();
  const types = await LocalAuthentication.supportedAuthenticationTypesAsync();

  // Verifica se a biometria está cadastrada
  const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
  if (!isBiometricEnrolled) {
    return Alert.alert(
      "Login",
      "Nenhuma biometria encontrada. Por favor, cadastre no dispositivo."
    );
  }

  // Se o dispositivo é compatível e a biometria está cadastrada, prossegue com a autenticação
  if (compatible && types.length > 0) {
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login com Biometria",
      fallbackLabel: "Biometria não reconhecida",
    });
  } else {
    // Se o dispositivo não é compatível ou não suporta tipos de autenticação, mostra um alerta
    Alert.alert(
      "Login",
      "Autenticação biométrica não disponível neste dispositivo."
    );
  }
}
