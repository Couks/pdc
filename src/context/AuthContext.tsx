import { createContext, useContext, useState, useEffect } from "react";
import { router } from "expo-router";
import { User, LoginCredentials } from "@/types/auth.types";
import { authService } from "@/services/api";

// Interface que define o formato do contexto de autenticação
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

// Criação do contexto de autenticação
const AuthContext = createContext<AuthContextType | null>(null);

// Mock do usuário inicial para desenvolvimento
const mockUser: User = {
  id: "d1",
  name: "Dr. João Silva",
  email: "joao.silva@medical.com",
  role: "doctor",
  phone: "+55 11 99999-9999",
  address: "Av. Paulista, 1000",
};

// Provedor de autenticação
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUser);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  // Função que verifica a autenticação
  const checkAuth = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Falha na verificação de autenticação:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função de login
  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);

      // Validação básica
      if (!credentials.email || !credentials.password || !credentials.role) {
        throw new Error("Todos os campos são obrigatórios");
      }

      const { user: loggedUser } = await authService.login(credentials);

      setUser(loggedUser);
      setIsAuthenticated(true);

      // Redireciona baseado no papel do usuário
      const route = loggedUser.role === "doctor" ? "/doctor" : "/patient";

      router.replace(route);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao realizar login";

      // Aqui você pode adicionar um toast/alert para mostrar o erro
      console.error("Falha no login:", message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de logout
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      router.replace("/auth/login");
    } catch (error) {
      console.error("Falha no logout:", error);
    }
  };

  // Retorna o provedor de autenticação
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
