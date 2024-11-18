import axios from "axios";
import { API_URL } from "./base";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const login = (data: LoginData) => {
  return axios.post(`${API_URL}/api/auth/signin`, data);
};

export const register = (data: RegisterData) => {
  return axios.post(`${API_URL}/api/auth/signup`, data);
};
