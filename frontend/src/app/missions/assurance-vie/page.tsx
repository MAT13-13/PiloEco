"use client";

import Link from "next/link";

const ASSURANCE_VIE_URL =
  "https://stella-2.com/clc/HJ-PaEO0_bkX1Fz0mo-eGw";

export default function AssuranceVieMissionPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/missions"
          className="text-sm font-bold text-green-400 transition hover:text-green-300"
        >
          ← Retour aux missions
        </Link>

        <section className="mt-8 rounded-[2rem] border border-green-500/20 bg-white/5 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            💰 Recommandation Pilo
          </p>

          <h1 className="mt-4 text-4xl font-black">
            Assurance vie
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            L’assurance vie peut permettre de constituer progressivement un
            capital, préparer sa retraite ou organiser la transmission de son
            patrimoine.
          </p>

          <div className="mt-8 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">
              Solution partenaire
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Comparer les assurances vie
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
              Accède à une solution partenaire pour comparer différentes
              assurances vie selon tes objectifs, ton horizon de placement et
              ta situation.
            </p>

            <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
              Les performances, les frais et la fiscalité dépendent du contrat
              choisi et de ta situation. Vérifie les conditions avant toute
              décision.
            </div>

            <a
              href={ASSURANCE_VIE_URL}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-6 inline-flex rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-green-400"
            >
              Comparer les assurances vie →
            </a>

            <p className="mt-4 text-xs leading-5 text-slate-500">
              Les informations présentées par PiloEco ne constituent pas un
              conseil en investissement.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}