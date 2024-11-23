import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { LoginCredentials, User } from "@/types/auth.types";

// Função para obter a URL base correta
function getBaseUrl() {
  if (Platform.OS === "android") {
    // Emulador Android
    return "http://10.0.2.2:3000";
  } else if (Platform.OS === "ios") {
    // iOS simulator
    return "http://localhost:3000";
  } else {
    // Dispositivo físico - substitua pelo seu IP local
    return "http://192.168.1.100:3000"; // Ajuste para seu IP
  }
}

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000, // timeout de 10 segundos
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("@auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface PatientDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  clinicalData: {
    bloodType: string;
    allergies: string[];
    chronicConditions: string[];
    medications: string[];
  };
}

export const authService = {
  async login({ email, password, role }: LoginCredentials) {
    try {
      // 1. Primeiro busca o usuário
      const endpoint = role === "doctor" ? "doctors" : "patients";
      const { data: users } = await api.get(`/${endpoint}`, {
        params: { email },
      });

      const user = users[0];
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      if (user.password !== password) {
        throw new Error("Senha incorreta");
      }

      // 2. Depois busca o token na estrutura correta
      const { data: authData } = await api.get("/auth");
      const token = authData.tokens.find((t: any) => t.id === user.id);

      if (!token) {
        throw new Error("Token não encontrado");
      }

      await AsyncStorage.multiSet([
        ["@auth_token", token.token],
        ["@user_id", user.id],
        ["@user_role", role],
      ]);

      const { password: _, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        token: token.token,
      };
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  },

  async logout() {
    await AsyncStorage.multiRemove(["@auth_token", "@user_id", "@user_role"]);
  },

  async getCurrentUser(): Promise<User | null> {
    const token = await AsyncStorage.getItem("@auth_token");
    const userId = await AsyncStorage.getItem("@user_id");
    const userRole = await AsyncStorage.getItem("@user_role");

    if (!token || !userId || !userRole) {
      return null;
    }

    const endpoint = userRole === "doctor" ? "doctors" : "patients";
    const { data: user } = await api.get(`/${endpoint}/${userId}`);

    if (!user) {
      return null;
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
};

export const doctorService = {
  async getPatients(doctorId: string) {
    // Busca o médico primeiro para pegar a lista de IDs dos pacientes
    const { data: doctor } = await api.get(`/doctors/${doctorId}`);

    // Busca os detalhes de cada paciente
    const patientPromises = doctor.patients.map((patientId: string) =>
      api.get(`/patients/${patientId}`).then((res) => res.data)
    );

    return Promise.all(patientPromises);
  },

  async getPatientDetails(patientId: string) {
    const { data } = await api.get(`/patients/${patientId}`);
    return data;
  },

  async getProfile(doctorId: string) {
    const { data } = await api.get(`/doctors/${doctorId}`);
    const { password: _, ...doctorWithoutPassword } = data;
    return doctorWithoutPassword;
  },

  async getPatientExams(patientId: string) {
    const { data } = await api.get(`/exam-requests`, {
      params: { patientId },
    });
    return data;
  },
};

export const patientService = {
  async getExams(patientId: string) {
    const { data } = await api.get(`/exam-requests`, {
      params: { patientId },
    });
    return data;
  },

  async getMedicalHistory(patientId: string) {
    const { data: patient } = await api.get(`/patients/${patientId}`);
    return patient.medicalHistory;
  },

  async getClinicalData(patientId: string) {
    const { data: patient } = await api.get(`/patients/${patientId}`);
    return patient.clinicalData;
  },
};

export { api };
