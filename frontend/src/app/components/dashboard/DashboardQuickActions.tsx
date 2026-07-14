"use client";

import Link from "next/link";

const actions = [
  {
    icon: "📊",
    title: "Monitoring",
    description:
      "Surveille tes contrats et détecte les meilleures offres.",
    href: "/monitoring",
    premium: true,
    color:
      "from-red-500/20 to-red-700/10 border-red-500/20",
  },
  {
    icon: "🌿",
    title: "PiloLife",
    description:
      "Transforme tes économies en projets de vie.",
    href: "/pilolife",
    premium: true,
    color:
      "from-green-500/20 to-green-700/10 border-green-500/20",
  },
  {
    icon: "💰",
    title: "Mes économies",
    description:
      "Retrouve toutes les économies détectées.",
    href: "/economies",
    premium: false,
    color:
      "from-emerald-500/20 to-emerald-700/10 border-emerald-500/20",
  },
  {
    icon: "🎯",
    title: "Missions",
    description:
      "Découvre les prochaines économies à réaliser.",
    href: "/missions",
    premium: false,
    color:
      "from-blue-500/20 to-blue-700/10 border-blue-500/20",
  },
  {
    icon: "📈",
    title: "Mes analyses",
    description:
      "Consulte l'historique de toutes tes analyses.",
    href: "/analyses",
    premium: false,
    color:
      "from-purple-500/20 to-purple-700/10 border-purple-500/20",
  },
  {
    icon: "➕",
    title: "Nouvelle analyse",
    description:
      "Lance immédiatement une nouvelle analyse Pilo.",
    href: "/analyse",
    premium: false,
    color:
      "from-amber-500/20 to-amber-700/10 border-amber-500/20",
  },
];

export default function DashboardQuickActions() {
  return (
    <section className="mt-8 rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          Navigation
        </p>

        <h2 className="mt-2 text-3xl font-black text-white">
          ⚡ Accès rapides
        </h2>

        <p className="mt-2 text-slate-400">
          Accède instantanément aux principaux
          univers de PiloEco.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`group rounded-3xl border bg-gradient-to-br ${action.color} p-6 transition duration-300 hover:-translate-y-1 hover:scale-[1.02]`}
          >
            <div className="flex items-start justify-between">
              <div className="text-5xl">
                {action.icon}
              </div>

              {action.premium && (
                <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-black uppercase tracking-wider text-amber-300">
                  ⭐ Premium
                </span>
              )}
            </div>

            <h3 className="mt-6 text-2xl font-black text-white">
              {action.title}
            </h3>

            <p className="mt-3 leading-7 text-slate-300">
              {action.description}
            </p>

            <div className="mt-6 flex items-center gap-2 font-bold text-green-400 transition group-hover:translate-x-1">
              Ouvrir
              <span>→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}