import CrudPage from "@/components/common/CrudPage";
import { trajetsService } from "@/services/trajets.service";
import { trajetSchema } from "@/schemas";

export default function Trajets() {
  return (
    <CrudPage
      title="Trajets" subtitle="Itinéraires desservis"
      service={trajetsService} schema={trajetSchema}
      columns={[
        { key: "villeDepart", label: "Départ" }, { key: "villeArrivee", label: "Arrivée" },
        { key: "distanceKm", label: "Distance (km)" }, { key: "dureeEstimeeH", label: "Durée (h)" },
      ]}
      fields={[
        { name: "villeDepart", label: "Ville de départ" }, { name: "villeArrivee", label: "Ville d'arrivée" },
        { name: "distanceKm", label: "Distance (km)", type: "number" },
        { name: "dureeEstimeeH", label: "Durée estimée (h)", type: "number" },
      ]}
    />
  );
}
