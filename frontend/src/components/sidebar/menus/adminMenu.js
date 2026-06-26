import {
  LayoutDashboard, Users, Package, Truck, CreditCard, History, Search,
  User, Gauge, MapPin, Building, DollarSign, BarChart3, Bell, Settings,
} from "lucide-react";

export const adminMenu = [
  {
    label: "Principal",
    items: [
      { icon: LayoutDashboard, label: "Tableau de bord", path: "/admin/dashboard" },
      { icon: Package, label: "Colis", path: "/admin/colis" },
      { icon: Truck, label: "Expéditions", path: "/admin/expeditions" },
      { icon: History, label: "Historique", path: "/admin/historique" },
      { icon: Search, label: "Recherche", path: "/admin/recherche" },
    ],
  },
  {
    label: "Gestion",
    items: [
      { icon: Users, label: "Clients", path: "/admin/clients" },
      { icon: User, label: "Chauffeurs", path: "/admin/chauffeurs" },
      { icon: Gauge, label: "Véhicules", path: "/admin/vehicules" },
      { icon: MapPin, label: "Trajets", path: "/admin/trajets" },
      { icon: Building, label: "Agences", path: "/admin/agences" },
    ],
  },
  {
    label: "Finances & Rapports",
    items: [
      { icon: CreditCard, label: "Paiements", path: "/admin/paiements" },
      { icon: DollarSign, label: "Tarifs", path: "/admin/tarifs" },
      { icon: BarChart3, label: "Rapports", path: "/admin/rapports" },
    ],
  },
  {
    label: "Système",
    items: [
      { icon: Bell, label: "Notifications", path: "/admin/notifications" },
      { icon: Users, label: "Utilisateurs", path: "/admin/utilisateurs" },
      { icon: Settings, label: "Paramètres", path: "/admin/parametres" },
    ],
  },
];
