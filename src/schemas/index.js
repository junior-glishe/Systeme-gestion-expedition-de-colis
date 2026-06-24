import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Email invalide").max(255),
  motDePasse: z.string().min(8, "Au moins 8 caractères").max(128),
});

export const registerSchema = z.object({
  nom: z.string().trim().min(2, "Nom requis").max(80),
  email: z.string().trim().email("Email invalide").max(255),
  motDePasse: z.string().min(8, "Au moins 8 caractères").max(128)
    .regex(/[A-Z]/, "1 majuscule requise")
    .regex(/[0-9]/, "1 chiffre requis"),
  role: z.enum(["ADMINISTRATEUR", "AGENTEXPEDITION", "CHAUFFEUR"]).default("AGENTEXPEDITION"),
});

export const clientSchema = z.object({
  nom: z.string().trim().min(2).max(80),
  prenom: z.string().trim().min(2).max(80),
  adresse: z.string().trim().min(2).max(200),
  ville: z.string().trim().min(2).max(80),
  telephone: z.string().trim().regex(/^[+0-9 ()-]{6,20}$/, "Téléphone invalide"),
  email: z.string().trim().email().max(255),
});

export const colisSchema = z.object({
  description: z.string().trim().min(2).max(500),
  poids: z.coerce.number().positive().max(10000),
  longueur: z.coerce.number().nonnegative().max(2000),
  hauteur: z.coerce.number().nonnegative().max(2000),
  valeurDeclaree: z.coerce.number().nonnegative().max(100_000_000),
  clientId: z.coerce.number().int().positive(),
});

export const expeditionSchema = z.object({
  clientId: z.coerce.number().int().positive(),
  trajetId: z.coerce.number().int().positive(),
  vehiculeId: z.coerce.number().int().positive(),
  chauffeurId: z.coerce.number().int().positive(),
  dateDepart: z.string().min(1, "Date requise"),
  dateArriveeEstimee: z.string().min(1, "Date requise"),
});

export const paiementSchema = z.object({
  expeditionId: z.coerce.number().int().positive(),
  montant: z.coerce.number().positive(),
  modePaiement: z.enum(["ESPECES", "MOBILE_MONEY", "VIREMENT", "CARTE"]),
});

export const incidentSchema = z.object({
  typeIncident: z.enum(["RETARD", "PANNE", "ACCIDENT", "COLIS_ENDOMMAGE", "AUTRE"]),
  description: z.string().trim().min(5).max(1000),
  expeditionId: z.coerce.number().int().positive().optional(),
});

export const trajetSchema = z.object({
  villeDepart: z.string().trim().min(2).max(80),
  villeArrivee: z.string().trim().min(2).max(80),
  distanceKm: z.coerce.number().positive(),
  dureeEstimeeH: z.coerce.number().positive(),
});

export const vehiculeSchema = z.object({
  immatriculation: z.string().trim().min(2).max(20),
  marque: z.string().trim().min(2).max(40),
  modele: z.string().trim().min(1).max(40),
  capaciteKg: z.coerce.number().positive(),
  statut: z.enum(["DISPONIBLE", "EN_MISSION", "MAINTENANCE"]),
});

export const agenceSchema = z.object({
  nom: z.string().trim().min(2).max(80),
  adresse: z.string().trim().min(2).max(200),
  ville: z.string().trim().min(2).max(80),
  telephone: z.string().trim().regex(/^[+0-9 ()-]{6,20}$/),
  email: z.string().trim().email().max(255),
});

export const tarifSchema = z.object({
  zoneDepart: z.string().trim().min(2),
  zoneArrivee: z.string().trim().min(2),
  prixBase: z.coerce.number().positive(),
  prixParKg: z.coerce.number().nonnegative(),
  dateEffet: z.string().min(1),
});

// Aide : valide et retourne { ok, data, errors }.
export function validate(schema, payload) {
  const r = schema.safeParse(payload);
  if (r.success) return { ok: true, data: r.data, errors: null };
  const errors = {};
  r.error.issues.forEach((i) => { errors[i.path.join(".")] = i.message; });
  return { ok: false, data: null, errors };
}
