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
      status: "PENDENTE",
    });
    return data;
  },

  async getPatientExams(patientId: string) {
    const { data: examRequests } = await api.get<ExamRequest[]>(
      `/exam-requests?patientId=${patientId}`
    );

    const { data: patient } = await api.get(`/patients/${patientId}`);

    const complementaryExams =
      patient.exams?.map((exam) => ({
        id: exam.id,
        patientId,
        doctorId: exam.doctorId,
        examType: exam.type,
        requestDate: exam.date,
        status: "CONCLUIDO",
        result: {
          id: `result-${exam.id}`,
          examRequestId: exam.id,
          resultDate: exam.date,
          value: exam.result,
          isConclusive: true,
          diagnosis: "CONCLUIDO",
          notes: exam.notes,
        },
      })) || [];

    return [...examRequests, ...complementaryExams];
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
