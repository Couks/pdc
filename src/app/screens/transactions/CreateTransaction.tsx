import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { API_URL } from "@/hooks/auth/AuthContext";

export function CreateTransaction() {
  const [transaction, setTransaction] = useState({
    entrada_saida: "",
    conta: "",
    valor: null,
    categoria: "",
  });

  const handleInputChange = (name: string, value: number) => {
    setTransaction({ ...transaction, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/movimentacao/`,
        transaction
      );
      console.log(response.data);
      Alert.alert("Transação criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar transação:", error);
      Alert.alert("Falha ao criar transação.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Transação</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrada ou Saída"
        onChangeText={(text) => handleInputChange("entrada_saida", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Conta"
        onChangeText={(text) => handleInputChange("conta", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor"
        keyboardType="numeric"
        onChangeText={(text) => handleInputChange("valor", Number(text))}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria"
        onChangeText={(text) => handleInputChange("categoria", text)}
      />
      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});
