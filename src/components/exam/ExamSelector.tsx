import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ChagasExamType, EXAM_DESCRIPTIONS } from "@/types/exam.types";

interface ExamSelectorProps {
  onSelectExam: (examType: ChagasExamType) => void;
}

export function ExamSelector({ onSelectExam }: ExamSelectorProps) {
  return (
    <ScrollView className="flex-1">
      <View className="p-4 space-y-4">
        <Text className="text-xl font-bold mb-4">
          Selecione o Tipo de Exame
        </Text>

        {Object.values(EXAM_DESCRIPTIONS).map((exam) => (
          <TouchableOpacity
            key={exam.type}
            className="bg-white p-4 rounded-lg shadow-sm space-y-2"
            onPress={() => onSelectExam(exam.type)}
          >
            <Text className="text-lg font-semibold">{exam.title}</Text>
            <Text className="text-gray-600">{exam.description}</Text>

            <View className="mt-2">
              <Text className="font-medium">Vantagens:</Text>
              {exam.advantages.map((advantage, index) => (
                <Text key={index} className="text-gray-600">
                  • {advantage}
                </Text>
              ))}
            </View>

            <View className="mt-2">
              <Text className="font-medium">Limitações:</Text>
              {exam.limitations.map((limitation, index) => (
                <Text key={index} className="text-gray-600">
                  • {limitation}
                </Text>
              ))}
            </View>

            <Text className="mt-2 text-blue-600">
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
