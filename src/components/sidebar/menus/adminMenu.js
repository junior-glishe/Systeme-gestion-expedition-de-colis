import {
  LayoutDashboard,
  Users,
  Package,
  Truck,
  CreditCard,
  History,
  Search,
  User,
  Gauge,
  MapPin,
  Building,
  DollarSign,
  BarChart3,
  Bell,
  Settings,
} from "lucide-react";

export const adminMenu = [
  {
    label: "Principal",
    items: [
      { icon: LayoutDashboard, label: "Tableau de bord", path: "/dashboard" },
      { icon: Package, label: "Colis", path: "/colis" },
      { icon: Truck, label: "Expéditions", path: "/expeditions" },
      { icon: History, label: "Historique", path: "/historique" },
      { icon: Search, label: "Recherche", path: "/recherche" },
    ],
  },
  {
    label: "Gestion",
    items: [
      { icon: Users, label: "Clients", path: "/clients" },
      { icon: User, label: "Chauffeurs", path: "/chauffeurs" },
      { icon: Gauge, label: "Véhicules", path: "/vehicules" },
      { icon: MapPin, label: "Trajets", path: "/trajets" },
      { icon: Building, label: "Agences", path: "/agences" },
    ],
  },
  {
    label: "Finances & Rapports",
    items: [
      { icon: CreditCard, label: "Paiements", path: "/paiements" },
      { icon: DollarSign, label: "Tarifs", path: "/tarifs" },
      { icon: BarChart3, label: "Rapports", path: "/rapports" },
    ],
  },
  {
    label: "Système",
    items: [
      { icon: Bell, label: "Notifications", path: "/notifications" },
      { icon: Users, label: "Utilisateurs", path: "/utilisateurs" },
      { icon: Settings, label: "Paramètres", path: "/parametres" },
    ],
  },
];
