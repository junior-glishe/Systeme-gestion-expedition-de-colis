import { useAuth } from "@/contexts/AuthContext";
export default function Parametres() {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold font-display">Paramètres</h1>
        <p className="text-sm text-[#64748b]">Préférences de votre compte.</p>
      </header>
      <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-xl">
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between"><dt className="text-[#64748b]">Nom</dt><dd className="font-medium">{user?.nom}</dd></div>
          <div className="flex justify-between"><dt className="text-[#64748b]">Email</dt><dd className="font-medium">{user?.email}</dd></div>
          <div className="flex justify-between"><dt className="text-[#64748b]">Rôle</dt><dd className="font-medium">{user?.role}</dd></div>
        </dl>
      </div>
    </div>
  );
}
