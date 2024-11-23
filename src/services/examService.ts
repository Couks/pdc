import { api } from "./api";
import { ExamRequest, ExamResult, ChagasExamType } from "@/types/exam.types";

export const examService = {
  async requestExam(
    patientId: string,
    doctorId: string,
    examType: ChagasExamType
  ) {
    const { data } = await api.post<ExamRequest>("/exam-requests", {
      patientId,
      doctorId,
      examType,
      requestDate: new Date().toISOString(),
      status: "PENDING",
    });
    return data;
  },

  async getPatientExams(patientId: string) {
    const { data } = await api.get<ExamRequest[]>(
      `/exam-requests?patientId=${patientId}`
    );
    return data;
  },

  async getDoctorExams(doctorId: string) {
    const { data } = await api.get<ExamRequest[]>(
      `/exam-requests?doctorId=${doctorId}`
    );
    return data;
  },

  async analyzeExam(examId: string) {
    const { data } = await api.post<ExamResult>(
      `/exam-requests/${examId}/analyze`
    );
    return data;
  },

  async getPendingExams(doctorId: string) {
    const response = await api.get(
      `/exams?doctorId=${doctorId}&status=pending`
    );
    return response.data;
  },
};
