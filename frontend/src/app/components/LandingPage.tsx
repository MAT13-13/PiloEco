type Props = {
  onStart: () => void;
};

export default function LandingPage({ onStart }: Props) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-16">

        <div className="grid w-full gap-16 lg:grid-cols-2">

          <div className="flex flex-col justify-center">

            <span className="mb-4 inline-flex w-fit rounded-full bg-green-500/20 px-4 py-2 text-sm font-bold text-green-400">
              🚀 Nouveau
            </span>

            <h1 className="text-6xl font-extrabold leading-tight">
              PiloEco
            </h1>

            <h2 className="mt-4 text-3xl font-bold text-green-400">
              Reprenez le contrôle de votre budget, sans effort.
            </h2>

            <p className="mt-8 text-xl leading-8 text-slate-300">
              Analysez vos dépenses,
              découvrez où économiser
              et comparez les meilleures offres
              grâce à votre copilote IA.
            </p>

            <div className="mt-10 space-y-4">

              <div>✅ Téléphone</div>
              <div>✅ Internet</div>
              <div>✅ Assurance</div>
              <div>✅ Électricité</div>

            </div>

            <button
              onClick={onStart}
              className="mt-12 rounded-2xl bg-green-500 px-8 py-5 text-xl font-bold text-slate-950 transition hover:scale-105 hover:bg-green-400"
            >
              Commencer gratuitement →
            </button>

            <p className="mt-6 text-sm text-slate-500">
              Gratuit • Sans engagement • Analyse en moins de 2 minutes
            </p>

          </div>

          <div className="flex items-center">

            <div className="w-full rounded-3xl border border-green-500/20 bg-slate-900 p-10">

              <div className="text-7xl">
                🤖
              </div>

              <h3 className="mt-6 text-3xl font-bold">
                Bonjour 👋
              </h3>

              <p className="mt-4 text-lg text-slate-300">
                Je suis Pilo,
                votre copilote IA.
              </p>

              <p className="mt-6 text-slate-400 leading-8">
                En moins de 2 minutes,
                je vais analyser vos dépenses,
                détecter les contrats trop chers
                et vous proposer les meilleures économies.
              </p>

              <div className="mt-10 rounded-2xl bg-green-500/10 p-6">

                <p className="text-green-400 font-bold">
                  💰 Exemple
                </p>

                <p className="mt-3 text-white">
                  Téléphone
                </p>

                <p className="text-5xl font-bold text-green-400">
                  +324 €/an
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>
    </main>
  );
}