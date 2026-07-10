"use client";

import Link from "next/link";

const modules = [
  {
    icon: "📱",
    title: "Téléphone",
    status: "🟢 Disponible",
    href: "/missions/mobile",
  },
  {
    icon: "🌐",
    title: "Internet",
    status: "🟢 Disponible",
    href: "/missions/internet",
  },
  {
    icon: "⚡",
    title: "Électricité",
    status: "🟢 Disponible",
    href: "/missions/electricite",
  },
  {
    icon: "🏠",
    title: "Habitation",
    status: "🟢 Disponible",
    href: "/missions/habitation",
  },
  {
    icon: "🐶",
    title: "Animaux",
    status: "🟢 Disponible",
    href: "/missions/animaux",
  },
  {
    icon: "🏦",
    title: "Banque",
    status: "🟢 Disponible",
    href: "/missions/banque",
  },
  {
    icon: "🛡️",
    title: "Assurances",
    status: "🟡 Bientôt",
    href: "/assurances",
  },
  {
    icon: "🚗",
    title: "Mobilité",
    status: "🟢 Disponible",
    href: "/missions/mobilite",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Famille",
    status: "🟢 Disponible",
    href: "/missions/famille",
  },
  {
    icon: "📺",
    title: "Streaming",
    status: "🟢 Disponible",
    href: "/missions/streaming",
  },
  {
    icon: "🌿",
    title: "PiloLife",
    status: "💎 Premium",
    href: "/pilolife",
  },
  {
    icon: "🤖",
    title: "IA Pilo",
    status: "💎 Premium",
    href: "/pilo",
  },
];

export default function PiloModules() {
  return (
    <section className="mt-12 rounded-[2rem] border border-white/10 bg-white/5 p-8">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          🐦 Pilo grandit
        </p>

        <h2 className="mt-3 text-4xl font-black text-white">
          Ce que je peux aussi surveiller pour toi
        </h2>

        <p className="mt-3 max-w-3xl text-slate-400">
          Je continue d'apprendre chaque mois afin de t'aider à économiser
          dans tous les domaines de ta vie.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {modules.map((module) => (
          <Link
            key={module.title}
            href={module.href}
            className="relative z-50 block h-full rounded-3xl border border-white/10 bg-slate-900/60 p-6 text-left transition hover:-translate-y-1 hover:border-green-400/40"
          >
            <div className="text-5xl">{module.icon}</div>

            <h3 className="mt-5 text-2xl font-black text-white">
              {module.title}
            </h3>

            <p className="mt-5 font-bold text-green-400">
              {module.status}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}