import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { patientService } from "@/services/api";
import { Card, CardContent } from "@/components/common/Card";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  LinearTransition,
} from "react-native-reanimated";
import { Skeleton } from "@/components/common/Skeleton";
import { MedicalHistory } from "@/types/base.types";

export default function PatientHistory() {
  const { user } = useAuth();

  const { data: medicalHistory, isLoading } = useQuery({
    queryKey: ["medical-history", user?.id],
    queryFn: () => patientService.getMedicalHistory(user?.id || ""),
    enabled: !!user?.id,
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="p-4">
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

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4">
        <Animated.View
          entering={FadeInDown.duration(600)}
          className="flex-row items-center justify-between mb-6"
        >
          <View>
            <Text className="text-2xl font-bold text-foreground">
              Histórico Médico
            </Text>
            <Text className="text-muted-foreground">
              {medicalHistory?.length || 0} consultas registradas
            </Text>
          </View>
          <View className="bg-primary/10 p-2 rounded-full">
            <Ionicons name="medical" size={24} color="hsl(var(--primary))" />
          </View>
        </Animated.View>

        <View className="gap-4">
          {medicalHistory?.map((record: MedicalHistory, index: number) => (
            <Animated.View
              key={record.id}
              entering={FadeInDown.duration(600).delay(index * 100)}
              layout={LinearTransition.springify()}
            >
              <Card>
                <CardContent className="p-4">
                  <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-lg font-semibold text-card-foreground">
                      {record.diagnosis}
                    </Text>
                    <Text className="text-muted-foreground">
                      {formatDate(record.date)}
                    </Text>
                  </View>

                  {record.prescription && (
                    <View className="bg-muted/30 p-3 rounded-lg mb-3">
                      <View className="flex-row items-center gap-2 mb-1">
                        <Ionicons
                          name="medical-outline"
                          size={20}
                          color="hsl(var(--primary))"
                        />
                        <Text className="font-medium text-card-foreground">
                          Prescrição
                        </Text>
                      </View>
                      <Text className="text-muted-foreground ml-7">
                        {record.prescription}
                      </Text>
                    </View>
                  )}

                  {record.notes && (
                    <View className="bg-muted/30 p-3 rounded-lg">
                      <View className="flex-row items-center gap-2 mb-1">
                        <Ionicons
                          name="document-text-outline"
                          size={20}
                          color="hsl(var(--primary))"
                        />
                        <Text className="font-medium text-card-foreground">
                          Observações
                        </Text>
                      </View>
                      <Text className="text-muted-foreground ml-7">
                        {record.notes}
                      </Text>
                    </View>
                  )}
                </CardContent>
              </Card>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
