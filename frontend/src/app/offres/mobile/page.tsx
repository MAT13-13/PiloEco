"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { createRecommendation } from "../../services/ai/pilo-engine.service";
import PiloAdvice from "../../components/PiloAdvice";
import { supabase } from "../../lib/supabase";
import { completeMission } from "../../services/missionComplete.service";

import {
  getPartnerOffersByCategory,
  type PartnerOffer,
} from "../../services/partner-offers.service";

export default function MobileOfferPage() {
  const [forfait, setForfait] = useState(45);
  const [mobileOffers, setMobileOffers] = useState<
    PartnerOffer[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] =
    useState(false);

  const [errorMessage, setErrorMessage] = useState<
    string | null
  >(null);

  useEffect(() => {
    const loadPage = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const savedValues =
          localStorage.getItem("pilo-values");

        if (savedValues) {
          const values = JSON.parse(savedValues);

          const savedPrice = Number(
            values.telephone ??
              values.monthlyPrice ??
              45
          );

          if (Number.isFinite(savedPrice)) {
            setForfait(savedPrice);
          }
        }

        const offers =
          await getPartnerOffersByCategory("mobile");

        setMobileOffers(offers);
      } catch (error) {
        console.error(
          "Erreur de chargement de la page mobile :",
          error
        );

        setErrorMessage(
          "Impossible de charger les offres mobiles."
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadPage();
  }, []);

  const recommendation = useMemo(() => {
    if (mobileOffers.length === 0) {
      return null;
    }

    return createRecommendation(
      forfait,
      mobileOffers
    );
  }, [forfait, mobileOffers]);

  const handlePartnerClick = async () => {
    if (!recommendation || isRedirecting) {
      return;
    }

    const bestOffer = recommendation.offer;
    const saving = recommendation.yearlySaving;

    setIsRedirecting(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase
        .from("partner_events")
        .insert({
          partner_id: bestOffer.partnerId,
          event_type: "click",
          amount: 0,
          metadata: {
            category: "mobile",
            mission_id: "mobile",
            offer_id: bestOffer.id,
            offer_name: bestOffer.offerName,
            provider: bestOffer.provider,
            monthly_price:
              bestOffer.monthlyPrice,
            yearly_saving: saving,
            user_id: user?.id ?? null,
            destination_url: bestOffer.url,
          },
        });

      if (error) {
        console.error(
          "Erreur pendant l'enregistrement du clic :",
          error
        );
      }
    } catch (error) {
      console.error(
        "Erreur pendant le suivi du clic partenaire :",
        error
      );
    } finally {
      window.open(
        recommendation.offer.url,
        "_blank",
        "noopener,noreferrer"
      );

      setIsRedirecting(false);
    }
  };

  const handleMissionCompleted = async () => {
    if (!recommendation) {
      return;
    }

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
      saving: recommendation.yearlySaving,
    });

    alert(result.message);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-xl font-bold text-green-400">
            Pilo recherche les meilleures offres...
          </p>
        </div>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/missions/mobile"
            className="font-bold text-green-400"
          >
            ← Retour à la mission mobile
          </Link>

          <div className="mt-8 rounded-3xl border border-red-500/30 bg-red-500/10 p-6">
            <p className="font-bold text-red-300">
              {errorMessage}
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!recommendation) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/missions/mobile"
            className="font-bold text-green-400"
          >
            ← Retour à la mission mobile
          </Link>

          <div className="mt-8 rounded-3xl border border-orange-500/30 bg-orange-500/10 p-6">
            <h1 className="text-2xl font-black">
              Aucune offre mobile disponible
            </h1>

            <p className="mt-3 text-slate-300">
              Ajoute une offre active dans le CRM
              partenaire pour qu’elle apparaisse ici.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const bestOffer = recommendation.offer;
  const saving = recommendation.yearlySaving;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/missions/mobile"
          className="font-bold text-green-400"
        >
          ← Retour à la mission mobile
        </Link>

        <section className="mt-8 rounded-[2rem] border border-green-500/20 bg-white/5 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            Offre recommandée par Pilo
          </p>

          <h1 className="mt-4 text-5xl font-black">
            🏆 {bestOffer.provider}
          </h1>

          <p className="mt-3 text-xl text-slate-300">
            {bestOffer.offerName}
          </p>

          <div className="mt-8 rounded-3xl bg-slate-950/70 p-6">
            <p className="text-slate-400">
              Prix mensuel
            </p>

            <p className="mt-2 text-5xl font-black text-green-400">
              {bestOffer.monthlyPrice.toFixed(2)} €/mois
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              📶 Réseau :{" "}
              {bestOffer.network ?? "Non renseigné"}
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              🌍 Data :{" "}
              {bestOffer.data ?? "Non renseignée"}
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              🔓{" "}
              {bestOffer.commitment ??
                "Non renseigné"}
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              ⭐ Score Pilo :{" "}
              {recommendation.score}/100
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-green-500/10 p-6">
            <p className="text-green-300">
              Économie estimée
            </p>

            <p className="mt-2 text-5xl font-black text-green-400">
              {saving} €/an
            </p>
          </div>

          <PiloAdvice
            title="Pourquoi Pilo recommande cette offre ?"
            message={recommendation.explanation}
          />

          <div className="mt-10 space-y-4">
            <button
              type="button"
              onClick={handlePartnerClick}
              disabled={isRedirecting}
              className="block w-full rounded-full bg-green-500 px-8 py-5 text-center text-xl font-black text-slate-950 transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isRedirecting
                ? "Ouverture de l’offre..."
                : "Changer maintenant"}
            </button>

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