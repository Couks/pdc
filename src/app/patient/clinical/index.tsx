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
import { ClinicalData } from "@/types/base.types";

export default function PatientClinical() {
  const { user } = useAuth();

  const { data: clinicalData, isLoading } = useQuery({
    queryKey: ["clinical-data", user?.id],
    queryFn: () => patientService.getClinicalData(user?.id || ""),
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="p-4">
          <Skeleton className="h-8 w-48 mb-6" />
          <View className="gap-4">
            {[1, 2, 3, 4].map((index) => (
              <Skeleton key={index} className="h-32 w-full rounded-lg" />
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const sections = [
    {
      title: "Tipo Sanguíneo",
      icon: "water",
      color: "primary",
      value: clinicalData?.bloodType,
    },
    {
      title: "Alergias",
      icon: "alert-circle",
      color: "destructive",
      value: clinicalData?.allergies.join(", ") || "Nenhuma alergia registrada",
    },
    {
      title: "Condições Crônicas",
      icon: "fitness",
      color: "secondary",
      value:
        clinicalData?.chronicConditions.join(", ") ||
        "Nenhuma condição registrada",
    },
    {
      title: "Medicações",
      icon: "medical",
      color: "accent",
      value:
        clinicalData?.medications.join(", ") || "Nenhuma medicação registrada",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4">
        <Animated.View
          entering={FadeInDown.duration(600)}
          className="flex-row items-center justify-between mb-6"
        >
          <View>
            <Text className="text-2xl font-bold text-foreground">
              Dados Clínicos
            </Text>
            <Text className="text-muted-foreground">
              Suas informações de saúde
            </Text>
          </View>
          <View className="bg-primary/10 p-2 rounded-full">
            <Ionicons name="heart" size={24} color="hsl(var(--primary))" />
          </View>
        </Animated.View>

        <View className="gap-4">
          {sections.map((section, index) => (
            <Animated.View
              key={section.title}
              entering={FadeInDown.duration(600).delay(index * 100)}
              layout={LinearTransition.springify()}
            >
              <Card>
                <CardContent className="p-4">
                  <View className="flex-row items-start gap-4">
                    <View className={`bg-${section.color}/10 p-2 rounded-full`}>
                      <Ionicons
                        name={section.icon as any}
                        size={24}
                        color={`hsl(var(--${section.color}))`}
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-semibold text-card-foreground mb-1">
                        {section.title}
                      </Text>
                      <Text className="text-muted-foreground">
                        {section.value}
                      </Text>
                    </View>
                  </View>
                </CardContent>
              </Card>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
