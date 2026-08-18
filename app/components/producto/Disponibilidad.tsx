import Badge from "@/app/components/ui/Badge";

// El ERP todavía no tiene stock inicial real cargado para el catálogo, así
// que esto es deliberadamente un estado mock (ver README.md) hasta que
// exista la conexión en vivo con el stock real.
export default function Disponibilidad({ disponible }: { disponible: boolean }) {
  return disponible ? (
    <Badge tone="sage" className="normal-case">
      Disponible
    </Badge>
  ) : (
    <Badge tone="outline" className="normal-case">
      Consultar disponibilidad
    </Badge>
  );
}
