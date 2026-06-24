import { useState } from "react";
import { BarChart3, Download } from "lucide-react";
import toast from "react-hot-toast";
import { rapportsService } from "@/services/rapports.service";

export default function Rapports() {
  const [form, setForm] = useState({ typeRapport: "EXPEDITIONS", periodeDebut: "", periodeFin: "", formatExport: "PDF" });

  const generate = async (e) => {
    e.preventDefault();
    try { await rapportsService.create(form); toast.success("Rapport en cours de génération"); }
    catch { toast.error("Impossible de générer le rapport"); }
  };
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold font-display flex items-center gap-2"><BarChart3 className="w-6 h-6 text-[#ff7a30]" /> Rapports</h1>
        <p className="text-sm text-[#64748b]">Génération et export des rapports d'activité.</p>
      </header>
      <form onSubmit={generate} className="bg-white border border-gray-200 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
        <div>
          <label className="block text-sm font-medium mb-1.5">Type de rapport</label>
          <select value={form.typeRapport} onChange={(e) => setForm({ ...form, typeRapport: e.target.value })}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg outline-none">
            <option value="EXPEDITIONS">Expéditions</option>
            <option value="PAIEMENTS">Paiements</option>
            <option value="INCIDENTS">Incidents</option>
            <option value="CHAUFFEURS">Chauffeurs</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Format</label>
          <select value={form.formatExport} onChange={(e) => setForm({ ...form, formatExport: e.target.value })}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg outline-none">
            <option>PDF</option><option>XLSX</option><option>CSV</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Période début</label>
          <input type="date" value={form.periodeDebut} onChange={(e) => setForm({ ...form, periodeDebut: e.target.value })}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg outline-none" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Période fin</label>
          <input type="date" value={form.periodeFin} onChange={(e) => setForm({ ...form, periodeFin: e.target.value })}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg outline-none" required />
        </div>
        <div className="md:col-span-2">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ff7a30] text-white rounded-lg font-medium hover:bg-[#ff5a0a]">
            <Download className="w-4 h-4" /> Générer
          </button>
        </div>
      </form>
    </div>
  );
}
