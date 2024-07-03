import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

interface SelectInputProps {
  label?: string;
  options: { value: string; label: string }[];
  selectedValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

const SelectInput = ({
  label,
  options,
  selectedValue,
  onValueChange,
  disabled = false,
}: SelectInputProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(
    options.find((option) => option.value === selectedValue)?.label
  );

  useEffect(() => {
    setSelectedLabel(
      options.find((option) => option.value === selectedValue)?.label
    );
  }, [selectedValue, options]);

  const handleOptionPress = (option) => {
    setSelectedLabel(option.label);
    onValueChange(option.value);
    setModalVisible(false);
  };

  const { colorScheme } = useColorScheme();

  return (
    <View
      className={`items-center justify-center ${
        disabled
          ? "bg-gray-300 dark:bg-gray-600"
          : "bg-primary-200 dark:bg-secondary-500"
      } rounded-2xl`}
    >
      <TouchableOpacity
        style={{
          width: "100%",
          flexDirection: "row",
          padding: 8,
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={() => !disabled && setModalVisible(true)}
        disabled={disabled}
      >
        {selectedLabel == null ? (
          <Text
            className={`text-lg px-4 ${
              disabled
                ? "text-gray-500 dark:text-gray-400"
                : "text-gray-800 dark:text-white"
            }`}
          >
            {label}
          </Text>
        ) : (
          <Text
            className={`text-lg px-4 ${
              disabled
                ? "text-gray-500 dark:text-gray-400"
                : "text-gray-800 dark:text-white"
            }`}
          >
            {selectedLabel}
          </Text>
        )}
        <Ionicons
          name="chevron-down-outline"
          size={24}
          className="px-3"
          color={
            disabled
              ? colorScheme == "light"
                ? "gray"
                : "darkgray"
              : colorScheme == "light"
              ? "black"
              : "white"
          }
        />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View className="flex-1 justify-center bg-black/90">
            <TouchableWithoutFeedback>
              <View className="m-8 bg-white dark:bg-secondary-800 rounded-3xl p-4 max-h-[50%]">
                <FlatList
                  data={options}
                  keyExtractor={(item) => item.value.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{ paddingVertical: 6 }}
                      onPress={() => handleOptionPress(item)}
                    >
                      <Text className="bg-primary-200 dark:bg-secondary-500 px-3 py-2 rounded-3xl text-center dark:text-white text-xl">
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default SelectInput;
