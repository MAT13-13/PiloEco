"use client";

import { Suspense } from "react";
import MissionLayout from "../../components/MissionLayout";

const MULTIRISQUE_PRO_URL =
  "https://www.assurlandpro.com/multirisque.html?partnerlinkid=120HL02&utm_medium=affiliation&utm_source=PiloEco&utm_campaign=mrp_conversion_email_CPA_generique";

export default function MultirisqueProMissionPage() {
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
        icon="🏢"
        title="Comparer les assurances multirisque pro"
        subtitle="Protège les locaux, le matériel, les marchandises et l’activité de ton entreprise."
        basePrice={0}
        recommendedPrice={0}
        recommendedName="Assurland Pro – Multirisque professionnelle"
        advice="Compare les biens couverts, les plafonds d’indemnisation, les franchises et les exclusions avant de souscrire."
        fields={[
          {
            name: "activity",
            label: "Quelle est ton activité ?",
            type: "select",
            defaultValue: "Commerce",
            options: [
              "Commerce",
              "Artisanat",
              "Profession libérale",
              "Restauration",
              "Bureaux et services",
              "Entreprise du bâtiment",
              "Autre",
            ],
          },
          {
            name: "premises",
            label: "Utilises-tu un local professionnel ?",
            type: "select",
            defaultValue: "Oui",
            options: [
              "Oui",
              "Non",
              "Je travaille depuis mon domicile",
            ],
          },
          {
            name: "need",
            label: "Quel est ton besoin principal ?",
            type: "select",
            defaultValue: "Protéger mon local et mon matériel",
            options: [
              "Protéger mon local et mon matériel",
              "Protéger mes marchandises",
              "Comparer mon contrat actuel",
              "Souscrire ma première assurance",
            ],
          },
        ]}
        dynamicOfferResolver={() => "multirisque-pro"}
        dynamicOffers={{
          "multirisque-pro": {
            href: MULTIRISQUE_PRO_URL,
            buttonLabel: "Comparer avec Assurland Pro →",
            recommendedName: "Assurland Pro – Multirisque professionnelle",
            advice:
              "Vérifie que tes locaux, ton matériel, tes marchandises et les risques propres à ton activité sont correctement couverts.",
            external: true,
            completionType: "none",
          },
        }}
        completionType="none"
      />
    </Suspense>
  );
}