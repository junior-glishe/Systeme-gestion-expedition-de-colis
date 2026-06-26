import { http } from "./api";
export const colisChauffeurService = {
  affectes: () => http.get("/chauffeur/colis"),
  marquerStatut: (id, statut) => http.patch(`/chauffeur/colis/${id}/statut`, { statut }),
  mesTrajets: () => http.get("/chauffeur/trajets"),
  signalerIncident: (data) => http.post("/chauffeur/incidents", data),
};
