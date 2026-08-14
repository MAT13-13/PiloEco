import Link from "next/link";

import PiloNavigation from "../components/PiloNavigation";

const missions = [
  {
    title: "Famille & aides",
    icon: "👨‍👩‍👧",
    href: "/missions/famille",
  },
  {
    title: "Beauté & Artisanat",
    icon: "🌸",
    href: "/missions/beaute-artisanat",
  },
  {
    title: "Voyage",
    icon: "✈️",
    href: "/missions/voyage",
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
    title: "Site internet pro",
    icon: "🌐",
    href: "/missions/site-internet-pro",
  },
  {
    title: "Assurance animaux",
    icon: "🐶",
    href: "/missions/animaux",
  },
  {
    title: "Assurance emprunteur",
    icon: "🏦",
    href: "/missions/assurance-emprunteur",
  },
  {
    title: "Ambassadeur GSelect",
    icon: "💼",
    href: "/missions/ambassadeur",
  },
   {
    title: "Assurance Obsèques",
    icon: "🕊️",
    href: "/missions/assurance-obseques",
  },
  {
    title: "Crédit immobilier",
    icon: "🏠",
    href: "/missions/credit-immobilier",
  },
  {
    title: "Diagnostic immobilier",
    icon: "📋",
    href: "/missions/diagnostic-immobilier",
  },
  {
    title: "Assurance habitation",
    icon: "🏠",
    href: "/missions/habitation",
  },
  {
    title: "Travaux & rénovation",
    icon: "🛠️",
    href: "/missions/travaux",
  },
 
  {
    title: "Mutuelle Senior",
    icon: "👵",
    href: "/missions/mutuelle-senior",
  },
   {
    title: "Épargne & retraite",
    icon: "💰",
    href: "/missions/epargne-retraite",
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
    title: "Cryptomonnaies",
    icon: "₿",
    href: "/missions/crypto",
  },
  {
    title: "Cybersécurité",
    icon: "🛡️",
    href: "/missions/cybersecurite",
  },
  {
    title: "Services aux entreprises",
    icon: "🏢",
    href: "/missions/services-entreprises",
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

const upcomingMissions = [
  {
    title: "Mutuelle santé",
    icon: "❤️",
  },
  {
    title: "Internet",
    icon: "🌐",
  },
  {
    title: "Électricité",
    icon: "⚡",
  },
  {
    title: "Banque",
    icon: "🏦",
  },
  {
    title: "Streaming",
    icon: "📺",
  },
  {
    title: "Logiciels",
    icon: "💻",
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

        <p className="mt-4 max-w-2xl text-slate-300">
          Choisis une mission pour économiser ou découvrir de nouvelles
          opportunités avec Pilo.
        </p>

        <PiloNavigation />

        {/* MISSIONS DISPONIBLES */}
        <section className="mt-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
              Disponibles maintenant
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Missions disponibles
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Ces missions disposent déjà d&apos;une solution ou d&apos;un
              partenaire sélectionné par Pilo.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                  {mission.href === "/missions/ambassadeur"
                    ? "Découvrir l'opportunité →"
                    : "Voir les recommandations →"}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* MISSIONS EN COURS DE PARTENARIAT */}
        <section className="mt-20 border-t border-slate-800 pt-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
              Prochainement
            </p>

            <h2 className="mt-2 text-2xl font-black">
              En cours de partenariat
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Pilo prépare actuellement de nouvelles solutions pour ces
              catégories. Elles seront disponibles dès qu&apos;un partenaire
              adapté aura été sélectionné.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingMissions.map((mission) => (
              <div
                key={mission.title}
                className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-6 opacity-75"
              >
                <div className="absolute right-4 top-4 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300">
                  En cours de partenariat
                </div>

                <div className="text-4xl">
                  {mission.icon}
                </div>

                <h2 className="mt-4 pr-20 text-xl font-black">
                  {mission.title}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Solution partenaire en préparation
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}