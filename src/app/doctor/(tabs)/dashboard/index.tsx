import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { doctorService } from "@/services/api";
import { Card, CardContent } from "@/components/common/Card";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Animated, {
  FadeInDown,
  FadeIn,
  LinearTransition,
} from "react-native-reanimated";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const { data: patients, isLoading } = useQuery({
    queryKey: ["doctor-patients", user?.id],
    queryFn: () => doctorService.getPatients(user?.id || ""),
    enabled: !!user?.id,
  });

  // Calcula o total de exames pendentes e realizados
  const examStats = patients?.reduce(
    (acc, patient) => {
      const examRequests = patient["exam-requests"] || [];
      examRequests.forEach((exam: any) => {
        if (exam.status === "PENDING") {
          acc.pending++;
        } else if (exam.status === "COMPLETED") {
          acc.completed++;
        }
      });
      return acc;
    },
    { pending: 0, completed: 0 }
  ) || { pending: 0, completed: 0 };

  const quickActions = [
    {
      icon: "people",
      title: "Pacientes",
      description: "Visualize a lista completa de pacientes",
      href: "/doctor/patients",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      icon: "document-text",
      title: "Exames",
      description: "Solicite e analise exames",
      href: "/doctor/exams",
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      icon: "time",
      title: "Pendentes",
      description: "Veja resultados que precisam de análise",
      href: "/doctor/pending",
      color: "text-orange-500",
      bgColor: "bg-orange-100",
    },
  ];

  const stats = [
    {
      title: "Total de Pacientes",
      value: patients?.length || 0,
      icon: "people",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Exames Pendentes",
      value: examStats.pending,
      icon: "alert-circle",
      color: "text-orange-500",
      bgColor: "bg-orange-100",
    },
    {
      title: "Exames Realizados",
      value: examStats.completed,
      icon: "checkmark-circle",
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
  ];

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const examDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - examDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "hoje";
    if (diffDays === 1) return "há 1 dia";
    return `há ${diffDays} dias`;
  };

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
            <Text className="text-xl text-primary">Dr. {user?.name}</Text>
          </View>
          <View className="flex-row gap-2">
            <View className="bg-primary/10 p-2 rounded-full">
              <Ionicons
                name="notifications-outline"
                size={24}
                color="hsl(var(--primary))"
              />
            </View>
            <View className="bg-primary/10 p-2 rounded-full">
              <Ionicons
                name="settings-outline"
                size={24}
                color="hsl(var(--primary))"
              />
            </View>
          </View>
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
                <Text className="text-xs text-muted-foreground text-center">
                  {stat.title}
                </Text>
              </CardContent>
            </Card>
          ))}
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View entering={FadeInDown.duration(600).delay(400)}>
          <Text className="text-lg font-semibold text-foreground mb-4">
            Ações Rápidas
          </Text>
          <View className="gap-4">
            {quickActions.map((action, index) => (
              <Animated.View
                key={action.title}
                entering={FadeInDown.duration(600).delay(500 + index * 100)}
                layout={LinearTransition.springify()}
              >
                <Link href={action.href as any} asChild>
                  <TouchableOpacity>
                    <Card>
                      <CardContent className="flex-row items-center p-4">
                        <View
                          className={`${action.bgColor} p-3 rounded-full mr-4`}
                        >
                          <Ionicons
                            name={action.icon as any}
                            size={24}
                            color={action.color.replace("text-", "")}
                          />
                        </View>
                        <View className="flex-1">
                          <Text className="text-lg font-semibold text-card-foreground">
                            {action.title}
                          </Text>
                          <Text className="text-muted-foreground">
                            {action.description}
                          </Text>
                        </View>
                        <Ionicons
                          name="chevron-forward"
                          size={24}
                          color="hsl(var(--muted-foreground))"
                        />
                      </CardContent>
                    </Card>
                  </TouchableOpacity>
                </Link>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Recent Activity */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(800)}
          layout={LinearTransition.springify()}
        >
          <View className="flex-row items-center justify-between mb-4 mt-6">
            <Text className="text-lg font-semibold text-foreground">
              Atividade Recente
            </Text>
            <TouchableOpacity>
              <Text className="text-primary">Ver todos</Text>
            </TouchableOpacity>
          </View>

          <View className="gap-3">
            {patients?.slice(0, 3).map((patient: any, index: number) => (
              <Animated.View
                key={patient.id}
                entering={FadeIn.duration(600).delay(900 + index * 100)}
                layout={LinearTransition.springify()}
              >
                <Link href={`/doctor/patients/${patient.id}`} asChild>
                  <TouchableOpacity>
                    <Card>
                      <CardContent className="p-4">
                        <View className="flex-row items-center">
                          <View className="bg-primary/10 w-12 h-12 rounded-full mr-4 items-center justify-center">
                            <Text className="text-primary text-lg font-semibold">
                              {patient.name.charAt(0)}
                            </Text>
                          </View>

                          <View className="flex-1">
                            <Text className="text-card-foreground text-lg font-medium mb-1">
                              {patient.name}
                            </Text>
                            <View className="flex-row items-center">
                              <Ionicons
                                name="time-outline"
                                size={16}
                                color="hsl(var(--muted-foreground))"
                                style={{ marginRight: 4 }}
                              />
                              <Text className="text-muted-foreground">
                                Último exame:{" "}
                                {formatTimeAgo(
                                  patient.exams[patient.exams.length - 1]?.date
                                )}
                              </Text>
                            </View>
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
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
