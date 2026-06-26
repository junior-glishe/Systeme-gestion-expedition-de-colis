import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { storage } from "@/utils/storage";
import { authService } from "@/services/auth.service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.get("user"));
  const [loading, setLoading] = useState(false);

  // Rafraîchit la session si un token est présent.
  useEffect(() => {
    const token = storage.get("token");
    if (token && !user) {
      authService.me().then((u) => { if (u) { setUser(u); storage.set("user", u); } }).catch(() => {});
    }
  }, []); // eslint-disable-line

  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await authService.login(credentials);
      setUser(data.user);
      return data;
    } finally { setLoading(false); }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    loading,
    isAuthenticated: !!user,
    role: user?.role ?? null,
    hasRole: (...roles) => !!user && roles.includes(user.role),
    login,
    logout,
    setUser,
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return ctx;
}

// Constantes des rôles (alignées sur le diagramme de classe).
export const ROLES = {
  ADMIN: "ADMIN",
  AGENT: "AGENT",
  CHAUFFEUR: "CHAUFFEUR",
};
