import Header from "@/components/Header";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

type LayoutProps = {
  title: string;
};

export default function DashboardLayout({ title }: LayoutProps) {
  return (
    <>
      <StatusBar style="dark" />
      <Header title={title} />
      <Slot />
    </>
  );
}
