// Importação dos componentes e hooks necessários
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Card, CardContent } from "@/components/common/Card";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  LinearTransition,
} from "react-native-reanimated";
import { Skeleton } from "@/components/common/Skeleton";
import { MedicalHistory } from "@/types";

// Objeto de tradução dos sintomas de inglês para português
export const symptomTranslations: Record<string, string> = {
  fever: "Febre",
  malaise: "Mal-estar",
  swellingAtBiteLocation: "Inchaço no local da picada",
  swollenEyes: "Olhos inchados",
  fatigue: "Fadiga",
  nauseaAndVomiting: "Náusea e vômito",
  diarrhea: "Diarreia",
  lymphNodeInflammation: "Inflamação dos gânglios",
  bodyNodes: "Nódulos pelo corpo",
  bodyRedness: "Vermelhidão pelo corpo",
  enlargedLiverAndSpleen: "Fígado e baço aumentados",
};

// Componente principal que exibe o histórico médico do paciente
export default function PatientHistory() {
  // Hook para acessar dados do usuário autenticado
  const { user } = useAuth();

  // Query para buscar dados do paciente na API
  const { data: patient, isLoading } = useQuery({
    queryKey: ["patient-data", user?.id],
    queryFn: async () => {
      const { data: patients } = await api.get("/patients");
      return patients.find((p: any) => p.id === user?.id);
    },
    enabled: !!user?.id,
  });

  // Função para formatar datas no padrão brasileiro
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Renderiza um esqueleto de carregamento enquanto os dados são buscados
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

  // Calcula o total de consultas do paciente
  const totalConsultas = patient?.medicalHistory?.length || 0;

  // Renderiza a interface principal com os dados do paciente
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4">
        {/* Cabeçalho com título e contador de consultas */}
        <Animated.View entering={FadeInDown.duration(600)} className="mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-2xl font-bold text-foreground">
                Histórico Médico
              </Text>
              <Text className="text-muted-foreground">
                Seu histórico completo de atendimentos
              </Text>
            </View>
            <View className="bg-primary/10 p-3 rounded-full">
              <Ionicons name="medical" size={28} color="hsl(var(--primary))" />
            </View>
          </View>

          <Card>
            <CardContent className="p-4 flex-row items-center justify-between">
              <View>
                <Text className="text-lg font-semibold text-card-foreground">
                  Total de Consultas
                </Text>
                <Text className="text-muted-foreground">
                  Registros no sistema
                </Text>
              </View>
              <View className="bg-primary/20 px-4 py-2 rounded-full">
                <Text className="text-2xl font-bold text-primary">
                  {totalConsultas}
                </Text>
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        {/* Seção de dados clínicos do paciente */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-4">
              <View className="flex-row items-center gap-2 mb-4">
                <Ionicons name="person" size={24} color="hsl(var(--primary))" />
                <Text className="text-lg font-semibold text-card-foreground">
                  Dados Clínicos
                </Text>
              </View>

              <View className="gap-3">
                <View className="flex-row bg-muted/30 p-3 rounded-lg">
                  <Text className="font-medium text-card-foreground w-1/3">
                    Tipo Sanguíneo:
                  </Text>
                  <Text className="text-muted-foreground">
                    {patient?.clinicalData?.bloodType || "Não informado"}
                  </Text>
                </View>

                <View className="flex-row bg-muted/30 p-3 rounded-lg">
                  <Text className="font-medium text-card-foreground w-1/3">
                    Alergias:
                  </Text>
                  <Text className="text-muted-foreground flex-1">
                    {patient?.clinicalData?.allergies?.join(", ") || "Nenhuma"}
                  </Text>
                </View>

                <View className="flex-row bg-muted/30 p-3 rounded-lg">
                  <Text className="font-medium text-card-foreground w-1/3">
                    Condições Crônicas:
                  </Text>
                  <Text className="text-muted-foreground flex-1">
                    {patient?.clinicalData?.chronicConditions?.join(", ") ||
                      "Nenhuma"}
                  </Text>
                </View>

                <View className="flex-row bg-muted/30 p-3 rounded-lg">
                  <Text className="font-medium text-card-foreground w-1/3">
                    Medicações:
                  </Text>
                  <Text className="text-muted-foreground flex-1">
                    {patient?.clinicalData?.medications?.join(", ") ||
                      "Nenhuma"}
                  </Text>
                </View>

                {/* Lista de sintomas atuais do paciente */}
                <View className="bg-muted/30 p-3 rounded-lg">
                  <Text className="font-medium text-card-foreground mb-2">
                    Sintomas Atuais:
                  </Text>
                  <View className="gap-1">
                    {patient?.clinicalData?.symptoms &&
                      Object.entries(patient.clinicalData.symptoms)
                        .filter(([_, value]) => value === true)
                        .map(([key]) => (
                          <View
                            key={key}
                            className="flex-row items-center gap-2"
                          >
                            <Ionicons
                              name="checkmark-circle"
                              size={16}
                              color="hsl(var(--primary))"
                            />
                            <Text className="text-muted-foreground">
                              {symptomTranslations[key] || key}
                            </Text>
                          </View>
                        ))}
                  </View>
                </View>

                {/* Descrição clínica adicional */}
                {patient?.clinicalData?.description && (
                  <View className="bg-muted/30 p-3 rounded-lg">
                    <Text className="font-medium text-card-foreground mb-2">
                      Descrição:
                    </Text>
                    <Text className="text-muted-foreground">
                      {patient.clinicalData.description}
                    </Text>
                  </View>
                )}
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        {/* Lista de consultas anteriores */}
        <View className="gap-4 mb-6">
          {patient?.medicalHistory?.map(
            (record: MedicalHistory, index: number) => (
              <Animated.View
                key={record.id}
                entering={FadeInDown.duration(600).delay(400 + index * 100)}
                layout={LinearTransition.springify()}
              >
                <Card>
                  <CardContent className="p-4">
                    <View className="flex-row items-center justify-between mb-4">
                      <View className="flex-row items-center gap-2">
                        <View className="bg-primary/20 p-2 rounded-full">
                          <Ionicons
                            name="calendar"
                            size={20}
                            color="hsl(var(--primary))"
                          />
                        </View>
                        <Text className="text-lg font-semibold text-card-foreground">
                          {record.diagnosis}
                        </Text>
                      </View>
                      <Text className="text-muted-foreground bg-muted/30 px-3 py-1 rounded-full">
                        {formatDate(record.date)}
                      </Text>
                    </View>

                    {record.prescription && (
                      <View className="bg-muted/30 p-3 rounded-lg mb-3">
                        <View className="flex-row items-center gap-2 mb-1">
                          <Ionicons
                            name="medical"
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
                            name="document-text"
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
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
