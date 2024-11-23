import { Redirect } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import "../global.css";

export default function Index() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/auth/login" />;
  }

  return <Redirect href={`/${user.role}/dashboard`} />;
}
