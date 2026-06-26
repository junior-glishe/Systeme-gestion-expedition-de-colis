import { useEffect, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { notificationsService } from "@/services/notifications.service";
import { formatDate } from "@/utils/format";

export default function Notifications() {
  const [items, setItems] = useState([]);
  useEffect(() => { notificationsService.list().then((d) => setItems(Array.isArray(d) ? d : d?.data ?? [])).catch(() => {}); }, []);
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display flex items-center gap-2"><Bell className="w-6 h-6 text-[#ff7a30]" /> Notifications</h1>
          <p className="text-sm text-[#64748b]">Centre de notifications système.</p>
        </div>
      </header>
      <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
        {items.length === 0 && <div className="p-10 text-center text-gray-400">Aucune notification</div>}
        {items.map((n) => (
          <div key={n.id} className="p-4 flex items-start gap-3">
            <div className={`w-2 h-2 mt-2 rounded-full ${n.lu ? "bg-gray-300" : "bg-[#ff7a30]"}`} />
            <div className="flex-1">
              <p className="text-sm text-[#0f172a]">{n.message}</p>
              <p className="text-xs text-[#64748b] mt-1">{formatDate(n.dateEnvoi)} · {n.type}</p>
            </div>
            {!n.lu && <CheckCheck className="w-4 h-4 text-gray-400" />}
          </div>
        ))}
      </div>
    </div>
  );
}
