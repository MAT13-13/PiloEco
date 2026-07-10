import Link from "next/link";

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
  return (
    <section className="overflow-hidden rounded-[2rem] border border-green-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-green-950/30 p-5 shadow-[0_0_80px_rgba(34,197,94,0.08)] sm:p-6 lg:p-8">
      <div className="grid items-center gap-6 lg:grid-cols-[220px_1fr_300px] xl:grid-cols-[260px_1fr_320px]">
        <div className="flex justify-center lg:justify-start">
          <img
            src="/pilo.png"
            alt="Pilo"
            className="h-36 w-36 object-contain drop-shadow-[0_20px_70px_rgba(34,197,94,0.35)] sm:h-48 sm:w-48 lg:h-64 lg:w-64 xl:h-72 xl:w-72"
          />
        </div>

        <div className="text-center lg:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-green-400 sm:text-sm sm:tracking-[0.3em]">
            🐦 Mon Nid
          </p>

          <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            Bonjour {name} ! 👋
          </h1>

          <p className="mt-4 text-xl font-black text-green-400 sm:text-2xl">
            {piloTitle ?? "Pilo veille sur ton portefeuille"}
          </p>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg lg:mx-0 lg:text-xl">
            {piloMessage ??
              "J'analyse tes dépenses pour trouver les meilleures économies possibles."}
          </p>

          <p className="mt-5 text-base font-semibold text-green-300 sm:text-lg">
            💚 Aujourd'hui, ma mission est de t'aider à payer moins.
          </p>
        </div>

        <div className="rounded-[2rem] border border-green-500/30 bg-green-500/10 p-5 text-center sm:p-6 lg:p-8">
          <p className="text-sm font-bold text-green-300">✨ Aujourd'hui</p>

          <p className="mt-4 break-words text-4xl font-black text-green-400 sm:text-5xl xl:text-6xl">
            {economieAnnuelle} € / an
          </p>

          <p className="mt-3 text-base text-white sm:text-lg">
            d'économies potentielles 🎉
          </p>

          <Link
            href="/assistant"
            className="mt-6 block w-full rounded-2xl bg-green-500 px-4 py-4 text-center text-base font-black text-slate-950 transition hover:bg-green-400 sm:text-lg"
          >
            Voir mes conseils →
          </Link>
        </div>
      </div>
    </section>
  );
}