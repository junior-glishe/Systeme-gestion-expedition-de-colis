import { http } from "./api";
// Le backend n'a pas de route dédiée /chauffeurs : on filtre depuis /admin/utilisateurs.
export const chauffeursService = {
  list: async (params) => {
    const data = await http.get("/admin/utilisateurs", params);
    const items = Array.isArray(data) ? data : data?.data ?? [];
    return items.filter((u) => u?.role === "CHAUFFEUR");
  },
  get: (id) => http.get(`/admin/utilisateurs/${id}`),
  create: (data) => http.post("/admin/utilisateurs", { ...data, role: "CHAUFFEUR" }),
  update: (id, data) => http.put(`/admin/utilisateurs/${id}`, data),
  remove: (id) => http.delete(`/admin/utilisateurs/${id}`),
};
