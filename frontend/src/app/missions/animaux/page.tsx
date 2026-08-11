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
              🐾 Solutions pour chiens, chats et NAC
            </div>
          </div>

          <PiloAdvice
            title="Comment Pilo t'aide ?"
            message="Pilo te redirige vers une solution partenaire afin d'obtenir un tarif réel. Tu peux ensuite comparer ce montant à ta dépense actuelle et décider uniquement si l'offre est réellement intéressante pour toi."
          />

          <div className="mt-8 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
              Partenaire assurance animaux
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Compare les assurances animaux
            </h2>

            <p className="mt-4 text-slate-300">
              Compare gratuitement différentes solutions d&apos;assurance
              pour chien, chat ou NAC et obtiens un tarif adapté à ton animal.
            </p>

            <a
              href="https://stella-2.com/clc/PyCCpFfs3jche1T9Ly4w0w"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-6 inline-flex rounded-2xl bg-green-500 px-6 py-3 font-black text-slate-950 transition hover:bg-green-400"
            >
              Comparer les assurances animaux →
            </a>

            <p className="mt-4 text-xs leading-5 text-slate-500">
              Lien partenaire. PiloEco peut percevoir une rémunération si tu
              effectues une action éligible auprès du partenaire.
            </p>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="font-bold text-white">
              🎯 L&apos;objectif reste l&apos;économie
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Obtiens d&apos;abord ton tarif réel auprès du partenaire, puis
              compare-le à ton contrat actuel. Pilo pourra ensuite t&apos;aider
              à déterminer si le changement représente réellement une
              économie.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}