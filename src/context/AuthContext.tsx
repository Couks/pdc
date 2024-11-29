import { createContext, useContext, useState, useEffect } from "react";
import { router } from "expo-router";

import { authService } from "@/services/api";
import {
  Doctor,
  Patient,
  LoginCredentials,
  RegisterCredentials,
} from "@/types";

type User = Doctor | Patient;

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        router.replace("/auth/login");
      }
    } catch (error) {
      router.replace("/auth/login");
      console.error("Erro ao verificar autenticação:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    if (!credentials.password) {
      throw new Error("Senha é obrigatória");
    }

    try {
      setIsLoading(true);
      const { user: loggedUser, token } = await authService.login(credentials);
      setUser(loggedUser as User);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro detalhado:", error);
      router.replace("/auth/login");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    if (!credentials.password) {
      throw new Error("Senha é obrigatória");
    }

    try {
      setIsLoading(true);
      const { user: registeredUser, token } = await authService.register(
        credentials
      );
      setUser(registeredUser as User);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro no registro:", error);
      router.replace("/auth/login");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
