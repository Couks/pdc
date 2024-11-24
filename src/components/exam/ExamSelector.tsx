import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import { ChagasExamType, EXAM_DESCRIPTIONS } from "@/types/exam.types";
import { Ionicons } from "@expo/vector-icons";
import { Card, CardContent } from "@/components/common/Card";

interface ExamSelectorProps {
  onSelectExam: (examType: ChagasExamType) => void;
}

export function ExamSelector({ onSelectExam }: ExamSelectorProps) {
  const [selectedExam, setSelectedExam] = useState<ChagasExamType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectExam = (examType: ChagasExamType) => {
    onSelectExam(examType);
    setModalVisible(false);
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex-1">
        <View className="p-4 gap-4">
          <Text className="text-2xl font-bold mb-6 text-foreground">
            Informações dos Exames
          </Text>

          {Object.values(EXAM_DESCRIPTIONS).map((exam) => (
            <Card key={exam.type}>
              <CardContent className="p-4">
                <View className="gap-4">
                  {/* Cabeçalho com título e fase */}
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-xl font-bold text-card-foreground flex-1 mr-3">
                      {exam.title}
                    </Text>
                    <View className="bg-primary/10 px-4 py-2 rounded-full">
                      <Text className="text-sm font-medium text-primary">
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
                        <View key={index} className="flex-row items-start">
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
                        <View key={index} className="flex-row items-start">
                          <Text className="text-destructive mr-2">•</Text>
                          <Text className="text-muted-foreground flex-1">
                            {limitation}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </CardContent>
            </Card>
          ))}
        </View>
      </ScrollView>

      {/* Botão flutuante para abrir o modal */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="absolute right-6 bg-primary p-4 rounded-full shadow-lg"
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Modal de seleção */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-background rounded-t-3xl p-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-foreground">
                Selecione o Tipo de Exame
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons
                  name="close"
                  size={24}
                  color="hsl(var(--foreground))"
                />
              </TouchableOpacity>
            </View>
            <ScrollView className="max-h-96">
              {Object.values(EXAM_DESCRIPTIONS).map((exam) => (
                <TouchableOpacity
                  key={exam.type}
                  onPress={() => handleSelectExam(exam.type)}
                  className="p-4 border-b border-border"
                >
                  <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-medium text-foreground">
                      {exam.title}
                    </Text>
                    <View className="bg-primary/10 px-3 py-1 rounded-full">
                      <Text className="text-xs font-medium text-primary">
                        {exam.recommendedPhase === "AMBAS"
                          ? "Aguda e Crônica"
                          : exam.recommendedPhase === "AGUDA"
                          ? "Fase Aguda"
                          : "Fase Crônica"}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
