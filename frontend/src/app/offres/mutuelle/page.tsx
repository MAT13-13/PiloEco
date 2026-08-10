"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function MutuelleOffersPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
          <div className="mx-auto max-w-5xl">
            <p className="text-slate-300">
              Chargement de ton analyse mutuelle...
            </p>
          </div>
        </main>
      }
    >
      <MutuelleOffersContent />
    </Suspense>
  );
}

function MutuelleOffersContent() {
  const searchParams = useSearchParams();

  const situation =
    searchParams.get("situation") || "Non renseignée";

  const monthlyPrice = Number(
    searchParams.get("monthlyPrice") || 70
  );

  const priority =
    searchParams.get("priority") || "Non renseigné";

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          PiloEco
        </p>

        <h1 className="mt-3 text-4xl font-black">
          ❤️ Résultat de ton analyse mutuelle
        </h1>

        <p className="mt-4 max-w-3xl text-slate-300">
          Pilo analyse ton budget et tes priorités afin de
          t&apos;aider à identifier des solutions de couverture
          santé pouvant correspondre à ton profil.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Situation
            </p>

            <p className="mt-2 text-xl font-bold">
              {situation}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Budget actuel
            </p>

            <p className="mt-2 text-xl font-bold">
              {monthlyPrice} € / mois
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Priorité
            </p>

            <p className="mt-2 text-xl font-bold">
              {priority}
            </p>
          </div>
        </div>

        <section className="mt-10 rounded-3xl border border-green-500/30 bg-green-500/10 p-6 md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">
            💡 Opportunité d&apos;économie détectée
          </p>

          <h2 className="mt-3 text-3xl font-black">
            Vérifie si une autre mutuelle peut être plus avantageuse
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            Tu indiques actuellement un budget de{" "}
            <strong className="text-white">
              {monthlyPrice} € / mois
            </strong>
            . Pilo peut te présenter plusieurs partenaires
            correspondant à ton besoin et à ta priorité :{" "}
            <strong className="text-white">
              {priority}
            </strong>
            .
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-5">
            <p className="font-bold text-white">
              Pourquoi Pilo n&apos;affiche pas encore une économie chiffrée ?
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              Le tarif d&apos;une mutuelle dépend de plusieurs
              critères personnels et des garanties choisies.
              Pilo ne peut donc pas connaître ton économie réelle
              avant que le partenaire ait calculé ton tarif.
            </p>
          </div>

          <div className="mt-4 rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
            <p className="font-bold text-green-300">
              🎯 L&apos;objectif reste le même
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              Consulte les solutions proposées, récupère ton
              tarif personnalisé et compare-le à ce que tu paies
              actuellement. Tu poursuis uniquement si la solution
              est réellement plus intéressante pour toi.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black">
            Les solutions disponibles
          </h2>

          <p className="mt-2 text-slate-400">
            Les partenaires correspondant à ton profil pourront
            apparaître ici au fur et à mesure de leur intégration.
          </p>

          <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
            <div className="text-4xl">
              🤝
            </div>

            <h3 className="mt-4 text-xl font-bold">
              Partenaires mutuelle en cours d&apos;intégration
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-slate-400">
              PiloEco travaille actuellement à l&apos;intégration
              de partenaires spécialisés en mutuelle santé afin
              de pouvoir te proposer plusieurs solutions adaptées
              à ton profil.
            </p>

            <div className="mt-6 inline-flex rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-bold text-green-400">
              En cours de partenaire
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="font-bold text-white">
            Une fois ton tarif obtenu
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Reviens dans Pilo avec le montant proposé.
            Pilo pourra alors comparer ce tarif à tes{" "}
            <strong className="text-white">
              {monthlyPrice} € / mois
            </strong>{" "}
            actuels et calculer ton économie réelle.
          </p>
        </section>
      </div>
    </main>
  );
}