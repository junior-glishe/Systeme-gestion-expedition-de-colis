import CrudPage from "@/components/common/CrudPage";
import { paiementsService } from "@/services/paiements.service";
import { paiementSchema } from "@/schemas";
import { formatMoney, formatDate } from "@/utils/format";

export default function Paiements() {
  return (
    <CrudPage
      title="Paiements" subtitle="Encaissements et reçus"
      service={paiementsService} schema={paiementSchema}
      columns={[
        { key: "expeditionId", label: "Expédition" },
        { key: "montant", label: "Montant", render: (p) => formatMoney(p.montant) },
        { key: "modePaiement", label: "Mode" },
        { key: "datePaiement", label: "Date", render: (p) => formatDate(p.datePaiement) },
        { key: "statut", label: "Statut" },
      ]}
      fields={[
        { name: "expeditionId", label: "ID expédition", type: "number" },
        { name: "montant", label: "Montant", type: "number" },
        { name: "modePaiement", label: "Mode", type: "select", options: [
          { value: "ESPECES", label: "Espèces" },
          { value: "MOBILE_MONEY", label: "Mobile Money" },
          { value: "VIREMENT", label: "Virement" },
          { value: "CARTE", label: "Carte" },
        ]},
      ]}
    />
  );
}
