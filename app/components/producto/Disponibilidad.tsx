import Badge from "@/app/components/ui/Badge";

export default function Disponibilidad({ disponible }: { disponible: boolean }) {
  return disponible ? (
    <Badge tone="sage" className="normal-case">
      Disponible
    </Badge>
  ) : (
    <Badge tone="outline" className="normal-case">
      Agotado
    </Badge>
  );
}
