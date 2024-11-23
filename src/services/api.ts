import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginCredentials, User } from "@/types/auth.types";

const api = axios.create({
  baseURL: "http://localhost:3000",
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
      // Validação básica
      if (!email || !password || !role) {
        throw new Error("Todos os campos são obrigatórios");
      }

      const endpoint = role === "doctor" ? "doctors" : "patients";

      // Adiciona logs para debug
      console.log(
        "Tentando conectar:",
        `${api.defaults.baseURL}/${endpoint}?email=${email}`
      );

      try {
        const { data: users } = await api.get(`/${endpoint}`, {
          params: { email },
          timeout: 5000, // timeout de 5 segundos
        });

        console.log("Resposta:", users);

        const user = users[0];
        if (!user) {
          throw new Error("Usuário não encontrado");
        }

        if (user.password !== password) {
          throw new Error("Senha incorreta");
        }

        const { data: tokens } = await api.get("/auth/tokens", {
          params: { id: user.id },
        });

        const authToken = tokens[0];
        if (!authToken) {
          throw new Error("Erro ao gerar token de autenticação");
        }

        await AsyncStorage.multiSet([
          ["@auth_token", authToken.token],
          ["@user_id", user.id],
          ["@user_role", role],
        ]);

        const { password: _, ...userWithoutPassword } = user;
        return {
          user: { ...userWithoutPassword, role },
          token: authToken.token,
        };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.code === "ECONNABORTED") {
            throw new Error(
              "Tempo de conexão esgotado. Verifique sua conexão."
            );
          }
          if (!error.response) {
            throw new Error(
              "Erro de conexão com o servidor. Verifique se o servidor está rodando."
            );
          }
          throw new Error(error.response.data.message || "Erro no servidor");
        }
        throw error;
      }
    } catch (error) {
      console.error("Erro detalhado:", error);
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
    const { data } = await api.get(`/doctors/${doctorId}/patients`);
    return data;
  },

  async getProfile(doctorId: string) {
    const { data } = await api.get(`/doctors/${doctorId}`);
    return data;
  },

  async getPatientDetails(patientId: string): Promise<PatientDetails> {
    const { data } = await api.get(`/patients/${patientId}`);
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
