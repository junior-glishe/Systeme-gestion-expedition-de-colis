import { useEffect, useState } from "react";
import { expeditionsService } from "@/services/expeditions.service";
import { formatDate, formatMoney } from "@/utils/format";

export default function Historique() {
  const [items, setItems] = useState([]);
  useEffect(() => { expeditionsService.list({ historique: 1 }).then((d) => setItems(d?.data ?? d ?? [])).catch(() => {}); }, []);
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold font-display">Historique des expéditions</h1>
        <p className="text-sm text-[#64748b]">Expéditions terminées et clôturées.</p>
      </header>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-[#64748b]">
            <tr>
              <th className="px-4 py-3">Référence</th><th className="px-4 py-3">Trajet</th>
              <th className="px-4 py-3">Départ</th><th className="px-4 py-3">Arrivée</th>
              <th className="px-4 py-3">Coût</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan={5} className="text-center py-10 text-gray-400">Aucun historique</td></tr>}
            {items.map((e) => (
              <tr key={e.id} className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium">{e.reference}</td>
                <td className="px-4 py-3">{e.trajet?.villeDepart} → {e.trajet?.villeArrivee}</td>
                <td className="px-4 py-3">{formatDate(e.dateDepart)}</td>
                <td className="px-4 py-3">{formatDate(e.dateArriveeReelle)}</td>
                <td className="px-4 py-3">{formatMoney(e.coutTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
