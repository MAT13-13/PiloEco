"use client";

export default function MutuelleProfessionnelleOfferPage() {
  const partnerUrl =
    "https://stella-2.com/clc/ngqFA7AxEz7rGDpyIf874Q";

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          PiloEco
        </p>

        <h1 className="mt-3 text-4xl font-black">
          ❤️ Mutuelle Professionnelle
        </h1>

        <p className="mt-4 text-lg text-slate-300">
          Pilo a identifié une solution partenaire dédiée à la mutuelle santé
          des travailleurs indépendants et professionnels.
        </p>

        <div className="mt-10 rounded-3xl border border-green-500/30 bg-slate-900 p-8">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🩺</div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-green-400">
                Solution partenaire
              </p>

              <h2 className="mt-1 text-2xl font-black">
                Mutuelle santé pour indépendants
              </h2>
            </div>
          </div>

          <p className="mt-6 leading-7 text-slate-300">
            Découvre une solution de mutuelle professionnelle adaptée aux
            travailleurs non salariés et compare les garanties proposées selon
            ta situation et tes besoins.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-950/60 p-5">
            <p className="font-bold text-white">
              Cette solution peut notamment convenir aux :
            </p>

            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>✓ Auto-entrepreneurs</li>
              <li>✓ Artisans et commerçants</li>
              <li>✓ Professions libérales</li>
              <li>✓ Travailleurs indépendants</li>
              <li>✓ Gérants majoritaires de SARL</li>
            </ul>
          </div>

          <a
            href={partnerUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="mt-8 flex w-full items-center justify-center rounded-2xl bg-green-400 px-6 py-4 text-center text-lg font-black text-slate-950 transition hover:bg-green-300"
          >
            Comparer ma mutuelle professionnelle →
          </a>

          <p className="mt-4 text-center text-xs leading-5 text-slate-500">
            Tu seras redirigé vers le site du partenaire pour obtenir une
            proposition adaptée à ta situation. Les tarifs et garanties
            dépendent de ton profil et des conditions du partenaire. PiloEco
            peut percevoir une rémunération pour une mise en relation éligible.
          </p>
        </div>
      </div>
    </main>
  );
}