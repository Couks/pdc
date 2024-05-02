import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLogedIn, setIsLogedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLogedIn, setIsLogedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
