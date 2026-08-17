"use client";

import Link from "next/link";

const GSELECT_AMBASSADEUR_URL =
  "https://affilie.gselect-assurances.fr/Guillaume_Garnier?indicateur=5216";

export default function AmbassadeurMissionPage() {
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
          <p className="text-sm font-black uppercase tracking-[0.3em] text-green-400">
            💶 Opportunité Pilo
          </p>

          <h1 className="mt-4 text-4xl font-black">
            Générer un complément de revenus
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            Découvre le programme Ambassadeur GSelect Assurances et
            recommande leurs solutions autour de toi grâce à ton lien
            personnel.
          </p>

          <div className="mt-8 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-green-300">
              Partenaire Pilo
            </p>

            <h2 className="mt-3 text-2xl font-black">
              GSelect Assurances
            </h2>

            <p className="mt-3 leading-6 text-slate-300">
              Une rémunération peut être versée pour certaines
              recommandations validées, selon les conditions du programme.
            </p>

            <p className="mt-4 text-sm text-amber-200">
              ↗ Tu vas être redirigé vers GSelect pour consulter les
              conditions et t&apos;inscrire si tu le souhaites.
            </p>

            <a
              href={GSELECT_AMBASSADEUR_URL}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-6 inline-flex rounded-2xl bg-green-500 px-6 py-3 font-black text-slate-950 transition hover:bg-green-400"
            >
              💶 Découvrir le programme Ambassadeur →
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}