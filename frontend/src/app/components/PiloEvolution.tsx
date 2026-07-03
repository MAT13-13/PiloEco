type Props = {
  economieAnnuelle: number;
};

export default function PiloEvolution({
  economieAnnuelle,
}: Props) {
  const objectif = 500;

  const progression = Math.min(
    Math.round((economieAnnuelle / objectif) * 100),
    100
  );

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
        📈 Mon évolution
      </p>

      <div className="mt-8 flex items-center justify-center">
        <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-8 border-green-500">
          <span className="text-5xl font-black text-white">
            {progression}%
          </span>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-4xl font-black text-green-400">
          {economieAnnuelle} € / an
        </h2>

        <p className="mt-3 text-slate-300">
          déjà détectés par Pilo.
        </p>

        <div className="mt-8 h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-700"
            style={{ width: `${progression}%` }}
          />
        </div>

        <p className="mt-3 text-sm text-slate-400">
          Objectif : {objectif} €/an
        </p>

        <div className="mt-8 rounded-2xl bg-green-500/10 p-5 text-green-300">
          🐦 Chaque petite économie nous rapproche de ton objectif 💚
        </div>
      </div>
    </section>
  );
}