"use client";

import Link from "next/link";

const GSELECT_AMBASSADEUR_URL =
  "https://affilie.gselect-assurances.fr/Guillaume_Garnier?indicateur=5216";

export default function AmbassadeurMissionPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/dashboard"
          className="text-green-400 hover:underline"
        >
          ← Retour au dashboard
        </Link>

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900">
          <div className="p-8 md:p-12">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-green-400">
              💶 Opportunité Pilo
            </p>

            <h1 className="mt-4 max-w-3xl text-4xl font-black md:text-5xl">
              Générer un complément de revenus
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              PiloEco te permet de découvrir le programme Ambassadeur
              GSelect Assurances et de recommander une solution utile
              autour de toi.
            </p>

            <div className="mt-10 rounded-3xl border border-green-500/30 bg-green-500/10 p-7">
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <div className="text-6xl">
                  🤝
                </div>

                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-green-300">
                    Partenaire exclusif
                  </p>

                  <h2 className="mt-2 text-3xl font-black">
                    GSelect Assurances
                  </h2>

                  <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                    Rejoins le programme Ambassadeur GSelect et découvre
                    comment recommander leurs solutions d&apos;assurance
                    à ton entourage.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6">
                <div className="text-3xl">🔗</div>

                <h3 className="mt-4 text-xl font-black">
                  Ton lien personnel
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Une fois inscrit, tu peux utiliser ton lien Ambassadeur
                  pour recommander GSelect.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6">
                <div className="text-3xl">🤝</div>

                <h3 className="mt-4 text-xl font-black">
                  Tu recommandes
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Tu peux présenter les solutions GSelect aux personnes
                  de ton entourage susceptibles d&apos;être intéressées.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6">
                <div className="text-3xl">💰</div>

                <h3 className="mt-4 text-xl font-black">
                  Tu peux être rémunéré
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Une rémunération peut être versée selon les conditions
                  du programme Ambassadeur GSelect.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-7">
              <p className="font-black text-white">
                💡 Exemple
              </p>

              <p className="mt-3 leading-7 text-slate-300">
                Le programme peut permettre de générer un complément de
                revenus grâce aux recommandations réalisées et validées
                par GSelect.
              </p>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                Les rémunérations ne sont pas garanties et dépendent des
                conditions, validations et modalités du programme GSelect
                Assurances.
              </p>
            </div>

            <div className="mt-10 text-center">
              <a
                href={GSELECT_AMBASSADEUR_URL}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex rounded-2xl bg-green-500 px-8 py-4 text-lg font-black text-slate-950 transition hover:bg-green-400"
              >
                💶 Devenir Ambassadeur GSelect →
              </a>

              <p className="mx-auto mt-4 max-w-xl text-xs leading-5 text-slate-500">
                Tu vas être redirigé vers le site de GSelect Assurances.
                Consulte les conditions du programme avant de t&apos;inscrire.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}