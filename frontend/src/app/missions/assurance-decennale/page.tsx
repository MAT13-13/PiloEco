"use client";

import { Suspense } from "react";
import MissionLayout from "../../components/MissionLayout";

const DECENNALE_URL =
  "https://www.assurlandpro.com/decennale.html?partnerlinkid=120HL01&utm_medium=affiliation&utm_source=PiloEco&utm_campaign=garantiedecennale_conversion_email_CPA_generique";

export default function AssuranceDecennaleMissionPage() {
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
        icon="🏗️"
        title="Trouver une assurance décennale"
        subtitle="Compare les assurances décennales adaptées à ton métier et à tes travaux."
        basePrice={0}
        recommendedPrice={0}
        recommendedName="Comparateur Assurland Pro"
        advice="Compare les garanties, les franchises, les activités couvertes et les exclusions avant de choisir ton assurance décennale."
        fields={[
          {
            name: "activity",
            label: "Quelle est ton activité principale ?",
            type: "select",
            defaultValue: "Artisan du bâtiment",
            options: [
              "Artisan du bâtiment",
              "Maçon",
              "Charpentier",
              "Plombier",
              "Électricien",
              "Architecte",
              "Entreprise générale du bâtiment",
              "Autre",
            ],
          },
        ]}
        dynamicOfferResolver={() => "decennale"}
        dynamicOffers={{
          decennale: {
            href: DECENNALE_URL,
            buttonLabel: "Comparer avec Assurland Pro →",
            recommendedName: "Assurland Pro – Garantie décennale",
            advice:
              "Compare les solutions disponibles et vérifie les garanties, les franchises et les activités couvertes avant de souscrire.",
            external: true,
            completionType: "none",
          },
        }}
        completionType="none"
      />
    </Suspense>
  );
}