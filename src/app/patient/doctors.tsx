import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/common/Card";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/common/Button";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Doctor } from "@/types";

export default function DoctorSelection() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Query para buscar meus médicos
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

  // Query para buscar médicos disponíveis
  const { data: availableDoctors, isLoading: isLoadingAvailableDoctors } =
    useQuery({
      queryKey: ["availableDoctors"],
      queryFn: async () => {
        const { data: doctors } = await api.get("/doctors");
        return doctors;
      },
    });

  // Mutation para solicitar médico
  const requestDoctorMutation = useMutation({
    mutationFn: async (doctorId: string) => {
      const { data: patients } = await api.get("/patients");
      const { data: doctors } = await api.get("/doctors");

      const patient = patients.find((p: any) => p.id === user?.id);
      const doctor = doctors.find((d: any) => d.id === doctorId);

      if (!patient || !doctor) {
        throw new Error("Paciente ou médico não encontrado");
      }

      // Atualizar paciente
      const updatedPatient = {
        ...patient,
        doctors: [...patient.doctors, doctorId],
      };
      await api.put(`/patients/${patient.id}`, updatedPatient);

      // Atualizar médico
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

  // Filtra os médicos disponíveis removendo os que já são meus médicos
  const filteredAvailableDoctors = availableDoctors?.filter(
    (availableDoctor: Doctor) =>
      !myDoctors?.some((myDoctor: Doctor) => myDoctor.id === availableDoctor.id)
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4">
        {/* Meus Médicos */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-foreground mb-4">
            Meus Médicos
          </Text>
          {myDoctors?.map((doctor: Doctor) => (
            <Card key={doctor.id} className="mb-3">
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
          ))}
        </View>

        {/* Médicos Disponíveis */}
        <View>
          <Text className="text-xl font-bold text-foreground mb-4">
            Médicos Disponíveis
          </Text>
          {filteredAvailableDoctors?.map((doctor: Doctor) => (
            <Card key={doctor.id} className="mb-3">
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
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
