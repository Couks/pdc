import axios from "axios";
import SecureStore from "expo-secure-store";
import React, { createContext, useState, useContext, useEffect } from "react";

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
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoibWF0aGV1c2Nhc3Ryb2tzQGdtYWlsLmNvbSIsInRlbGVmb25lIjoiMjE5NjUxODg5NTUiLCJpYXQiOjE3MTQ5MTg1MjAsImV4cCI6MTcxNDkxODUyMH0.H0Z6fm4K4FWIBnHtGzKEZAZxdq2C6hkk7iAL4E9Hfa4";
export const API_URL =
  "https://actively-settling-rodent.ngrok-free.app/api/auth/";

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
      return await axios.post(`${API_URL}/cadastrar`, {
        email,
        password,
        apelido,
        firstName,
        lastName,
        DDDtelefone,
      });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const login = async (
    email: string,
    password: string,
    DDDtelefone: string
  ) => {
    try {
      const result = await axios.post(`${API_URL}/logar`, {
        email,
        password,
        DDDtelefone,
      });

      console.log("", result);

      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
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
    onLogOut: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
