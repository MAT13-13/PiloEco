"use client";

import Link from "next/link";
import PiloAdvice from "../../components/PiloAdvice";

export default function AnimauxOfferPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/missions/animaux"
          className="text-green-400 hover:underline"
        >
          ← Retour à la mission animaux
        </Link>

        <section className="mt-8 rounded-[2rem] border border-green-500/20 bg-white/5 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            Solution animaux identifiée par Pilo
          </p>

          <h1 className="mt-4 text-5xl font-black">
            🐶 Assurance animaux
          </h1>

          <p className="mt-5 max-w-3xl text-slate-300">
            Pilo t&apos;aide à identifier les dépenses liées à la protection
            de ton animal qui pourraient être optimisées.
          </p>

          <div className="mt-8 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">
              💡 Opportunité d&apos;économie détectée
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Compare avant de changer
            </h2>

            <p className="mt-4 text-slate-300">
              Le tarif d&apos;une assurance animaux dépend notamment de
              l&apos;animal, de son âge, de sa race et du niveau de garanties.
              Pilo ne chiffre donc pas une économie tant qu&apos;un vrai tarif
              partenaire n&apos;a pas été obtenu.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              🩺 Frais vétérinaires
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              🐾 Solutions pour chiens et chats
            </div>
          </div>

          <PiloAdvice
            title="Comment Pilo t'aide ?"
            message="Pilo te présentera uniquement des solutions provenant de partenaires réellement intégrés. Tu pourras alors obtenir un tarif, le comparer à ta dépense actuelle et poursuivre seulement si l'offre est réellement avantageuse."
          />

          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
              Partenaires assurance animaux
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Partenaires en cours d&apos;intégration
            </h2>

            <p className="mt-4 text-slate-300">
              PiloEco travaille actuellement à l&apos;intégration de
              partenaires spécialisés en assurance animaux.
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Aucun bouton externe n&apos;est affiché tant qu&apos;un
              partenariat n&apos;est pas officiellement validé et que son lien
              affilié n&apos;a pas été vérifié.
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
              Dès qu&apos;une solution partenaire sera disponible, Pilo pourra
              te rediriger vers celle-ci afin d&apos;obtenir ton vrai tarif.
              Tu pourras ensuite comparer ce montant à ton contrat actuel et
              calculer ton économie réelle.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}