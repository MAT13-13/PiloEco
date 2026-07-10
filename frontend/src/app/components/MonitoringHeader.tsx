export default function MonitoringHeader() {
  return (
    <section className="mb-8 overflow-hidden rounded-3xl border border-green-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-green-950/30 p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-green-400">
            🦜 Pilo Monitoring
          </p>

          <h2 className="mt-3 text-4xl font-black text-white">
            Bonjour Fiona 👋
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            Je surveille actuellement tous tes contrats et je recherche les
            meilleures économies possibles.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-bold text-green-300">
              ✅ 5 contrats surveillés
            </span>

            <span className="rounded-full bg-yellow-500/20 px-4 py-2 text-sm font-bold text-yellow-300">
              ⚠️ 3 alertes détectées
            </span>

            <span className="rounded-full bg-blue-500/20 px-4 py-2 text-sm font-bold text-blue-300">
              🕒 Dernière analyse : il y a 2 min
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-green-500/20 bg-slate-900/70 p-6 text-center">
          <p className="text-sm text-slate-400">
            Économies détectées
          </p>

          <p className="mt-2 text-5xl font-black text-green-400">
            696 €
          </p>

          <p className="mt-2 text-slate-500">
            par an
          </p>
        </div>
      </div>
    </section>
  );
}