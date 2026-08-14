"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { supabase } from "../lib/supabase";

export default function PremiumPage() {
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
      const searchParams =
        new URLSearchParams(
          window.location.search
        );

      const success =
        searchParams.get("success") === "true";

      setPaymentSuccess(success);

      await loadPremiumStatus();
    }

    loadPage();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/dashboard"
          className="text-sm font-bold text-green-400 transition hover:text-green-300"
        >
          ← Retour au dashboard
        </Link>

        {paymentSuccess && isPremium && (
          <div className="mt-8 rounded-3xl border border-green-400/40 bg-green-500/15 p-6">
            <p className="text-2xl font-black text-green-300">
              🎉 Bienvenue dans Pilo Premium !
            </p>

            <p className="mt-2 text-slate-200">
              Ton compte Premium est maintenant actif.
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
                Ton paiement a été reçu. Actualise la page
                dans quelques secondes si ton statut ne
                s&apos;affiche pas encore.
              </p>
            </div>
          )}

        {/* HERO PREMIUM */}
        <section className="mt-8 overflow-hidden rounded-[2rem] border border-purple-500/30 bg-gradient-to-br from-purple-950/70 via-slate-900 to-slate-950 p-7 shadow-2xl sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-purple-300">
                💎 Pilo Premium
              </p>

              <h1 className="mt-4 text-4xl font-black sm:text-5xl">
                Pilo veille pour toi
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                Suis tes contrats, reçois les bonnes alertes
                et transforme tes économies en projets.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-purple-500/15 px-4 py-2 text-sm font-bold text-purple-200">
                  📊 Monitoring
                </span>

                <span className="rounded-full bg-purple-500/15 px-4 py-2 text-sm font-bold text-purple-200">
                  🔔 Alertes
                </span>

                <span className="rounded-full bg-purple-500/15 px-4 py-2 text-sm font-bold text-purple-200">
                  🌿 PiloLife
                </span>

                <span className="rounded-full bg-yellow-500/15 px-4 py-2 text-sm font-bold text-yellow-300">
                  ⭐ 4,99 €/mois
                </span>

                <span className="rounded-full bg-slate-800 px-4 py-2 text-sm font-bold text-slate-300">
                  🔒 Sans engagement
                </span>
              </div>

              {premiumLoading ? (
                <div className="mt-7 rounded-2xl bg-slate-800 px-6 py-4 font-bold text-slate-300">
                  Vérification de ton abonnement...
                </div>
              ) : isPremium ? (
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/monitoring"
                    className="rounded-2xl bg-purple-500 px-6 py-4 font-black text-white transition hover:bg-purple-400"
                  >
                    📊 Ouvrir Monitoring
                  </Link>

                  <Link
                    href="/pilolife"
                    className="rounded-2xl border border-purple-500/30 bg-purple-500/10 px-6 py-4 font-black text-purple-200 transition hover:bg-purple-500/20"
                  >
                    🌿 Ouvrir PiloLife
                  </Link>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={checkout}
                  disabled={checkoutLoading}
                  className="mt-7 rounded-2xl bg-purple-500 px-7 py-4 text-lg font-black text-white transition hover:scale-[1.02] hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {checkoutLoading
                    ? "Ouverture du paiement..."
                    : "💎 Passer Premium — 4,99 €/mois"}
                </button>
              )}
            </div>

            <div className="hidden justify-center lg:flex">
              <div className="relative h-56 w-56">
                <div className="absolute inset-7 rounded-full bg-purple-500/30 blur-3xl" />

                <img
                  src="/pilo.png"
                  alt="Pilo Premium"
                  className="relative z-10 h-full w-full object-contain drop-shadow-[0_20px_60px_rgba(168,85,247,0.45)]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* PARCOURS PILO */}
        <section className="mt-8 rounded-[2rem] border border-slate-800 bg-slate-900 p-7 sm:p-9">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-green-400">
              Le parcours Pilo
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Comment Pilo travaille pour toi
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400">
              Un parcours simple pour analyser, agir, suivre
              et avancer vers tes projets.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {/* ANALYSE */}
            <div className="relative rounded-3xl border border-green-500/20 bg-slate-950/60 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 text-2xl">
                🔎
              </div>

              <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-green-400">
                Étape 1
              </p>

              <h3 className="mt-2 text-xl font-black">
                Analyse
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Pilo comprend ta situation et repère les
                postes à optimiser.
              </p>

              <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-xl text-slate-600 md:block">
                →
              </div>
            </div>

            {/* MISSIONS */}
            <div className="relative rounded-3xl border border-green-500/20 bg-slate-950/60 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 text-2xl">
                🎯
              </div>

              <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-green-400">
                Étape 2
              </p>

              <h3 className="mt-2 text-xl font-black">
                Missions
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Tu découvres les solutions adaptées et tu
                choisis librement celles qui t&apos;intéressent.
              </p>

              <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-xl text-slate-600 md:block">
                →
              </div>
            </div>

            {/* MONITORING */}
            <div className="relative rounded-3xl border border-purple-500/40 bg-purple-500/10 p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
              <div className="absolute right-4 top-4 rounded-full bg-purple-500/20 px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-purple-200">
                Premium
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20 text-2xl">
                📊
              </div>

              <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-purple-300">
                Étape 3
              </p>

              <h3 className="mt-2 text-xl font-black">
                Monitoring
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                Nouveau contrat ? Ajoute-le manuellement pour
                que Pilo puisse le suivre.
              </p>

              <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-xl text-slate-600 md:block">
                →
              </div>
            </div>

            {/* PILOLIFE */}
            <div className="rounded-3xl border border-purple-500/30 bg-purple-500/10 p-6">
              <div className="absolute" />

              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20 text-2xl">
                  🌿
                </div>

                <span className="rounded-full bg-purple-500/20 px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-purple-200">
                  Premium
                </span>
              </div>

              <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-purple-300">
                Étape 4
              </p>

              <h3 className="mt-2 text-xl font-black">
                PiloLife
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                Tes économies deviennent une vraie progression
                vers tes projets.
              </p>
            </div>
          </div>

          {/* REFLEXE PILO */}
          <div className="mt-6 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-slate-950 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-500/20 text-2xl">
                🔄
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-300">
                  Le réflexe Pilo
                </p>

                <h3 className="mt-1 text-xl font-black">
                  Tu viens de changer de contrat ?
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Ajoute simplement ton nouveau fournisseur,
                  ton prix et son échéance dans Monitoring.
                  Pilo pourra ensuite assurer ton suivi
                  personnalisé.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AVANTAGES PREMIUM */}
        <section className="mt-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <div className="text-3xl">
                📊
              </div>

              <h3 className="mt-4 text-xl font-black">
                Monitoring
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Centralise et suis tes contrats au même
                endroit.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <div className="text-3xl">
                🔔
              </div>

              <h3 className="mt-4 text-xl font-black">
                Alertes
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Pilo te rappelle les échéances et les moments
                importants.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <div className="text-3xl">
                🌿
              </div>

              <h3 className="mt-4 text-xl font-black">
                PiloLife
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Visualise tes économies et fais avancer tes
                projets.
              </p>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        {!premiumLoading && !isPremium && (
          <section className="mt-8 rounded-[2rem] border border-purple-500/30 bg-purple-500/10 p-8 text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-purple-300">
              Pilo Premium
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Pilo continue le travail après tes missions
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
              Monitoring, alertes et PiloLife réunis dans ton
              espace Premium.
            </p>

            <button
              type="button"
              onClick={checkout}
              disabled={checkoutLoading}
              className="mt-6 rounded-2xl bg-purple-500 px-8 py-4 text-lg font-black text-white transition hover:scale-[1.02] hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {checkoutLoading
                ? "Ouverture du paiement..."
                : "💎 Passer Premium — 4,99 €/mois"}
            </button>

            <p className="mt-3 text-xs text-slate-500">
              Sans engagement
            </p>
          </section>
        )}

        {isPremium && (
          <section className="mt-8 rounded-[2rem] border border-green-500/30 bg-green-500/10 p-8 text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-green-400">
              Premium actif
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Ton copilote est prêt 🐦
            </h2>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/monitoring"
                className="rounded-2xl bg-green-500 px-6 py-4 font-black text-slate-950 transition hover:bg-green-400"
              >
                📊 Ajouter un contrat
              </Link>

              <Link
                href="/pilolife"
                className="rounded-2xl border border-green-500/30 bg-green-500/10 px-6 py-4 font-black text-green-300 transition hover:bg-green-500/20"
              >
                🌿 Ouvrir PiloLife
              </Link>
            </div>
          </section>
        )}

        <div className="h-10" />
      </div>
    </main>
  );
}