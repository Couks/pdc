import { Switch as NativeSwitch, useColorScheme } from "react-native";

import { darkTheme, lightTheme } from "@/styles/theme";

function Switch({
  ...props
}: React.ComponentPropsWithoutRef<typeof NativeSwitch>) {
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === "dark" ? darkTheme : lightTheme;

  const trackColor = props.trackColor || {
    false: currentTheme.background,
    true: currentTheme.foreground,
  };
  const thumbColor = props.thumbColor || currentTheme.background;
  const ios_backgroundColor =
    props.ios_backgroundColor || currentTheme.background;

  return (
    <NativeSwitch
      trackColor={trackColor}
      thumbColor={thumbColor}
      ios_backgroundColor={ios_backgroundColor}
      {...props}
    />
  );
}

export { Switch };
