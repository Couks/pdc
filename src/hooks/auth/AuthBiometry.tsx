import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";
import { useAuth } from "@/hooks/auth/AuthContext";

export async function handleAuthentication(
  DDDtelefone: string,
  password: string,
  onLogin: any
) {
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

    if (auth.success) {
      try {
        const result = await onLogin(DDDtelefone, password);
        if (result && result.error) {
          Alert.alert(result.msg);
        } else {
          Alert.alert("Sucesso", "Autenticação bem-sucedida!");
        }
      } catch (error) {
        console.error("Error on login:", error);
      }
    } else {
      Alert.alert("Erro", "Autenticação falhou. Tente novamente.");
    }
  } else {
    Alert.alert(
      "Login",
      "Autenticação biométrica não disponível neste dispositivo."
    );
  }
}
