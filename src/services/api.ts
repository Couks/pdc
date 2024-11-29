import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  BaseUser,
  ExamStatus,
  Diagnosis,
  ChagasExamType,
  ClinicalData,
  Gender,
} from "@/types";

type User = BaseUser;

function getBaseUrl() {
  return "https://current-seahorse-viable.ngrok-free.app/";
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
      const { data: users } = await api.get(`/${endpoint}`, {
        params: { email: credentials.email },
      });

      const user = users[0];
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
      const { data: existingUsers } = await api.get(`/${endpoint}`, {
        params: { email: credentials.email },
      });

      if (existingUsers.length > 0) {
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
              examRequests: [],
              complementaryExams: [],
            }),
      };

      const { data: createdUser } = await api.post(`/${endpoint}`, newUser);

      const newToken = {
        id: newId,
        token: `jwt_${uuid.v4()}`,
        role: credentials.role,
      };

      const { data: authData } = await api.get("/auth");
      authData.tokens.push(newToken);
      await api.put("/auth", authData);

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
    return userWithoutPassword as User;
  },
};

export const doctorService = {
  async create(
    data: Partial<
      BaseUser & { crm: string; specialization: string; patients: string[] }
    >
  ) {
    const newDoctor = {
      ...data,
      id: uuid.v4() as string,
    };
    const { data: created } = await api.post("/doctors", newDoctor);
    return created;
  },

  async getAll() {
    const { data } = await api.get("/doctors");
    return data;
  },

  async getById(id: string) {
    const { data } = await api.get(`/doctors/${id}`);
    return data;
  },

  async update(
    id: string,
    data: Partial<
      BaseUser & { crm: string; specialization: string; patients: string[] }
    >
  ) {
    const { data: updated } = await api.put(`/doctors/${id}`, data);
    return updated;
  },

  async delete(id: string) {
    await api.delete(`/doctors/${id}`);
  },

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
    const { data: doctor } = await api.get(`/doctors/${doctorId}`);
    const updatedPatients = [...doctor.patients, patientId];
    return this.update(doctorId, { patients: updatedPatients });
  },

  async removePatient(doctorId: string, patientId: string) {
    const { data: doctor } = await api.get(`/doctors/${doctorId}`);
    const updatedPatients = doctor.patients.filter(
      (id: string) => id !== patientId
    );
    return this.update(doctorId, { patients: updatedPatients });
  },

  getPatientExams: async (patientId: string) => {
    const response = await api.get(`/patients/${patientId}/exams`);
    return response.data;
  },

  getPatientChagasExams: async (patientId: string) => {
    try {
      const { data: patient } = await api.get(`/patients/${patientId}`);
      return (
        patient.examRequests.filter((exam: any) => exam.type === "CHAGAS") || []
      );
    } catch (error) {
      console.error("Erro ao buscar exames de chagas:", error);
      throw error;
    }
  },

  getPatientComplementaryExams: async (patientId: string) => {
    try {
      const { data: patient } = await api.get(`/patients/${patientId}`);
      return patient.exams || [];
    } catch (error) {
      console.error("Erro ao buscar exames complementares:", error);
      throw error;
    }
  },
};

export const patientService = {
  async create(
    data: Partial<
      BaseUser & {
        birthDate: string;
        gender: Gender;
        doctors: string[];
        clinicalData: ClinicalData;
        medicalHistory: any[];
        examRequests: any[];
        complementaryExams: any[];
      }
    >
  ) {
    const newPatient = {
      ...data,
      id: uuid.v4() as string,
    };
    const { data: created } = await api.post("/patients", newPatient);
    return created;
  },

  async getAll() {
    const { data } = await api.get("/patients");
    return data;
  },

  async getById(id: string) {
    const { data } = await api.get(`/patients/${id}`);
    return data;
  },

  async update(
    id: string,
    data: Partial<
      BaseUser & {
        birthDate: string;
        gender: Gender;
        doctors: string[];
        clinicalData: ClinicalData;
        medicalHistory: any[];
        examRequests: any[];
        complementaryExams: any[];
      }
    >
  ) {
    const { data: updated } = await api.put(`/patients/${id}`, data);
    return updated;
  },

  async delete(id: string) {
    await api.delete(`/patients/${id}`);
  },

  async updateClinicalData(id: string, clinicalData: Partial<ClinicalData>) {
    const { data: patient } = await api.get(`/patients/${id}`);
    const updatedClinicalData = { ...patient.clinicalData, ...clinicalData };
    return this.update(id, { clinicalData: updatedClinicalData });
  },

  async addMedicalHistory(id: string, historyItem: any) {
    const { data: patient } = await api.get(`/patients/${id}`);
    const newHistoryItem = {
      id: `mh${uuid.v4().slice(0, 2)}`,
      date: new Date().toISOString().split("T")[0],
      diagnosis: historyItem.diagnosis,
      prescription: historyItem.prescription,
      notes: historyItem.notes,
    };
    const updatedHistory = [...patient.medicalHistory, newHistoryItem];
    return this.update(id, { medicalHistory: updatedHistory });
  },

  async updateMedicalHistory(id: string, historyId: string, updates: any) {
    const { data: patient } = await api.get(`/patients/${id}`);
    const updatedHistory = patient.medicalHistory.map((item: any) =>
      item.id === historyId ? { ...item, ...updates } : item
    );
    return this.update(id, { medicalHistory: updatedHistory });
  },

  getExams: async (patientId: string) => {
    const response = await api.get(`/patients/${patientId}/exams`);
    return response.data;
  },
  async getExamRequests(patientId: string) {
    const { data: patient } = await api.get(`/patients/${patientId}`);
    return patient.examRequests || [];
  },

  async getDoctors(patientId: string) {
    const { data: patient } = await api.get(`/patients/${patientId}`);
    const doctorPromises = patient.doctors.map((doctorId: string) =>
      api.get(`/doctors/${doctorId}`).then((res) => res.data)
    );
    return Promise.all(doctorPromises);
  },

  async requestDoctor(patientId: string, doctorId: string) {
    const { data: patient } = await api.get(`/patients/${patientId}`);
    if (!patient.doctors.includes(doctorId)) {
      await api.patch(`/patients/${patientId}`, {
        doctors: [...patient.doctors, doctorId],
      });
    }

    const { data: doctor } = await api.get(`/doctors/${doctorId}`);
    if (!doctor.patients.includes(patientId)) {
      await api.patch(`/doctors/${doctorId}`, {
        patients: [...doctor.patients, patientId],
      });
    }
  },
};

export const examService = {
  async getPatientExams(patientId: string) {
    try {
      const { data: patient } = await api.get(`/patients/${patientId}`);
      return patient.examRequests || [];
    } catch (error) {
      console.error("Erro ao buscar exames:", error);
      throw error;
    }
  },

  async getDoctorExams(doctorId: string) {
    try {
      const { data: patients } = await api.get("/patients");
      const doctorPatients = patients.filter((patient: any) =>
        patient.doctors.includes(doctorId)
      );

      return doctorPatients.flatMap((patient: any) =>
        patient.examRequests.map((exam: any) => ({
          ...exam,
          patient: {
            id: patient.id,
            name: patient.name,
          },
        }))
      );
    } catch (error) {
      console.error("Erro ao buscar exames do médico:", error);
      throw error;
    }
  },

  async createExamRequest(data: any) {
    try {
      const { data: patient } = await api.get(`/patients/${data.patientId}`);

      const newExam = {
        id: `exam_${Date.now()}`,
        requestDate: new Date().toISOString(),
        status: "PENDENTE" as ExamStatus,
        ...data,
      };

      const updatedExamRequests = [...patient.examRequests, newExam];

      await api.patch(`/patients/${data.patientId}`, {
        examRequests: updatedExamRequests,
      });

      return newExam;
    } catch (error) {
      console.error("Erro ao criar exame:", error);
      throw error;
    }
  },

  async updateExamStatus(examId: string, status: ExamStatus) {
    try {
      const { data: patients } = await api.get("/patients");
      const patient = patients.find((p: any) =>
        p.examRequests.some((exam: any) => exam.id === examId)
      );

      if (!patient) throw new Error("Exame não encontrado");

      const updatedExams = patient.examRequests.map((exam: any) =>
        exam.id === examId ? { ...exam, status } : exam
      );

      await api.patch(`/patients/${patient.id}`, {
        examRequests: updatedExams,
      });
    } catch (error) {
      console.error("Erro ao atualizar status do exame:", error);
      throw error;
    }
  },

  async addExamResult(
    examId: string,
    result: {
      diagnosis: Diagnosis;
      examType: ChagasExamType;
      description: string;
      date: string;
      notes: string;
    }
  ) {
    try {
      const { data: patients } = await api.get("/patients");
      const patient = patients.find((p: any) =>
        p.examRequests.some((exam: any) => exam.id === examId)
      );

      if (!patient) throw new Error("Exame não encontrado");

      const updatedExams = patient.examRequests.map((exam: any) =>
        exam.id === examId
          ? {
              ...exam,
              status: "CONCLUIDO" as ExamStatus,
              result: {
                id: `result_${Date.now()}`,
                examRequestId: examId,
                ...result,
              },
            }
          : exam
      );

      await api.patch(`/patients/${patient.id}`, {
        examRequests: updatedExams,
      });
    } catch (error) {
      console.error("Erro ao adicionar resultado do exame:", error);
      throw error;
    }
  },

  deleteExam: async (patientId: string, examId: string) => {
    await api.delete(`/patients/${patientId}/exams/${examId}`);
  },

  async getComplementaryExams(patientId: string) {
    try {
      const { data: patient } = await api.get(`/patients/${patientId}`);
      return patient.exams || [];
    } catch (error) {
      console.error("Erro ao buscar exames complementares:", error);
      throw error;
    }
  },
};

export { api };
