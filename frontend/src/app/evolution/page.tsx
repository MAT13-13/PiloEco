export default function Page() {
  const historique = [
    { mois: "Janvier", score: 52 },
    { mois: "Février", score: 58 },
    { mois: "Mars", score: 63 },
    { mois: "Avril", score: 69 },
    { mois: "Mai", score: 74 },
    { mois: "Juin", score: 81 },
  ];

  const score = historique[historique.length - 1].score;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:ml-64">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            PiloEco
          </p>

          <h1 className="text-4xl font-black">Mon évolution</h1>

          <p className="mt-4 max-w-2xl text-slate-300">
            Suis l'évolution de ton score Pilo et mesure les progrès réalisés
            grâce aux économies que tu mets en place.
          </p>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-green-500/20 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Score actuel</p>
            <p className="mt-3 text-4xl font-black text-green-400">
              {score}/100
            </p>
          </div>

          <div className="rounded-3xl border border-green-500/20 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Progression</p>
            <p className="mt-3 text-4xl font-black text-white">
              +29 pts
            </p>
          </div>

          <div className="rounded-3xl border border-green-500/20 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Objectif</p>
            <p className="mt-3 text-4xl font-black text-white">
              100
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-black">
            Historique du score Pilo
          </h2>

          <div className="mt-8 space-y-5">
            {historique.map((item) => (
              <div key={item.mois}>
                <div className="mb-2 flex justify-between">
                  <span className="font-semibold">{item.mois}</span>
                  <span className="text-green-400 font-bold">
                    {item.score}/100
                  </span>
                </div>

                <div className="h-4 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-green-400"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-slate-900 p-6 border border-slate-800">
            <p className="text-4xl">🏆</p>
            <h3 className="mt-4 text-xl font-bold">
              Score en progression
            </h3>
            <p className="mt-2 text-slate-400">
              Ton profil devient de plus en plus optimisé.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-900 p-6 border border-slate-800">
            <p className="text-4xl">💰</p>
            <h3 className="mt-4 text-xl font-bold">
              Plus d'économies
            </h3>
            <p className="mt-2 text-slate-400">
              Chaque mission validée améliore ton potentiel d'économies.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-900 p-6 border border-slate-800">
            <p className="text-4xl">🚀</p>
            <h3 className="mt-4 text-xl font-bold">
              Continue comme ça
            </h3>
            <p className="mt-2 text-slate-400">
              Pilo continue de surveiller ton portefeuille chaque jour.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-green-500/20 bg-gradient-to-br from-slate-900 to-green-950/40 p-6">
          <h2 className="text-2xl font-black">
            🐦 Message de Pilo
          </h2>

          <p className="mt-4 text-slate-300">
            Depuis ton arrivée sur PiloEco, ton score progresse régulièrement.
            Continue tes missions et je m'occupe de repérer les prochaines
            économies pour te rapprocher d'un score parfait.
          </p>
        </section>
      </div>
    </main>
  );
}