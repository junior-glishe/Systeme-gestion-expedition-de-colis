import CrudPage from "@/components/common/CrudPage";
import { colisService } from "@/services/colis.service";
import { colisSchema } from "@/schemas";

export default function Colis() {
  return (
    <CrudPage
      title="Colis" subtitle="Tous les colis enregistrés"
      service={colisService} schema={colisSchema}
      columns={[
        { key: "reference", label: "Référence" }, { key: "description", label: "Description" },
        { key: "poids", label: "Poids (kg)" }, { key: "statut", label: "Statut" },
        { key: "clientId", label: "Client" },
      ]}
      fields={[
        { name: "description", label: "Description", type: "textarea" },
        { name: "poids", label: "Poids (kg)", type: "number" },
        { name: "longueur", label: "Longueur (cm)", type: "number" },
        { name: "hauteur", label: "Hauteur (cm)", type: "number" },
        { name: "valeurDeclaree", label: "Valeur déclarée", type: "number" },
        { name: "clientId", label: "ID client", type: "number" },
      ]}
    />
  );
}
