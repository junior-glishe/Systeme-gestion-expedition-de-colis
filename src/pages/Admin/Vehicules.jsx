import CrudPage from "@/components/common/CrudPage";
import { vehiculesService } from "@/services/vehicules.service";
import { vehiculeSchema } from "@/schemas";

export default function Vehicules() {
  return (
    <CrudPage
      title="Véhicules" subtitle="Flotte et statut opérationnel"
      service={vehiculesService} schema={vehiculeSchema}
      columns={[
        { key: "immatriculation", label: "Immatriculation" }, { key: "marque", label: "Marque" },
        { key: "modele", label: "Modèle" }, { key: "capaciteKg", label: "Capacité (kg)" },
        { key: "statut", label: "Statut" },
      ]}
      fields={[
        { name: "immatriculation", label: "Immatriculation" }, { name: "marque", label: "Marque" },
        { name: "modele", label: "Modèle" }, { name: "capaciteKg", label: "Capacité (kg)", type: "number" },
        { name: "statut", label: "Statut", type: "select", options: [
          { value: "DISPONIBLE", label: "Disponible" },
          { value: "EN_MISSION", label: "En mission" },
          { value: "MAINTENANCE", label: "Maintenance" },
        ]},
      ]}
    />
  );
}
