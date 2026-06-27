// Helpers partagés pour calculer le préfixe d'URL selon le rôle courant.
import { storage } from "@/utils/storage";

export function currentRole() {
  const user = storage.get("user");
  return user?.role || null; // 'ADMIN' | 'AGENT' | 'CHAUFFEUR'
}

// Pour les ressources accessibles par ADMIN et AGENT (ex: clients, colis, expeditions)
// le backend ne les expose que sous /agent/*. On force /agent/* dans les deux cas.
export function agentScope(path) {
  return `/agent/${path}`;
}

export function adminScope(path) {
  return `/admin/${path}`;
}
