import React, { createContext, useContext, useState, ReactNode } from "react";
import { login, register } from "../api/auth";

interface AuthContextProps {
  token: string | null;
  handleRegistration: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("sessionToken") || null
  );

  const handleRegistration = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const { data } = await register({ username, email, password });
      const sessionToken = data.sessionToken;
      setToken(sessionToken);
      localStorage.setItem("sessionToken", sessionToken);
    } catch (error) {
      alert("Registration failed.");
      throw error;
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data } = await login({ email, password });
      const sessionToken = data.sessionToken;
      setToken(sessionToken);
      localStorage.setItem("sessionToken", sessionToken);
    } catch (error) {
      alert("Login failed. Check your credentials.");
    }
  };
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("sessionToken");
  };

  return (
    <AuthContext.Provider
      value={{ token, handleRegistration, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
