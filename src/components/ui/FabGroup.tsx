import { useColorScheme } from "nativewind";
import * as React from "react";
import { FAB, Portal } from "react-native-paper";

export function FabGroup({ navigation }: { navigation: any }) {
  const { colorScheme } = useColorScheme();

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        color={colorScheme === "light" ? "#052224" : "#00D09E"}
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
            onPress: () => console.log("Pressed notifications"),
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
