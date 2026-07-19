"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import PiloAdvice from "../../components/PiloAdvice";
import { supabase } from "../../lib/supabase";
import { completeMission } from "../../services/missionComplete.service";

export default function HabitationOfferPage() {
  const router = useRouter();

  const monthlyPrice = 18;
  const yearlySaving = 168;

  const handleMissionCompleted = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.alert("Tu dois être connecté.");
        router.replace("/connexion");
        return;
      }

      const result = await completeMission({
        user,
        missionId: "habitation",
        title: "Réduire mon assurance habitation",
        saving: yearlySaving,
      });

      window.alert(result.message);

      router.replace("/dashboard");
    } catch (error) {
      console.error(
        "Erreur lors de la validation de la mission habitation :",
        error
      );

      window.alert(
        error instanceof Error
          ? error.message
          : "Impossible de valider cette mission pour le moment."
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/missions/habitation"
          className="font-bold text-green-400"
        >
          ← Retour à la mission habitation
        </Link>

        <section className="mt-8 rounded-[2rem] border border-green-500/20 bg-white/5 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            Offre habitation recommandée par Pilo
          </p>

          <h1 className="mt-4 text-5xl font-black">
            🏠 Acheel Assurance Habitation
          </h1>

          <div className="mt-8 rounded-3xl bg-slate-950/70 p-6">
            <p className="text-slate-400">
              À partir de
            </p>

            <p className="mt-2 text-5xl font-black text-green-400">
              {monthlyPrice} €/mois
            </p>
          </div>

          <div className="mt-8 rounded-3xl bg-green-500/10 p-6">
            <p className="text-green-300">
              Économie estimée
            </p>

            <p className="mt-2 text-5xl font-black text-green-400">
              {yearlySaving} €/an
            </p>
          </div>

          <PiloAdvice
            title="Pourquoi Pilo recommande cette offre ?"
            message="Cette assurance habitation offre un bon niveau de garanties pour un tarif compétitif. Pilo estime qu'elle peut réduire le coût de ton contrat actuel."
          />

          <div className="mt-10 space-y-4">
            <a
              href="https://www.acheel.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full bg-green-500 px-8 py-5 text-center text-xl font-black text-slate-950 transition hover:bg-green-400"
            >
              Voir l&apos;offre habitation
            </a>

            <button
              type="button"
              onClick={handleMissionCompleted}
              className="w-full rounded-full border border-green-500 px-8 py-5 text-xl font-black text-green-400 transition hover:bg-green-500 hover:text-slate-950"
            >
              ✅ J&apos;ai changé d&apos;offre
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}