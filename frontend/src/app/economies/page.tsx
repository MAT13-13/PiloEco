export default function Page() {
  const economies = [
    { icon: "📱", name: "Mobile", saving: 360, status: "Disponible" },
    { icon: "🌐", name: "Internet", saving: 180, status: "Disponible" },
    { icon: "⚡", name: "Électricité", saving: 210, status: "En analyse" },
    { icon: "🏠", name: "Habitation", saving: 126, status: "Bientôt" },
    { icon: "🏦", name: "Banque", saving: 84, status: "Bientôt" },
    { icon: "📺", name: "Streaming", saving: 72, status: "Disponible" },
  ];

  const totalPotentiel = economies.reduce((total, item) => total + item.saving, 0);
  const economise = 312;
  const objectif = 1500;
  const progression = Math.round((economise / objectif) * 100);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:ml-64">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            PiloEco
          </p>

          <h1 className="text-4xl font-black">Mes économies</h1>

          <p className="mt-4 max-w-2xl text-slate-300">
            Visualise les économies détectées par Pilo, celles déjà réalisées
            et les prochaines opportunités à activer.
          </p>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-green-500/20 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Économies potentielles</p>
            <p className="mt-3 text-3xl font-black text-green-400">
              {totalPotentiel} €/an
            </p>
          </div>

          <div className="rounded-3xl border border-green-500/20 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Économies réalisées</p>
            <p className="mt-3 text-3xl font-black text-white">
              {economise} €
            </p>
          </div>

          <div className="rounded-3xl border border-green-500/20 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Objectif annuel</p>
            <p className="mt-3 text-3xl font-black text-white">
              {objectif} €
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-black">Économies trouvées</h2>

          <div className="mt-6 space-y-3">
            {economies.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-2xl bg-slate-950 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm text-slate-400">{item.status}</p>
                  </div>
                </div>

                <p className="font-black text-green-400">
                  {item.saving} €/an
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-black">Progression</h2>

          <div className="mt-5">
            <div className="mb-2 flex justify-between text-sm text-slate-300">
              <span>{economise} € économisés</span>
              <span>{progression}%</span>
            </div>

            <div className="h-4 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-green-400"
                style={{ width: `${progression}%` }}
              />
            </div>

            <p className="mt-3 text-sm text-slate-400">
              Objectif : {objectif} €/an
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-green-500/20 bg-gradient-to-br from-slate-900 to-green-950/40 p-6">
          <h2 className="text-2xl font-black">🐦 Conseil de Pilo</h2>

          <p className="mt-4 text-slate-300">
            Tu pourrais encore économiser environ{" "}
            <span className="font-black text-green-400">
              {totalPotentiel - economise} €/an
            </span>
            . Je continue de surveiller tes contrats pour te prévenir dès qu’une
            meilleure opportunité apparaît.
          </p>
        </section>
      </div>
    </main>
  );
}