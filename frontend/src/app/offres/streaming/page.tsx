"use client";

import Link from "next/link";
import PiloAdvice from "../../components/PiloAdvice";

export default function StreamingOfferPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/missions/streaming"
          className="text-green-400 hover:underline"
        >
          ← Retour à la mission streaming
        </Link>

        <section className="mt-8 rounded-[2rem] border border-green-500/20 bg-white/5 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            Analyse streaming par Pilo
          </p>

          <h1 className="mt-4 text-5xl font-black">
            📺 Optimiser tes abonnements streaming
          </h1>

          <p className="mt-5 max-w-3xl text-slate-300">
            Pilo t&apos;aide à repérer les abonnements que tu utilises peu,
            les doublons éventuels et les dépenses qui peuvent être réduites.
          </p>

          <div className="mt-8 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">
              💡 Opportunité d&apos;économie détectée
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Vérifie tes abonnements avant de les conserver
            </h2>

            <p className="mt-4 text-slate-300">
              L&apos;économie réelle dépend des plateformes auxquelles tu es
              abonné, de leur prix actuel et de celles que tu souhaites
              réellement conserver.
            </p>

            <p className="mt-3 text-slate-300">
              Pilo n&apos;affiche donc pas d&apos;économie chiffrée tant qu&apos;une
              optimisation réelle n&apos;a pas été identifiée.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              📋 Identifier les abonnements actifs
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              ✂️ Repérer ceux qui peuvent être supprimés
            </div>
          </div>

          <PiloAdvice
            title="Comment Pilo t'aide ?"
            message="Pilo t'aide à faire le tri dans tes abonnements et à identifier les dépenses inutiles ou redondantes. L'objectif est de réduire ton budget streaming sans supprimer les services que tu utilises réellement."
          />

          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
              Partenaires streaming
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Partenaires en cours d&apos;intégration
            </h2>

            <p className="mt-4 text-slate-300">
              PiloEco travaille actuellement à l&apos;intégration de solutions
              partenaires permettant d&apos;optimiser les dépenses liées au
              streaming et aux abonnements numériques.
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Aucun bouton externe n&apos;est affiché tant qu&apos;un partenariat
              n&apos;est pas officiellement validé et que son lien affilié
              n&apos;a pas été vérifié.
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
              Dès qu&apos;une solution partenaire adaptée sera disponible,
              Pilo pourra te la proposer. Tu resteras libre de poursuivre ou
              non selon l&apos;économie réellement obtenue.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}