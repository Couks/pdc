import { Text, View } from "react-native";

type Props = {
  percentage: number;
};

export function Progress() {
  const percentage = 22;
  const width = percentage > 100 ? 100 : percentage;
  const value = percentage + "%";

  return (
    <View className="w-full h-7 rounded-full bg-secondary-700 overflow-hidden flex-row items-center">
      <View
        className="h-7 items-end justify-center rounded-full bg-secondary-500"
        style={{ width: `${width}%` }}
      >
        {percentage >= 60 && (
          <Text className="text-xs font-semibold mx-5 text-white">{value}</Text>
        )}
      </View>

      {percentage < 60 && (
        <Text className="text-white text-xs font-semibold mx-5">{value}</Text>
      )}
    </View>
  );
}
