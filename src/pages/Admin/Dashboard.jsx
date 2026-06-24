import { useEffect, useState } from "react";
import { Package, Truck, Users, DollarSign, AlertTriangle, TrendingUp } from "lucide-react";
import { dashboardService } from "@/services/dashboard.service";
import { formatMoney } from "@/utils/format";

const KPI = ({ icon: Icon, label, value, hint, color }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5">
    <div className="flex items-center justify-between">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <span className="text-xs text-emerald-600 inline-flex items-center gap-1"><TrendingUp className="w-3 h-3" />{hint}</span>
    </div>
    <p className="mt-4 text-sm text-[#64748b]">{label}</p>
    <p className="text-2xl font-bold text-[#0f172a] font-display">{value}</p>
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    colis: 0, expeditions: 0, clients: 0, revenus: 0, incidents: 0,
  });
  useEffect(() => { dashboardService.admin().then(setStats).catch(() => {}); }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-[#0f172a] font-display">Tableau de bord</h1>
        <p className="text-sm text-[#64748b] mt-1">Vue d'ensemble de l'activité logistique.</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI icon={Package} label="Colis enregistrés" value={stats.colis} hint="+12%" color="bg-[#ff7a30]" />
        <KPI icon={Truck} label="Expéditions actives" value={stats.expeditions} hint="+5%" color="bg-[#0ea5a4]" />
        <KPI icon={Users} label="Clients" value={stats.clients} hint="+8%" color="bg-[#6366f1]" />
        <KPI icon={DollarSign} label="Revenus" value={formatMoney(stats.revenus)} hint="+15%" color="bg-emerald-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-semibold text-[#0f172a] mb-4 font-display">Activité récente</h2>
          <p className="text-sm text-gray-400">Les indicateurs détaillés seront fournis par l'API Laravel.</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-semibold text-[#0f172a] mb-4 font-display flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> Incidents
          </h2>
          <p className="text-3xl font-bold text-[#0f172a]">{stats.incidents}</p>
          <p className="text-sm text-[#64748b] mt-1">incidents en cours</p>
        </div>
      </div>
    </div>
  );
}
