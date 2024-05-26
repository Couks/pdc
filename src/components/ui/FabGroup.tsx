import { CreateTransaction } from "@/app/screens/transactions/CreateTransaction";
import { router, useNavigation } from "expo-router";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { FAB, Portal } from "react-native-paper";

export function FabGroup({ navigation }: { navigation: any }) {
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: any) => setState({ open });
  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        color="white"
        style={{
          bottom: 75,
          borderRadius: 50,
        }}
        icon={open ? "camera" : "plus"}
        actions={[
          {
            icon: "plus",
            label: "Adicionar Transação",
            onPress: () => navigation.navigate("CreateTransaction"),
          },

          {
            icon: "bell",
            label: "Remind",
            onPress: () => navigation.navigate("TransactionScreen"),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do {something} if{ the speed dial is open}
          }
        }}
      />
    </Portal>
  );
}
