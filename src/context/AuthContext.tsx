import { createContext, useContext, useState, useEffect } from "react";
import { router } from "expo-router";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "@/types/auth.types";
import { Doctor } from "@/types/doctor.types";
import { Patient } from "@/types/patient.types";
import { authService, api } from "@/services/api";
import axios from "axios";

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
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const { user: loggedUser, token } = await authService.login(credentials);
      setUser(loggedUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro detalhado:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true);
      const { user: registeredUser, token } = await authService.register(
        credentials
      );
      setUser(registeredUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro no registro:", error);
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
