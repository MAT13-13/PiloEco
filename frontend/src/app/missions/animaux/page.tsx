"use client";

import Link from "next/link";

const JAPHY_URL =
  "https://track.effiliation.com/servlet/effi.click?id_compteur=23305832";

export default function AnimauxOfferPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <Link href="/dashboard" className="text-green-400 hover:underline">
          ← Retour au dashboard
        </Link>

        <section className="mt-8 rounded-[2rem] border border-green-500/20 bg-white/5 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            🐾 Recommandations Pilo
          </p>

          <h1 className="mt-4 text-4xl font-black">
            Prendre soin de ton animal
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            Assurance, alimentation et dépenses du quotidien : Pilo sélectionne
            des solutions partenaires pour t’aider à prendre soin de ton animal
            tout en maîtrisant ton budget.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="flex flex-col rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">
                Assurance animaux
              </p>

              <h2 className="mt-3 text-2xl font-black">
                Comparer les assurances
              </h2>

              <p className="mt-3 flex-1 text-slate-300">
                Compare différentes solutions pour chien, chat ou NAC et
                découvre le tarif correspondant à ton animal, à son âge et aux
                garanties souhaitées.
              </p>

              <p className="mt-4 text-sm text-amber-200">
                ↗ Tu vas être redirigé vers le partenaire. Tu restes libre de
                poursuivre ou non.
              </p>

              <a
                href="https://stella-2.com/clc/PyCCpFfs3jche1T9Ly4w0w"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mt-6 inline-flex justify-center rounded-2xl bg-green-500 px-6 py-3 text-center font-black text-slate-950 transition hover:bg-green-400"
              >
                Comparer les assurances →
              </a>
            </div>

            <div className="flex flex-col rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-300">
                Alimentation chien & chat
              </p>

              <h2 className="mt-3 text-2xl font-black">
                Découvrir Japhy
              </h2>

              <p className="mt-3 flex-1 text-slate-300">
                Découvre une alimentation adaptée aux besoins de ton chien ou
                de ton chat et trouve une solution qui correspond à son profil
                et à ton budget.
              </p>

              <p className="mt-4 text-sm text-amber-200">
                ↗ Tu vas être redirigé vers Japhy. Tu restes libre de poursuivre
                ou non.
              </p>

              <a
                href={JAPHY_URL}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mt-6 inline-flex justify-center rounded-2xl bg-amber-400 px-6 py-3 text-center font-black text-slate-950 transition hover:bg-amber-300"
              >
                Découvrir l’alimentation Japhy →
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}