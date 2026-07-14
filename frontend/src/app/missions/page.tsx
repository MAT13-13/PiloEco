import Link from "next/link";

import PiloNavigation from "../components/PiloNavigation";

const missions = [
  {
    title: "Téléphone",
    icon: "📱",
    href: "/missions/mobile",
  },
  {
    title: "Internet",
    icon: "🌐",
    href: "/missions/internet",
  },
  {
    title: "Électricité",
    icon: "⚡",
    href: "/missions/electricite",
  },
  {
    title: "Habitation",
    icon: "🏠",
    href: "/missions/habitation",
  },
  {
    title: "Famille",
    icon: "👨‍👩‍👧",
    href: "/missions/famille",
  },
  {
    title: "Animaux",
    icon: "🐶",
    href: "/missions/animaux",
  },
  {
    title: "Banque",
    icon: "🏦",
    href: "/missions/banque",
  },
  {
    title: "Assurances",
    icon: "🛡️",
    href: "/missions/assurance",
  },
  {
    title: "Mobilité",
    icon: "🚗",
    href: "/missions/mobilite",
  },
  {
    title: "Streaming",
    icon: "📺",
    href: "/missions/streaming",
  },
];

export default function MissionsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:ml-64">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          PiloEco
        </p>

        <h1 className="text-4xl font-black">
          Mes missions
        </h1>

        <p className="mt-4 text-slate-300">
          Choisis une mission pour trouver
          une économie.
        </p>

        <PiloNavigation />

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {missions.map((mission) => (
            <Link
              key={mission.href}
              href={mission.href}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-green-400 hover:bg-slate-800"
            >
              <div className="text-4xl">
                {mission.icon}
              </div>

              <h2 className="mt-4 text-xl font-black">
                {mission.title}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Voir les recommandations →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}