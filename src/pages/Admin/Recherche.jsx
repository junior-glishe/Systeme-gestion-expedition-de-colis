import { useState } from "react";
import { Search } from "lucide-react";
import { rechercheService } from "@/services/recherche.service";

export default function Recherche() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const doSearch = async (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    setLoading(true);
    try {
      const d = await rechercheService.colis(q.trim());
      setResults(Array.isArray(d) ? d : d?.data ?? []);
    } catch { setResults([]); } finally { setLoading(false); }
  };
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold font-display">Recherche de colis</h1>
        <p className="text-sm text-[#64748b]">Trouvez rapidement un colis par sa référence.</p>
      </header>
      <form onSubmit={doSearch} className="flex gap-3 max-w-xl">
        <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-lg px-3">
          <Search className="w-4 h-4 text-gray-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} maxLength={120}
            placeholder="Ex: COL-2024-001" className="flex-1 px-3 py-2.5 outline-none" />
        </div>
        <button className="px-5 py-2.5 bg-[#ff7a30] text-white rounded-lg font-medium hover:bg-[#ff5a0a]">
          Rechercher
        </button>
      </form>
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        {loading ? "Recherche…" : results.length === 0 ? <p className="text-gray-400">Aucun résultat</p> : (
          <ul className="divide-y divide-gray-100">
            {results.map((c) => (
              <li key={c.id} className="py-3 flex justify-between">
                <span className="font-medium">{c.reference}</span>
                <span className="text-sm text-[#64748b]">{c.statut}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
