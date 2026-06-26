import CrudPage from "@/components/common/CrudPage";
import { agencesService } from "@/services/agences.service";
import { agenceSchema } from "@/schemas";

export default function Agences() {
  return (
    <CrudPage
      title="Agences" subtitle="Points d'expédition et de réception"
      service={agencesService} schema={agenceSchema}
      columns={[
        { key: "nom", label: "Nom" }, { key: "ville", label: "Ville" },
        { key: "telephone", label: "Téléphone" }, { key: "email", label: "Email" },
      ]}
      fields={[
        { name: "nom", label: "Nom" }, { name: "adresse", label: "Adresse" },
        { name: "ville", label: "Ville" }, { name: "telephone", label: "Téléphone" },
        { name: "email", label: "Email", type: "email" },
      ]}
    />
  );
}
