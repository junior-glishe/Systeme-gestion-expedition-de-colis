import { http } from "./api";
export const paiementsService = {
  list: async () => [],
  get: async () => null,
  create: (data) => http.post("/agent/paiements", data),
  update: async () => null,
  remove: async () => null,
};
