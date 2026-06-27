import { http } from "./api";
// Seul /admin/dashboard existe côté backend ; pour AGENT et CHAUFFEUR on agrège
// des données disponibles afin d'éviter des 404.
export const dashboardService = {
  admin: () => http.get("/admin/dashboard"),
  agent: async () => {
    try {
      const histo = await http.get("/agent/historique");
      const items = Array.isArray(histo) ? histo : histo?.data ?? [];
      return { historique: items, total: items.length };
    } catch { return { historique: [], total: 0 }; }
  },
  chauffeur: async () => {
    try {
      const colis = await http.get("/chauffeur/colis-affectes");
      const items = Array.isArray(colis) ? colis : colis?.data ?? [];
      return { colis: items, total: items.length };
    } catch { return { colis: [], total: 0 }; }
  },
};
