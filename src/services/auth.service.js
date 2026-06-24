import { http } from "./api";
import { storage } from "@/utils/storage";

export const authService = {
  async login({ email, motDePasse }) {
    // Le backend Laravel doit renvoyer { token, user: { id, nom, email, role } }
    const data = await http.post("/auth/login", { email, motDePasse });
    if (data?.token) storage.set("token", data.token);
    if (data?.user) storage.set("user", data.user);
    return data;
  },
  async register(payload) {
    return http.post("/auth/register", payload);
  },
  async logout() {
    try { await http.post("/auth/logout"); } catch {}
    storage.remove("token");
    storage.remove("user");
  },
  async me() { return http.get("/auth/me"); },
};
