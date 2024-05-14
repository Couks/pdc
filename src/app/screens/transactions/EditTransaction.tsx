import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useForm } from "react-hook-form";

import axios from "axios";
import { Input } from "@/components/Input";
import Header from "@/components/Header";

interface EditTransactionProps {
  transactionId: string;
  onEditSuccess: (updatedTransaction: Transaction) => void;
}

interface Transaction {
  id: string;
  createdAt: string;
  updatedAt?: string;
  entrada_saida: string;
  conta?: string;
  valor: string;
  categoria: string;
  userid?: string;
}

export default function EditTransaction({
  transactionId,
  onEditSuccess,
}: EditTransactionProps) {
  const [transactionData, setTransactionData] = useState<Transaction>(
    {} as Transaction
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Transaction>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(
          `https://actively-settling-rodent.ngrok-free.app/api/movimentacao/${transactionId}`
        );
        setTransactionData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransaction();
  }, [transactionId]);

  const handleEdit = async (data: Transaction) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `https://actively-settling-rodent.ngrok-free.app/api/movimentacao/${transactionId}`,
        data
      );
      const updatedTransaction = response.data;
      onEditSuccess(updatedTransaction);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1">
      <Header title="Editar Transação"></Header>
      {!isLoading ? (
        <Text className="text-xl">Carregando...</Text>
      ) : (
        <ScrollView className="bg-white dark:bg-purple-800 p-2">
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Entrada/Saída:
            </Text>
            <Input
              {...register("entrada_saida", { required: true })}
              defaultValue={transactionData.entrada_saida}
            />
            {errors.entrada_saida && (
              <Text style={{ color: "red" }}>Campo obrigatório</Text>
            )}
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Valor:</Text>
            <Input
              {...register("valor", { required: true })}
              defaultValue={transactionData.valor}
              keyboardType="number-pad"
            />
            {errors.valor && (
              <Text style={{ color: "red" }}>Campo obrigatório</Text>
            )}
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Categoria:</Text>
            <Input
              {...register("categoria", { required: true })}
              defaultValue={transactionData.categoria}
              style={{ borderWidth: 1, borderColor: "#ccc", padding: 10 }}
            />
            {errors.categoria && (
              <Text style={{ color: "red" }}>Campo obrigatório</Text>
            )}
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#007bff",
              padding: 15,
              alignItems: "center",
            }}
            onPress={handleSubmit(handleEdit)}
            disabled={isLoading}
          >
            <Text style={{ color: "#fff", fontSize: 18 }}>Salvar</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}
