import { getRandomPiloMessage } from "../lib/piloMessages";

type Props = {
  name?: string;
  economieAnnuelle: number;
  piloTitle?: string;
  piloMessage?: string;
};

export default function PiloNestHero({
  name = "Fiona",
  economieAnnuelle,
  piloTitle,
  piloMessage,
}: Props) {
  const message = getRandomPiloMessage();

  return (
    <section className="rounded-[2rem] border border-green-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-green-950/30 p-8 shadow-[0_0_80px_rgba(34,197,94,0.08)]">
      <div className="grid items-center gap-8 lg:grid-cols-[260px_1fr_320px]">
        <div className="flex justify-center">
          <img
            src="/pilo.png"
            alt="Pilo"
            className="h-72 w-72 object-contain drop-shadow-[0_20px_70px_rgba(34,197,94,0.35)]"
          />
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            🐦 Mon Nid
          </p>

          <h1 className="mt-4 text-5xl font-black text-white">
            Bonjour {name} ! 👋
          </h1>

          <p className="mt-5 text-2xl font-black text-green-400">
  {piloTitle ?? message}
</p>

          <p className="mt-5 max-w-xl text-xl leading-relaxed text-slate-300">
  {piloMessage ??
    "Pendant ton absence, j’ai continué à veiller sur ton portefeuille."}
</p>

          <p className="mt-6 text-lg font-semibold text-green-300">
            💚 Aujourd'hui, ma mission est de t'aider à payer moins.
          </p>
        </div>

        <div className="rounded-[2rem] border border-green-500/30 bg-green-500/10 p-8 text-center">
          <p className="text-sm font-bold text-green-300">
            ✨ Aujourd'hui
          </p>

          <p className="mt-4 text-6xl font-black text-green-400">
            {economieAnnuelle} € / an
          </p>

          <p className="mt-3 text-lg text-white">
            d'économies potentielles 🎉
          </p>

          <button className="mt-8 w-full rounded-2xl bg-green-500 py-4 text-lg font-black text-slate-950 transition hover:bg-green-400">
            Voir mes conseils →
          </button>
        </div>
      </div>
    </section>
  );
}