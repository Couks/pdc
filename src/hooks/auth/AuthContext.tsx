import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useState, useContext, useEffect } from "react";

// const API_URL_AUTH = "https://actively-settling-rodent.ngrok-free.app/api/auth";
// export const API_URL = "https://actively-settling-rodent.ngrok-free.app/api";

const API_URL_AUTH = "http://localhost:3001/api/auth";
export const API_URL = "http://localhost:3001/api";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (
    email: string,
    password: string,
    apelido: string,
    firstName: string,
    lastName: string,
    DDDtelefone: string
  ) => Promise<any>;
  onLogin?: (DDDtelefone: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "default";

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({ token: null, authenticated: null });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated: false,
        });
      }
    };
    loadToken();
  }, []);

  const register = async (
    email: string,
    password: string,
    apelido: string,
    firstName: string,
    lastName: string,
    DDDtelefone: string
  ) => {
    if (
      !email ||
      !password ||
      !apelido ||
      !firstName ||
      !lastName ||
      !DDDtelefone
    ) {
      throw new Error("Preencha todos os campos para se cadastrar");
    }

    try {
      const response = await axios.post(
        `${API_URL_AUTH}/cadastrar`,
        {
          email,
          password,
          apelido,
          firstName,
          lastName,
          DDDtelefone,
        },
        { timeout: 2000 }
      );

      if (!response || !response.data) {
        throw new Error("O server não retornou nenhum dado.");
      }

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response;
        const status = errorResponse?.status || 0;
        const serverMsg =
          errorResponse?.data?.msg || errorResponse?.statusText || "";
        const errorMsg = `Erro ${status}: ${serverMsg}`;

        return { error: true, msg: errorMsg };
      } else {
        throw error;
      }
    }
  };

  const login = async (DDDtelefone: string, password: string) => {
    try {
      const response = await axios.post(
        `${API_URL_AUTH}/logar`,
        {
          DDDtelefone,
          password,
        },
        { timeout: 2000 }
      );

      if (!response || !response.data) {
        throw new Error("O server não retornou nenhum dado.");
      }

      const token = response.data.access_token;

      if (!token) {
        throw new Error("O server não retornou nenhum token de acesso.");
      }

      await SecureStore.setItemAsync(TOKEN_KEY, token);
      setAuthState({ token, authenticated: true });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorResponse = error.response;
        const status = errorResponse?.status || 0;
        const serverMsg =
          errorResponse?.data?.msg || errorResponse?.statusText || "";
        const errorMsg = `Erro ${status}: ${serverMsg}`;
        return { error: true, msg: errorMsg };
      } else if (error instanceof Error) {
        return { error: true, msg: error.message };
      } else {
        throw error;
      }
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
