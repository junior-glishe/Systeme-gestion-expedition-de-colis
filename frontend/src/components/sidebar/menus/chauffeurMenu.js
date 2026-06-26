import { LayoutDashboard, Package, Truck, AlertTriangle } from "lucide-react";

export const chauffeurMenu = [
  {
    label: "Principal",
    items: [
      { icon: LayoutDashboard, label: "Tableau de bord", path: "/chauffeur/dashboard" },
      { icon: Package, label: "Mes colis", path: "/chauffeur/mes-colis" },
      { icon: Truck, label: "Mes trajets", path: "/chauffeur/mes-trajets" },
    ],
  },
  {
    label: "Activité",
    items: [
      { icon: AlertTriangle, label: "Signaler un incident", path: "/chauffeur/signaler-incident" },
    ],
  },
];
