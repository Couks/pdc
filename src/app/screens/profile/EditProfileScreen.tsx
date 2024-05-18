// import { Text, View } from "react-native";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
// import { Controller, useForm } from "react-hook-form";
// import { TextInput } from "react-native";
// import { Button } from "@/components/ui/Button";
// import { API_URL_AUTH } from "../../../../baseUrl";
// import axios from "axios";

// type EditProfileProps = {
//   image: any;
//   email: string;
//   nickname: string;
//   onUpdateProfile: (newEmail: string, newNickname: string) => Promisse<any>;
// };

// export default function EditProfileScreen({
//   image,
//   email,
//   nickname,
//   onUpdateProfile,
// }: EditProfileProps) {
//   const { control, handleSubmit } = useForm();

//   const onSubmit = (data: { newUsername: string; newEmail: string }) => {
//     onUpdateProfile(data.newEmail, data.newNickname);

//     try {
//       const response = await axios.put(`${API_URL_AUTH}/cadastrar`, {
//         email,
//         password,
//         apelido,
//         firstName,
//         lastName,
//         DDDtelefone,
//       });

//       return response;
//     } catch (error) {
//   };

//   return (
//     <View className="flex-1 bg-white items-center justify-center">
//       <View className="items-center">
//         <Avatar className="size-32 border-4 border-purple-800 mt-4">
//           <AvatarImage source={image} />
//           <AvatarFallback>RG</AvatarFallback>
//         </Avatar>
//         <View>
//           <Text>Edit Profile</Text>

//           <Controller
//             control={control}
//             render={({ onChange, onBlur, value }) => (
//               <TextInput
//                 placeholder="Digite seu novo e-mail"
//                 onBlur={onBlur}
//                 onChangeText={(value) => onChange(value)}
//                 value={value}
//               />
//             )}
//             name="newEmail"
//             defaultValue={email}
//           />

//           <Controller
//             control={control}
//             render={({ onChange, onBlur, value }) => (
//               <TextInput
//                 placeholder="Digite seu novo apelido"
//                 onBlur={onBlur}
//                 onChangeText={(value) => onChange(value)}
//                 value={value}
//               />
//             )}
//             name="newNickname"
//             defaultValue={email}
//           />

//           <Button title="Update Profile" onPress={handleSubmit(onSubmit)} />
//         </View>
//       </View>
//     </View>
//   );
// }
