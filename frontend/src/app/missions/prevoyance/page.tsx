"use client";

import { Suspense } from "react";
import MissionLayout from "../../components/MissionLayout";

const PREVOYANCE_URL =
  "https://www.assurland.com/assurance-prevoyance/page1.aspx?partnerlinkid=943HL01&utm_medium=affiliation&utm_source=PiloEco&utm_campaign=prevoyance_conversion_email_CPA_generique";

export default function PrevoyanceMissionPage() {
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
        icon="🛡️"
        title="Comparer les assurances prévoyance"
        subtitle="Protège-toi ainsi que tes proches face aux conséquences financières d’un accident, d’une maladie ou d’un arrêt de travail."
        basePrice={0}
        recommendedPrice={0}
        recommendedName="Assurland – Assurance prévoyance"
        advice="Compare les garanties, les exclusions, les délais de carence et les niveaux d’indemnisation avant de choisir ton contrat."
        fields={[
          {
            name: "situation",
            label: "Quelle est ta situation professionnelle ?",
            type: "select",
            defaultValue: "Salarié",
            options: [
              "Salarié",
              "Fonctionnaire",
              "Sans activité professionnelle",
              "Retraité",
              "Autre",
            ],
          },
          {
            name: "need",
            label: "Quel est ton besoin principal ?",
            type: "select",
            defaultValue: "Maintien de revenus",
            options: [
              "Maintien de revenus",
              "Protection de mes proches",
              "Couverture en cas d’invalidité",
              "Couverture en cas de décès",
              "Comparer les protections disponibles",
            ],
          },
        ]}
        dynamicOfferResolver={() => "prevoyance"}
        dynamicOffers={{
          prevoyance: {
            href: PREVOYANCE_URL,
            buttonLabel: "Comparer avec Assurland →",
            recommendedName: "Assurland – Assurance prévoyance",
            advice:
              "Vérifie attentivement les garanties, les exclusions, les délais de carence et les conditions d’indemnisation.",
            external: true,
            completionType: "none",
          },
        }}
        completionType="none"
      />
    </Suspense>
  );
}