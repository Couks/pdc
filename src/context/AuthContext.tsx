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

// Provedor de autenticação
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Estado local do usuário
  const [user, setUser] = useState<User | null>(null);
  // Estado local de autenticação
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Estado local de carregamento
  const [isLoading, setIsLoading] = useState(true);

  // Efeito que verifica a autenticação ao inicializar
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
      const { user: loggedUser } = await authService.login(credentials);
      setUser(loggedUser);
      setIsAuthenticated(true);
      router.replace("/pages/home");
    } catch (error) {
      console.error("Falha no login:", error);
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
