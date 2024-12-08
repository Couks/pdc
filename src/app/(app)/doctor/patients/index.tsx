import Animated, {
  FadeInDown,
  LinearTransition,
} from "react-native-reanimated";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { doctorService } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/common/Skeleton";
import { Card, CardContent } from "@/components/common/Card";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

export default function PatientList() {
  const { user } = useAuth();

  const { data: patients, isLoading } = useQuery({
    queryKey: ["doctor-patients", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      return await doctorService.getPatients(user.id);
    },
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1">
          <View className="px-6 py-4 border-b border-border">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </View>

          <ScrollView className="flex-1 px-4">
            <View className="py-4 gap-4">
              {[1, 2, 3, 4].map((index) => (
                <Card key={index} className="border border-border/50 shadow-sm">
                  <CardContent className="p-5">
                    <View className="flex-row items-center mb-3">
                      <Skeleton className="w-12 h-12 rounded-full mr-4" />
                      <View className="flex-1 gap-2">
                        <Skeleton className="h-6 w-40" />
                        <View className="flex-row items-center gap-2">
                          <Skeleton className="h-4 w-4 rounded-full" />
                          <Skeleton className="h-4 w-32" />
                        </View>
                      </View>
                    </View>

                    <View className="bg-muted/50 p-3 rounded-lg">
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center gap-2">
                          <Skeleton className="h-4 w-4 rounded-full" />
                          <Skeleton className="h-4 w-28" />
                        </View>
                        <View className="flex-row items-center gap-2">
                          <Skeleton className="h-6 w-24 rounded-full" />
                        </View>
                      </View>
                    </View>
                  </CardContent>
                </Card>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1">
        <Animated.View
          entering={FadeInDown.duration(600)}
          className="px-6 py-4"
        >
          <Text className="text-2xl font-bold text-foreground">
            Meus Pacientes
          </Text>
          <Text className="text-primary mt-1">
            {patients?.length || 0} pacientes cadastrados
          </Text>
        </Animated.View>

        <ScrollView className="flex-1 px-4">
          <View className="py-4 gap-4">
            {patients?.map((patient: any, index: number) => (
              <Animated.View
                key={patient.id}
                entering={FadeInDown.duration(600).delay(index * 100)}
                layout={LinearTransition.springify()}
              >
                <Link href={`/doctor/patients/${patient.id}/details`} asChild>
                  <TouchableOpacity>
                    <Card className="border border-border shadow-sm">
                      <CardContent className="p-5">
                        <View className="flex-row items-center mb-3">
                          <View className="bg-primary/10 w-12 h-12 rounded-full items-center justify-center mr-4">
                            <Text className="text-primary text-lg font-bold">
                              {patient?.name?.[0] || ""}
                            </Text>
                          </View>
                          <View className="flex-1">
                            <Text className="text-xl font-semibold text-card-foreground">
                              {patient.name}
                            </Text>
                            <View className="flex-row items-center gap-2">
                              <Ionicons
                                name="mail"
                                size={14}
                                color="hsl(var(--primary))"
                              />
                              <Text className="text-foreground text-md">
                                {patient.email}
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View className="flex-row items-center justify-between bg-muted/50 p-3 rounded-lg">
                          <View className="flex-row items-center gap-2">
                            <Ionicons
                              name="water"
                              size={16}
                              color="hsl(var(--foreground))"
                            />
                            <Text className="text-foreground">
                              Tipo Sanguíneo:
                              <Text className="font-semibold">
                                {" "}
                                {patient.clinicalData.bloodType ||
                                  "Não informado"}
                              </Text>
                            </Text>
                          </View>
                          <View className="flex-row items-center bg-primary/10 px-3 py-1 rounded-full">
                            <Text className="text-primary mr-2 font-medium">
                              Ver detalhes
                            </Text>
                            <Ionicons
                              name="chevron-forward"
                              size={16}
                              color="hsl(var(--primary))"
                            />
                          </View>
                        </View>
                      </CardContent>
                    </Card>
                  </TouchableOpacity>
                </Link>
              </Animated.View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
