import Header from "@/components/Header";
import Transaction from "./[transaction]";
import Balance from "@/components/Balance";
import { ScrollView, SafeAreaView, View } from "react-native";
import transactionsData from "@/assets/transactionsData.json";

export default function TransactionsScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-purple-700">
      <Header title="Transações" style={{ height: 100 }} />

      <ScrollView className="bg-white dark:bg-purple-800">
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
