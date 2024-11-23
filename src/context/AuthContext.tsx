import { createContext, useContext, useState, useEffect } from "react";
import { router } from "expo-router";
import { User, LoginCredentials } from "@/types/auth.types";
import { authService, api } from "@/services/api";
import axios from "axios";

// Interface que define o formato do contexto de autenticação
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
}

// Criação do contexto de autenticação
const AuthContext = createContext<AuthContextType | null>(null);

// Provedor de autenticação
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      console.error("Erro ao verificar autenticação:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função de login
  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      console.log("Tentando login com:", credentials);
      console.log("URL da API:", api.defaults.baseURL);

      const { user: loggedUser, token } = await authService.login(credentials);
      console.log("Login bem sucedido:", loggedUser);

      setUser(loggedUser);
      setIsAuthenticated(true);

      router.replace(`/${loggedUser.role}` as any);
    } catch (error) {
      console.error("Erro detalhado:", error);
      if (axios.isAxiosError(error)) {
        console.error("Erro de rede:", error.message);
        console.error("Configuração:", error.config);
        console.error("Resposta:", error.response);
      }
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
      router.replace("/auth");
    } catch (error) {
      console.error("Erro no logout:", error);
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
