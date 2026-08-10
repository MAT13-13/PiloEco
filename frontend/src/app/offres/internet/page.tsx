"use client";

import Link from "next/link";
import PiloAdvice from "../../components/PiloAdvice";

export default function InternetOfferPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/missions/internet"
          className="text-green-400 hover:underline"
        >
          ← Retour à la mission Internet
        </Link>

        <section className="mt-8 rounded-[2rem] border border-green-500/20 bg-white/5 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            Analyse Internet par Pilo
          </p>

          <h1 className="mt-4 text-5xl font-black">
            🌐 Optimiser ton abonnement Internet
          </h1>

          <p className="mt-5 max-w-3xl text-slate-300">
            Pilo analyse ton abonnement Internet actuel afin de t&apos;aider
            à identifier les possibilités d&apos;économie adaptées à ta
            situation.
          </p>

          <div className="mt-8 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">
              💡 Opportunité d&apos;économie
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Compare avant de changer
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              Le prix d&apos;un abonnement Internet dépend notamment de ton
              adresse, de ton éligibilité, de la technologie disponible et
              des services inclus.
            </p>

            <p className="mt-3 leading-7 text-slate-300">
              Pilo ne présente donc pas de tarif ou d&apos;économie théorique
              comme une offre réelle lorsqu&apos;aucune solution partenaire
              vérifiée n&apos;est disponible.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              🌐 Fibre, câble ou autres technologies selon ton éligibilité
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              ⚡ Comparaison selon tes besoins et ton abonnement actuel
            </div>
          </div>

          <PiloAdvice
            title="Comment Pilo t'aide ?"
            message="Pilo analyse ton abonnement actuel et pourra te présenter uniquement les solutions partenaires réellement disponibles. Tu resteras libre de consulter l'offre et de décider si elle est intéressante pour toi."
          />

          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
              Partenaires Internet
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Partenaires en cours d&apos;intégration
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              PiloEco travaille actuellement à l&apos;intégration de
              partenaires Internet afin de pouvoir proposer des solutions
              réelles et vérifiées.
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Aucune offre commerciale n&apos;est affichée tant qu&apos;un
              partenariat n&apos;est pas validé et que son lien partenaire
              n&apos;est pas disponible.
            </p>

            <div className="mt-6 inline-flex rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-bold text-green-400">
              En cours d&apos;intégration
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="font-bold text-white">
              🔔 De nouvelles solutions pourront apparaître
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Dès qu&apos;un partenaire Internet sera officiellement intégré,
              Pilo pourra afficher sa solution et te permettre de la
              consulter directement.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}