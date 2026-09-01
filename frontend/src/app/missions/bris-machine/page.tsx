"use client";

import { Suspense } from "react";
import MissionLayout from "../../components/MissionLayout";

const BRIS_MACHINE_URL =
  "https://www.assurlandpro.com/assurance-bris.html?partnerlinkid=120HL07&utm_medium=affiliation&utm_source=PiloEco&utm_campaign=bris_conversion_email_CPA_generique";

export default function BrisMachineMissionPage() {
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
        icon="⚙️"
        title="Assurer tes machines professionnelles"
        subtitle="Compare les assurances couvrant les machines et équipements indispensables à ton activité."
        basePrice={0}
        recommendedPrice={0}
        recommendedName="Assurland Pro – Bris de machine"
        advice="Compare les équipements couverts, les causes de dommages prises en charge, les franchises et les plafonds d’indemnisation."
        fields={[
          {
            name: "activity",
            label: "Quelle est ton activité ?",
            type: "select",
            defaultValue: "Artisanat",
            options: [
              "Artisanat",
              "Industrie",
              "Commerce",
              "Bâtiment",
              "Restauration",
              "Agriculture",
              "Profession libérale",
              "Autre",
            ],
          },
          {
            name: "equipment",
            label: "Quel équipement souhaites-tu protéger ?",
            type: "select",
            defaultValue: "Machines de production",
            options: [
              "Machines de production",
              "Matériel de chantier",
              "Équipements frigorifiques",
              "Matériel électronique",
              "Équipements professionnels spécialisés",
              "Ensemble de mes machines",
            ],
          },
          {
            name: "need",
            label: "Quel est ton besoin principal ?",
            type: "select",
            defaultValue: "Souscrire une première assurance",
            options: [
              "Souscrire une première assurance",
              "Comparer mon contrat actuel",
              "Protéger une nouvelle machine",
              "Améliorer mes garanties",
            ],
          },
        ]}
        dynamicOfferResolver={() => "bris-machine"}
        dynamicOffers={{
          "bris-machine": {
            href: BRIS_MACHINE_URL,
            buttonLabel: "Comparer avec Assurland Pro →",
            recommendedName: "Assurland Pro – Bris de machine",
            advice:
              "Vérifie que les machines essentielles à ton activité et les principaux risques de panne ou de dommage accidentel sont couverts.",
            external: true,
            completionType: "none",
          },
        }}
        completionType="none"
      />
    </Suspense>
  );
}