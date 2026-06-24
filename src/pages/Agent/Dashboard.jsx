import { useEffect, useState } from "react";
import { Package, Truck, Users, CreditCard } from "lucide-react";
import { dashboardService } from "@/services/dashboard.service";

const KPI = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <p className="mt-4 text-sm text-[#64748b]">{label}</p>
    <p className="text-2xl font-bold text-[#0f172a] font-display">{value}</p>
  </div>
);

export default function AgentDashboard() {
  const [stats, setStats] = useState({ colis: 0, expeditions: 0, clients: 0, paiements: 0 });
  useEffect(() => { dashboardService.agent().then(setStats).catch(() => {}); }, []);
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold font-display">Tableau de bord — Agent</h1>
        <p className="text-sm text-[#64748b] mt-1">Vos opérations du jour.</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI icon={Package} label="Colis enregistrés" value={stats.colis} color="bg-[#ff7a30]" />
        <KPI icon={Truck} label="Expéditions créées" value={stats.expeditions} color="bg-[#0ea5a4]" />
        <KPI icon={Users} label="Clients servis" value={stats.clients} color="bg-[#6366f1]" />
        <KPI icon={CreditCard} label="Paiements encaissés" value={stats.paiements} color="bg-emerald-500" />
      </div>
    </div>
  );
}
