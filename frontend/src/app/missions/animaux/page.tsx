"use client";

import Link from "next/link";
import PiloAdvice from "../../components/PiloAdvice";

export default function AnimauxOfferPage() {
  const monthlyPrice = 22;
  const yearlySaving = 156;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/missions/animaux" className="font-bold text-green-400">
          ← Retour à la mission animaux
        </Link>

        <section className="mt-8 rounded-[2rem] border border-green-500/20 bg-white/5 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            Offre animaux recommandée par Pilo
          </p>

          <h1 className="mt-4 text-5xl font-black">
            🐶 SantéVet Assurance Animaux
          </h1>

          <div className="mt-8 rounded-3xl bg-slate-950/70 p-6">
            <p className="text-slate-400">À partir de</p>
            <p className="mt-2 text-5xl font-black text-green-400">
              {monthlyPrice} €/mois
            </p>
          </div>

          <div className="mt-8 rounded-3xl bg-green-500/10 p-6">
            <p className="text-green-300">Économie estimée</p>
            <p className="mt-2 text-5xl font-black text-green-400">
              {yearlySaving} €/an
            </p>
          </div>

          <PiloAdvice
            title="Pourquoi Pilo recommande cette offre ?"
            message="Cette assurance animaux propose une couverture adaptée pour chien ou chat, avec un bon équilibre entre prix, garanties et simplicité."
          />

          <div className="mt-10">
            <a
              href="https://www.santevet.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full bg-green-500 px-8 py-5 text-center text-xl font-black text-slate-950 transition hover:bg-green-400"
            >
              Voir l'offre animaux
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}