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
import { patientService } from "@/services/api";
import { Patient } from "@/types/patient.types";

export default function PatientProfile() {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["patient-profile", user?.id],
    queryFn: () => patientService.getProfile(user?.id || ""),
    enabled: !!user?.id,
  });

  if (!profile || user?.role !== "patient") return null;

  const profileItems = [
    {
      icon: "person-outline",
      label: "Nome",
      value: profile.name,
      bgColor: "bg-primary/10",
      iconColor: "primary",
    },
    {
      icon: "mail-outline",
      label: "Email",
      value: profile.email,
      bgColor: "bg-secondary/10",
      iconColor: "secondary",
    },
    {
      icon: "card-outline",
      label: "CPF",
      value: profile.cpf,
      bgColor: "bg-accent/10",
      iconColor: "accent",
    },
    {
      icon: "calendar-outline",
      label: "Data de Nascimento",
      value: new Date(profile.birthDate).toLocaleDateString("pt-BR"),
      bgColor: "bg-success/10",
      iconColor: "success",
    },
    {
      icon: "call-outline",
      label: "Telefone",
      value: profile.phone,
      bgColor: "bg-warning/10",
      iconColor: "warning",
    },
    {
      icon: "location-outline",
      label: "Endereço",
      value: profile.address,
      bgColor: "bg-info/10",
      iconColor: "info",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 p-6">
        <Animated.View
          entering={FadeInDown.duration(600)}
          layout={LinearTransition.springify()}
          className="items-center mb-8"
        >
          <View className="w-24 h-24 bg-primary/10 rounded-full items-center justify-center mb-4">
            <Ionicons name="person" size={48} color="hsl(var(--primary))" />
          </View>
          <Text className="text-2xl font-bold text-foreground">
            {profile.name}
          </Text>
          <Text className="text-muted-foreground">
            {new Date(profile.birthDate).toLocaleDateString("pt-BR")}
          </Text>
          <Text className="text-primary">CPF: {profile.cpf}</Text>
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
                    className={`w-10 h-10 ${item.bgColor} rounded-full items-center justify-center mr-4`}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={24}
                      color={`hsl(var(--${item.iconColor}))`}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm text-muted-foreground">
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
          className="mt-auto"
        >
          <TouchableOpacity
            className="flex-row items-center bg-destructive/10 p-4 rounded-xl"
            onPress={() => setShowLogoutModal(true)}
          >
            <View className="w-10 h-10 bg-destructive/20 rounded-full items-center justify-center">
              <Ionicons
                name="log-out-outline"
                size={24}
                color="hsl(var(--destructive))"
              />
            </View>
            <Text className="flex-1 ml-4 text-destructive font-medium">
              Sair da conta
            </Text>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="hsl(var(--destructive))"
            />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <LogoutModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={logout}
      />
    </SafeAreaView>
  );
}
