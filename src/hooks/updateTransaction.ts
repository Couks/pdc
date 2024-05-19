import { useToast } from "@/components/ui/Toast";
import { API_URL } from "@/hooks/auth/AuthContext";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface TransactionProps {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  entrada_saida?: string;
  conta?: string;
  valor: number;
  categoria: string;
  userid?: number;
}

export async function updateTransaction({
  id,
  entrada_saida,
  valor,
  categoria,
}: TransactionProps): Promise<TransactionProps | undefined> {
  const { toast } = useToast();

  const [updatedTransaction, setUpdatedTransaction] = useState<
    TransactionProps | undefined
  >(undefined);

  useEffect(() => {
    const updateTransaction = async () => {
      try {
        const response = await axios.put<TransactionProps>(
          `${API_URL}/movimentacao/${id}`,
          {
            entrada_saida,
            valor,
            categoria,
          }
        );

        if (response.data) {
          setUpdatedTransaction(response.data);
          toast("Transação atualizada!", "success", 2000);
        } else {
          throw new Error("The server did not return any data");
        }
      } catch (error) {
        console.error("Error updating transaction:", error);
        if (error instanceof AxiosError && error.response?.data) {
          toast(error.response.data.message, "destructive", 3000);
        } else if (error instanceof Error) {
          toast("Erro ao atualizar a transação", "destructive", 3000);
        } else {
          throw error;
        }
      }
    };

    updateTransaction().catch((error) => {
      console.error("Unhandled error in updateTransaction:", error);
    });
  }, []);

  return updatedTransaction;
}
