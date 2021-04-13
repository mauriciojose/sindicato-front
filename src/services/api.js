import axios from "axios";
import { getToken } from "../pages/login/auth";

const api = axios.create({
  baseURL: `${window._env_.api}`
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;