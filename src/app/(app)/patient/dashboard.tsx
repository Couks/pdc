// Importações necessárias para o componente
import Animated, {
  FadeInDown,
  LinearTransition,
} from "react-native-reanimated";
import { api } from "@/services/api";
import { ExamRequest } from "@/types";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/common/Card";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

// Componente principal do dashboard do paciente
export default function PatientDashboard() {
  // Hook para acessar dados do usuário autenticado
  const { user } = useAuth();

  // Query para buscar dados do paciente
  const { data: patient } = useQuery({
    queryKey: ["patient-data", user?.id],
    queryFn: async () => {
      const { data: patients } = await api.get("/patients");
      return patients.find((p: any) => p.id === user?.id);
    },
    enabled: !!user?.id,
  });

  // Query para buscar exames de chagas do paciente
  const { data: chagasExams } = useQuery({
    queryKey: ["patient-chagas-exams", user?.id],
    queryFn: async () => {
      const { data: patients } = await api.get("/patients");
      const patient = patients.find((p: any) => p.id === user?.id);
      return patient?.examRequests || [];
    },
    enabled: !!user?.id,
  });

  // Array com estatísticas do paciente
  const stats = [
    {
      title: "Exames Pendentes",
      value:
        chagasExams?.filter((exam: any) => exam.status === "PENDENTE").length ||
        0,
      icon: "time",
      color: "text-orange-500",
      bgColor: "bg-orange-100",
    },
    {
      title: "Exames Realizados",
      value:
        (chagasExams?.filter((exam: any) => exam.status === "CONCLUIDO")
          .length || 0) + (patient?.exams?.length || 0),
      icon: "checkmark-circle",
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "Consultas",
      value: patient?.medicalHistory?.length || 0,
      icon: "medical",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
  ];

  // Função para formatar datas no padrão brasileiro
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Renderiza a interface do dashboard
  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background">
      <ScrollView className="flex-1 px-4">
        {/* Header Section */}
        <Animated.View
          entering={FadeInDown.duration(600)}
          className="flex-row items-center justify-between mb-6"
        >
          <View>
            <Text className="text-2xl font-bold text-foreground">
              Bem-vindo,
            </Text>
            <Text className="text-xl text-primary">{user?.name}</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/patient/profile")}
            className="bg-primary/10 p-2 rounded-full"
          >
            <Ionicons name="person" size={24} color="hsl(var(--primary))" />
          </TouchableOpacity>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(100)}
          className="mb-6 gap-3"
        >
          <Link href="/patient/symptoms" asChild>
            <TouchableOpacity>
              <Card>
                <CardContent className="p-4">
                  <View className="flex-row items-center">
                    <View className="bg-warning/10 p-3 rounded-full mr-4">
                      <Ionicons
                        name="fitness"
                        size={24}
                        color="hsl(var(--warning))"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-semibold text-card-foreground">
                        Registrar Sintomas
                      </Text>
                      <Text className="text-muted-foreground">
                        Atualize seus sintomas atuais
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color="hsl(var(--muted-foreground))"
                    />
                  </View>
                </CardContent>
              </Card>
            </TouchableOpacity>
          </Link>

          <Link href="/patient/doctors" asChild>
            <TouchableOpacity>
              <Card>
                <CardContent className="p-4">
                  <View className="flex-row items-center">
                    <View className="bg-primary/10 p-3 rounded-full mr-4">
                      <Ionicons
                        name="people"
                        size={24}
                        color="hsl(var(--primary))"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-semibold text-card-foreground">
                        Meus Médicos
                      </Text>
                      <Text className="text-muted-foreground">
                        Gerencie seus médicos
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color="hsl(var(--muted-foreground))"
                    />
                  </View>
                </CardContent>
              </Card>
            </TouchableOpacity>
          </Link>
        </Animated.View>

        {/* Stats Cards */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          className="flex-row gap-4 mb-6"
          layout={LinearTransition.springify()}
        >
          {stats.map((stat) => (
            <Card key={stat.title} className="flex-1">
              <CardContent className="items-center p-4">
                <View className={`${stat.bgColor} p-2 rounded-full mb-2`}>
                  <Ionicons
                    name={stat.icon as any}
                    size={24}
                    color={stat.color.replace("text-", "")}
                  />
                </View>
                <Text className="text-2xl font-bold text-foreground">
                  {stat.value}
                </Text>
                <Text className="text-md text-muted-foreground text-center">
                  {stat.title}
                </Text>
              </CardContent>
            </Card>
          ))}
        </Animated.View>

        {/* Clinical Data Summary */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(400)}
          layout={LinearTransition.springify()}
        >
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-foreground">
              Dados Clínicos
            </Text>
            <View className="flex-row gap-2">
              <Link href="/patient/symptoms" asChild>
                <TouchableOpacity className="bg-primary/10 p-2 rounded-full">
                  <Ionicons
                    name="fitness"
                    size={20}
                    color="hsl(var(--primary))"
                  />
                </TouchableOpacity>
              </Link>
              <Link href="/patient/clinical" asChild>
                <TouchableOpacity className="bg-muted p-2 rounded-full">
                  <Ionicons
                    name="arrow-forward"
                    size={20}
                    color="hsl(var(--foreground))"
                  />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
          <Card className="mb-6">
            <CardContent className="p-4">
              <View className="gap-4">
                <View className="flex-row items-center">
                  <View className="bg-red-100 p-2 rounded-full mr-3">
                    <Ionicons name="water" size={20} color="#ef4444" />
                  </View>
                  <View>
                    <Text className="text-md text-muted-foreground">
                      Tipo Sanguíneo
                    </Text>
                    <Text className="text-lg font-semibold text-card-foreground">
                      {patient?.clinicalData?.bloodType}
                    </Text>
                  </View>
                </View>

                {patient?.clinicalData?.allergies?.length ? (
                  <View className="flex-row items-center">
                    <View className="bg-yellow-100 p-2 rounded-full mr-3">
                      <Ionicons name="alert-circle" size={20} color="#f59e0b" />
                    </View>
                    <View>
                      <Text className="text-md text-muted-foreground">
                        Alergias
                      </Text>
                      <Text className="text-lg font-semibold text-card-foreground">
                        {patient.clinicalData.allergies.join(", ")}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {patient?.clinicalData?.chronicConditions?.length ? (
                  <View className="flex-row items-center">
                    <View className="bg-purple-100 p-2 rounded-full mr-3">
                      <Ionicons name="fitness" size={20} color="#9333ea" />
                    </View>
                    <View>
                      <Text className="text-md text-muted-foreground">
                        Condições Crônicas
                      </Text>
                      <Text className="text-lg font-semibold text-card-foreground">
                        {patient.clinicalData.chronicConditions.join(", ")}
                      </Text>
                    </View>
                  </View>
                ) : null}
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        {/* Recent Activity */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(600)}
          layout={LinearTransition.springify()}
        >
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-foreground">
              Exames Recentes
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/patient/exams")}
              className="bg-muted p-2 rounded-full"
            >
              <Ionicons
                name="arrow-forward"
                size={20}
                color="hsl(var(--foreground))"
              />
            </TouchableOpacity>
          </View>
          <Card>
            <CardContent className="p-4">
              <View className="gap-4">
                {chagasExams?.slice(0, 3).map((exam: ExamRequest) => (
                  <TouchableOpacity
                    key={exam.id}
                    onPress={() => router.push("/patient/exams")}
                    className="flex-row items-center"
                  >
                    <View className="bg-muted w-12 h-12 rounded-full mr-3 items-center justify-center">
                      <Ionicons
                        name="document-text"
                        size={20}
                        color="hsl(var(--primary))"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-card-foreground font-medium">
                        {exam.examType}
                      </Text>
                      <Text className="text-muted-foreground">
                        {formatDate(exam.requestDate)}
                      </Text>
                    </View>
                    <View
                      className={`px-3 py-1 rounded-full ${
                        exam.status === "PENDENTE"
                          ? "bg-orange-100"
                          : exam.status === "CONCLUIDO"
                          ? "bg-green-100"
                          : "bg-blue-100"
                      }`}
                    >
                      <Text
                        className={
                          exam.status === "PENDENTE"
                            ? "text-orange-600"
                            : exam.status === "CONCLUIDO"
                            ? "text-green-600"
                            : "text-blue-600"
                        }
                      >
                        {exam.status === "PENDENTE"
                          ? "Pendente"
                          : exam.status === "CONCLUIDO"
                          ? "Concluído"
                          : "Em Análise"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </CardContent>
          </Card>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
