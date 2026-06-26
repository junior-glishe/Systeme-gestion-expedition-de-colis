// Wrappers sécurisés autour de localStorage avec namespace TrackPulse.
const PREFIX = "tp_";
export const storage = {
  get(key) {
    try { const v = localStorage.getItem(PREFIX + key); return v ? JSON.parse(v) : null; }
    catch { return null; }
  },
  set(key, value) { try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch {} },
  remove(key) { try { localStorage.removeItem(PREFIX + key); } catch {} },
  clear() {
    Object.keys(localStorage).filter(k => k.startsWith(PREFIX)).forEach(k => localStorage.removeItem(k));
  },
};
