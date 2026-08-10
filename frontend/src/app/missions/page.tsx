import Link from "next/link";

import PiloNavigation from "../components/PiloNavigation";

const missions = [
  {
    title: "Famille & aides",
    icon: "👨‍👩‍👧",
    href: "/missions/famille",
  },
    {
    title: "Mutuelle santé",
    icon: "❤️",
    href: "/missions/mutuelle",
  },
  {
    title: "Mutuelle Senior",
    icon: "👵",
    href: "/missions/mutuelle-senior",
  },
  {
    title: "Assurance animaux",
    icon: "🐶",
    href: "/missions/animaux",
  },

  {
    title: "Assurance Obsèques",
    icon: "🕊️",
    href: "/missions/assurance-obseques",
  },
  
  {
    title: "Téléphone",
    icon: "📱",
    href: "/missions/mobile",
  },
  {
    title: "Téléphone senior",
    icon: "👵",
    href: "/missions/telephone-senior",
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
    title: "Streaming",
    icon: "📺",
    href: "/missions/streaming",
  },
  {
    title: "Banque",
    icon: "🏦",
    href: "/missions/banque",
  },
 {
    title: "Crédit immobilier",
    icon: "🏠",
    href: "/missions/credit-immobilier",
  },

   {
    title: "Travaux & rénovation",
    icon: "🛠️",
    href: "/missions/travaux",
  },
  {
    title: "Fintech & budget",
    icon: "💳",
    href: "/missions/fintech",
  },

    {
    title: "Cryptomonnaies",
    icon: "₿",
    href: "/missions/crypto",
  },

  {
    title: "Assurance habitation",
    icon: "🏠",
    href: "/missions/habitation",
  },
  {
    title: "Assurance auto",
    icon: "🚗",
    href: "/missions/auto",
  },
  {
    title: "Assurance moto",
    icon: "🏍️",
    href: "/missions/moto",
  },
{
    title: "Mobilités douces",
    icon: "🚲",
    href: "/missions/mobilites-douces",
  },
   {
    title: "Services auto",
    icon: "🔧",
    href: "/missions/services-auto",
  },
  {
  title: "Moto & équipement",
  icon: "🏍️",
  href: "/missions/moto-equipement",
},

    {
    title: "Voyage",
    icon: "✈️",
    href: "/missions/voyage",
  },

  {
    title: "Formation",
    icon: "🎓",
    href: "/missions/formation",
  },

  {
    title: "Alarme & sécurité",
    icon: "🔐",
    href: "/missions/securite",
  },
  {
    title: "Cybersécurité",
    icon: "🛡️",
    href: "/missions/cybersecurite",
  },

  {
    title: "Site internet pro",
    icon: "🌐",
    href: "/missions/site-internet-pro",
  },
   {
    title: "Logiciels",
    icon: "💻",
    href: "/missions/logiciels",
  },

  {
    title: "Déménagement",
    icon: "🚚",
    href: "/missions/demenagement",
  },
  {
    title: "Débarras",
    icon: "📦",
    href: "/missions/debarras",
  },

];

export default function MissionsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          PiloEco
        </p>

        <h1 className="text-4xl font-black">
          Mes missions
        </h1>

        <p className="mt-4 text-slate-300">
          Choisis une mission pour trouver une économie.
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