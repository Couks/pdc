import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Separator from "@/components/ui/Separator";
import { Skeleton } from "./ui/Skeleton";
import { Ionicons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { formatCurrency } from "@/utils/formatUtils";

interface Data {
  dollar: {
    price: number;
  };
  euro: {
    price: number;
  };
  bitcoin: {
    price: number;
  };
  bovespa: {
    price: number;
  };
}

const Quotes = () => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.hgbrasil.com/finance`);
      const { results } = response.data;

      setData({
        dollar: {
          price: results.currencies.USD.buy,
        },
        euro: {
          price: results.currencies.EUR.buy,
        },
        bitcoin: {
          price: results.currencies.BTC.buy,
        },
        bovespa: {
          price: results.stocks.IBOVESPA.points,
        },
      });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return null;
  }

  return (
    <View className="bg-gray-200 dark:bg-secondary-500 p-6 rounded-3xl">
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-800 dark:text-white text-xl">Cotações</Text>
        <TouchableOpacity onPress={fetchData}>
          <Ionicons name="reload" size={18} color={colors.gray[400]} />
        </TouchableOpacity>
      </View>

      <Separator />
      <View className="gap-4">
        <>
          {loading ? (
            <Skeleton className="w-full h-4s" />
          ) : (
            <View className="flex-row justify-between">
              <Text className="text-gray-800 dark:text-white">Dólar</Text>
              <Text className="text-gray-800 dark:text-white">
                {formatCurrency(data.dollar.price)}
              </Text>
            </View>
          )}
        </>

        <>
          {loading ? (
            <Skeleton className="w-full h-4s" />
          ) : (
            <View className="flex-row justify-between">
              <Text className="text-gray-800 dark:text-white">Euro</Text>
              <Text className="text-gray-800 dark:text-white">
                {formatCurrency(data.euro.price)}
              </Text>
            </View>
          )}
        </>

        <>
          {loading ? (
            <Skeleton className="w-full h-4s" />
          ) : (
            <View className="flex-row justify-between">
              <Text className="text-gray-800 dark:text-white">Bitcoin</Text>
              <Text className="text-gray-800 dark:text-white">
                {formatCurrency(data.bitcoin.price)}
              </Text>
            </View>
          )}
        </>

        <>
          {loading ? (
            <Skeleton className="w-full h-4s" />
          ) : (
            <View className="flex-row justify-between">
              <Text className="text-gray-800 dark:text-white">Bovespa</Text>
              <Text className="text-gray-800 dark:text-white">
                {formatCurrency(data.bovespa.price)}
              </Text>
            </View>
          )}
        </>
      </View>
    </View>
  );
};

export default Quotes;
