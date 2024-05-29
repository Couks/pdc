import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface SelectInputProps {
  label?: string;
  options: { value: string; label: string }[];
  selectedValue?: string;
  onValueChange?: (value: string) => void;
}

const SelectInput = ({
  label,
  options,
  selectedValue,
  onValueChange,
}: SelectInputProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(
    options.find((option) => option.value === selectedValue)?.label
  );

  const handleOptionPress = (option) => {
    setSelectedLabel(option.label);
    onValueChange(option.value);
    setModalVisible(false);
  };

  return (
    <View className="items-center justify-center bg-green-200 rounded-2xl">
      <TouchableOpacity
        style={{
          width: "100%",
          flexDirection: "row",
          padding: 8,
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={() => setModalVisible(true)}
      >
        {selectedLabel == null ? (
          <Text className="text-gray-800 text-lg px-4">{label}</Text>
        ) : (
          <Text className="text-gray-800 text-lg px-4">{selectedLabel}</Text>
        )}
        <Ionicons name="chevron-down-outline" size={24} className="px-3" />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View className="flex-1 justify-center bg-black/70">
            <TouchableWithoutFeedback>
              <View className="m-8 bg-white rounded-2xl p-4 max-h-[50%]">
                <FlatList
                  data={options}
                  keyExtractor={(item) => item.value.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{ paddingVertical: 6 }}
                      onPress={() => handleOptionPress(item)}
                    >
                      <Text className="bg-gray-500/20 px-3 py-2 rounded-xl text-center text-xl">
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
