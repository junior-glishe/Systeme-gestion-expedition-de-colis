import { http } from "./api";
export const dashboardService = {
  admin: () => http.get("/dashboard/admin"),
  agent: () => http.get("/dashboard/agent"),
  chauffeur: () => http.get("/dashboard/chauffeur"),
};
