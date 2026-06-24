import CrudPage from "@/components/common/CrudPage";
import { utilisateursService } from "@/services/utilisateurs.service";
import { registerSchema } from "@/schemas";

export default function Utilisateurs() {
  return (
    <CrudPage
      title="Utilisateurs" subtitle="Comptes et rôles"
      service={utilisateursService} schema={registerSchema}
      columns={[
        { key: "nom", label: "Nom" }, { key: "email", label: "Email" }, { key: "role", label: "Rôle" },
        { key: "actif", label: "Actif", render: (u) => (u.actif ? "Oui" : "Non") },
      ]}
      fields={[
        { name: "nom", label: "Nom" }, { name: "email", label: "Email", type: "email" },
        { name: "motDePasse", label: "Mot de passe", type: "password" },
        { name: "role", label: "Rôle", type: "select", options: [
          { value: "ADMINISTRATEUR", label: "Administrateur" },
          { value: "AGENTEXPEDITION", label: "Agent d'expédition" },
          { value: "CHAUFFEUR", label: "Chauffeur" },
        ]},
      ]}
    />
  );
}
