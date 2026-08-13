"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import PiloAdvice from "../../components/PiloAdvice";
import { supabase } from "../../lib/supabase";
import { completeMission } from "../../services/missionComplete.service";

const GSELECT_CLIENT_URL =
  "https://client.gselect-assurances.fr/Guillaume_Garnier?indicateur=5216";

export default function AssuranceEmprunteurOfferPage() {
  const router = useRouter();

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
        missionId: "assurance-emprunteur",
        title: "Optimiser mon assurance emprunteur",
        saving: 0,
      });

      window.alert(result.message);

      router.replace("/dashboard");
    } catch (error) {
      console.error(
        "Erreur lors de la validation de la mission assurance emprunteur :",
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
          href="/missions/assurance-emprunteur"
          className="font-bold text-green-400"
        >
          ← Retour à la mission assurance emprunteur
        </Link>

        <section className="mt-8 rounded-[2rem] border border-green-500/20 bg-white/5 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            Offre assurance emprunteur recommandée par Pilo
          </p>

          <h1 className="mt-4 text-5xl font-black">
            🏦 GSelect Assurances
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            GSelect Assurances peut étudier ton assurance emprunteur et
            vérifier si une solution plus adaptée ou moins coûteuse peut
            correspondre à ta situation.
          </p>

          <div className="mt-8 rounded-3xl bg-slate-950/70 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
              Tarif
            </p>

            <p className="mt-3 text-3xl font-black text-white">
              Étude personnalisée
            </p>

            <p className="mt-3 leading-7 text-slate-400">
              Le tarif dépend notamment de ton prêt, de ton profil, de ton
              âge, de la durée restante et des garanties nécessaires.
            </p>
          </div>

          <div className="mt-8 rounded-3xl bg-green-500/10 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">
              💡 Opportunité d&apos;économie
            </p>

            <p className="mt-3 text-3xl font-black text-green-400">
              À vérifier avec GSelect
            </p>

            <p className="mt-3 leading-7 text-slate-300">
              Pilo ne peut pas annoncer une économie avant que GSelect ait
              calculé une proposition adaptée à ton dossier.
            </p>
          </div>

          <PiloAdvice
            title="Pourquoi Pilo te propose GSelect ?"
            message="Ton assurance emprunteur peut représenter une part importante du coût total de ton crédit. Une étude personnalisée permet de vérifier si ton contrat actuel reste compétitif tout en conservant des garanties adaptées."
          />

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="font-black text-white">
              🔎 Comment ça fonctionne ?
            </p>

            <div className="mt-5 space-y-4 text-slate-300">
              <p>
                1. Tu accèdes au parcours GSelect depuis Pilo.
              </p>

              <p>
                2. Tu renseignes les informations nécessaires à l&apos;étude.
              </p>

              <p>
                3. GSelect vérifie les solutions pouvant correspondre à ton
                profil.
              </p>

              <p>
                4. Tu compares librement la proposition avec ton contrat
                actuel.
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <a
              href={GSELECT_CLIENT_URL}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block w-full rounded-full bg-green-500 px-8 py-5 text-center text-xl font-black text-slate-950 transition hover:bg-green-400"
            >
              Demander mon étude GSelect →
            </a>

            <p className="text-center text-sm leading-6 text-slate-500">
              Tu vas être redirigé vers le site de GSelect Assurances.
              Vérifie le tarif, les garanties et les conditions avant toute
              souscription.
            </p>

            <button
              type="button"
              onClick={handleMissionCompleted}
              className="w-full rounded-full border border-green-500 px-8 py-5 text-xl font-black text-green-400 transition hover:bg-green-500 hover:text-slate-950"
            >
              ✅ J&apos;ai terminé cette mission
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}