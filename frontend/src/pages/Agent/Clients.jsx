import CrudPage from "@/components/common/CrudPage";
import { clientsService } from "@/services/clients.service";
import { clientSchema } from "@/schemas";

export default function Clients() {
  return (
    <CrudPage
      title="Clients" subtitle="Gestion des clients expéditeurs"
      service={clientsService} schema={clientSchema}
      columns={[
        { key: "nom", label: "Nom" }, { key: "prenom", label: "Prénom" },
        { key: "ville", label: "Ville" }, { key: "telephone", label: "Téléphone" },
        { key: "email", label: "Email" },
      ]}
      fields={[
        { name: "nom", label: "Nom" }, { name: "prenom", label: "Prénom" },
        { name: "adresse", label: "Adresse" }, { name: "ville", label: "Ville" },
        { name: "telephone", label: "Téléphone" }, { name: "email", label: "Email", type: "email" },
      ]}
    />
  );
}
