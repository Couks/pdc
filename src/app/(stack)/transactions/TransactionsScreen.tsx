import Header from "@/components/Header";
import Transaction from "./[transaction]";
import Balance from "@/components/Balance";
import { ScrollView, SafeAreaView, View } from "react-native";
import transactionsData from "@/assets/transactionsData.json";

export default function TransactionsScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-green-500 dark:bg-green-700">
      <Header title="Transações" style={{ height: 150 }} />

      <ScrollView className="bg-white dark:bg-purple-800 p-2 rounded-t-[50px]">
        {transactionsData.map((transaction) => (
          <View key={transaction.id}>
            <Transaction
              id={transaction.id}
              iconName={transaction.iconName}
              category={transaction.category}
              date={transaction.date}
              type={transaction.type}
              price={transaction.price}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
