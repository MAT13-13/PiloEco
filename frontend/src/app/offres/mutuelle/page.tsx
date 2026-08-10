"use client";

import { useSearchParams } from "next/navigation";

export default function MutuelleOffersPage() {
  const searchParams = useSearchParams();

  const situation = searchParams.get("situation") || "Non renseignée";
  const monthlyPrice = Number(searchParams.get("monthlyPrice") || 70);
  const priority = searchParams.get("priority") || "Non renseigné";

  const recommendedPrice = Math.max(monthlyPrice - 20, 20);
  const estimatedSaving = Math.max(monthlyPrice - recommendedPrice, 0);
  const annualSaving = estimatedSaving * 12;

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
          Pilo analyse ton budget et tes priorités afin de t'aider à identifier
          une couverture santé plus adaptée.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Situation</p>

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

        <section className="mt-10 rounded-3xl border border-green-500/30 bg-slate-900 p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
                🏆 Recommandation Pilo
              </p>

              <h2 className="mt-3 text-2xl font-black">
                Une mutuelle autour de {recommendedPrice} € / mois
              </h2>

              <p className="mt-3 max-w-2xl text-slate-300">
                Selon les informations renseignées, une offre autour de ce
                budget pourrait être intéressante tout en conservant une
                couverture adaptée à ta priorité :{" "}
                <span className="font-semibold text-white">
                  {priority}
                </span>.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950 px-6 py-5 text-center">
              <p className="text-sm text-slate-400">
                Économie potentielle
              </p>

              <p className="mt-1 text-3xl font-black text-green-400">
                {estimatedSaving} €
              </p>

              <p className="text-sm text-slate-400">
                par mois
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <p className="font-bold">
              💰 Jusqu'à {annualSaving} € d'économie estimée par an
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Cette estimation est indicative et dépend des garanties, de l'âge,
              de la situation personnelle et des conditions proposées par les
              assureurs.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black">
            Les solutions disponibles
          </h2>

          <p className="mt-2 text-slate-400">
            Les partenaires correspondant à ton profil apparaîtront ici.
          </p>

          <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
            <div className="text-4xl">
              🤝
            </div>

            <h3 className="mt-4 text-xl font-bold">
              Partenaires mutuelle en cours d'intégration
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-slate-400">
              PiloEco travaille actuellement à l'intégration de partenaires
              spécialisés en mutuelle santé afin de pouvoir te proposer des
              solutions adaptées à ton profil.
            </p>

            <div className="mt-6 inline-flex rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-bold text-green-400">
              En cours de partenaire
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}