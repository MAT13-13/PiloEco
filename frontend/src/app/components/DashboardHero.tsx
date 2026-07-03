type DashboardHeroProps = {
  email: string | undefined;
  analysesCount: number;
  economieMensuelle: number;
  economieAnnuelle: number;
};

export default function DashboardHero({
  email,
  analysesCount,
  economieMensuelle,
  economieAnnuelle,
}: DashboardHeroProps) {
  return (
    <section className="mb-8 rounded-3xl border border-green-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-green-950/30 p-8">
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-green-400">
            🚀 PiloEco
          </p>

          <h1 className="text-4xl font-bold text-white">
            👋 Bonjour Fiona, trouve tes économies en 2 minutes
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Entre tes dépenses, laisse Pilo analyser ton budget, puis découvre les actions simples pour payer moins cher.
          </p>

          <p className="mt-3 text-sm text-slate-500">{email}</p>
        </div>

        <div className="rounded-3xl border border-green-500/40 bg-green-500/10 p-6 text-center">
          <p className="text-sm font-bold text-green-300">
            Économies déjà détectées
          </p>

          <p className="mt-3 text-5xl font-bold text-green-400">
            {economieMensuelle} €
          </p>

          <p className="mt-1 text-slate-400">par mois</p>

          <p className="mt-4 text-sm text-slate-300">
            soit {economieAnnuelle} € par an
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <p className="text-2xl">1️⃣</p>
          <p className="mt-3 font-bold text-white">Entre tes dépenses</p>
          <p className="mt-1 text-sm text-slate-400">Téléphone, internet, assurance, énergie.</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <p className="text-2xl">2️⃣</p>
          <p className="mt-3 font-bold text-white">Pilo analyse</p>
          <p className="mt-1 text-sm text-slate-400">L’IA repère les postes trop chers.</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <p className="text-2xl">3️⃣</p>
          <p className="mt-3 font-bold text-white">Découvre tes gains</p>
          <p className="mt-1 text-sm text-slate-400">Tu vois ton potentiel d’économie.</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <p className="text-2xl">4️⃣</p>
          <p className="mt-3 font-bold text-white">Passe à l’action</p>
          <p className="mt-1 text-sm text-slate-400">Compare les offres recommandées.</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-bold text-white">📊 Tes résultats</p>
            <p className="text-sm text-slate-400">
              {analysesCount} analyses réalisées avec PiloEco.
            </p>
          </div>

          <p className="text-lg font-bold text-green-400">
            {economieAnnuelle} € / an détectés
          </p>
        </div>
      </div>
    </section>
  );
}