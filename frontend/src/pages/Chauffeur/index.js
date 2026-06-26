import Dashboard from "./Dashboard";
import MesColis from "./MesColis";
import MesTrajets from "./MesTrajets";
import SignalerIncident from "./SignalerIncident";

export const chauffeurRoutes = [
  { path: "dashboard", element: Dashboard, label: "Tableau de bord" },
  { path: "mes-colis", element: MesColis, label: "Mes colis" },
  { path: "mes-trajets", element: MesTrajets, label: "Mes trajets" },
  { path: "signaler-incident", element: SignalerIncident, label: "Signaler un incident" },
];

export { Dashboard, MesColis, MesTrajets, SignalerIncident };
