import { router } from "expo-router";
import { useState } from "react";
import { FAB, Portal } from "react-native-paper";

export function FabGroup() {
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
          bottom: 1,
          borderRadius: 50,
        }}
        icon={open ? "camera" : "plus"}
        actions={[
          {
            icon: "plus",
            label: "Adicionar Transação",
            onPress: () =>
              router.push("/screens/transactions/CreateTransaction"),
          },

          {
            icon: "bell",
            label: "Remind",
            onPress: () => router.navigate("TransactionScreen"),
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
