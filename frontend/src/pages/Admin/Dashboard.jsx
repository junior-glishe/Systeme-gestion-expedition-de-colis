import { useEffect, useState } from "react";
import { Package, Truck, Users, DollarSign, AlertTriangle, TrendingUp, Calendar } from "lucide-react";
import { dashboardService } from "@/services/dashboard.service";
import { formatMoney } from "@/utils/format";

// Statistiques modernisées
const KPI = ({ icon: Icon, label, value, hint, color }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50 group">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 tracking-wide">{label}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-green-500" />
          {hint}
        </p>
      </div>
      <div className={`p-4 rounded-2xl ${color} shadow-lg shadow-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    colis: 0, expeditions: 0, clients: 0, revenus: 0, incidents: 0,
  });
  useEffect(() => { dashboardService.admin().then(setStats).catch(() => {}); }, []);

  return (
    <div className="space-y-6">
      {/* Header avec bienvenue - Design modernisé */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Tableau de bord</h1>
            <p className="text-blue-100 mt-1">Vue d'ensemble de l'activité logistique.</p>
          </div>
          <div className="flex items-center gap-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium">
              {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      {/* Statistiques modernisées - 4 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI 
          icon={Package} 
          label="Colis enregistrés" 
          value={stats.colis} 
          hint="+12%" 
          color="bg-gradient-to-br from-orange-500 to-orange-600" 
        />
        <KPI 
          icon={Truck} 
          label="Expéditions actives" 
          value={stats.expeditions} 
          hint="+5%" 
          color="bg-gradient-to-br from-emerald-500 to-emerald-600" 
        />
        <KPI 
          icon={Users} 
          label="Clients" 
          value={stats.clients} 
          hint="+8%" 
          color="bg-gradient-to-br from-indigo-500 to-indigo-600" 
        />
        <KPI 
          icon={DollarSign} 
          label="Revenus" 
          value={formatMoney(stats.revenus)} 
          hint="+15%" 
          color="bg-gradient-to-br from-emerald-500 to-emerald-600" 
        />
      </div>

      {/* Incidents et activité récente */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100/50">
          <h2 className="font-semibold text-lg text-gray-900 mb-4">Activité récente</h2>
          <p className="text-sm text-gray-400">Les indicateurs détaillés seront fournis par l'API Laravel.</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100/50">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h2 className="font-semibold text-lg text-gray-900">Incidents</h2>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.incidents}</p>
          <p className="text-sm text-gray-500 mt-1">incidents en cours</p>
        </div>
      </div>
    </div>
  );
}