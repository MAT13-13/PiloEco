"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { internetOffers } from "../../data/internetOffers";
import { supabase } from "../../lib/supabase";

export default function InternetOfferPage() {
  const [internet, setInternet] = useState(40);

  useEffect(() => {
    const data = localStorage.getItem("pilo-values");

    if (data) {
      const values = JSON.parse(data);
      setInternet(Number(values.internet));
    }
  }, []);

  const bestOffer = internetOffers.sort((a, b) => a.price - b.price)[0];
  const monthlySaving = Math.max(0, internet - bestOffer.price);
  const yearlySaving = Math.round(monthlySaving * 12);

  const handleMissionCompleted = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Tu dois être connecté.");
      return;
    }

    const { error } = await supabase.from("missions").insert({
      user_id: user.id,
      mission_id: "internet",
      title: "Réduire mon abonnement Internet",
      status: "done",
      saving: yearlySaving,
      completed_at: new Date().toISOString(),
    });

    if (error) {
      console.error(error);
      alert("Erreur lors de la sauvegarde.");
      return;
    }

    alert(`🎉 Bravo ! Mission terminée.\nTu économises ${yearlySaving} €/an !`);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/missions" className="font-bold text-green-400">
          ← Retour aux missions
        </Link>

        <section className="mt-8 rounded-[2rem] border border-green-500/20 bg-white/5 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            Offre Internet recommandée par Pilo
          </p>

          <h1 className="mt-4 text-5xl font-black">
            🏆 {bestOffer.operator}
          </h1>

          <p className="mt-3 text-2xl font-bold text-slate-300">
            {bestOffer.name}
          </p>

          <div className="mt-8 rounded-3xl bg-slate-950/70 p-6">
            <p className="text-slate-400">Prix mensuel</p>
            <p className="mt-2 text-5xl font-black text-green-400">
              {bestOffer.price.toFixed(2)} €/mois
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              🌐 Technologie : {bestOffer.technology}
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              ⚡ Débit : {bestOffer.speed}
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              🏷️ {bestOffer.savingLabel}
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              💰 Économie : {yearlySaving} €/an
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-green-500/10 p-6">
            <p className="text-green-300">Économie estimée</p>
            <p className="mt-2 text-5xl font-black text-green-400">
              {yearlySaving} €/an
            </p>
          </div>

          <div className="mt-8 rounded-3xl border border-green-500/20 bg-slate-900 p-6">
            <p className="text-xl font-black text-green-400">
              Pourquoi Pilo recommande cette offre ?
            </p>

            <p className="mt-3 leading-8 text-slate-300">
              Ton abonnement Internet actuel est estimé à {internet} €/mois.
              Pilo a trouvé une offre à {bestOffer.price.toFixed(2)} €/mois.
              Cela représente environ {yearlySaving} €/an d'économies possibles.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            <a
              href={bestOffer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full bg-green-500 px-8 py-5 text-center text-xl font-black text-slate-950"
            >
              Voir l'offre Internet
            </a>

            <button
              onClick={handleMissionCompleted}
              className="w-full rounded-full border border-green-500 px-8 py-5 text-xl font-black text-green-400 transition hover:bg-green-500 hover:text-slate-950"
            >
              ✅ J'ai changé d'offre Internet
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}