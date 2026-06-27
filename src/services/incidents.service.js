import { http } from "./api";
export const incidentsService = {
  list: async () => [],
  get: async () => null,
  create: (data) => http.post("/chauffeur/incidents", data),
  update: async () => null,
  remove: async () => null,
};
