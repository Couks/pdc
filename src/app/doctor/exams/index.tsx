import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { doctorService } from "@/services/api";
import { Card, CardContent } from "@/components/common/Card";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState, useMemo } from "react";

type ExamStatus = "PENDING" | "COMPLETED" | "IN_ANALYSIS";

interface ExamWithPatient {
  id: string;
  patientId: string;
  examType: string;
  requestDate: string;
  status: ExamStatus;
  result?: {
    value: string;
    diagnosis: string;
    notes: string;
  };
  patient: {
    name: string;
    id: string;
  };
}

interface DoctorExamsProps {
  initialStatus?: ExamStatus | "ALL";
}

export default function DoctorExams({
  initialStatus = "ALL",
}: DoctorExamsProps) {
  const { user } = useAuth();
  const [showFilters, setShowFilters] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<ExamStatus | "ALL">(
    initialStatus
  );
  const [searchQuery, setSearchQuery] = useState("");

  const { data: exams, isLoading } = useQuery({
    queryKey: ["doctor-exams", user?.id],
    queryFn: async () => {
      const patients = await doctorService.getPatients(user?.id || "");
      const examsPromises = patients.map(async (patient: any) => {
        const patientExams = await doctorService.getPatientExams(patient.id);
        return patientExams.map((exam: any) => ({
          ...exam,
          patient: {
            name: patient.name,
            id: patient.id,
          },
        }));
      });
      const allExams = await Promise.all(examsPromises);
      return allExams.flat();
    },
    enabled: !!user?.id,
  });

  const filteredExams = useMemo(() => {
    if (!exams) return [];

    return exams.filter((exam: ExamWithPatient) => {
      const matchesStatus =
        selectedStatus === "ALL" || exam.status === selectedStatus;
      const matchesSearch = exam.patient.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [exams, selectedStatus, searchQuery]);

  const getStatusColor = (status: ExamStatus) => {
    switch (status) {
      case "COMPLETED":
        return {
          bg: "bg-green-100",
          text: "text-green-600",
          label: "Concluído",
        };
      case "PENDING":
        return {
          bg: "bg-orange-100",
          text: "text-orange-600",
          label: "Pendente",
        };
      case "IN_ANALYSIS":
        return {
          bg: "bg-blue-100",
          text: "text-blue-600",
          label: "Em Análise",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          label: "Desconhecido",
        };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 p-4">
          <Text className="text-foreground">Carregando exames...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-bold text-foreground">
            {initialStatus === "PENDING" ? "Exames Pendentes" : "Exames"}
          </Text>
          <TouchableOpacity
            className="bg-primary/10 p-2 rounded-full"
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons name="filter" size={24} color="hsl(var(--primary))" />
          </TouchableOpacity>
        </View>

        {showFilters && (
          <View className="mb-6 gap-4">
            <TouchableOpacity
              className="bg-muted p-3 rounded-lg"
              onPress={() => setShowStatusModal(true)}
            >
              <Text className="text-foreground text-lg">
                Status:{" "}
                {selectedStatus === "ALL"
                  ? "Todos"
                  : getStatusColor(selectedStatus as ExamStatus).label}
              </Text>
            </TouchableOpacity>

            <TextInput
              className="bg-muted p-3 rounded-lg text-foreground text-lg"
              placeholder="Buscar paciente..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        )}

        <Modal
          visible={showStatusModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowStatusModal(false)}
        >
          <TouchableOpacity
            className="flex-1 bg-black/50 justify-center items-center"
            activeOpacity={1}
            onPress={() => setShowStatusModal(false)}
          >
            <View className="bg-background w-[90%] rounded-2xl overflow-hidden">
              <TouchableOpacity
                className="p-4 border-b border-border"
                onPress={() => {
                  setSelectedStatus("ALL");
                  setShowStatusModal(false);
                }}
              >
                <Text className="text-lg text-foreground">Todos os status</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-4 border-b border-border"
                onPress={() => {
                  setSelectedStatus("PENDING");
                  setShowStatusModal(false);
                }}
              >
                <Text className="text-lg text-foreground">Pendente</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-4 border-b border-border"
                onPress={() => {
                  setSelectedStatus("IN_ANALYSIS");
                  setShowStatusModal(false);
                }}
              >
                <Text className="text-lg text-foreground">Em Análise</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-4"
                onPress={() => {
                  setSelectedStatus("COMPLETED");
                  setShowStatusModal(false);
                }}
              >
                <Text className="text-lg text-foreground">Concluído</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        <View className="gap-4">
          {filteredExams.map((exam: ExamWithPatient) => {
            const status = getStatusColor(exam.status);
            return (
              <Link
                key={exam.id}
                href={`/doctor/patients/${exam.patient.id}/exams`}
                asChild
              >
                <TouchableOpacity>
                  <Card>
                    <CardContent className="p-4">
                      <View className="flex-row justify-between items-start mb-2">
                        <View>
                          <Text className="text-lg font-semibold text-card-foreground">
                            {exam.examType}
                          </Text>
                          <Text className="text-muted-foreground">
                            Paciente: {exam.patient.name}
                          </Text>
                        </View>
                        <View className={`${status.bg} px-3 py-1 rounded-full`}>
                          <Text className={status.text}>{status.label}</Text>
                        </View>
                      </View>

                      <View className="flex-row justify-between items-center mt-4">
                        <Text className="text-muted-foreground">
                          Data: {formatDate(exam.requestDate)}
                        </Text>
                        {exam.status === "COMPLETED" && (
                          <View className="flex-row items-center">
                            <Text className="text-primary mr-2">
                              Ver resultado
                            </Text>
                            <Ionicons
                              name="chevron-forward"
                              size={20}
                              color="hsl(var(--primary))"
                            />
                          </View>
                        )}
                      </View>

                      {exam.result && (
                        <View className="mt-4 p-3 bg-muted rounded-lg">
                          <Text className="text-card-foreground font-medium">
                            Diagnóstico: {exam.result.diagnosis}
                          </Text>
                          <Text className="text-muted-foreground mt-1">
                            {exam.result.notes}
                          </Text>
                        </View>
                      )}
                    </CardContent>
                  </Card>
                </TouchableOpacity>
              </Link>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
