import { http } from "./api";
const BASE = "/admin/vehicules";
export const vehiculesService = {
  list: (params) => http.get(BASE, params),
  get: (id) => http.get(`${BASE}/${id}`),
  create: (data) => http.post(BASE, data),
  update: (id, data) => http.put(`${BASE}/${id}`, data),
  remove: (id) => http.delete(`${BASE}/${id}`),
};
