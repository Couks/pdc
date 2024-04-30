import { Progress } from "@/components/Progress";
import { ScrollView } from "react-native";
import { StyleSheet, Text, View } from "react-native";

export default function Dashboard() {
  // Function to get the appropriate greeting based on the time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    console.log(hour);
    if (hour >= 5 && hour < 12) {
      return "Bom dia";
    } else if (hour >= 12 && hour < 18) {
      return "Boa tarde";
    } else {
      return "Boa noite";
    }
  };

  return (
    <View className="flex-1 gap-4 items-start justify-center">
      <View className=" ">
        <Text className="text-2xl font-bold">Oi, bem vindo de volta! </Text>
        <Text className="text-lg font-regular ">{getGreeting()}</Text>

        {/* Display total expenses */}
        <View className="mb-4">
          <Text className="text-lg font-bold mb-2 ">Total Expenses:</Text>
          <Progress percentage={30} />
        </View>

        {/* Display most recent expenses */}
        <ScrollView className="gap-6">
          <Text className="text-xl font-bold mb-2">Recent Expenses</Text>
          <View className="flex-row items-center mb-2">
            <Text className="text-lg">$ 2000</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Text className="text-lg">$ 2000</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Text className="text-lg">$ 2000</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Text className="text-lg">$ 2000</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Text className="text-lg">$ 2000</Text>
          </View>
          <Text className="text-xl font-bold mb-2">Recent Expenses</Text>
          <View className="flex-row items-center mb-2">
            <Text className="text-lg">$ 2000</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Text className="text-lg">$ 2000</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Text className="text-lg">$ 2000</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Text className="text-lg">$ 2000</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Text className="text-lg">$ 2000</Text>
          </View>
          <Text className="text-xl font-bold mb-2">Recent Expenses</Text>
          <View className="flex-row items-center mb-2">
            <Text className="text-lg">$ 2000</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Text className="text-lg">$ 2000</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Text className="text-lg">$ 2000</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Text className="text-lg">$ 2000</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Text className="text-lg">$ 2000</Text>
          </View>
        </ScrollView>

        {/* Display expenses list with filters */}
        {/* You can implement this part based on your specific requirements */}
      </View>
    </View>
  );
}
