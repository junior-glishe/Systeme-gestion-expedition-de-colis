import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f6f8] p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#0f172a] font-display">404</h1>
        <p className="mt-3 text-[#64748b]">Page introuvable.</p>
        <Link to="/" className="inline-block mt-6 px-5 py-2.5 bg-[#ff7a30] text-white rounded-lg font-medium hover:bg-[#ff5a0a]">Retour à l'accueil</Link>
      </div>
    </div>
  );
}
