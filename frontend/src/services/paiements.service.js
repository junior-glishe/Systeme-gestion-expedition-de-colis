import { http } from "./api";

const RESOURCE = "paiements";

export const paiementsService = {
  list: (params) => http.get(`/${RESOURCE}`, params),
  get: (id) => http.get(`/${RESOURCE}/${id}`),
  create: (data) => http.post(`/${RESOURCE}`, data),
  update: (id, data) => http.put(`/${RESOURCE}/${id}`, data),
  remove: (id) => http.delete(`/${RESOURCE}/${id}`),
};
