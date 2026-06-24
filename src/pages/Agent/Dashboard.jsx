import { useEffect, useState } from "react";
import { Package, Truck, Users, CreditCard, Calendar, TrendingUp } from "lucide-react";
import { dashboardService } from "@/services/dashboard.service";

// Statistiques modernisées
const StatCard = ({ icon: Icon, title, value, color, subtitle, trend }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50 group cursor-pointer">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 tracking-wide">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value || 0}</p>
        {subtitle && (
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
            {trend && <TrendingUp className="w-3 h-3 text-green-500" />}
            {subtitle}
          </p>
        )}
      </div>
      <div className={`p-4 rounded-2xl ${color} shadow-lg shadow-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
    </div>
  </div>
);

export default function AgentDashboard() {
  const [stats, setStats] = useState({ colis: 0, expeditions: 0, clients: 0, paiements: 0 });
  
  useEffect(() => { 
    dashboardService.agent().then(setStats).catch(() => {}); 
  }, []);

  return (
    <div className="space-y-6">
      {/* Header avec bienvenue - Design modernisé */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Bonsoir, Agent</h1>
            <p className="text-blue-100 mt-1">Vos opérations du jour.</p>
          </div>
          <div className="flex items-center gap-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Statistiques modernisées - 4 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={Package} 
          title="Colis enregistrés" 
          value={stats.colis} 
          color="bg-gradient-to-br from-orange-500 to-orange-600"
          subtitle="Total des colis"
        />
        <StatCard 
          icon={Truck} 
          title="Expéditions créées" 
          value={stats.expeditions} 
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
          subtitle="En traitement"
          trend={true}
        />
        <StatCard 
          icon={Users} 
          title="Clients servis" 
          value={stats.clients} 
          color="bg-gradient-to-br from-indigo-500 to-indigo-600"
          subtitle="Ce mois"
        />
        <StatCard 
          icon={CreditCard} 
          title="Paiements encaissés" 
          value={`${stats.paiements} FCFA`} 
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
          subtitle="Aujourd'hui"
          trend={true}
        />
      </div>
    </div>
  );
}