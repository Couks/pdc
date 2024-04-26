import { View, Text } from "react-native";
import React from "react";

const Header = ({ props }: { props: any }) => {
  return (
    <View>
      <Text className="text-white text-2xl font-bold items-center justify-center">
        {props.name}
      </Text>
    </View>
  );
};

export default Header;
