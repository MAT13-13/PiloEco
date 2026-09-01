"use client";

export default function MutuelleProfessionnelleOfferPage() {
  const partnerUrl =
    "https://www.assurlandpro.com/mutuelle-sante.html?partnerlinkid=120HL13&utm_medium=affiliation&utm_source=PiloEco&utm_campaign=santetns_conversion_email_CPA_generique";

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          PiloEco × Assurland
        </p>

        <h1 className="mt-3 text-4xl font-black">
          ❤️ Mutuelle santé TNS
        </h1>

        <p className="mt-4 text-lg text-slate-300">
          Compare les offres de mutuelle santé adaptées aux travailleurs
          indépendants et trouve une couverture correspondant à tes besoins.
        </p>

        <div className="mt-10 rounded-3xl border border-green-500/30 bg-slate-900 p-8">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🩺</div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-green-400">
                Comparateur partenaire
              </p>

              <h2 className="mt-1 text-2xl font-black">
                Assurland Pro
              </h2>
            </div>
          </div>

          <p className="mt-6 leading-7 text-slate-300">
            Compare plusieurs solutions de mutuelle santé pour travailleurs
            non salariés selon ton statut, ta situation et les garanties que
            tu recherches.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-950/60 p-5">
            <p className="font-bold text-white">
              Ce comparateur s’adresse notamment aux :
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
            Comparer les mutuelles avec Assurland →
          </a>

          <p className="mt-4 text-center text-xs leading-5 text-slate-500">
            Tu seras redirigé vers Assurland Pro afin de comparer les solutions
            disponibles selon ton profil. Les tarifs et garanties dépendent
            des assureurs et de ta situation. PiloEco peut percevoir une
            rémunération pour une mise en relation éligible.
          </p>
        </div>
      </div>
    </main>
  );
}