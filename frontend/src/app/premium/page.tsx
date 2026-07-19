"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import ScoreGauge from "../components/ScoreGauge";
import PiloAssistant from "../components/PiloAssistant";
import PiloInsights from "../components/PiloInsights";
import MissionCard from "../components/MissionCard";
import MonitoringDashboard from "../components/MonitoringDashboard";
import PiloJournal from "../components/PiloJournal";
import PiloCommandCenter from "../components/PiloCommandCenter";

import {
  getDepenses,
  type Depense,
} from "../services/finance/depenses.service";
import { analysePiloEngine } from "../services/pilo-engine/analyse";
import { supabase } from "../lib/supabase";

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
  const [premiumLoading, setPremiumLoading] =
    useState(true);
  const [checkoutLoading, setCheckoutLoading] =
    useState(false);
  const [isPremium, setIsPremium] =
    useState(false);
  const [paymentSuccess, setPaymentSuccess] =
    useState(false);

  async function loadPremiumStatus() {
    try {
      setPremiumLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error(
          "Erreur récupération utilisateur :",
          userError
        );
        return;
      }

      if (!user) {
        setIsPremium(false);
        return;
      }

      const { data, error } = await supabase
        .from("profils")
        .select("premium")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error(
          "Erreur chargement statut Premium :",
          error
        );
        return;
      }

      setIsPremium(data?.premium === true);
    } catch (error) {
      console.error(
        "Erreur vérification Premium :",
        error
      );
    } finally {
      setPremiumLoading(false);
    }
  }

  async function checkout() {
    if (checkoutLoading || isPremium) {
      return;
    }

    try {
      setCheckoutLoading(true);

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error(
          "Erreur session Supabase :",
          sessionError
        );

        alert(
          "Impossible de vérifier ta connexion."
        );

        return;
      }

      if (!session?.access_token) {
        alert(
          "Tu dois être connecté pour passer Premium."
        );

        return;
      }

      const response = await fetch(
        "/api/stripe/checkout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            "Impossible d'ouvrir le paiement Stripe."
        );

        return;
      }

      if (!data.url) {
        alert(
          "Stripe n'a renvoyé aucune URL de paiement."
        );

        return;
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(
        "Erreur checkout :",
        error
      );

      alert(
        "Erreur pendant l'ouverture de Stripe."
      );
    } finally {
      setCheckoutLoading(false);
    }
  }

  useEffect(() => {
    async function loadPage() {
      try {
        const searchParams =
          new URLSearchParams(
            window.location.search
          );

        const success =
          searchParams.get("success") === "true";

        setPaymentSuccess(success);

        await loadPremiumStatus();

        const data = await getDepenses();
        setDepenses(data);
      } catch (error) {
        console.error(
          "Erreur chargement page Premium :",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadPage();
  }, []);

  const fallbackSavings = opportunities.reduce(
    (total, item) => total + item.saving,
    0
  );

  const analysis = {
    score: 84,
    totalSavings: fallbackSavings,
    insights: [],
  };

  const engine = analysePiloEngine(depenses);

  const totalSavings = engine.yearlySavings;
  const score = engine.score;
  const missions: any[] = [];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/depenses"
          className="text-green-400 hover:text-green-300"
        >
          ← Retour aux dépenses
        </Link>

        {paymentSuccess && isPremium && (
          <div className="mt-8 rounded-3xl border border-green-400/40 bg-green-500/15 p-6">
            <p className="text-2xl font-black text-green-300">
              🎉 Bienvenue dans Pilo Premium !
            </p>

            <p className="mt-2 text-slate-200">
              Ton paiement a bien été validé et ton
              compte Premium est maintenant actif.
            </p>
          </div>
        )}

        {paymentSuccess &&
          !isPremium &&
          !premiumLoading && (
            <div className="mt-8 rounded-3xl border border-yellow-400/40 bg-yellow-500/15 p-6">
              <p className="text-xl font-black text-yellow-300">
                ⏳ Activation de Pilo Premium en cours
              </p>

              <p className="mt-2 text-slate-200">
                Ton paiement a été reçu. Actualise la
                page dans quelques secondes si ton
                statut Premium ne s'affiche pas encore.
              </p>
            </div>
          )}

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
            Avec Pilo Premium, tu ne vois pas seulement
            combien tu peux économiser. Tu débloques
            PiloLife, le coaching qui transforme chaque
            euro économisé en objectif concret : maison,
            voyage, voiture, projet ou épargne.
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

          {premiumLoading ? (
            <div className="mt-6 rounded-2xl bg-slate-800 px-7 py-4 text-lg font-bold text-slate-300">
              Vérification de ton abonnement...
            </div>
          ) : isPremium ? (
            <div className="mt-6 rounded-2xl border border-green-400/40 bg-green-500/20 px-7 py-4">
              <p className="text-lg font-black text-green-300">
                ✅ Ton abonnement Pilo Premium est actif
              </p>

              <Link
                href="/pilolife"
                className="mt-3 inline-block rounded-xl bg-green-400 px-5 py-3 font-black text-slate-950 hover:bg-green-300"
              >
                🚀 Accéder à PiloLife
              </Link>
            </div>
          ) : (
            <button
              type="button"
              onClick={checkout}
              disabled={checkoutLoading}
              className="mt-6 rounded-2xl bg-yellow-400 px-7 py-4 text-lg font-black text-slate-950 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {checkoutLoading
                ? "Ouverture du paiement..."
                : "⭐ Passer à Pilo Premium"}
            </button>
          )}

          {loading ? (
            <div className="mt-8 rounded-3xl bg-slate-950 p-8 text-slate-400">
              Analyse de Pilo en cours...
            </div>
          ) : (
            <>
              <PiloAssistant
                score={score}
                savings={totalSavings}
              />

              <div className="mt-8">
                <PiloCommandCenter
                  notifications={
                    engine.notifications
                  }
                />
              </div>

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
                    <p className="text-slate-400">
                      💰 Économies détectées
                    </p>

                    <p className="mt-3 text-5xl font-black text-green-400">
                      {totalSavings} €
                    </p>

                    <p className="mt-2 text-slate-500">
                      d'économies par an
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-950 p-6">
                    <p className="text-slate-400">
                      ⭐ Premium
                    </p>

                    <p className="mt-3 text-5xl font-black text-green-400">
                      {isPremium
                        ? "Actif"
                        : "4,99 €"}
                    </p>

                    <p className="mt-2 text-slate-500">
                      {isPremium
                        ? "abonnement activé"
                        : "par mois"}
                    </p>
                  </div>
                </div>
              </section>

              <section className="mt-10">
                <MonitoringDashboard
                  cards={engine.monitoring}
                />
              </section>

              <PiloJournal />

              <PiloInsights
                insights={analysis.insights}
              />

              <MissionCard missions={missions} />
            </>
          )}
        </section>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-3xl font-black">
            🧠 Coffre des économies
          </h2>

          <p className="mt-3 text-slate-400">
            Pilo détecte les domaines où tu pourrais
            économiser.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {opportunities.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-3xl">
                      {item.icon}
                    </p>

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

                {isPremium ? (
                  <Link
                    href="/pilolife"
                    className="mt-6 block w-full rounded-xl bg-green-500 px-5 py-3 text-center font-bold text-slate-950 hover:bg-green-400"
                  >
                    ✅ Premium actif
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={checkout}
                    disabled={
                      checkoutLoading ||
                      premiumLoading
                    }
                    className="mt-6 w-full rounded-xl bg-green-500 px-5 py-3 font-bold text-slate-950 hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {checkoutLoading
                      ? "Ouverture..."
                      : "🚀 Passer Premium"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}