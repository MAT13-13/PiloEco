"use client";

import Link from "next/link";

export default function AnimauxOfferPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/dashboard"
          className="text-green-400 hover:underline"
        >
          ← Retour au dashboard
        </Link>

        <section className="mt-8 rounded-[2rem] border border-green-500/20 bg-white/5 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            🐶 Recommandation Pilo
          </p>

          <h1 className="mt-4 text-4xl font-black">
            Assurance animaux
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            Le tarif dépend de ton animal, de son âge et des garanties choisies.
            Pilo t’oriente vers une solution partenaire pour obtenir un tarif réel
            et le comparer à ta couverture actuelle.
          </p>

          <div className="mt-8 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">
              Solution partenaire
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Comparer les assurances animaux
            </h2>

            <p className="mt-3 text-slate-300">
              Compare différentes solutions pour chien, chat ou NAC et découvre
              le tarif correspondant à ton animal.
            </p>

            <p className="mt-4 text-sm text-amber-200">
              ↗ Tu vas être redirigé vers le partenaire. Tu restes libre de
              poursuivre ou non.
            </p>

            <a
              href="https://stella-2.com/clc/PyCCpFfs3jche1T9Ly4w0w"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-6 inline-flex rounded-2xl bg-green-500 px-6 py-3 font-black text-slate-950 transition hover:bg-green-400"
            >
              Comparer les assurances animaux →
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}