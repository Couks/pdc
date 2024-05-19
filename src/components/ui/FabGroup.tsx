import { colorScheme } from "nativewind";
import * as React from "react";
import { FAB, Portal } from "react-native-paper";

export default function FabGroup() {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        color={colorScheme === "dark" ? "#052224" : "#00D09E"}
        style={{
          bottom: 75,
          borderRadius: 50,
        }}
        icon={open ? "camera" : "plus"}
        actions={[
          {
            icon: "plus",
            label: "Adicionar Transação",

            onPress: () => console.log("Pressed add"),
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
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  );
}
