import Link from "next/link";

type Props = {
  icon: string;
  title: string;
  status: string;
  saving: string;
  color?: "green" | "blue" | "orange" | "red";
  href?: string;
};

export default function MonitoringCard({
  icon,
  title,
  status,
  saving,
  color = "green",
  href = "/recommendations",
}: Props) {
  const colors: Record<string, string> = {
    green: "border-green-500/30 bg-green-500/10",
    blue: "border-blue-500/30 bg-blue-500/10",
    orange: "border-orange-500/30 bg-orange-500/10",
    red: "border-red-500/30 bg-red-500/10",
  };

  return (
    <div
      className={`rounded-3xl border p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-green-400 ${
        colors[color] ?? colors.green
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="text-5xl">{icon}</div>

        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>

          <p className="text-sm text-slate-300">{status}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-900/60 p-4">
        <p className="text-sm text-slate-400">
          Économie potentielle détectée
        </p>

        <p className="mt-2 text-3xl font-black text-green-400">
          {saving}
        </p>
      </div>

      <Link
        href={href}
        className="mt-6 block w-full rounded-2xl bg-green-500 py-3 text-center font-bold text-slate-950 transition hover:bg-green-400"
      >
        Voir les recommandations
      </Link>
    </div>
  );
}