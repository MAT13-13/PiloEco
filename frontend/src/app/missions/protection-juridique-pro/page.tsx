"use client";

import { Suspense } from "react";
import MissionLayout from "../../components/MissionLayout";

const PROTECTION_JURIDIQUE_URL =
  "https://www.assurlandpro.com/protection-juridique.html?partnerlinkid=120HL09&utm_medium=affiliation&utm_source=PiloEco&utm_campaign=pj_conversion_email_CPA_generique";

export default function ProtectionJuridiqueProMissionPage() {
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
        icon="⚖️"
        title="Comparer les protections juridiques professionnelles"
        subtitle="Protège ton entreprise et bénéficie d’un accompagnement en cas de litige lié à ton activité."
        basePrice={0}
        recommendedPrice={0}
        recommendedName="Assurland Pro – Protection juridique"
        advice="Compare les domaines juridiques couverts, les plafonds de prise en charge, les exclusions et les délais de carence."
        fields={[
          {
            name: "activity",
            label: "Quelle est ton activité ?",
            type: "select",
            defaultValue: "Auto-entrepreneur",
            options: [
              "Auto-entrepreneur",
              "Artisan",
              "Commerçant",
              "Profession libérale",
              "Entreprise du bâtiment",
              "Entreprise de services",
              "Autre",
            ],
          },
          {
            name: "risk",
            label: "Quel type de litige souhaites-tu couvrir ?",
            type: "select",
            defaultValue: "Litiges avec des clients",
            options: [
              "Litiges avec des clients",
              "Litiges avec des fournisseurs",
              "Litiges avec des salariés",
              "Litiges liés aux locaux professionnels",
              "Plusieurs types de litiges",
            ],
          },
          {
            name: "need",
            label: "Quel est ton besoin principal ?",
            type: "select",
            defaultValue: "Souscrire une première protection",
            options: [
              "Souscrire une première protection",
              "Comparer mon contrat actuel",
              "Obtenir une assistance juridique",
              "Améliorer mes garanties",
            ],
          },
        ]}
        dynamicOfferResolver={() => "protection-juridique-pro"}
        dynamicOffers={{
          "protection-juridique-pro": {
            href: PROTECTION_JURIDIQUE_URL,
            buttonLabel: "Comparer avec Assurland Pro →",
            recommendedName: "Assurland Pro – Protection juridique",
            advice:
              "Vérifie les litiges couverts ainsi que les plafonds appliqués aux frais d’avocat, d’expertise et de procédure.",
            external: true,
            completionType: "none",
          },
        }}
        completionType="none"
      />
    </Suspense>
  );
}