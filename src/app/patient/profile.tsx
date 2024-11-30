import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { LogoutModal } from "@/components/common/LogoutModal";
import { Card, CardContent } from "@/components/common/Card";
import Animated, {
  FadeInDown,
  LinearTransition,
} from "react-native-reanimated";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { ScrollView } from "react-native";

export default function PatientProfile() {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["patient-profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data: patients } = await api.get("/patients");
      return patients.find((p: any) => p.id === user.id);
    },
    enabled: !!user?.id,
  });

  if (!profile || user?.role !== "patient") return null;

  const profileItems = [
    {
      icon: "person",
      label: "Nome",
      value: profile.name,
      bgColor: "bg-primary/20",
      iconColor: "primary",
    },
    {
      icon: "mail",
      label: "Email",
      value: profile.email,
      bgColor: "bg-primary/20",
      iconColor: "primary",
    },
    {
      icon: "call",
      label: "Telefone",
      value: profile.phone || "Não informado",
      bgColor: "bg-green-500/20",
      iconColor: "green-500",
    },
    {
      icon: "location",
      label: "Endereço",
      value: profile.address || "Não informado",
      bgColor: "bg-green-500/20",
      iconColor: "green-500",
    },
    {
      icon: "calendar",
      label: "Data de Nascimento",
      value: profile.birthDate
        ? new Date(profile.birthDate).toLocaleDateString("pt-BR")
        : "Não informado",
      bgColor: "bg-amber-500/20",
      iconColor: "amber-500",
    },
    {
      icon: "transgender",
      label: "Gênero",
      value: profile.gender || "Não informado",
      bgColor: "bg-amber-500/20",
      iconColor: "amber-500",
    },
    {
      icon: "water",
      label: "Tipo Sanguíneo",
      value: profile.clinicalData?.bloodType || "Não informado",
      bgColor: "bg-primary/20",
      iconColor: "primary",
    },
    {
      icon: "alert-circle",
      label: "Alergias",
      value:
        profile.clinicalData?.allergies?.length > 0
          ? profile.clinicalData.allergies.join(", ")
          : "Nenhuma alergia registrada",
      bgColor: "bg-destructive/20",
      iconColor: "destructive",
    },
    {
      icon: "medical",
      label: "Condições Crônicas",
      value:
        profile.clinicalData?.chronicConditions?.length > 0
          ? profile.clinicalData.chronicConditions.join(", ")
          : "Nenhuma condição registrada",
      bgColor: "bg-amber-500/20",
      iconColor: "amber-500",
    },
    {
      icon: "medkit",
      label: "Medicamentos",
      value:
        profile.clinicalData?.medications?.length > 0
          ? profile.clinicalData.medications.join(", ")
          : "Nenhum medicamento registrado",
      bgColor: "bg-green-500/20",
      iconColor: "green-500",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6">
        <Animated.View
          entering={FadeInDown.duration(600)}
          layout={LinearTransition.springify()}
          className="items-center flex-row justify-center mb-8 gap-4"
        >
          <View className="w-24 h-24 bg-primary/20 rounded-full items-center justify-center mb-4">
            <Ionicons name="person" size={48} color="hsl(var(--primary))" />
          </View>
          <View>
            <Text className="text-2xl font-bold text-foreground">
              {profile.name}
            </Text>
            <Text className="text-muted-foreground">
              {profile.birthDate
                ? new Date(profile.birthDate).toLocaleDateString("pt-BR")
                : "Data não informada"}
            </Text>
            <Text className="text-primary text-x">{profile.email}</Text>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          layout={LinearTransition.springify()}
          className="gap-4"
        >
          {profileItems.map((item, index) => (
            <Card key={item.label}>
              <CardContent className="p-4">
                <View className="flex-row items-center">
                  <View
                    className={`w-12 h-12 ${item.bgColor} rounded-full items-center justify-center mr-4`}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={24}
                      color={`hsl(var(--${item.iconColor}))`}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-md text-muted-foreground">
                      {item.label}
                    </Text>
                    <Text className="text-lg font-medium text-card-foreground">
                      {item.value}
                    </Text>
                  </View>
                </View>
              </CardContent>
            </Card>
          ))}
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(400)}
          layout={LinearTransition.springify()}
          className="mt-4 mb-4"
        >
          <TouchableOpacity
            className="flex-row items-center bg-destructive/20 p-4 rounded-xl"
            onPress={() => setShowLogoutModal(true)}
          >
            <View className="w-12 h-12 bg-destructive/20 rounded-full items-center justify-center">
              <Ionicons
                name="log-out"
                size={24}
                color="hsl(var(--destructive))"
              />
            </View>
            <Text className="flex-1 ml-4 text-destructive font-medium text-xl">
              Sair da conta
            </Text>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="hsl(var(--destructive))"
            />
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      <LogoutModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={logout}
      />
    </SafeAreaView>
  );
}
