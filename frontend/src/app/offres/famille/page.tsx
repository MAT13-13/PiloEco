"use client";

import Link from "next/link";
import PiloAdvice from "../../components/PiloAdvice";
import { supabase } from "../../lib/supabase";
import { completeMission } from "../../services/missionComplete.service";

export default function FamilleOfferPage() {
  const monthlyPrice = 140;
  const yearlySaving = 480;

  const handleMissionCompleted = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Tu dois être connecté.");
      return;
    }

    await completeMission({
      user,
      missionId: "famille",
      title: "Optimiser mon budget famille",
      saving: yearlySaving,
    });
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/missions/famille" className="font-bold text-green-400">
          ← Retour à la mission famille
        </Link>

        <section className="mt-8 rounded-[2rem] border border-green-500/20 bg-white/5 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            Optimisation recommandée par Pilo
          </p>

          <h1 className="mt-4 text-5xl font-black">
            👨‍👩‍👧 Budget Famille Optimisé
          </h1>

          <div className="mt-8 rounded-3xl bg-slate-950/70 p-6">
            <p className="text-slate-400">Budget conseillé</p>

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
            title="Pourquoi Pilo recommande cette optimisation ?"
            message="Pilo a identifié plusieurs pistes d'économies : aides financières, optimisation des abonnements familiaux, dépenses scolaires, loisirs et services du quotidien."
          />

          <div className="mt-10 space-y-4">
            <a
              href="https://www.service-public.fr/particuliers/vosdroits/N19808"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full bg-green-500 px-8 py-5 text-center text-xl font-black text-slate-950 transition hover:bg-green-400"
            >
              Découvrir les aides disponibles
            </a>

            <button
              type="button"
              onClick={handleMissionCompleted}
              className="w-full rounded-full border border-green-500 px-8 py-5 text-xl font-black text-green-400 transition hover:bg-green-500 hover:text-slate-950"
            >
              ✅ J&apos;ai optimisé mon budget famille
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}