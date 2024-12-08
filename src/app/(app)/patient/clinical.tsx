// Importações necessárias para o componente
import Animated, {
  FadeInDown,
  LinearTransition,
} from "react-native-reanimated";
import { Link } from "expo-router";
import { api } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/common/Skeleton";
import { Card, CardContent } from "@/components/common/Card";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

// Componente principal que exibe dados clínicos do paciente
export default function PatientClinical() {
  // Hook para acessar dados do usuário autenticado
  const { user } = useAuth();

  // Query para buscar dados clínicos do paciente
  const { data: clinicalData, isLoading } = useQuery({
    queryKey: ["clinical-data", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data: patients } = await api.get("/patients");
      const patient = patients.find((p: any) => p.id === user.id);
      return patient?.clinicalData;
    },
    enabled: !!user?.id,
  });

  // Renderiza um esqueleto de carregamento enquanto os dados são buscados
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="p-4">
          <Skeleton className="h-8 w-48 mb-4" />
          <View className="gap-4">
            {[1, 2, 3, 4, 5].map((index) => (
              <Skeleton key={index} className="h-32 w-full rounded-lg" />
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Array com informações principais do paciente
  const mainInfo = [
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
      title: "Medicações em Uso",
      icon: "medical",
      color: "accent",
      value:
        clinicalData?.medications.join(", ") || "Nenhuma medicação registrada",
    },
  ];

  // Lista de possíveis sintomas que podem ser exibidos
  const symptoms = [
    { key: "fever", label: "Febre" },
    { key: "malaise", label: "Mal-estar" },
    { key: "swellingAtBiteLocation", label: "Inchaço no Local da Picada" },
    { key: "swollenEyes", label: "Olhos Inchados" },
    { key: "fatigue", label: "Fadiga" },
    { key: "nauseaAndVomiting", label: "Náusea e Vômito" },
    { key: "diarrhea", label: "Diarreia" },
    { key: "lymphNodeInflammation", label: "Inflamação dos Gânglios" },
    { key: "bodyNodes", label: "Nódulos no Corpo" },
    { key: "bodyRedness", label: "Vermelhidão no Corpo" },
    { key: "enlargedLiverAndSpleen", label: "Fígado e Baço Aumentados" },
  ];

  // Renderiza a interface principal com os dados clínicos
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4">
        {/* Cabeçalho com título e ícone */}
        <Animated.View
          entering={FadeInDown.duration(600)}
          layout={LinearTransition.springify()}
          className="flex-row items-center justify-between mb-4"
        >
          <View>
            <Text className="text-2xl font-bold text-foreground">
              Dados Clínicos
            </Text>
            <Text className="text-muted-foreground">
              Informações detalhadas de saúde
            </Text>
          </View>
          <View className="bg-primary/10 p-2 rounded-full">
            <Ionicons name="heart" size={24} color="hsl(var(--primary))" />
          </View>
        </Animated.View>

        {/* Lista de informações principais */}
        <View className="gap-4 mb-4">
          {mainInfo.map((info, index) => (
            <Animated.View
              key={info.title}
              entering={FadeInDown.duration(600).delay(index * 100)}
              layout={LinearTransition.springify()}
            >
              <Card>
                <CardContent className="p-4">
                  <View className="flex-row items-start gap-4">
                    <View className={`bg-${info.color}/10 p-2 rounded-full`}>
                      <Ionicons
                        name={info.icon as any}
                        size={24}
                        color={`hsl(var(--${info.color}))`}
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-semibold text-card-foreground mb-1">
                        {info.title}
                      </Text>
                      <Text className="text-muted-foreground">
                        {info.value}
                      </Text>
                    </View>
                  </View>
                </CardContent>
              </Card>
            </Animated.View>
          ))}
        </View>

        {/* Seção de sintomas atuais */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(400)}
          layout={LinearTransition.springify()}
          className="mb-4"
        >
          <Card>
            <CardContent className="p-4">
              <View className="flex-row items-center gap-2 mb-4">
                <Ionicons
                  name="warning"
                  size={24}
                  color="hsl(var(--warning))"
                />
                <Text className="text-lg font-semibold text-card-foreground">
                  Sintomas Atuais
                </Text>
              </View>
              <View className="flex-row flex-wrap gap-2">
                {symptoms.map(
                  (symptom, index) =>
                    clinicalData?.symptoms[symptom.key] && (
                      <Animated.View
                        key={symptom.key}
                        entering={FadeInDown.duration(300).delay(index * 50)}
                        className="bg-warning/10 px-3 py-1 rounded-full"
                      >
                        <Text className="text-sm text-warning-foreground">
                          {symptom.label}
                        </Text>
                      </Animated.View>
                    )
                )}
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        {/* Seção de descrição clínica */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(500)}
          layout={LinearTransition.springify()}
          className="mb-4"
        >
          <Card>
            <CardContent className="p-4">
              <View className="flex-row items-center gap-2 mb-4">
                <Ionicons
                  name="document-text"
                  size={24}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-lg font-semibold text-card-foreground">
                  Descrição Clínica
                </Text>
              </View>
              <Text className="text-muted-foreground">
                {clinicalData?.description || "Nenhuma descrição disponível"}
              </Text>
            </CardContent>
          </Card>
        </Animated.View>

        {/* Botão para atualizar sintomas */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(600)}
          layout={LinearTransition.springify()}
          className="mb-8"
        >
          <Link href="/patient/symptoms" asChild>
            <TouchableOpacity>
              <Card>
                <CardContent className="p-4">
                  <View className="flex-row items-center">
                    <View className="bg-primary/10 p-3 rounded-full mr-4">
                      <Ionicons
                        name="fitness"
                        size={24}
                        color="hsl(var(--primary))"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-semibold text-card-foreground">
                        Atualizar Sintomas
                      </Text>
                      <Text className="text-muted-foreground">
                        Registre os sintomas que você está sentindo
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
      </ScrollView>
    </SafeAreaView>
  );
}
