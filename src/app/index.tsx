import Routes from "@/routes/route";
import "@/assets/styles/global.css";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <StatusBar style="auto" translucent animated />
      <Routes />
    </>
  );
}
