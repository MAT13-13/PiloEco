"use client";

import Link from "next/link";

const MON_CLUB_IMMO_URL =
  "https://track.effiliation.com/servlet/effi.click?id_compteur=23305839";

export default function FormationMissionPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
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
            Trouver une formation adaptée à ton projet
          </h1>

          <p className="mt-4 text-lg leading-7 text-slate-300">
            Tu souhaites développer de nouvelles compétences, préparer une
            reconversion ou avancer dans ton projet professionnel ? Choisis le
            domaine qui t’intéresse.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="flex flex-col rounded-2xl border border-green-500/30 bg-green-500/10 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
                Formation digitale
              </p>

              <h2 className="mt-3 text-2xl font-black">
                Formation en ligne & digital
              </h2>

              <p className="mt-3 flex-1 leading-7 text-slate-300">
                Découvre des formations en ligne dans le digital et vérifie les
                possibilités correspondant à ton projet professionnel.
              </p>

              <Link
                href="/offres/formation"
                className="mt-6 inline-flex justify-center rounded-xl bg-green-500 px-6 py-3 text-center font-bold text-slate-950 transition hover:bg-green-400"
              >
                Découvrir les formations →
              </Link>
            </div>

            <div className="flex flex-col rounded-2xl border border-amber-400/30 bg-amber-400/10 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                Formation immobilière
              </p>

              <h2 className="mt-3 text-2xl font-black">
                Mon Club Immo
              </h2>

              <p className="mt-3 flex-1 leading-7 text-slate-300">
                Découvre des formations consacrées à l’immobilier pour
                développer tes compétences et avancer dans ton projet
                professionnel.
              </p>

              <a
                href={MON_CLUB_IMMO_URL}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mt-6 inline-flex justify-center rounded-xl bg-amber-400 px-6 py-3 text-center font-bold text-slate-950 transition hover:bg-amber-300"
              >
                Découvrir Mon Club Immo →
              </a>
            </div>
          </div>

          <p className="mt-5 text-xs leading-5 text-slate-500">
            Tu vas être redirigé vers le partenaire sélectionné. Tu restes libre
            de poursuivre ou non.
          </p>
        </div>
      </div>
    </main>
  );
}