import Routes from "@/routes/route";
import { AuthProvider } from "@/services/AuthContext";
import "@/styles/global.css";
import { StatusBar } from "expo-status-bar";

import { useColorScheme } from "nativewind";

export default function App() {
  const { colorScheme } = useColorScheme();
  return <Routes />;
}
