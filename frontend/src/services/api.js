import axios from "axios";
import { storage } from "@/utils/storage";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: false,
});

// Intercepteur requête : injecte le token JWT.
api.interceptors.request.use((config) => {
  const token = storage.get("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Intercepteur réponse : gère 401 (session expirée).
api.interceptors.response.use(
  (r) => r,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      storage.remove("token");
      storage.remove("user");
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Helper générique pour réduire le boilerplate dans les services.
export const http = {
  get: (url, params) => api.get(url, { params }).then((r) => r.data),
  post: (url, body) => api.post(url, body).then((r) => r.data),
  put: (url, body) => api.put(url, body).then((r) => r.data),
  patch: (url, body) => api.patch(url, body).then((r) => r.data),
  delete: (url) => api.delete(url).then((r) => r.data),
};
