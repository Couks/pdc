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
import { doctorService, examService } from "@/services/api";
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
import { Skeleton } from "@/components/common/Skeleton";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: patients = [],
    refetch: refetchPatients,
    isLoading: isLoadingPatients,
  } = useQuery({
    queryKey: ["doctor-patients", user?.id],
    queryFn: () => doctorService.getPatients(user?.id || ""),
    enabled: !!user?.id,
  });

  const {
    data: pendingExamsCount = 0,
    refetch: refetchPending,
    isLoading: isLoadingPending,
  } = useQuery({
    queryKey: ["pending-exams", user?.id],
    queryFn: async () => {
      const exams = await examService.getDoctorExams(user?.id || "");
      return exams.filter((exam: any) => exam.status === "PENDENTE").length;
    },
    enabled: !!user?.id,
  });

  const {
    data: completedExamsCount = 0,
    refetch: refetchCompleted,
    isLoading: isLoadingCompleted,
  } = useQuery({
    queryKey: ["completed-exams", user?.id],
    queryFn: async () => {
      const exams = await examService.getDoctorExams(user?.id || "");
      return exams.filter((exam: any) => exam.status === "CONCLUIDO").length;
    },
    enabled: !!user?.id,
  });

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all([
      refetchPatients(),
      refetchPending(),
      refetchCompleted(),
    ]);
    setIsRefreshing(false);
  }, [refetchPatients, refetchPending, refetchCompleted]);

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
      description: "Veja a lista de exames dos seus pacientes",
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
      icon: "search",
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
      value: patients.length,
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

  if (isLoadingPatients || isLoadingPending || isLoadingCompleted) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <ScrollView className="flex-1 px-4">
          {/* Header Skeleton */}
          <View className="flex-row items-center justify-between mb-8 mt-2">
            <View>
              <Skeleton className="h-8 w-40 mb-2" />
              <Skeleton className="h-6 w-32" />
            </View>
            <Skeleton className="h-12 w-12 rounded-full" />
          </View>

          {/* Stats Cards Skeleton */}
          <View className="flex-row gap-4 mb-2">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="flex-1 shadow-sm">
                <CardContent className="items-center p-4">
                  <Skeleton className="h-14 w-14 rounded-full mb-3" />
                  <Skeleton className="h-8 w-12 mb-1" />
                  <Skeleton className="h-4 w-20" />
                </CardContent>
              </Card>
            ))}
          </View>

          {/* Recent Activity Skeleton */}
          <View className="mb-6">
            <Skeleton className="h-6 w-40 mb-4 mt-8" />
            <View className="gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="shadow-sm">
                  <CardContent className="p-4">
                    <View className="flex-row items-center">
                      <Skeleton className="w-14 h-14 rounded-2xl mr-4" />
                      <View className="flex-1">
                        <Skeleton className="h-6 w-32 mb-2" />
                        <Skeleton className="h-4 w-40" />
                      </View>
                    </View>
                  </CardContent>
                </Card>
              ))}
            </View>
          </View>

          {/* Quick Actions Skeleton */}
          <Skeleton className="h-6 w-32 mb-4" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-4 pb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="shadow-sm w-48">
                  <CardContent className="p-4">
                    <Skeleton className="h-16 w-16 rounded-2xl mb-4" />
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-40" />
                  </CardContent>
                </Card>
              ))}
            </View>
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background">
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
              Dr. {user?.name || ""}
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
          className="flex-row gap-4 mb-2"
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
            {patients.slice(0, 3).map((patient: any, index: number) => (
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
                              {patient?.name ? patient.name[0] : ""}
                            </Text>
                          </View>

                          <View className="flex-1">
                            <Text className="text-card-foreground text-lg font-bold mb-1">
                              {patient.name}
                            </Text>
                            <View className="flex-row items-center">
                              <Ionicons
                                name="time"
                                size={16}
                                color="hsl(var(--muted-foreground))"
                                style={{ marginRight: 6 }}
                              />
                              <Text className="text-muted-foreground text-sm">
                                Último exame:{" "}
                                {patient.exams && patient.exams.length > 0
                                  ? formatTimeAgo(
                                      patient.exams[patient.exams.length - 1]
                                        ?.date
                                    )
                                  : "Sem exames"}
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

        {/* Quick Actions */}
        <Animated.View entering={FadeInDown.duration(600).delay(400)}>
          <Text className="text-xl font-bold text-foreground mb-4">
            Ações Rápidas
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-8"
          >
            <View className="flex-row gap-4 pb-4">
              {quickActions.map((action, index) => (
                <Animated.View
                  key={action.title}
                  entering={FadeInDown.duration(600).delay(500 + index * 100)}
                  layout={LinearTransition.springify()}
                >
                  <Link href={action.href as any} asChild>
                    <TouchableOpacity className="active:opacity-80">
                      <Card className="shadow-sm w-48">
                        <CardContent className="p-4">
                          <View
                            className={`${action.bgColor} p-4 rounded-2xl self-start mb-4`}
                          >
                            <Ionicons
                              name={action.icon as any}
                              size={28}
                              color={action.color}
                            />
                          </View>
                          <View>
                            <Text className="text-lg font-bold text-card-foreground mb-2">
                              {action.title}
                            </Text>
                            <Text className="text-muted-foreground text-sm">
                              {action.description}
                            </Text>
                          </View>
                        </CardContent>
                      </Card>
                    </TouchableOpacity>
                  </Link>
                </Animated.View>
              ))}
            </View>
          </ScrollView>
        </Animated.View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
