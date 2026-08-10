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
            Pilo t&apos;aide à identifier des solutions pouvant correspondre
            à ton besoin de protection pour ton animal.
          </p>

          <div className="mt-8 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">
              💡 Opportunité d&apos;économie détectée
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Compare avant de changer
            </h2>

            <p className="mt-4 text-slate-300">
              Le tarif d&apos;une assurance animaux dépend du profil de
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
            message="Pilo te présente les solutions disponibles selon ton besoin. Compare le tarif obtenu avec ton contrat actuel et poursuis uniquement si l'offre est réellement plus avantageuse pour toi."
          />

          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="font-bold text-white">
              Partenaire actuellement disponible
            </p>

            <p className="mt-3 text-slate-300">
              Pilo dispose actuellement d&apos;une solution partenaire pour
              l&apos;assurance animaux.
            </p>

            <a
              href="https://www.propoil.fr/"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-6 block w-full rounded-full bg-green-500 px-8 py-5 text-center text-xl font-black text-slate-950 transition hover:bg-green-400"
            >
              Voir la solution Propoil
            </a>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="font-bold text-white">
              D&apos;autres partenaires pourront apparaître
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Pilo pourra proposer plusieurs solutions selon ton besoin au fur
              et à mesure des intégrations partenaires.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}