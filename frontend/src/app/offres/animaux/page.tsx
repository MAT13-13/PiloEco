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
            Solution partenaire identifiée par Pilo
          </p>

          <h1 className="mt-4 text-5xl font-black">
            🐶 Assurance animaux
          </h1>

          <p className="mt-5 max-w-3xl text-slate-300">
            Pilo a identifié une solution pouvant correspondre
            à ton besoin de protection pour ton animal.
          </p>

          <div className="mt-8 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">
              💡 Opportunité d&apos;économie détectée
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Vérifie si tu peux payer moins cher
            </h2>

            <p className="mt-4 text-slate-300">
              Le tarif d&apos;une assurance animaux dépend notamment
              de l&apos;animal, de son âge, de sa race et du niveau
              de couverture choisi.
            </p>

            <p className="mt-3 text-slate-300">
              Pilo ne peut donc pas annoncer une économie réelle
              avant que le partenaire ait calculé ton tarif.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              🩺 Protection contre certains frais vétérinaires
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              🐾 Solutions pouvant être adaptées aux chiens et aux chats
            </div>
          </div>

          <PiloAdvice
            title="Comment Pilo t'aide ?"
            message="Pilo t'oriente vers les solutions disponibles correspondant à ton besoin. Consulte le tarif proposé, compare-le à ta dépense actuelle et poursuis uniquement si la solution est réellement avantageuse pour toi."
          />

          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="font-bold text-white">
              🎯 L&apos;objectif reste l&apos;économie
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              Tu vas être redirigé vers le partenaire afin
              d&apos;obtenir les informations et le tarif correspondant
              à ton profil. Tu restes libre de poursuivre ou non.
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Une fois ton tarif obtenu, tu pourras revenir dans
              Pilo pour comparer le nouveau montant à ton contrat
              actuel et calculer ton économie réelle.
            </p>
          </div>

          <a
            href="https://www.propoil.fr/"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="mt-8 block w-full rounded-full bg-green-500 px-8 py-5 text-center text-xl font-black text-slate-950 transition hover:bg-green-400"
          >
            Voir la solution partenaire
          </a>
        </section>
      </div>
    </main>
  );
}