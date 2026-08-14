"use client";

import Link from "next/link";

export default function FormationMissionPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/missions"
          className="text-sm font-bold text-green-400 transition hover:text-green-300"
        >
          ← Retour aux missions
        </Link>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            🎓 Mission Pilo
          </p>

          <h1 className="mt-4 text-4xl font-black">
            Trouver une formation dans le digital
          </h1>

          <p className="mt-4 text-lg leading-7 text-slate-300">
            Tu souhaites te former, développer de nouvelles compétences ou
            préparer une reconversion dans le digital ?
          </p>

          <div className="mt-8 rounded-2xl border border-green-500/30 bg-green-500/10 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
              Solution partenaire disponible
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Formation en ligne & digital
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
              Pilo a sélectionné une solution partenaire qui te permet de
              découvrir des formations en ligne dans le digital et de vérifier
              les possibilités correspondant à ton projet.
            </p>

            <Link
              href="/offres/formation"
              className="mt-6 inline-flex rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-green-400"
            >
              Découvrir les formations →
            </Link>
          </div>

          <p className="mt-5 text-xs leading-5 text-slate-500">
            Tu restes libre de poursuivre ou non auprès du partenaire.
          </p>
        </div>
      </div>
    </main>
  );
}