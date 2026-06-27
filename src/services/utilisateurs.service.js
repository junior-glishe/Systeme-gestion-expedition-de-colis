import { http } from "./api";
const BASE = "/admin/utilisateurs";
export const utilisateursService = {
  list: (params) => http.get(BASE, params),
  get: (id) => http.get(`${BASE}/${id}`),
  create: (data) => http.post(BASE, data),
  update: (id, data) => http.put(`${BASE}/${id}`, data),
  remove: (id) => http.delete(`${BASE}/${id}`),
};
