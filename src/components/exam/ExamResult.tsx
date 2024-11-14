import React from "react";
import { View, Text } from "react-native";
import {
  ExamResult as ExamResultType,
  EXAM_DESCRIPTIONS,
} from "@/types/exam.types";

interface ExamResultProps {
  result: ExamResultType;
}

export function ExamResult({ result }: ExamResultProps) {
  return (
    <View className="bg-white p-4 rounded-lg shadow-sm">
      <Text className="text-lg font-semibold mb-2">Resultado do Exame</Text>

      <View className="space-y-2">
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Data do Resultado:</Text>
          <Text>{new Date(result.resultDate).toLocaleDateString()}</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Diagnóstico:</Text>
          <Text
            className={`font-medium ${
              result.diagnosis === "POSITIVE"
                ? "text-red-600"
                : result.diagnosis === "NEGATIVE"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {result.diagnosis === "POSITIVE"
              ? "Positivo"
              : result.diagnosis === "NEGATIVE"
              ? "Negativo"
              : "Inconclusivo"}
          </Text>
        </View>

        {result.diagnosis === "INCONCLUSIVE" && result.recommendedFollowUp && (
          <View className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <Text className="font-medium text-yellow-800">
              Recomendação de Teste Confirmatório:
            </Text>
            <Text className="text-yellow-800">
              {EXAM_DESCRIPTIONS[result.recommendedFollowUp].title}
            </Text>
          </View>
        )}

        {result.notes && (
          <View className="mt-2">
            <Text className="font-medium">Observações:</Text>
            <Text className="text-gray-600">{result.notes}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
