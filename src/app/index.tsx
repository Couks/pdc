import Routes from "@/routes/route";
import "@/styles/global.css";
import { ToastProvider } from "@/components/ui/Toast";

export default function App() {
  return (
    <ToastProvider>
      <Routes />
    </ToastProvider>
  );
}
