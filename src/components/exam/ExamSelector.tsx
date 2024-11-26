import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import { ChagasExamType, EXAM_DESCRIPTIONS } from "@/types/exam.types";
import { Ionicons } from "@expo/vector-icons";
import { Card, CardContent } from "@/components/common/Card";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface ExamSelectorProps {
  onSelectExam: (examType: ChagasExamType) => void;
}

export function ExamSelector({ onSelectExam }: ExamSelectorProps) {
  const [selectedExam, setSelectedExam] = useState<ChagasExamType | null>(null);
  const [expandedExam, setExpandedExam] = useState<ChagasExamType | null>(null);

  const handleSelectExam = (examType: ChagasExamType) => {
    setSelectedExam(examType);
    onSelectExam(examType);
  };

  const toggleExpand = (examType: ChagasExamType) => {
    setExpandedExam(expandedExam === examType ? null : examType);
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex-1">
        <View className="p-4 gap-4">
          <Text className="text-2xl font-bold mb-6 text-foreground">
            Informações dos Exames
          </Text>

          {Object.values(EXAM_DESCRIPTIONS).map((exam) => {
            const isSelected = selectedExam === exam.type;
            const isExpanded = expandedExam === exam.type;

            return (
              <Card
                key={exam.type}
                className={`${isSelected ? "border-green-500" : ""}`}
              >
                <TouchableOpacity
                  onPress={() => handleSelectExam(exam.type)}
                  className="flex-1"
                >
                  <CardContent className="p-4">
                    <View className="gap-4">
                      {/* Cabeçalho com título e fase */}
                      <View className="flex-row items-center justify-between mb-2 gap-2">
                        <Text className="text-xl font-bold text-card-foreground w-1/2">
                          {exam.title}
                        </Text>

                        <View className="bg-primary/10 px-4 py-2 rounded-full">
                          <Text className="text-md font-medium text-primary">
                            {exam.recommendedPhase === "AMBAS"
                              ? "Aguda e Crônica"
                              : exam.recommendedPhase === "AGUDA"
                              ? "Fase Aguda"
                              : "Fase Crônica"}
                          </Text>
                        </View>
                      </View>

                      {/* Descrição */}
                      <View className="mb-4">
                        <Text className="text-base text-muted-foreground leading-relaxed">
                          {exam.description}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => toggleExpand(exam.type)}
                        className="flex-row items-center justify-center p-2 bg-primary/10 rounded-lg"
                      >
                        <Text className="text-primary font-medium mr-2">
                          {isExpanded ? "Ver menos" : "Ver mais informações"}
                        </Text>
                        <Ionicons
                          name={isExpanded ? "chevron-up" : "chevron-down"}
                          size={20}
                          color="hsl(var(--primary))"
                        />
                      </TouchableOpacity>

                      {isExpanded && (
                        <Animated.View
                          entering={FadeIn}
                          exiting={FadeOut}
                          className="mt-4"
                        >
                          {/* Seção de Vantagens */}
                          <View className="bg-primary/5 p-4 rounded-lg mb-3">
                            <View className="flex-row items-center mb-3">
                              <View className="bg-primary/10 p-2 rounded-full">
                                <Ionicons
                                  name="checkmark-circle"
                                  size={20}
                                  color="hsl(var(--primary))"
                                />
                              </View>
                              <Text className="font-semibold text-primary ml-3">
                                Vantagens
                              </Text>
                            </View>
                            <View className="gap-2">
                              {exam.advantages.map((advantage, index) => (
                                <View
                                  key={index}
                                  className="flex-row items-start"
                                >
                                  <Text className="text-primary mr-2">•</Text>
                                  <Text className="text-muted-foreground flex-1">
                                    {advantage}
                                  </Text>
                                </View>
                              ))}
                            </View>
                          </View>

                          {/* Seção de Limitações */}
                          <View className="bg-destructive/5 p-4 rounded-lg">
                            <View className="flex-row items-center mb-3">
                              <View className="bg-destructive/10 p-2 rounded-full">
                                <Ionicons
                                  name="alert-circle"
                                  size={20}
                                  color="hsl(var(--destructive))"
                                />
                              </View>
                              <Text className="font-semibold text-destructive ml-3">
                                Limitações
                              </Text>
                            </View>
                            <View className="gap-2">
                              {exam.limitations.map((limitation, index) => (
                                <View
                                  key={index}
                                  className="flex-row items-start"
                                >
                                  <Text className="text-destructive mr-2">
                                    •
                                  </Text>
                                  <Text className="text-muted-foreground flex-1">
                                    {limitation}
                                  </Text>
                                </View>
                              ))}
                            </View>
                          </View>
                        </Animated.View>
                      )}
                    </View>
                  </CardContent>
                </TouchableOpacity>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
