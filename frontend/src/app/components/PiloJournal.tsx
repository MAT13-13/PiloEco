type Entry = {
  date: string;
  icon: string;
  title: string;
  message: string;
};

const entries: Entry[] = [
  {
    date: "Aujourd'hui",
    icon: "🪶",
    title: "Nouvelle découverte",
    message:
      "J'ai trouvé une nouvelle opportunité d'économie. Je continue mes recherches avant de te la recommander.",
  },
  {
    date: "Hier",
    icon: "💡",
    title: "Analyse terminée",
    message:
      "Ton budget est déjà bien optimisé. Quelques petites améliorations restent possibles.",
  },
  {
    date: "Il y a 3 jours",
    icon: "🎉",
    title: "Objectif atteint",
    message:
      "Tes économies potentielles dépassent désormais 450 € par an.",
  },
];

export default function PiloJournal() {
  return (
    <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="text-3xl font-black text-white">
        🪶 Carnet de Pilo
      </h2>

      <p className="mt-2 text-slate-400">
        Chaque jour, Pilo garde une trace de ses découvertes pour toi.
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