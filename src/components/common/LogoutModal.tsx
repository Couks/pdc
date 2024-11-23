import { View, Text, Modal } from "react-native";
import { Button } from "./Button";

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function LogoutModal({ visible, onClose, onLogout }: LogoutModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 bg-black/60 dark:bg-black/80 justify-end">
        <View className="bg-card dark:bg-card rounded-t-3xl p-6">
          <Text className="text-center text-lg font-medium text-card-foreground dark:text-card-foreground mb-2">
            Sair
          </Text>
          <Text className="text-center text-muted-foreground dark:text-muted-foreground mb-6">
            Tem certeza que deseja sair?
          </Text>
          <View className="flex-row gap-4">
            <Button
              variant="ghost"
              className="flex-1"
              label="Cancelar"
              onPress={onClose}
            />
            <Button
              variant="destructive"
              className="flex-1"
              label="Sim, Sair"
              onPress={onLogout}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
