"use client";

import Link from "next/link";

const creations = [
  {
    icon: "💅",
    title: "Press-on nails personnalisés",
    description:
      "Des créations d'ongles personnalisées selon le style, les couleurs et les envies.",
  },
  {
    icon: "🕯️",
    title: "Bougies florales faites main",
    description:
      "Des bougies artisanales décorées avec un univers floral, pensées pour offrir ou décorer.",
  },
  {
    icon: "🌸",
    title: "Cadres floraux",
    description:
      "Des cadres décoratifs réalisés à la main autour des fleurs et des compositions naturelles.",
  },
  {
    icon: "🪢",
    title: "Macramé & décoration",
    description:
      "Des créations en macramé et objets décoratifs faits main pour apporter une touche bohème à l'intérieur.",
  },
  {
    icon: "👶",
    title: "Créations naissance",
    description:
      "Des créations artisanales douces et personnalisables pour célébrer une naissance.",
  },
  {
    icon: "💐",
    title: "Fleurs séchées & compositions",
    description:
      "Des compositions florales décoratives réalisées à partir de fleurs séchées et d'éléments naturels.",
  },
];

export default function BeauteArtisanatOffersPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/missions/beaute-artisanat"
          className="text-sm font-semibold text-green-400 transition hover:text-green-300"
        >
          ← Retour à la mission
        </Link>

        <div className="mt-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            PiloEco
          </p>

          <h1 className="mt-3 text-4xl font-black">
            🌸 Beauté & Artisanat
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            Découvre prochainement une sélection de créations artisanales
            faites main autour de la beauté, des fleurs et de la décoration.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {creations.map((creation) => (
            <article
              key={creation.title}
              className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="text-4xl">{creation.icon}</div>

              <h2 className="mt-5 text-xl font-bold">
                {creation.title}
              </h2>

              <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
                {creation.description}
              </p>

             <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3">
  <p className="text-sm font-semibold text-amber-300">
    🤝 Partenariat en cours
  </p>

  <p className="mt-1 text-xs text-slate-400">
    Pilo prépare actuellement cette offre avec un partenaire.
  </p>
</div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-green-500/20 bg-green-500/10 p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
            🌿 Artisanat local
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            Une nouvelle sélection arrive bientôt
          </h2>

          <p className="mt-3 max-w-3xl text-slate-300">
            Pilo prépare actuellement une sélection de créations faites main.
            Chaque création pourra être préparée avec soin et accompagnée
            automatiquement d'un emballage artisanal adapté.
          </p>
        </div>
      </div>
    </main>
  );
}