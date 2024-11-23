import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ChagasExamType, EXAM_DESCRIPTIONS } from "@/types/exam.types";

interface ExamSelectorProps {
  onSelectExam: (examType: ChagasExamType) => void;
}

export function ExamSelector({ onSelectExam }: ExamSelectorProps) {
  return (
    <ScrollView className="flex-1">
      <View className="p-4 gap-4">
        <Text className="text-xl font-bold mb-4 text-foreground dark:text-foreground">
          Selecione o Tipo de Exame
        </Text>

        {Object.values(EXAM_DESCRIPTIONS).map((exam) => (
          <TouchableOpacity
            key={exam.type}
            className="bg-card dark:bg-card p-4 rounded-lg shadow-sm gap-2"
            onPress={() => onSelectExam(exam.type)}
          >
            <Text className="text-lg font-semibold text-card-foreground dark:text-card-foreground">
              {exam.title}
            </Text>
            <Text className="text-muted-foreground dark:text-muted-foreground">
              {exam.description}
            </Text>

            <View className="mt-2">
              <Text className="font-medium text-card-foreground dark:text-card-foreground">
                Vantagens:
              </Text>
              {exam.advantages.map((advantage, index) => (
                <Text
                  key={index}
                  className="text-gray-600 text-card-foreground dark:text-card-foreground"
                >
                  • {advantage}
                </Text>
              ))}
            </View>

            <View className="mt-2">
              <Text className="font-medium text-card-foreground dark:text-card-foreground">
                Limitações:
              </Text>
              {exam.limitations.map((limitation, index) => (
                <Text
                  key={index}
                  className="text-gray-600 text-card-foreground dark:text-card-foreground"
                >
                  • {limitation}
                </Text>
              ))}
            </View>

            <Text className="mt-2 text-blue-600 text-card-foreground dark:text-card-foreground">
              Fase Recomendada:{" "}
              {exam.recommendedPhase === "BOTH"
                ? "Aguda e Crônica"
                : exam.recommendedPhase === "ACUTE"
                ? "Aguda"
                : "Crônica"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
