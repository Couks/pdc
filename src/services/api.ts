import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  BaseUser,
  ExamStatus,
  Diagnosis,
  ChagasExamType,
  Gender,
} from "@/types";
import axios from "axios";
import uuid from "react-native-uuid";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = BaseUser;

function getBaseUrl() {
  if (Platform.OS === "android") {
    // No Android, localhost não funciona, precisamos usar o IP do AVD
    return "http://10.0.2.2:3000";
  } else if (Platform.OS === "ios") {
    // No iOS simulator, localhost funciona normalmente
    return "http://localhost:3000";
  } else {
    // Para web ou outros ambientes
    return "http://localhost:3000";
  }
}

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("@auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const endpoint = credentials.role === "doctor" ? "doctors" : "patients";
      const { data: users } = await api.get(`/${endpoint}`);

      const user = users.find((u: any) => u.email === credentials.email);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      if (user.password !== credentials.password) {
        throw new Error("Senha incorreta");
      }

      const { data: authData } = await api.get("/auth");
      const token = authData.tokens.find((t: any) => t.id === user.id);

      if (!token) {
        throw new Error("Token não encontrado");
      }

      await AsyncStorage.multiSet([
        ["@auth_token", token.token],
        ["@user_id", user.id],
        ["@user_role", credentials.role],
      ]);

      const { password: _, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword as User,
        token: token.token,
      };
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const endpoint = credentials.role === "doctor" ? "doctors" : "patients";
      const { data: users } = await api.get(`/${endpoint}`);

      const userExists = users.some((u: any) => u.email === credentials.email);
      if (userExists) {
        throw new Error("Email já cadastrado");
      }

      const newId = uuid.v4() as string;

      const newUser = {
        id: newId,
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        role: credentials.role,
        phone: "",
        address: "",
        ...(credentials.role === "doctor"
          ? {
              crm: "",
              specialization: "",
              patients: [],
            }
          : {
              birthDate: "",
              gender: "MASCULINO" as Gender,
              doctors: [],
              clinicalData: {
                bloodType: "",
                allergies: [],
                chronicConditions: [],
                medications: [],
                symptoms: {
                  fever: false,
                  malaise: false,
                  swellingAtBiteLocation: false,
                  swollenEyes: false,
                  fatigue: false,
                  nauseaAndVomiting: false,
                  diarrhea: false,
                  lymphNodeInflammation: false,
                  bodyNodes: false,
                  bodyRedness: false,
                  enlargedLiverAndSpleen: false,
                },
                description: "",
              },
              medicalHistory: [],
              exams: [],
              examRequests: [],
            }),
      };

      const { data: createdUser } = await api.post(`/${endpoint}`, newUser);

      // Atualizar auth tokens
      const { data: authData } = await api.get("/auth");
      const newToken = {
        id: newId,
        token: `jwt_${uuid.v4()}`,
        role: credentials.role,
      };

      await api.put("/auth", {
        ...authData,
        tokens: [...authData.tokens, newToken],
      });

      await AsyncStorage.multiSet([
        ["@auth_token", newToken.token],
        ["@user_id", newId],
        ["@user_role", credentials.role],
      ]);

      const { password: _, ...userWithoutPassword } = createdUser;
      return {
        user: userWithoutPassword as User,
        token: newToken.token,
      };
    } catch (error) {
      console.error("Erro no registro:", error);
      throw error;
    }
  },

  async logout() {
    await AsyncStorage.multiRemove(["@auth_token", "@user_id", "@user_role"]);
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const userId = await AsyncStorage.getItem("@user_id");
      const userRole = await AsyncStorage.getItem("@user_role");

      if (!userId || !userRole) {
        return null;
      }

      const endpoint = userRole === "doctor" ? "doctors" : "patients";
      const { data: users } = await api.get(`/${endpoint}`);
      const user = users.find((u: any) => u.id === userId);

      if (!user) {
        return null;
      }

      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    } catch (error) {
      console.error("Erro ao buscar usuário atual:", error);
      return null;
    }
  },
};

export const doctorService = {
  async getPatients(doctorId: string) {
    try {
      const { data: patients } = await api.get("/patients");
      return patients.filter((patient: any) =>
        patient.doctors.includes(doctorId)
      );
    } catch (error) {
      console.error("Erro ao buscar pacientes do médico:", error);
      throw error;
    }
  },

  async addPatient(doctorId: string, patientId: string) {
    try {
      const { data: doctors } = await api.get("/doctors");
      const { data: patients } = await api.get("/patients");

      const doctor = doctors.find((d: any) => d.id === doctorId);
      const patient = patients.find((p: any) => p.id === patientId);

      if (!doctor || !patient) {
        throw new Error("Médico ou paciente não encontrado");
      }

      // Atualizar médico
      const updatedDoctor = {
        ...doctor,
        patients: [...doctor.patients, patientId],
      };
      await api.put(`/doctors/${doctorId}`, updatedDoctor);

      // Atualizar paciente
      const updatedPatient = {
        ...patient,
        doctors: [...patient.doctors, doctorId],
      };
      await api.put(`/patients/${patientId}`, updatedPatient);

      return updatedDoctor;
    } catch (error) {
      console.error("Erro ao adicionar paciente:", error);
      throw error;
    }
  },
};

export const examService = {
  async createExamRequest(data: {
    patientId: string;
    doctorId: string;
    examType: ChagasExamType;
  }) {
    try {
      const { data: patients } = await api.get("/patients");
      const patient = patients.find((p: any) => p.id === data.patientId);

      if (!patient) {
        throw new Error("Paciente não encontrado");
      }

      const newExam = {
        id: `exam_${Date.now()}`,
        requestDate: new Date().toISOString(),
        status: "PENDENTE" as ExamStatus,
        patientId: data.patientId,
        doctorId: data.doctorId,
        examType: data.examType,
      };

      const updatedPatient = {
        ...patient,
        examRequests: [...patient.examRequests, newExam],
      };

      await api.put(`/patients/${data.patientId}`, updatedPatient);
      return newExam;
    } catch (error) {
      console.error("Erro ao criar solicitação de exame:", error);
      throw error;
    }
  },

  async addExamResult(
    examId: string,
    result: {
      diagnosis: Diagnosis;
      examType: ChagasExamType;
      description: string;
      notes: string;
    }
  ) {
    try {
      const { data: patients } = await api.get("/patients");
      const patient = patients.find((p: any) =>
        p.examRequests.some((e: any) => e.id === examId)
      );

      if (!patient) {
        throw new Error("Exame não encontrado");
      }

      const updatedExamRequests = patient.examRequests.map((exam: any) =>
        exam.id === examId
          ? {
              ...exam,
              status: "CONCLUIDO" as ExamStatus,
              result: {
                id: `r-${examId}`,
                examRequestId: examId,
                resultDate: new Date().toISOString(),
                ...result,
              },
            }
          : exam
      );

      const updatedPatient = {
        ...patient,
        examRequests: updatedExamRequests,
      };

      await api.put(`/patients/${patient.id}`, updatedPatient);
      return updatedPatient;
    } catch (error) {
      console.error("Erro ao adicionar resultado do exame:", error);
      throw error;
    }
  },
};

export { api };
