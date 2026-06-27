import { http } from "./api";
export const rechercheService = {
  colis: (q) => http.get("/agent/recherche", { q }),
  historique: () => http.get("/agent/historique"),
};
