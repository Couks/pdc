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
import { ScrollView } from "react-native";

export default function DoctorProfile() {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  if (!user || user.role !== "doctor") return null;

  const doctorUser = user as Doctor;

  const profileItems = [
    {
      icon: "person",
      label: "Nome",
      value: doctorUser.name,
      bgColor: "bg-primary/20",
      iconColor: "primary",
    },
    {
      icon: "mail",
      label: "Email",
      value: doctorUser.email,
      bgColor: "bg-primary/20",
      iconColor: "primary",
    },
    {
      icon: "medical",
      label: "CRM",
      value: doctorUser.crm,
      bgColor: "bg-amber-500/20",
      iconColor: "amber-500",
    },
    {
      icon: "medkit",
      label: "Especialidade",
      value: doctorUser.specialization,
      bgColor: "bg-amber-500/20",
      iconColor: "amber-500",
    },
    {
      icon: "call",
      label: "Telefone",
      value: doctorUser.phone,
      bgColor: "bg-green-500/20",
      iconColor: "green-500",
    },
    {
      icon: "location",
      label: "Endereço",
      value: doctorUser.address,
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
              Dr. {doctorUser.name}
            </Text>
            <Text className="text-muted-foreground">
              {doctorUser.specialization}
            </Text>
            <Text className="text-primary text-x">CRM: {doctorUser.crm}</Text>
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
                      color={`${item.iconColor}`}
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
          className="mt-8 mb-4"
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
