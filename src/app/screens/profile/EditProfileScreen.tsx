import { Text, View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { Button } from "@/components/Button";

type EditProfileProps = {
  image: any;
  name: string;
  nickname: string;
  onUpdateProfile: (
    newUsername: string,
    newEmail: string,
    newNickname: string
  ) => void;
};

export default function EditProfileScreen({
  image,
  name,
  nickname,
  onUpdateProfile,
}: EditProfileProps) {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: { newUsername: string; newEmail: string }) => {
    onUpdateProfile(data.newUsername, data.newEmail);
  };

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <View className="items-center">
        <Avatar className="size-32 border-4 border-purple-800 mt-4">
          <AvatarImage source={image} />
          <AvatarFallback>RG</AvatarFallback>
        </Avatar>
        <View>
          <Text>Edit Profile</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                placeholder="Username"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="newUsername"
            defaultValue={username}
          />
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="newEmail"
            defaultValue={email}
          />
          <Button title="Update Profile" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </View>
  );
}
