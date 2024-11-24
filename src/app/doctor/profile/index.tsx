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
import { Doctor } from "@/types/doctor.types";

export default function DoctorProfile() {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  if (!user || user.role !== "doctor") return null;

  const doctorUser = user as Doctor;

  const profileItems = [
    {
      icon: "person-outline",
      label: "Nome",
      value: doctorUser.name,
      bgColor: "bg-primary/10",
      iconColor: "primary",
    },
    {
      icon: "mail-outline",
      label: "Email",
      value: doctorUser.email,
      bgColor: "bg-secondary/10",
      iconColor: "secondary",
    },
    {
      icon: "medical-outline",
      label: "CRM",
      value: doctorUser.crm,
      bgColor: "bg-accent/10",
      iconColor: "accent",
    },
    {
      icon: "medkit-outline",
      label: "Especialidade",
      value: doctorUser.specialization,
      bgColor: "bg-success/10",
      iconColor: "success",
    },
    {
      icon: "call-outline",
      label: "Telefone",
      value: doctorUser.phone,
      bgColor: "bg-warning/10",
      iconColor: "warning",
    },
    {
      icon: "location-outline",
      label: "Endereço",
      value: doctorUser.address,
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
            Dr. {doctorUser.name}
          </Text>
          <Text className="text-muted-foreground">
            {doctorUser.specialization}
          </Text>
          <Text className="text-primary">CRM: {doctorUser.crm}</Text>
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
