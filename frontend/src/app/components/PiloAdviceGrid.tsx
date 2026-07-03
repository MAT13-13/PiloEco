type Recommendation = {
  categorie: string;
  economie: number;
  action: string;
};

type Props = {
  recommandations: Recommendation[];
};

const icons: Record<string, string> = {
  Téléphone: "📱",
  Internet: "🌐",
  Assurance: "🛡️",
  Electricité: "⚡",
  Électricité: "⚡",
};

export default function PiloAdviceGrid({ recommandations }: Props) {
  if (!recommandations.length) return null;

  return (
    <section className="mt-8">
      <h2 className="text-3xl font-black text-white">
        🐦 Mes conseils pour toi
      </h2>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {recommandations.map((item) => (
          <div
            key={item.categorie}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-green-400/40 hover:bg-white/10"
          >
            <div className="text-5xl">{icons[item.categorie] || "💚"}</div>

            <h3 className="mt-5 text-2xl font-black text-white">
              {item.categorie}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              {item.action}
            </p>

            <p className="mt-5 text-3xl font-black text-green-400">
              +{item.economie * 12} € / an
            </p>

            <button className="mt-6 w-full rounded-2xl bg-green-500/10 py-3 font-bold text-green-300 transition hover:bg-green-500 hover:text-slate-950">
              Voir →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}