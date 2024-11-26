import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from "react-native";
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
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useCallback, useState } from "react";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: patients, refetch: refetchPatients } = useQuery({
    queryKey: ["doctor-patients", user?.id],
    queryFn: () => doctorService.getPatients(user?.id || ""),
    enabled: !!user?.id,
  });

  const { data: pendingExamsCount = 0, refetch: refetchPending } = useQuery({
    queryKey: ["pending-exams", user?.id],
    queryFn: () => doctorService.getPendingExams(user?.id || ""),
    enabled: !!user?.id,
  });

  const { data: completedExamsCount = 0, refetch: refetchCompleted } = useQuery(
    {
      queryKey: ["completed-exams", user?.id],
      queryFn: () => doctorService.getCompletedExams(user?.id || ""),
      enabled: !!user?.id,
    }
  );

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all([
      refetchPatients(),
      refetchPending(),
      refetchCompleted(),
    ]);
    setIsRefreshing(false);
  }, []);

  const quickActions = [
    {
      icon: "people",
      title: "Pacientes",
      description: "Visualize a lista completa de pacientes",
      href: "/doctor/patients",
      color: "#3B82F6",
      bgColor: "bg-blue-100",
    },
    {
      icon: "document-text",
      title: "Exames",
      description: "Solicite e analise exames",
      href: "/doctor/exams",
      color: "#22C55E",
      bgColor: "bg-green-100",
    },
    {
      icon: "time",
      title: "Pendentes",
      description: "Veja resultados que precisam de análise",
      href: "/doctor/components/pending",
      color: "#F97316",
      bgColor: "bg-orange-100",
    },
    {
      icon: "search-outline",
      title: "Em Análise",
      description: "Veja resultados que precisam de análise",
      href: "/doctor/components/in-analysis",
      color: "#6366F1",
      bgColor: "bg-indigo-100",
    },
    {
      icon: "checkmark-circle",
      title: "Concluídos",
      description: "Veja resultados já concluídos",
      href: "/doctor/components/completed",
      color: "#22C55E",
      bgColor: "bg-green-100",
    },
  ];

  const stats = [
    {
      title: "Total de Pacientes",
      value: patients?.length || 0,
      icon: "people",
      color: "#3B82F6",
      bgColor: "bg-blue-100",
    },
    {
      title: "Exames Pendentes",
      value: pendingExamsCount,
      icon: "alert-circle",
      color: "#F97316",
      bgColor: "bg-orange-100",
    },
    {
      title: "Exames Realizados",
      value: completedExamsCount,
      icon: "checkmark-circle",
      color: "#22C55E",
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
    <SafeAreaView className="flex-1 bg-background">
      <Animated.ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor="hsl(var(--primary))"
          />
        }
      >
        {/* Header Section */}
        <Animated.View
          entering={FadeInDown.duration(600)}
          className="flex-row items-center justify-between mb-8 mt-2"
        >
          <View>
            <Text className="text-3xl font-bold text-foreground">
              Bem-vindo,
            </Text>
            <Text className="text-2xl text-primary font-semibold">
              Dr. {user?.name}
            </Text>
          </View>
          <View className="flex-row gap-3">
            <TouchableOpacity>
              <View className="bg-primary/10 p-3 rounded-full">
                <Ionicons
                  name="settings"
                  size={24}
                  color="hsl(var(--primary))"
                />
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Stats Cards */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          className="flex-row gap-4 mb-8"
          layout={LinearTransition.springify()}
        >
          {stats.map((stat) => (
            <Card key={stat.title} className="flex-1 shadow-sm">
              <CardContent className="items-center p-4">
                <View className={`${stat.bgColor} p-3 rounded-full mb-3`}>
                  <Ionicons
                    name={stat.icon as any}
                    size={28}
                    color={stat.color}
                  />
                </View>
                <Text className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </Text>
                <Text className="text-sm text-muted-foreground text-center">
                  {stat.title}
                </Text>
              </CardContent>
            </Card>
          ))}
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View entering={FadeInDown.duration(600).delay(400)}>
          <Text className="text-xl font-bold text-foreground mb-4">
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
                  <TouchableOpacity className="active:opacity-80">
                    <Card className="shadow-sm">
                      <CardContent className="flex-row items-center p-4">
                        <View
                          className={`${action.bgColor} p-4 rounded-2xl mr-4`}
                        >
                          <Ionicons
                            name={action.icon as any}
                            size={28}
                            color={action.color}
                          />
                        </View>
                        <View className="flex-1">
                          <Text className="text-lg font-bold text-card-foreground mb-1">
                            {action.title}
                          </Text>
                          <Text className="text-muted-foreground text-sm">
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
          className="mb-6"
        >
          <View className="flex-row items-center justify-between mb-4 mt-8">
            <Text className="text-xl font-bold text-foreground">
              Atividade Recente
            </Text>
          </View>

          <View className="gap-4">
            {patients?.slice(0, 3).map((patient: any, index: number) => (
              <Animated.View
                key={patient.id}
                entering={FadeIn.duration(600).delay(900 + index * 100)}
                layout={LinearTransition.springify()}
              >
                <Link href={`/doctor/patients/${patient.id}/exams`} asChild>
                  <TouchableOpacity className="active:opacity-80">
                    <Card className="shadow-sm">
                      <CardContent className="p-4">
                        <View className="flex-row items-center">
                          <View className="bg-primary/10 w-14 h-14 rounded-2xl mr-4 items-center justify-center">
                            <Text className="text-primary text-xl font-bold">
                              {patient.name.charAt(0)}
                            </Text>
                          </View>

                          <View className="flex-1">
                            <Text className="text-card-foreground text-lg font-bold mb-1">
                              {patient.name}
                            </Text>
                            <View className="flex-row items-center">
                              <Ionicons
                                name="time-outline"
                                size={16}
                                color="hsl(var(--muted-foreground))"
                                style={{ marginRight: 6 }}
                              />
                              <Text className="text-muted-foreground text-sm">
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
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
