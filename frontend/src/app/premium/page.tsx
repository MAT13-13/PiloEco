"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import ScoreGauge from "../components/ScoreGauge";
import PiloAssistant from "../components/PiloAssistant";
import PiloInsights from "../components/PiloInsights";
import MissionCard from "../components/MissionCard";

import { getDepenses, type Depense } from "../services/depenses.service";
import { analyzePilo } from "../services/pilo.service";
import { generateMissions } from "../services/missions.service";


const opportunities = [
  {
    title: "Assurance habitation",
    icon: "🏠",
    saving: 126,
    status: "Disponible bientôt",
  },
  {
    title: "Forfait mobile",
    icon: "📱",
    saving: 192,
    status: "Disponible bientôt",
  },
  {
    title: "Assurance animaux",
    icon: "🐶",
    saving: 84,
    status: "Priorité lancement",
  },
  {
    title: "Abonnements inutilisés",
    icon: "📦",
    saving: 87,
    status: "En analyse",
  },
];

export default function PremiumPage() {
  const [depenses, setDepenses] = useState<Depense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDepenses() {
      try {
        const data = await getDepenses();
        setDepenses(data);
      } catch (error) {
        console.error("Erreur chargement dépenses :", error);
      } finally {
        setLoading(false);
      }
    }

    loadDepenses();
  }, []);

  const analysis = analyzePilo(depenses);
  const missions = generateMissions(depenses);

  const fallbackSavings = opportunities.reduce(
    (total, item) => total + item.saving,
    0
  );

  const totalSavings =
    analysis.totalSavings > 0 ? analysis.totalSavings : fallbackSavings;

  const score = depenses.length > 0 ? analysis.score : 84;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/depenses" className="text-green-400 hover:text-green-300">
          ← Retour aux dépenses
        </Link>

        <section className="mt-10 rounded-3xl border border-green-500/30 bg-slate-900 p-8">
          <p className="text-sm font-bold uppercase text-green-400">
            Premium PiloEco
          </p>

          <h1 className="mt-4 text-5xl font-black leading-tight">
  ⭐ Pilo Premium
  <br />
  Transforme tes économies en projets de vie
</h1>

         <p className="mt-5 max-w-3xl text-lg text-slate-300">
  Avec Pilo Premium, tu ne vois pas seulement combien tu peux économiser.
  Tu débloques PiloLife, le coaching qui transforme chaque euro économisé
  en objectif concret : maison, voyage, voiture, projet ou épargne.
</p>

<div className="mt-6 flex flex-wrap gap-3">
  <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-bold text-green-300">
    🐦 PiloLife inclus
  </span>
  <span className="rounded-full bg-yellow-500/20 px-4 py-2 text-sm font-bold text-yellow-300">
    ⭐ 4,99 €/mois
  </span>
  <span className="rounded-full bg-slate-800 px-4 py-2 text-sm font-bold text-slate-300">
    🔒 Sans engagement
  </span>
</div>

          {loading ? (
            <div className="mt-8 rounded-3xl bg-slate-950 p-8 text-slate-400">
              Analyse de Pilo en cours...
            </div>
          ) : (
            <>
              <PiloAssistant score={score} savings={totalSavings} />

              <section className="mt-8 space-y-6">
                <ScoreGauge
                  score={score}
                  totalSavings={totalSavings}
                  level={
                    score >= 75
                      ? "Très bon potentiel"
                      : "Potentiel à améliorer"
                  }
                />

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rounded-2xl bg-slate-950 p-6">
                    <p className="text-slate-400">💰 Économies détectées</p>

                    <p className="mt-3 text-5xl font-black text-green-400">
                      {totalSavings} €
                    </p>

                    <p className="mt-2 text-slate-500">
                      d'économies par an
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-950 p-6">
                    <p className="text-slate-400">⭐ Premium</p>

                    <p className="mt-3 text-5xl font-black text-green-400">
                      4,99 €
                    </p>

                    <p className="mt-2 text-slate-500">par mois</p>
                  </div>
                </div>
              </section>

              <PiloInsights insights={analysis.insights} />

              <MissionCard missions={missions} />
            </>
          )}
        </section>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-3xl font-black">🧠 Coffre des économies</h2>

          <p className="mt-3 text-slate-400">
            Pilo détecte les domaines où tu pourrais économiser.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {opportunities.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-3xl">{item.icon}</p>

                    <h3 className="mt-5 text-2xl font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-slate-400">
                      Économie estimée :{" "}
                      <span className="font-bold text-green-400">
                        {item.saving} €/an
                      </span>
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                    {item.status}
                  </span>
                </div>

                <button className="mt-6 w-full rounded-xl bg-green-500 px-5 py-3 font-bold text-slate-950 hover:bg-green-400">
                  Voir les offres
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}