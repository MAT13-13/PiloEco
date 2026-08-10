"use client";

import Link from "next/link";
import PiloAdvice from "../../components/PiloAdvice";

export default function BanqueOfferPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/missions/banque"
          className="text-green-400 hover:underline"
        >
          ← Retour à la mission banque
        </Link>

        <section className="mt-8 rounded-[2rem] border border-green-500/20 bg-white/5 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            Analyse banque par Pilo
          </p>

          <h1 className="mt-4 text-5xl font-black">
            🏦 Optimiser tes frais bancaires
          </h1>

          <p className="mt-5 max-w-3xl text-slate-300">
            Pilo t&apos;aide à identifier les frais bancaires qui pourraient
            être optimisés selon ton usage, ta carte et les services dont tu
            as réellement besoin.
          </p>

          <div className="mt-8 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">
              💡 Opportunité d&apos;économie
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Compare avant de changer
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              Les frais bancaires varient selon le type de compte, la carte,
              les services inclus, les conditions d&apos;utilisation et ton
              profil.
            </p>

            <p className="mt-3 leading-7 text-slate-300">
              Pilo ne présente donc pas de tarif ou d&apos;économie chiffrée
              tant qu&apos;une vraie solution partenaire n&apos;est pas
              disponible et vérifiée.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              💳 Frais de carte et de tenue de compte
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              📱 Services bancaires utiles au quotidien
            </div>
          </div>

          <PiloAdvice
            title="Comment Pilo t'aide ?"
            message="Pilo pourra te présenter uniquement des solutions bancaires provenant de partenaires réellement intégrés. Tu pourras ensuite comparer leurs conditions à tes frais actuels et décider librement si le changement est avantageux."
          />

          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
              Partenaires banque
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Partenaires en cours d&apos;intégration
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              PiloEco travaille actuellement à l&apos;intégration de
              partenaires bancaires afin de pouvoir proposer des solutions
              réelles et suivies.
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
              Dès qu&apos;une solution bancaire partenaire sera disponible,
              Pilo pourra te la présenter. Tu pourras alors comparer ses frais
              à ceux de ta banque actuelle et vérifier si l&apos;économie est
              réelle.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}