import Dashboard from "./Dashboard";
import Clients from "./Clients";
import Chauffeurs from "./Chauffeurs";
import Vehicules from "./Vehicules";
import Agences from "./Agences";
import Trajets from "./Trajets";
import Tarifs from "./Tarifs";
import Colis from "./Colis";
import Expeditions from "./Expeditions";
import Paiements from "./Paiements";
import Historique from "./Historique";
import Recherche from "./Recherche";
import Rapports from "./Rapports";
import Notifications from "./Notifications";
import Utilisateurs from "./Utilisateurs";
import Parametres from "./Parametres";

export const adminRoutes = [
  { path: "dashboard", element: Dashboard },
  { path: "colis", element: Colis },
  { path: "expeditions", element: Expeditions },
  { path: "historique", element: Historique },
  { path: "recherche", element: Recherche },
  { path: "clients", element: Clients },
  { path: "chauffeurs", element: Chauffeurs },
  { path: "vehicules", element: Vehicules },
  { path: "trajets", element: Trajets },
  { path: "agences", element: Agences },
  { path: "paiements", element: Paiements },
  { path: "tarifs", element: Tarifs },
  { path: "rapports", element: Rapports },
  { path: "notifications", element: Notifications },
  { path: "utilisateurs", element: Utilisateurs },
  { path: "parametres", element: Parametres },
];
