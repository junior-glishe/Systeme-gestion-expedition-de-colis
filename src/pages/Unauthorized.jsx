import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f6f8] p-6">
      <div className="text-center max-w-md">
        <ShieldAlert className="w-14 h-14 text-amber-500 mx-auto" />
        <h1 className="text-2xl font-bold text-[#0f172a] mt-3 font-display">Accès refusé</h1>
        <p className="mt-2 text-[#64748b]">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
        <Link to="/" className="inline-block mt-6 px-5 py-2.5 bg-[#ff7a30] text-white rounded-lg font-medium hover:bg-[#ff5a0a]">Retour</Link>
      </div>
    </div>
  );
}
