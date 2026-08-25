"use client";

import { Suspense } from "react";
import MissionLayout from "../../components/MissionLayout";

const EXPERT_COMPTABLE_COMPARATEUR =
  "https://stella-2.com/clc/a2b_OcHUikKcHH0aTcwY0w";

const EXPERT_COMPTABLE_ACCOMPAGNEMENT =
  "https://stella-2.com/clc/FvVij8PK-xYc5YRqdCsQ3Q";

export default function ExpertComptableMissionPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
          <div className="mx-auto max-w-5xl">
            <p className="text-slate-300">
              Chargement de la mission...
            </p>
          </div>
        </main>
      }
    >
      <MissionLayout
        icon="🧾"
        title="Trouver un expert-comptable"
        subtitle="Compare des cabinets ou trouve un professionnel pour accompagner la comptabilité de ton entreprise."
        basePrice={0}
        recommendedPrice={0}
        recommendedName="Expert-comptable adapté à ton entreprise"
        advice="Choisis le type d’accompagnement dont tu as besoin pour découvrir la solution correspondante."
        fields={[
          {
            name: "expertType",
            label: "Quel accompagnement recherches-tu ?",
            type: "select",
            defaultValue: "Comparer plusieurs cabinets",
            options: [
              "Comparer plusieurs cabinets",
              "Accompagnement comptable",
            ],
          },
          {
            name: "activity",
            label: "Quel est ton statut professionnel ?",
            type: "select",
            defaultValue: "Micro-entrepreneur",
            options: [
              "Micro-entrepreneur",
              "Indépendant",
              "Profession libérale",
              "Commerce",
              "Artisan",
              "Société",
              "Association",
              "Autre",
            ],
          },
        ]}
        dynamicOfferField="expertType"
        dynamicOffers={{
          "Comparer plusieurs cabinets": {
            href: EXPERT_COMPTABLE_COMPARATEUR,
            buttonLabel: "Comparer les experts-comptables →",
            recommendedName: "Comparateur d’experts-comptables",
            advice:
              "Compare plusieurs cabinets d’expertise comptable près de chez toi et reçois jusqu’à trois propositions gratuites, sans engagement.",
            external: true,
            completionType: "none",
          },
          "Accompagnement comptable": {
            href: EXPERT_COMPTABLE_ACCOMPAGNEMENT,
            buttonLabel: "Trouver un expert-comptable →",
            recommendedName:
              "Accompagnement par un expert-comptable",
            advice:
              "Trouve un professionnel pour ta comptabilité, tes comptes annuels, tes déclarations fiscales et tes besoins juridiques ou sociaux.",
            external: true,
            completionType: "none",
          },
        }}
        completionType="none"
      />
    </Suspense>
  );
}