import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Mail, Lock, ArrowRight, Eye, EyeOff, User, Check } from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#f4f6f8] font-['Inter',sans-serif]">
      {/* ====== PARTIE GAUCHE (FORMULAIRE) ====== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 lg:px-12 order-2 lg:order-1">
        <div className="w-full max-w-[32rem]">
          {/* En-tête */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#0f172a] font-['Space_Grotesk',sans-serif] tracking-tight">
              Demande d'inscription
            </h2>
            <p className="mt-1.5 text-[#64748b]">Complétez ce formulaire pour demander l'ouverture d'une agence. Après vérification, un administrateur validera votre demande.</p>
          </div>

          <form className="space-y-6">
            {/* Nom */}
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-[#334155] mb-1.5">
                Nom
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8] group-focus-within:text-[#ff7a30] transition-colors" />
                <input
                  id="nom"
                  type="text"
                  placeholder="Dupont"
                  className="w-full pl-12 pr-4 py-4 bg-white/90 border border-[#e2e8f0] rounded-xl text-base outline-none transition-all duration-200 focus:ring-2 focus:ring-[#ff7a30]/40 focus:border-[#ff7a30] hover:border-[#cbd5e1] placeholder:text-[#94a3b8]"
                />
              </div>
            </div>

            {/* Prénom */}
            <div>
              <label htmlFor="prenom" className="block text-sm font-medium text-[#334155] mb-1.5">
                Prénom
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8] group-focus-within:text-[#ff7a30] transition-colors" />
                <input
                  id="prenom"
                  type="text"
                  placeholder="Jean"
                  className="w-full pl-12 pr-4 py-4 bg-white/90 border border-[#e2e8f0] rounded-xl text-base outline-none transition-all duration-200 focus:ring-2 focus:ring-[#ff7a30]/40 focus:border-[#ff7a30] hover:border-[#cbd5e1] placeholder:text-[#94a3b8]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#334155] mb-1.5">
                Adresse email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8] group-focus-within:text-[#ff7a30] transition-colors" />
                <input
                  id="email"
                  type="email"
                  placeholder="exemple@email.com"
                  className="w-full pl-12 pr-4 py-4 bg-white/90 border border-[#e2e8f0] rounded-xl text-base outline-none transition-all duration-200 focus:ring-2 focus:ring-[#ff7a30]/40 focus:border-[#ff7a30] hover:border-[#cbd5e1] placeholder:text-[#94a3b8]"
                />
              </div>
            </div>

          
            {/* Se souvenir de moi */}
            <div className="flex items-center">
              <label className="flex items-center space-x-2 text-sm text-[#64748b] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="hidden"
                />
                <span
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                    rememberMe
                      ? "bg-[#ff7a30] border-[#ff7a30] shadow-sm shadow-[#ff7a30]/20"
                      : "border-[#cbd5e1] bg-white"
                  }`}
                >
                  {rememberMe && <Check className="w-3.5 h-3.5 text-white" />}
                </span>
                <span>Se souvenir de moi</span>
              </label>
            </div>

            {/* Bouton Envoyer */}
            <button
              type="submit"
              className="group w-full bg-gradient-to-r from-[#0f172a] to-[#1c2942] hover:from-[#1c2942] hover:to-[#2a3a5a] text-white font-semibold py-4 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-[#0f172a]/20 hover:shadow-xl hover:shadow-[#0f172a]/30 flex items-center justify-center gap-2 text-base overflow-hidden relative"
            >
              <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              Envoyer
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Séparateur */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-[#e2e8f0]" />
              <span className="flex-shrink mx-4 text-xs text-[#94a3b8] uppercase tracking-wider">ou</span>
              <div className="flex-grow border-t border-[#e2e8f0]" />
            </div>

            
          </form>

          <p className="mt-8 text-center text-sm text-[#94a3b8]">
            Déjà un compte ?{" "}
            <span className="text-[#0f172a] font-medium cursor-pointer hover:underline transition">
              Connectez-vous
            </span>
          </p>
        </div>
      </div>

      {/* ====== PARTIE DROITE (ANIMATION) ====== */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center bg-gradient-to-br from-[#0b1424] via-[#0f172a] to-[#1a253a] overflow-hidden order-1 lg:order-2">
        {/* Grille décorative légère */}
        <div className="absolute inset-0 opacity-[0.06]">
          <svg className="w-full h-full" viewBox="0 0 800 800" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Cercles flottants */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#ff7a30] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.15] animate-pulse" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#0ea5a4] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.15] animate-pulse delay-1000" />

        {/* Ligne de route dynamique */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          viewBox="0 0 600 800"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M -50 700 C 150 600, 100 300, 350 250 S 600 100, 750 0"
            stroke="#ff7a30"
            strokeWidth="2.5"
            strokeDasharray="8 10"
          />
          <circle cx="-50" cy="700" r="7" fill="#ff7a30" className="animate-pulse" />
          <circle cx="750" cy="0" r="7" fill="#0ea5a4" className="animate-pulse delay-700" />
        </svg>

        {/* Animation Lottie */}
        <div className="relative z-20 w-[70%] max-w-[40rem] -mt-[8%] drop-shadow-2xl">
          <DotLottieReact
            src="https://lottie.host/da2b453f-477a-4374-8012-d935fbe38013/BC31w6BuHW.lottie"
            loop
            autoplay
            className="w-full h-auto"
          />
        </div>

        {/* Texte en bas */}
        <div className="absolute bottom-0 left-0 p-[3.5rem] z-10 w-full bg-gradient-to-r from-[#0f172a]/80 to-transparent backdrop-blur-[2px]">
          <span className="inline-block text-[0.7rem] font-semibold tracking-[0.25em] text-[#ff7a30] uppercase mb-2 border-b border-[#ff7a30]/30 pb-1">
            Suivi &amp; Logistique
          </span>
          <h1 className="text-[2.5rem] font-bold leading-[1.1] text-white mb-3 font-['Space_Grotesk',sans-serif]">
            Gérez vos expéditions
            <br />en toute simplicité.
          </h1>
          <p className="text-[1rem] text-[#cbd5e1] max-w-[28rem]">
            Suivez vos colis, vos transporteurs et vos livraisons en temps réel.
          </p>
        </div>
      </div>
    </div>
  );
}