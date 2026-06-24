import CrudPage from "@/components/common/CrudPage";
import { expeditionsService } from "@/services/expeditions.service";
import { expeditionSchema } from "@/schemas";
import { formatMoney, formatDate } from "@/utils/format";

export default function Expeditions() {
  return (
    <CrudPage
      title="Expéditions" subtitle="Suivi et planification"
      service={expeditionsService} schema={expeditionSchema}
      columns={[
        { key: "reference", label: "Référence" },
        { key: "dateDepart", label: "Départ", render: (e) => formatDate(e.dateDepart) },
        { key: "dateArriveeEstimee", label: "Arrivée prévue", render: (e) => formatDate(e.dateArriveeEstimee) },
        { key: "statut", label: "Statut" },
        { key: "coutTotal", label: "Coût", render: (e) => formatMoney(e.coutTotal) },
      ]}
      fields={[
        { name: "clientId", label: "ID client", type: "number" },
        { name: "trajetId", label: "ID trajet", type: "number" },
        { name: "vehiculeId", label: "ID véhicule", type: "number" },
        { name: "chauffeurId", label: "ID chauffeur", type: "number" },
        { name: "dateDepart", label: "Date de départ", type: "datetime-local" },
        { name: "dateArriveeEstimee", label: "Arrivée estimée", type: "datetime-local" },
      ]}
    />
  );
}
