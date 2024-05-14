import Header from "@/components/Header";
import Transaction from "./[id]";
import { ScrollView, SafeAreaView, View, Text } from "react-native";
import transactionsData from "@/assets/transactionsData.json";
import { Button } from "@/components/Button";
import { Link } from "expo-router";

export default function TransactionsScreen({
  navigation,
}: {
  navigation: any;
}) {
  return (
    <SafeAreaView className="flex-1 bg-green-500 dark:bg-green-700 ">
      <Header title="Transações" style={{ height: 200 }}>
        <Button
          label="Editar Transação"
          onPress={() => {
            navigation.navigate("EditTransaction");
          }}
        ></Button>

        <View className="bg-green-500 w-screen h-12">
          <Link href="/transactions/EditTransaction">
            <Text>Editar Transação</Text>
          </Link>
        </View>
      </Header>

      <ScrollView className="bg-white dark:bg-purple-800 p-2 rounded-t-[50px]">
        {transactionsData.map((transaction) => (
          <View key={transaction.id}>
            <Transaction
              id={transaction.id}
              createdAt={transaction.createdAt}
              entrada_saida={transaction.entrada_saida}
              valor={transaction.valor}
              categoria={transaction.categoria}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
