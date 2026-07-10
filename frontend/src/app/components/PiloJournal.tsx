type Entry = {
  date: string;
  icon: string;
  title: string;
  message: string;
};

const entries: Entry[] = [
  {
    date: "Aujourd'hui • 09:42",
    icon: "📱",
    title: "Téléphone vérifié",
    message:
      "J'ai trouvé une offre RED à 9,99 €/mois. Économie estimée : 120 €/an.",
  },
  {
    date: "Aujourd'hui • 08:15",
    icon: "⚡",
    title: "Nouvelle hausse détectée",
    message:
      "Les tarifs EDF évoluent. Je te recommande de comparer ton contrat.",
  },
  {
    date: "Hier • 21:18",
    icon: "📺",
    title: "Streaming analysé",
    message:
      "Disney+ semble inutilisé depuis plusieurs semaines. Une résiliation pourrait te faire économiser 192 €/an.",
  },
  {
    date: "Hier • 18:27",
    icon: "🏠",
    title: "Assurance habitation",
    message:
      "Ton contrat arrive bientôt à échéance. Je pourrai comparer les offres disponibles.",
  },
];

export default function PiloJournal() {
  return (
    <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="text-3xl font-black text-white">
        🦜 Journal de Pilo
      </h2>

      <p className="mt-2 text-slate-400">
        Pendant ton absence, j'ai continué à surveiller tes contrats et à rechercher les meilleures économies.
      </p>

      <div className="mt-8 space-y-6">
        {entries.map((entry, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-5 transition hover:border-green-500/40"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-green-400">
                {entry.icon} {entry.title}
              </h3>

              <span className="text-sm text-slate-500">
                {entry.date}
              </span>
            </div>

            <p className="mt-3 text-slate-300">
              {entry.message}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}