import { useAuth } from "@/hooks/auth/AuthContext";
import { PatientTabRoutes } from "./tab-routes/patienttab.routes";
import { ProfessionalTabRoutes } from "./tab-routes/professionaltab.routes";
import { AdminTabRoutes } from "./tab-routes/admintab.routes";
import StackRoutes from "./stack.routes";
import { NavigationContainer } from "@react-navigation/native";

export default function Routes() {
  const { authState } = useAuth();

  return (
    <NavigationContainer independent>
      {true ? (
        authState?.userType === "Administrador" ? (
          <PatientTabRoutes />
        ) : authState?.userType === "Paciente" ? (
          <ProfessionalTabRoutes />
        ) : authState?.userType === "Medico" ? (
          <AdminTabRoutes />
        ) : null
      ) : (
        <StackRoutes />
      )}
    </NavigationContainer>
  );
}
