import React from "react";
import { View, Text } from "react-native";
import {
  ExamResult as ExamResultType,
  EXAM_DESCRIPTIONS,
} from "@/types/exam.types";
import { Card, CardContent } from "@/components/common/Card";
import { Ionicons } from "@expo/vector-icons";

interface ExamResultProps {
  result: ExamResultType;
}

export function ExamResult({ result }: ExamResultProps) {
  const getDiagnosisConfig = (diagnosis: string) => {
    switch (diagnosis) {
      case "POSITIVE":
        return {
          icon: "alert-circle" as const,
          color: "text-red-600",
          bg: "bg-red-50",
          label: "Positivo",
        };
      case "NEGATIVE":
        return {
          icon: "checkmark-circle" as const,
          color: "text-green-600",
          bg: "bg-green-50",
          label: "Negativo",
        };
      default:
        return {
          icon: "help-circle" as const,
          color: "text-yellow-600",
          bg: "bg-yellow-50",
          label: "Inconclusivo",
        };
    }
  };

  const diagnosisConfig = getDiagnosisConfig(result.diagnosis);

  return (
    <Card className="border border-border">
      <CardContent className="p-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-semibold text-card-foreground">
            Resultado do Exame
          </Text>
          <View
            className={`${diagnosisConfig.bg} px-3 py-1 rounded-full flex-row items-center gap-1`}
          >
            <Ionicons
              name={diagnosisConfig.icon}
              size={16}
              color={`hsl(var(--${diagnosisConfig.color}))`}
            />
            <Text className={diagnosisConfig.color}>
              {diagnosisConfig.label}
            </Text>
          </View>
        </View>

        <View className="gap-4">
          <View className="bg-muted/50 p-3 rounded-md">
            <View className="flex-row justify-between items-center">
              <Text className="text-muted-foreground">Data do Resultado</Text>
              <Text className="text-card-foreground font-medium">
                {new Date(result.resultDate).toLocaleDateString()}
              </Text>
            </View>
          </View>

          {result.diagnosis === "INCONCLUSIVO" &&
            result.recommendedFollowUp && (
              <View className="bg-yellow-50 p-4 rounded-lg">
                <View className="flex-row items-center gap-2 mb-2">
                  <Ionicons name="alert-circle" size={20} color="#B45309" />
                  <Text className="font-semibold text-yellow-800">
                    Teste Confirmatório Recomendado
                  </Text>
                </View>
                <Text className="text-yellow-800">
                  {EXAM_DESCRIPTIONS[result.recommendedFollowUp].title}
                </Text>
              </View>
            )}

          {result.notes && (
            <View className="bg-muted/30 p-4 rounded-lg">
              <Text className="font-medium text-card-foreground mb-2">
                Observações
              </Text>
              <Text className="text-muted-foreground">{result.notes}</Text>
            </View>
          )}
        </View>
      </CardContent>
    </Card>
  );
}
