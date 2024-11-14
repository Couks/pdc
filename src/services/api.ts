import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginCredentials, User } from "@/types/auth.types";

const api = axios.create({
  baseURL: "http://localhost:3000", // Ajuste para a URL do seu json-server
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("@auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async login({ email, password, role }: LoginCredentials) {
    // Primeiro, busca o usuário pelo email e role
    const endpoint = role === "doctor" ? "doctors" : "patients";
    const { data: users } = await api.get(`/${endpoint}?email=${email}`);

    const user = users[0];
    if (!user || user.password !== password) {
      throw new Error("Credenciais inválidas");
    }

    // Busca o token correspondente
    const { data: tokens } = await api.get(`/auth/tokens?id=${user.id}`);
    const authToken = tokens[0];

    if (!authToken) {
      throw new Error("Token não encontrado");
    }

    // Armazena o token
    await AsyncStorage.setItem("@auth_token", authToken.token);
    await AsyncStorage.setItem("@user_id", user.id);
    await AsyncStorage.setItem("@user_role", role);

    // Remove a senha antes de retornar o usuário
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token: authToken.token };
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
    const { data } = await api.get(`/doctors/${doctorId}/patients`);
    return data;
  },

  async getProfile(doctorId: string) {
    const { data } = await api.get(`/doctors/${doctorId}`);
    return data;
  },
};

export const patientService = {
  async getMedicalHistory(patientId: string) {
    const { data } = await api.get(`/patients/${patientId}/medicalHistory`);
    return data;
  },

  async getExams(patientId: string) {
    const { data } = await api.get(`/patients/${patientId}/exams`);
    return data;
  },

  async getClinicalData(patientId: string) {
    const { data } = await api.get(`/patients/${patientId}/clinicalData`);
    return data;
  },
};

export default api;
