import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { doctorService } from "@/services/api";
import { Card, CardContent } from "@/components/common/Card";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const { data: patients, isLoading } = useQuery({
    queryKey: ["doctor-patients", user?.id],
    queryFn: () => doctorService.getPatients(user?.id || ""),
    enabled: !!user?.id,
  });

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
      value: "5",
      icon: "alert-circle",
      color: "text-orange-500",
      bgColor: "bg-orange-100",
    },
    {
      title: "Exames Realizados",
      value: "28",
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
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-2xl font-bold text-foreground">
              Bem-vindo,
            </Text>
            <Text className="text-xl text-primary">Dr. {user?.name}</Text>
          </View>
          <View className="bg-primary/10 p-2 rounded-full">
            <Ionicons
              name="notifications-outline"
              size={24}
              color="hsl(var(--primary))"
            />
          </View>
        </View>

        {/* Stats Cards */}
        <View className="flex-row gap-4 mb-6">
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
        </View>

        {/* Quick Actions */}
        <Text className="text-lg font-semibold text-foreground mb-4">
          Ações Rápidas
        </Text>
        <View className="gap-4">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href as any} asChild>
              <TouchableOpacity>
                <Card>
                  <CardContent className="flex-row items-center p-4">
                    <View className={`${action.bgColor} p-3 rounded-full mr-4`}>
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
          ))}
        </View>

        {/* Recent Activity */}
        <Text className="text-lg font-semibold text-foreground mt-6 mb-4">
          Atividade Recente
        </Text>
        <Card>
          <CardContent className="p-4">
            <View className="gap-4">
              {patients?.slice(0, 3).map((patient: any) => (
                <Link
                  key={patient.id}
                  href={`/doctor/patients/${patient.id}`}
                  asChild
                >
                  <TouchableOpacity className="flex-row items-center">
                    <View className="bg-muted w-10 h-10 rounded-full mr-3 items-center justify-center">
                      <Text className="text-primary font-semibold">
                        {patient.name.charAt(0)}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-card-foreground font-medium">
                        {patient.name}
                      </Text>
                      <Text className="text-muted-foreground text-md">
                        Último exame:{" "}
                        {formatTimeAgo(
                          patient.exams[patient.exams.length - 1]?.date
                        )}
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="hsl(var(--muted-foreground))"
                    />
                  </TouchableOpacity>
                </Link>
              ))}
            </View>
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
