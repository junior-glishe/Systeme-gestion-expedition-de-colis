import CrudPage from "@/components/common/CrudPage";
import { chauffeursService } from "@/services/chauffeurs.service";
import { z } from "zod";

const schema = z.object({
  nom: z.string().min(2).max(80),
  email: z.string().email().max(255),
  permis: z.string().min(2).max(40),
  vehiculeId: z.coerce.number().int().positive().optional(),
});

export default function Chauffeurs() {
  return (
    <CrudPage
      title="Chauffeurs" subtitle="Gestion du personnel roulant"
      service={chauffeursService} schema={schema}
      columns={[
        { key: "nom", label: "Nom" }, { key: "email", label: "Email" },
        { key: "permis", label: "Permis" }, { key: "vehiculeId", label: "Véhicule" },
      ]}
      fields={[
        { name: "nom", label: "Nom" }, { name: "email", label: "Email", type: "email" },
        { name: "permis", label: "N° de permis" }, { name: "vehiculeId", label: "ID véhicule (option.)", type: "number" },
      ]}
    />
  );
}
