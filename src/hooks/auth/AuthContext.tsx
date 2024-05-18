import axios from "axios";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useState, useContext, useEffect } from "react";

const API_URL_AUTH = "https://actively-settling-rodent.ngrok-free.app/api/auth";
export const API_URL = "https://actively-settling-rodent.ngrok-free.app/api";

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
    try {
      const response = await axios.post(`${API_URL_AUTH}/cadastrar`, {
        email,
        password,
        apelido,
        firstName,
        lastName,
        DDDtelefone,
      });

      return response;
    } catch (error) {
      const errorResponse = axios.isAxiosError(error) ? error.response : null;
      const status = errorResponse?.status || 0;
      const serverMsg =
        errorResponse?.data?.msg || errorResponse?.statusText || "";
      const errorMsg = `Erro ${status}: ${serverMsg}`;

      return { error: true, msg: errorMsg };
    }
  };

  const login = async (DDDtelefone: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL_AUTH}/logar`, {
        DDDtelefone,
        password,
      });

      await SecureStore.setItemAsync(
        TOKEN_KEY,
        JSON.stringify(response.data.access_token)
      );

      setAuthState({
        token: response.data.access_token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;

      return response;
    } catch (error) {
      const errorResponse = axios.isAxiosError(error) ? error.response : null;
      const status = errorResponse?.status || 0;
      const serverMsg =
        errorResponse?.data?.msg || errorResponse?.statusText || "";
      const errorMsg = `Erro ${status}: ${serverMsg}`;
      console.log(errorResponse?.status);
      console.log(errorResponse?.statusText);
      console.log(errorResponse?.data);
      console.log(errorResponse?.headers);
      console.log(errorResponse?.request);

      return { error: true, msg: errorMsg };
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
