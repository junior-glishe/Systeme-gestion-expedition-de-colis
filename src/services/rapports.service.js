import { http } from "./api";
export const rapportsService = {
  list: async () => [],
  create: (data) => http.post("/admin/rapports", data),
};
