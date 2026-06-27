import { http } from "./api";
const BASE = "/agent/colis";
export const colisService = {
  list: (params) => http.get(BASE, params),
  get: (id) => http.get(`${BASE}/${id}`),
  create: (data) => http.post(BASE, data),
  update: (id, data) => http.put(`${BASE}/${id}`, data),
  remove: (id) => http.delete(`${BASE}/${id}`),
};
