import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Check } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#f4f6f8] font-['Inter',sans-serif]">
      {/* ====== PARTIE GAUCHE ====== */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center bg-gradient-to-br from-[#0b1424] via-[#0f172a] to-[#1a253a] overflow-hidden">
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

        {/* Cercles flottants (flou bien présent mais opacité réduite) */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#ff7a30] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.15] animate-pulse" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#0ea5a4] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.15] animate-pulse delay-1000" />

        {/* Ligne de route plus dynamique */}
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

        {/* Animation Lottie remontée */}
        <div className="relative z-20 w-[70%] max-w-[40rem] -mt-[8%] drop-shadow-2xl">
          <DotLottieReact
            src="https://lottie.host/da2b453f-477a-4374-8012-d935fbe38013/BC31w6BuHW.lottie"
            loop
            autoplay
            className="w-full h-auto"
          />
        </div>

        {/* Texte en bas avec dégradé et léger flou */}
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

      {/* ====== PARTIE DROITE ====== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-[32rem]">
          {/* En-tête */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#0f172a] font-['Space_Grotesk',sans-serif] tracking-tight">
              Connexion
            </h2>
            <p className="mt-1.5 text-[#64748b]">Accédez à votre espace de gestion</p>
          </div>

          <form className="space-y-6">
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

            {/* Mot de passe (sans lien oublié) */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#334155] mb-1.5">
                Mot de passe
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8] group-focus-within:text-[#ff7a30] transition-colors" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-white/90 border border-[#e2e8f0] rounded-xl text-base outline-none transition-all duration-200 focus:ring-2 focus:ring-[#ff7a30]/40 focus:border-[#ff7a30] hover:border-[#cbd5e1] placeholder:text-[#94a3b8]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#334155] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
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

            {/* Bouton Connexion */}
            <button
              type="submit"
              className="group w-full bg-gradient-to-r from-[#0f172a] to-[#1c2942] hover:from-[#1c2942] hover:to-[#2a3a5a] text-white font-semibold py-4 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-[#0f172a]/20 hover:shadow-xl hover:shadow-[#0f172a]/30 flex items-center justify-center gap-2 text-base overflow-hidden relative"
            >
              <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              Se connecter
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Séparateur */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-[#e2e8f0]" />
              <span className="flex-shrink mx-4 text-xs text-[#94a3b8] uppercase tracking-wider">ou</span>
              <div className="flex-grow border-t border-[#e2e8f0]" />
            </div>

            {/* Bouton Google (avec le vrai SVG) */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#cbd5e1] rounded-xl py-4 px-4 text-base font-medium text-[#334155] transition-all duration-200 hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Se connecter avec Google
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#94a3b8]">
            Pas encore de compte ?{" "}
            <span className="text-[#0f172a] font-medium cursor-pointer hover:underline transition">
              Contactez votre administrateur
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}