import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Card, CardContent } from "@/components/common/Card";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState, useMemo } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { Skeleton } from "@/components/common/Skeleton";
import { ExamStatus, ExamWithPatient } from "@/types";

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

  // Busca todos os exames dos pacientes do médico
  const { data: patients, isLoading } = useQuery({
    queryKey: ["doctor-patients", user?.id],
    queryFn: async () => {
      const { data } = await api.get("/patients");
      return data.filter((patient: any) => patient.doctors.includes(user?.id));
    },
    enabled: !!user?.id,
  });

  const exams = useMemo(() => {
    if (!patients) return [];

    return patients.flatMap((patient: any) =>
      patient.examRequests.map((exam: any) => ({
        ...exam,
        patient: {
          id: patient.id,
          name: patient.name,
        },
      }))
    );
  }, [patients]);

  const groupedExams = useMemo(() => {
    if (!exams) return {};

    const filtered = exams.filter((exam: ExamWithPatient) => {
      const matchesSearch = exam.patient.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return selectedStatus === "ALL" || exam.status === selectedStatus
        ? matchesSearch
        : false;
    });

    return filtered.reduce(
      (acc: Record<ExamStatus, ExamWithPatient[]>, exam: ExamWithPatient) => {
        const status = exam.status as ExamStatus;
        if (!acc[status]) {
          acc[status] = [];
        }
        acc[status].push(exam);
        return acc;
      },
      {} as Record<ExamStatus, ExamWithPatient[]>
    );
  }, [exams, selectedStatus, searchQuery]);

  const getStatusConfig = (status: ExamStatus) => {
    switch (status) {
      case "CONCLUIDO":
        return {
          bg: "bg-green-100",
          text: "text-green-600",
          label: "Concluído",
          icon: "checkmark-circle-outline",
        };
      case "PENDENTE":
        return {
          bg: "bg-orange-100",
          text: "text-orange-600",
          label: "Pendente",
          icon: "time-outline",
        };
      case "EM_ANALISE":
        return {
          bg: "bg-blue-100",
          text: "text-blue-600",
          label: "Em Análise",
          icon: "flask-outline",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          label: "Desconhecido",
          icon: "help-circle-outline",
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

  const getPageTitle = () => {
    if (selectedStatus === "ALL") return "Todos os Exames";
    return `Exames ${getStatusConfig(selectedStatus as ExamStatus).label}s`;
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 p-4">
          <Skeleton className="h-8 w-48 mb-6" />
          <View className="gap-4">
            {[1, 2, 3].map((index) => (
              <Skeleton key={index} className="h-40 w-full rounded-lg" />
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const renderExamCard = (exam: ExamWithPatient) => {
    const status = getStatusConfig(exam.status);
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
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-card-foreground">
                    {exam.examType}
                  </Text>
                  <Text className="text-muted-foreground">
                    Paciente: {exam.patient.name}
                  </Text>
                </View>
                <View
                  className={`${status.bg} px-3 py-1 rounded-full flex-row items-center`}
                >
                  <Ionicons
                    name={status.icon as any}
                    size={16}
                    color={`hsl(var(--${status.text.split("-")[1]}))`}
                    style={{ marginRight: 4 }}
                  />
                  <Text className={status.text}>{status.label}</Text>
                </View>
              </View>

              <View className="flex-row justify-between items-center mt-4">
                <Text className="text-muted-foreground">
                  Data: {formatDate(exam.requestDate)}
                </Text>
                {exam.status === "CONCLUIDO" && (
                  <View className="flex-row items-center">
                    <Text className="text-primary mr-2">Ver resultado</Text>
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
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="flex-row items-center justify-between mb-6">
          <Animated.View
            key={selectedStatus}
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(300)}
            layout={LinearTransition.springify()}
          >
            <Text className="text-2xl font-bold text-foreground">
              {getPageTitle()}
            </Text>
          </Animated.View>
          <TouchableOpacity
            className="bg-primary/10 p-2 rounded-full"
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons name="filter" size={24} color="hsl(var(--primary))" />
          </TouchableOpacity>
        </View>

        {showFilters && (
          <Animated.View entering={FadeIn.duration(300)} className="mb-6 gap-4">
            <TouchableOpacity
              className="bg-muted p-3 rounded-lg flex-row items-center justify-between"
              onPress={() => setShowStatusModal(true)}
            >
              <Text className="text-foreground text-lg">
                Status:{" "}
                {selectedStatus === "ALL"
                  ? "Todos"
                  : getStatusConfig(selectedStatus as ExamStatus).label}
              </Text>
              <Ionicons
                name="chevron-down"
                size={20}
                color="hsl(var(--foreground))"
              />
            </TouchableOpacity>

            <View className="flex-row items-center bg-muted rounded-lg px-3">
              <Ionicons
                name="search"
                size={20}
                color="hsl(var(--muted-foreground))"
              />
              <TextInput
                className="flex-1 p-3 text-foreground text-lg"
                placeholder="Buscar paciente..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="hsl(var(--muted-foreground))"
              />
            </View>
          </Animated.View>
        )}

        <Modal
          visible={showStatusModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowStatusModal(false)}
        >
          <TouchableOpacity
            className="flex-1 bg-black/50 justify-center items-center"
            activeOpacity={1}
            onPress={() => setShowStatusModal(false)}
          >
            <View className="bg-white w-[80%] rounded-2xl overflow-hidden">
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
                  setSelectedStatus("PENDENTE");
                  setShowStatusModal(false);
                }}
              >
                <Text className="text-lg text-foreground">Pendente</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-4 border-b border-border"
                onPress={() => {
                  setSelectedStatus("EM_ANALISE");
                  setShowStatusModal(false);
                }}
              >
                <Text className="text-lg text-foreground">Em Análise</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-4"
                onPress={() => {
                  setSelectedStatus("CONCLUIDO");
                  setShowStatusModal(false);
                }}
              >
                <Text className="text-lg text-foreground">Concluído</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        <View className="gap-6">
          {Object.entries(groupedExams).map(([status, exams]) => (
            <View key={status}>
              <View className="flex-row items-center mb-3">
                <View
                  className={`w-2 h-2 rounded-full ${
                    getStatusConfig(status as ExamStatus).bg
                  } mr-2`}
                />
                <Text className="text-lg font-medium text-foreground">
                  {getStatusConfig(status as ExamStatus).label}
                </Text>
                <Text className="text-muted-foreground ml-2">
                  ({Array.isArray(exams) ? exams.length : 0})
                </Text>
              </View>
              <View className="gap-4">
                {(exams as ExamWithPatient[]).map(renderExamCard)}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
