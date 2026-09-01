"use client";

import { Suspense } from "react";
import MissionLayout from "../../components/MissionLayout";

const MARCHANDISES_TRANSPORTEES_URL =
  "https://www.assurlandpro.com/assurance-marchandise.html?partnerlinkid=120HL16&utm_medium=affiliation&utm_source=PiloEco&utm_campaign=marchandises_conversion_email_CPA_generique";

export default function MarchandisesTransporteesMissionPage() {
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
        icon="🚚"
        title="Assurer tes marchandises transportées"
        subtitle="Compare les assurances couvrant les marchandises de ton entreprise pendant leur transport."
        basePrice={0}
        recommendedPrice={0}
        recommendedName="Assurland Pro – Marchandises transportées"
        advice="Compare les marchandises couvertes, les modes de transport acceptés, les plafonds d’indemnisation, les franchises et les exclusions."
        fields={[
          {
            name: "activity",
            label: "Quelle est ton activité ?",
            type: "select",
            defaultValue: "Commerce",
            options: [
              "Commerce",
              "Transport et logistique",
              "Artisanat",
              "Industrie",
              "E-commerce",
              "Bâtiment",
              "Autre",
            ],
          },
          {
            name: "transport",
            label: "Comment les marchandises sont-elles transportées ?",
            type: "select",
            defaultValue: "Par mes propres véhicules",
            options: [
              "Par mes propres véhicules",
              "Par un transporteur professionnel",
              "Par plusieurs modes de transport",
              "À l’international",
            ],
          },
          {
            name: "need",
            label: "Quel est ton besoin principal ?",
            type: "select",
            defaultValue: "Couvrir la perte ou le vol",
            options: [
              "Couvrir la perte ou le vol",
              "Couvrir les marchandises endommagées",
              "Comparer mon contrat actuel",
              "Souscrire une première assurance",
            ],
          },
        ]}
        dynamicOfferResolver={() => "marchandises-transportees"}
        dynamicOffers={{
          "marchandises-transportees": {
            href: MARCHANDISES_TRANSPORTEES_URL,
            buttonLabel: "Comparer avec Assurland Pro →",
            recommendedName: "Assurland Pro – Marchandises transportées",
            advice:
              "Vérifie les types de marchandises et de transport couverts ainsi que les limites territoriales et les plafonds d’indemnisation.",
            external: true,
            completionType: "none",
          },
        }}
        completionType="none"
      />
    </Suspense>
  );
}