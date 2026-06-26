import {
  LayoutDashboard, Users, Package, Truck, CreditCard, History, Search,
} from "lucide-react";

export const agentMenu = [
  {
    label: "Principal",
    items: [
      { icon: LayoutDashboard, label: "Tableau de bord", path: "/agent/dashboard" },
      { icon: Users, label: "Clients", path: "/agent/clients" },
      { icon: Package, label: "Colis", path: "/agent/colis" },
      { icon: Truck, label: "Expéditions", path: "/agent/expeditions" },
    ],
  },
  {
    label: "Opérations",
    items: [
      { icon: CreditCard, label: "Paiements", path: "/agent/paiements" },
      { icon: Search, label: "Rechercher un colis", path: "/agent/recherche" },
      { icon: History, label: "Historique", path: "/agent/historique" },
    ],
  },
];
