import Badge from "./ui/Badge";
import Button from "./ui/Button";
import Card from "./ui/Card";

type Props = {
  title: string;
  emoji: string;
  saving: number;
  time: string;
  difficulty: "Facile" | "Moyenne" | "Élevée";
  priority: 1 | 2 | 3 | 4 | 5;
  reason: string;
  href: string;
};

function formatEuro(value: number) {
  return new Intl.NumberFormat("fr-FR").format(value) + " €";
}

export default function PiloPriorityCard({
  title,
  emoji,
  saving,
  time,
  difficulty,
  priority,
  reason,
  href,
}: Props) {
  return (
    <Card className="mt-8 p-5 sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <Badge>Priorité du jour</Badge>
        <Badge variant="slate">{"⭐".repeat(priority)}</Badge>
      </div>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl">
            {emoji} {title}
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {reason}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Badge>{formatEuro(saving)} / an</Badge>
            <Badge variant="slate">⏱ {time}</Badge>
            <Badge variant="slate">🎯 {difficulty}</Badge>
          </div>
        </div>

        <Button href={href} className="w-full lg:w-auto">
          Commencer →
        </Button>
      </div>
    </Card>
  );
}