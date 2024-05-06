import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";

export async function handleAuthentication() {
  const compatible = await LocalAuthentication.hasHardwareAsync();
  const types = await LocalAuthentication.supportedAuthenticationTypesAsync();

  const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
  if (!isBiometricEnrolled) {
    return Alert.alert(
      "Login",
      "Nenhuma biometria encontrada. Por favor, cadastre no dispositivo."
    );
  }

  if (compatible && types.length > 0) {
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login com Biometria",
      fallbackLabel: "Biometria não reconhecida",
    });
  } else {
    Alert.alert(
      "Login",
      "Autenticação biométrica não disponível neste dispositivo."
    );
  }
}
