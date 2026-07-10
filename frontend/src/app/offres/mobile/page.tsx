"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mobileOffers } from "../../data/offers";
import { createRecommendation } from "../../services/ai/pilo-engine.service";
import PiloAdvice from "../../components/PiloAdvice";
import { supabase } from "../../lib/supabase";
import { completeMission } from "../../services/missionComplete.service";

export default function MobileOfferPage() {
  const [forfait, setForfait] = useState(45);

  useEffect(() => {
    const data = localStorage.getItem("pilo-values");

    if (data) {
      const values = JSON.parse(data);
      setForfait(Number(values.telephone));
    }
  }, []);

  const recommendation = createRecommendation(forfait, mobileOffers);

  if (!recommendation) {
    return null;
  }

  const bestOffer = recommendation.offer;
  const saving = recommendation.yearlySaving;

  const handleMissionCompleted = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Tu dois être connecté.");
      return;
    }

    const result = await completeMission({
      user,
      missionId: "mobile",
      title: "Réduire mon forfait mobile",
      saving,
    });

    alert(result.message);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/missions/mobile" className="font-bold text-green-400">
          ← Retour à la mission mobile
        </Link>

        <section className="mt-8 rounded-[2rem] border border-green-500/20 bg-white/5 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            Offre recommandée par Pilo
          </p>

          <h1 className="mt-4 text-5xl font-black">
            🏆 {bestOffer.provider}
          </h1>

          <div className="mt-8 rounded-3xl bg-slate-950/70 p-6">
            <p className="text-slate-400">Prix mensuel</p>

            <p className="mt-2 text-5xl font-black text-green-400">
              {bestOffer.monthlyPrice.toFixed(2)} €/mois
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              📶 Réseau : {bestOffer.network}
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              🌍 Data : {bestOffer.data}
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              🔓 {bestOffer.commitment}
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              ⭐ Score Pilo : {recommendation.score}/100
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-green-500/10 p-6">
            <p className="text-green-300">Économie estimée</p>

            <p className="mt-2 text-5xl font-black text-green-400">
              {saving} €/an
            </p>
          </div>

          <PiloAdvice
            title="Pourquoi Pilo recommande cette offre ?"
            message={recommendation.explanation}
          />

          <div className="mt-10 space-y-4">
            <a
              href={bestOffer.url || "https://mobile.free.fr/"}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full bg-green-500 px-8 py-5 text-center text-xl font-black text-slate-950 transition hover:bg-green-400"
            >
              Changer maintenant
            </a>

            <button
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