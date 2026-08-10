"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function LogicielsOffersPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
          <div className="mx-auto max-w-4xl">
            <p className="text-slate-300">
              Chargement de ta recherche...
            </p>
          </div>
        </main>
      }
    >
      <LogicielsOffersContent />
    </Suspense>
  );
}

function LogicielsOffersContent() {
  const searchParams = useSearchParams();

  const softwareType =
    searchParams.get("softwareType") ?? "Bureautique";

  const provider =
    searchParams.get("provider") ?? "";

  const monthlyPrice =
    searchParams.get("monthlyPrice");

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          PiloEco
        </p>

        <h1 className="mt-3 text-4xl font-black">
          💻 Solutions logiciels
        </h1>

        <p className="mt-4 text-slate-300">
          Pilo analyse ton besoin afin de te présenter uniquement
          des solutions partenaires réellement disponibles.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
            Ton besoin
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-slate-400">
                Type de logiciel
              </p>

              <p className="mt-1 font-bold text-white">
                {softwareType}
              </p>
            </div>

            {provider && (
              <div>
                <p className="text-sm text-slate-400">
                  Logiciel actuel
                </p>

                <p className="mt-1 font-bold text-white">
                  {provider}
                </p>
              </div>
            )}

            {monthlyPrice && (
              <div>
                <p className="text-sm text-slate-400">
                  Budget mensuel
                </p>

                <p className="mt-1 font-bold text-white">
                  {monthlyPrice} € / mois
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">
            💡 Opportunité d&apos;économie
          </p>

          <h2 className="mt-3 text-3xl font-black">
            Compare avant de changer
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            Le prix d&apos;un logiciel dépend des fonctions incluses,
            du nombre d&apos;utilisateurs, de la formule choisie et de
            la durée d&apos;engagement.
          </p>

          <p className="mt-3 leading-7 text-slate-300">
            Pilo ne chiffre donc pas une économie tant qu&apos;une
            vraie solution partenaire n&apos;a pas été consultée.
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
            Partenaires logiciels
          </p>

          <h2 className="mt-3 text-2xl font-black">
            Solutions en cours d&apos;intégration
          </h2>

          <p className="mt-4 text-slate-300">
            PiloEco travaille actuellement à l&apos;intégration de
            solutions partenaires adaptées à ton besoin logiciel.
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Dès qu&apos;une solution compatible avec
            <strong className="text-white"> {softwareType}</strong>
            {" "}sera disponible avec un lien partenaire vérifié,
            elle apparaîtra ici.
          </p>

          <div className="mt-6 inline-flex rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-bold text-green-400">
            En cours d&apos;intégration
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="font-bold text-white">
            🎯 L&apos;objectif reste l&apos;économie
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Pilo te proposera uniquement des solutions réellement
            intégrées. Tu pourras ensuite comparer leur coût à ta
            dépense actuelle et vérifier si le changement est
            réellement intéressant.
          </p>
        </div>
      </div>
    </main>
  );
}