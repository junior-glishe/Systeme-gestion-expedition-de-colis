import CrudPage from "@/components/common/CrudPage";
import { tarifsService } from "@/services/tarifs.service";
import { tarifSchema } from "@/schemas";
import { formatMoney } from "@/utils/format";

export default function Tarifs() {
  return (
    <CrudPage
      title="Tarifs" subtitle="Grille tarifaire par zone"
      service={tarifsService} schema={tarifSchema}
      columns={[
        { key: "zoneDepart", label: "Zone départ" }, { key: "zoneArrivee", label: "Zone arrivée" },
        { key: "prixBase", label: "Prix base", render: (t) => formatMoney(t.prixBase) },
        { key: "prixParKg", label: "Prix / kg", render: (t) => formatMoney(t.prixParKg) },
        { key: "dateEffet", label: "Date d'effet" },
      ]}
      fields={[
        { name: "zoneDepart", label: "Zone départ" }, { name: "zoneArrivee", label: "Zone arrivée" },
        { name: "prixBase", label: "Prix base", type: "number" },
        { name: "prixParKg", label: "Prix par kg", type: "number" },
        { name: "dateEffet", label: "Date d'effet", type: "date" },
      ]}
    />
  );
}
