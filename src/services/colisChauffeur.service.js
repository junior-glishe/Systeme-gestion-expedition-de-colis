import { http } from "./api";
export const colisChauffeurService = {
  affectes: () => http.get("/chauffeur/colis-affectes"),
  marquerStatut: (id, statut) => http.put(`/chauffeur/colis/${id}/statut`, { statut }),
  mesTrajets: () => http.get("/chauffeur/trajets"),
  signalerIncident: (data) => http.post("/chauffeur/incidents", data),
};
