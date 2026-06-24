import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Search } from "lucide-react";
import toast from "react-hot-toast";
import { validate } from "@/schemas";

/**
 * Page CRUD générique réutilisable.
 * Props:
 *   title, subtitle, service (avec list/create/update/remove), schema (zod),
 *   columns: [{ key, label, render? }],
 *   fields:  [{ name, label, type?, options? }] pour le formulaire.
 */
export default function CrudPage({ title, subtitle, service, schema, columns, fields, idKey = "id" }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [query, setQuery] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await service.list();
      setItems(Array.isArray(data) ? data : data?.data ?? []);
    } catch (e) {
      // En mode démo sans backend on n'affiche pas d'erreur bloquante.
      setItems([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []); // eslint-disable-line

  const openCreate = () => { setEditing(null); setForm({}); setErrors({}); setOpen(true); };
  const openEdit = (item) => { setEditing(item); setForm({ ...item }); setErrors({}); setOpen(true); };

  const submit = async (e) => {
    e.preventDefault();
    const { ok, data, errors: errs } = validate(schema, form);
    if (!ok) { setErrors(errs); return; }
    try {
      if (editing) await service.update(editing[idKey], data);
      else await service.create(data);
      toast.success(editing ? "Enregistrement modifié" : "Enregistrement créé");
      setOpen(false);
      await load();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Erreur lors de la sauvegarde");
    }
  };

  const remove = async (item) => {
    if (!confirm("Confirmer la suppression ?")) return;
    try { await service.remove(item[idKey]); toast.success("Supprimé"); await load(); }
    catch (e) { toast.error(e?.response?.data?.message || "Erreur"); }
  };

  const filtered = items.filter((i) =>
    !query ? true : JSON.stringify(i).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a] font-display">{title}</h1>
          {subtitle && <p className="text-sm text-[#64748b] mt-1">{subtitle}</p>}
        </div>
        <button onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#ff7a30] text-white rounded-lg font-medium hover:bg-[#ff5a0a] shadow-md transition-colors">
          <Plus className="w-4 h-4" /> Ajouter
        </button>
      </header>

      <div className="bg-white border border-gray-200 rounded-xl">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <Search className="w-4 h-4 text-gray-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher…"
            className="flex-1 outline-none text-sm" maxLength={120} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-[#64748b]">
              <tr>
                {columns.map((c) => <th key={c.key} className="px-4 py-3 font-medium">{c.label}</th>)}
                <th className="px-4 py-3 font-medium w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={columns.length + 1} className="px-4 py-10 text-center text-gray-400">
                  <Loader2 className="w-5 h-5 animate-spin inline" /> Chargement…
                </td></tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={columns.length + 1} className="px-4 py-10 text-center text-gray-400">
                  Aucune donnée
                </td></tr>
              )}
              {!loading && filtered.map((item) => (
                <tr key={item[idKey]} className="border-t border-gray-100 hover:bg-gray-50">
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3 text-[#0f172a]">
                      {c.render ? c.render(item) : (item[c.key] ?? "—")}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(item)} className="p-2 text-gray-500 hover:text-[#ff7a30]">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => remove(item)} className="p-2 text-gray-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-lg font-display">
                {editing ? "Modifier" : "Ajouter"} — {title}
              </h2>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={submit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {fields.map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-[#334155] mb-1.5">{f.label}</label>
                  {f.type === "select" ? (
                    <select value={form[f.name] ?? ""} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#ff7a30]">
                      <option value="">—</option>
                      {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  ) : f.type === "textarea" ? (
                    <textarea value={form[f.name] ?? ""} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                      rows={3} maxLength={1000}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#ff7a30]" />
                  ) : (
                    <input type={f.type || "text"} value={form[f.name] ?? ""} maxLength={255}
                      onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#ff7a30]" />
                  )}
                  {errors[f.name] && <p className="text-xs text-red-600 mt-1">{errors[f.name]}</p>}
                </div>
              ))}
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">Annuler</button>
                <button type="submit"
                  className="px-4 py-2 rounded-lg bg-[#ff7a30] text-white hover:bg-[#ff5a0a] font-medium">
                  {editing ? "Enregistrer" : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
