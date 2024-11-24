import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ChagasExamType, EXAM_DESCRIPTIONS } from "@/types/exam.types";
import { Ionicons } from "@expo/vector-icons";

interface ExamSelectorProps {
  onSelectExam: (examType: ChagasExamType) => void;
}

export function ExamSelector({ onSelectExam }: ExamSelectorProps) {
  return (
    <ScrollView className="flex-1">
      <View className="p-4 gap-4">
        <Text className="text-2xl font-bold mb-6 text-foreground">
          Selecione o Tipo de Exame
        </Text>

        {Object.values(EXAM_DESCRIPTIONS).map((exam) => (
          <TouchableOpacity
            key={exam.type}
            className="bg-card p-6 rounded-xl shadow-lg border border-border gap-3"
            onPress={() => onSelectExam(exam.type)}
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-xl font-bold text-card-foreground">
                {exam.title}
              </Text>
              <View className="bg-accent px-3 py-1 rounded-full">
                <Text className="text-sm font-medium text-accent-foreground">
                  {exam.recommendedPhase === "AMBAS"
                    ? "Aguda e Crônica"
                    : exam.recommendedPhase === "AGUDA"
                    ? "Aguda"
                    : "Crônica"}
                </Text>
              </View>
            </View>

            <Text className="text-base text-muted-foreground mb-2">
              {exam.description}
            </Text>

            <View className="bg-muted p-4 rounded-lg mb-2">
              <View className="flex-row items-center mb-2">
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color="hsl(var(--primary))"
                />
                <Text className="font-semibold text-card-foreground ml-2">
                  Vantagens
                </Text>
              </View>
              {exam.advantages.map((advantage, index) => (
                <Text key={index} className="text-muted-foreground ml-7 mb-1">
                  • {advantage}
                </Text>
              ))}
            </View>

            <View className="bg-muted p-4 rounded-lg">
              <View className="flex-row items-center mb-2">
                <Ionicons
                  name="alert-circle"
                  size={20}
                  color="hsl(var(--destructive))"
                />
                <Text className="font-semibold text-card-foreground ml-2">
                  Limitações
                </Text>
              </View>
              {exam.limitations.map((limitation, index) => (
                <Text key={index} className="text-muted-foreground ml-7 mb-1">
                  • {limitation}
                </Text>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
