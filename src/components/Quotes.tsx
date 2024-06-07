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

const Quotes = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
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
      setError(err);
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
    <View className="bg-gray-200 dark:bg-secondary-600 p-6 rounded-3xl">
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-800 dark:text-white text-xl">Cotações</Text>
        <TouchableOpacity onPress={fetchData}>
          {loading ? (
            <View></View>
          ) : (
            <Ionicons name="reload" size={18} color={colors.gray[400]} />
          )}
        </TouchableOpacity>
      </View>

      <Separator />
      <View className="gap-4">
        <>
          {loading ? (
            <Skeleton className="w-full" style={{ height: 12 }} />
          ) : (
            <View className="flex-row justify-between">
              <Text className="text-gray-800 dark:text-white">Dólar</Text>
              <Text className="text-gray-800 dark:text-white">
                R$ {data.dollar.price.toFixed(2)}
              </Text>
            </View>
          )}
        </>

        <>
          {loading ? (
            <Skeleton className="w-full" style={{ height: 12 }} />
          ) : (
            <View className="flex-row justify-between">
              <Text className="text-gray-800 dark:text-white">Euro</Text>
              <Text className="text-gray-800 dark:text-white">
                R$ {data.euro.price.toFixed(2)}
              </Text>
            </View>
          )}
        </>

        <>
          {loading ? (
            <Skeleton className="w-full" style={{ height: 12 }} />
          ) : (
            <View className="flex-row justify-between">
              <Text className="text-gray-800 dark:text-white">Bitcoin</Text>
              <Text className="text-gray-800 dark:text-white">
                R$ {data.bitcoin.price.toFixed(2)}
              </Text>
            </View>
          )}
        </>

        <>
          {loading ? (
            <Skeleton className="w-full" style={{ height: 12 }} />
          ) : (
            <View className="flex-row justify-between">
              <Text className="text-gray-800 dark:text-white">Bovespa</Text>
              <Text className="text-gray-800 dark:text-white">
                R$ {data.bovespa.price.toFixed(2)}
              </Text>
            </View>
          )}
        </>
      </View>
    </View>
  );
};

export default Quotes;
