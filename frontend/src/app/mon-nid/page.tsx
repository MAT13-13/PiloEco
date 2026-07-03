import AppLayout from "../components/layout/AppLayout";

export default function MonNidPage() {
  return (
    <AppLayout>
      <div className="mb-8 rounded-3xl border border-green-500/40 bg-slate-900 p-8">
        <p className="mb-2 text-sm font-bold uppercase tracking-wide text-green-400">
          🏡 Mon Nid
        </p>

        <h1 className="text-4xl font-bold">
          Bienvenue dans ton espace logement
        </h1>

        <p className="mt-4 max-w-3xl text-slate-300">
          Ici, Pilo t’aidera à mieux gérer ton logement, tes travaux, tes
          factures d’énergie et tes projets maison.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-3xl">🏠</p>
          <h2 className="mt-4 text-xl font-bold">Acheter un bien</h2>
          <p className="mt-2 text-slate-400">
            Prépare ton projet immobilier, ton budget et ton apport.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-3xl">🔨</p>
          <h2 className="mt-4 text-xl font-bold">Rénover</h2>
          <p className="mt-2 text-slate-400">
            Organise tes travaux et estime les coûts importants.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-3xl">⚡</p>
          <h2 className="mt-4 text-xl font-bold">Réduire mes factures</h2>
          <p className="mt-2 text-slate-400">
            Analyse l’énergie, l’isolation et les économies possibles.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-3xl">🧱</p>
          <h2 className="mt-4 text-xl font-bold">Isolation</h2>
          <p className="mt-2 text-slate-400">
            Compare les travaux utiles pour améliorer ton confort.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-3xl">🎁</p>
          <h2 className="mt-4 text-xl font-bold">Aides disponibles</h2>
          <p className="mt-2 text-slate-400">
            Pilo pourra t’aider à repérer les aides adaptées à ton projet.
          </p>
        </div>

        <div className="rounded-2xl border border-yellow-500/40 bg-yellow-500/10 p-6">
          <p className="text-3xl">🚧</p>
          <h2 className="mt-4 text-xl font-bold text-yellow-300">
            En cours de création
          </h2>
          <p className="mt-2 text-slate-300">
            Ce module va s’enrichir progressivement avec des calculs, des
            estimations et des conseils personnalisés.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}