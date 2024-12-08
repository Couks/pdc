// Importações necessárias para o componente
import Animated, {
  FadeInDown,
  LinearTransition,
} from "react-native-reanimated";
import { Doctor } from "@/types";
import { api } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/common/Button";
import { View, Text, ScrollView, Alert } from "react-native";
import { Card, CardContent } from "@/components/common/Card";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Componente principal para seleção e visualização de médicos
export default function DoctorSelection() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Busca os médicos vinculados ao paciente atual
  const { data: myDoctors, isLoading: isLoadingMyDoctors } = useQuery({
    queryKey: ["myDoctors", user?.id],
    queryFn: async () => {
      const { data: patients } = await api.get("/patients");
      const currentPatient = patients.find((p: any) => p.id === user?.id);
      if (!currentPatient) return [];

      const { data: doctors } = await api.get("/doctors");
      return doctors.filter((d: Doctor) =>
        currentPatient.doctors.includes(d.id)
      );
    },
    enabled: !!user?.id,
  });

  // Busca todos os médicos disponíveis na plataforma
  const { data: availableDoctors, isLoading: isLoadingAvailableDoctors } =
    useQuery({
      queryKey: ["availableDoctors"],
      queryFn: async () => {
        const { data: doctors } = await api.get("/doctors");
        return doctors;
      },
    });

  // Mutation para enviar solicitação de vínculo com um médico
  const requestDoctorMutation = useMutation({
    mutationFn: async (doctorId: string) => {
      const { data: patients } = await api.get("/patients");
      const { data: doctors } = await api.get("/doctors");

      const patient = patients.find((p: any) => p.id === user?.id);
      const doctor = doctors.find((d: any) => d.id === doctorId);

      if (!patient || !doctor) {
        throw new Error("Paciente ou médico não encontrado");
      }

      // Atualiza os dados do paciente com o novo médico
      const updatedPatient = {
        ...patient,
        doctors: [...patient.doctors, doctorId],
      };
      await api.put(`/patients/${patient.id}`, updatedPatient);

      // Atualiza os dados do médico com o novo paciente
      const updatedDoctor = {
        ...doctor,
        patients: [...doctor.patients, patient.id],
      };
      await api.put(`/doctors/${doctorId}`, updatedDoctor);

      return updatedDoctor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myDoctors"] });
      queryClient.invalidateQueries({ queryKey: ["availableDoctors"] });
    },
  });

  // Função para lidar com a solicitação de vínculo com um médico
  const handleRequestDoctor = async (doctorId: string) => {
    try {
      await requestDoctorMutation.mutateAsync(doctorId);
      Alert.alert(
        "Solicitação Enviada",
        "O médico receberá sua solicitação e poderá aceitar o atendimento."
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível enviar a solicitação");
    }
  };

  // Filtra a lista de médicos disponíveis excluindo os já vinculados
  const filteredAvailableDoctors = availableDoctors?.filter(
    (availableDoctor: Doctor) =>
      !myDoctors?.some((myDoctor: Doctor) => myDoctor.id === availableDoctor.id)
  );

  // Renderiza a interface com as listas de médicos
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4">
        {/* Seção de médicos já vinculados */}
        <Animated.View
          entering={FadeInDown.duration(600)}
          layout={LinearTransition.springify()}
          className="mb-6"
        >
          <Text className="text-xl font-bold text-foreground mb-4">
            Meus Médicos
          </Text>
          {myDoctors?.map((doctor: Doctor, index: number) => (
            <Animated.View
              key={doctor.id}
              entering={FadeInDown.duration(300).delay(index * 100)}
              layout={LinearTransition.springify()}
            >
              <Card className="mb-3">
                <CardContent className="p-4">
                  <View className="flex-row items-center">
                    <View className="bg-primary/10 p-3 rounded-full mr-4">
                      <Ionicons
                        name="person"
                        size={24}
                        color="hsl(var(--primary))"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-semibold">
                        Dr. {doctor.name}
                      </Text>
                      <Text className="text-muted-foreground">
                        {doctor.specialization}
                      </Text>
                      <Text className="text-muted-foreground">
                        CRM: {doctor.crm}
                      </Text>
                    </View>
                  </View>
                </CardContent>
              </Card>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Seção de médicos disponíveis para vínculo */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(300)}
          layout={LinearTransition.springify()}
        >
          <Text className="text-xl font-bold text-foreground mb-4">
            Médicos Disponíveis
          </Text>
          {filteredAvailableDoctors?.map((doctor: Doctor, index: number) => (
            <Animated.View
              key={doctor.id}
              entering={FadeInDown.duration(300).delay(300 + index * 100)}
              layout={LinearTransition.springify()}
            >
              <Card className="mb-3">
                <CardContent className="p-4">
                  <View className="flex-row items-center">
                    <View className="bg-muted p-3 rounded-full mr-4">
                      <Ionicons
                        name="person-add"
                        size={24}
                        color="hsl(var(--muted-foreground))"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-semibold">
                        Dr. {doctor.name}
                      </Text>
                      <Text className="text-muted-foreground">
                        {doctor.specialization}
                      </Text>
                    </View>
                    <Button
                      variant="outline"
                      label="Solicitar"
                      onPress={() => handleRequestDoctor(doctor.id)}
                      disabled={requestDoctorMutation.isPending}
                    />
                  </View>
                </CardContent>
              </Card>
            </Animated.View>
          ))}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
