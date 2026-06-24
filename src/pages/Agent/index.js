import Dashboard from "./Dashboard";
import Clients from "./Clients";
import Colis from "./Colis";
import Expeditions from "./Expeditions";
import Paiements from "./Paiements";
import Recherche from "./Recherche";
import Historique from "./Historique";

export const agentRoutes = [
  { path: "dashboard", element: Dashboard },
  { path: "clients", element: Clients },
  { path: "colis", element: Colis },
  { path: "expeditions", element: Expeditions },
  { path: "paiements", element: Paiements },
  { path: "recherche", element: Recherche },
  { path: "historique", element: Historique },
];
