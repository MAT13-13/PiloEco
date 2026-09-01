"use client";

import { Suspense } from "react";
import MissionLayout from "../../components/MissionLayout";

const RETRAITE_COLLECTIVE_URL =
  "https://www.assurlandpro.com/assurance-retraite.html?partnerlinkid=120HL05&utm_medium=affiliation&utm_source=PiloEco&utm_campaign=retraiteco_conversion_email_CPA_generique";

export default function RetraiteCollectiveMissionPage() {
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
        icon="🏦"
        title="Comparer les solutions de retraite collective"
        subtitle="Découvre les solutions permettant à une entreprise de préparer la retraite de ses salariés."
        basePrice={0}
        recommendedPrice={0}
        recommendedName="Assurland Pro – Retraite collective"
        advice="Compare les conditions de versement, les frais, les supports proposés et les règles applicables à l’entreprise et aux salariés."
        fields={[
          {
            name: "companySize",
            label: "Quelle est la taille de ton entreprise ?",
            type: "select",
            defaultValue: "1 à 9 salariés",
            options: [
              "1 à 9 salariés",
              "10 à 49 salariés",
              "50 à 249 salariés",
              "250 salariés ou plus",
            ],
          },
          {
            name: "situation",
            label: "Quelle est ta situation actuelle ?",
            type: "select",
            defaultValue: "Aucun dispositif en place",
            options: [
              "Aucun dispositif en place",
              "Dispositif collectif déjà existant",
              "Projet de changement",
              "Création prochaine de l’entreprise",
            ],
          },
          {
            name: "need",
            label: "Quel est ton objectif principal ?",
            type: "select",
            defaultValue: "Préparer la retraite des salariés",
            options: [
              "Préparer la retraite des salariés",
              "Fidéliser les salariés",
              "Comparer les solutions disponibles",
              "Remplacer un dispositif existant",
            ],
          },
        ]}
        dynamicOfferResolver={() => "retraite-collective"}
        dynamicOffers={{
          "retraite-collective": {
            href: RETRAITE_COLLECTIVE_URL,
            buttonLabel: "Comparer avec Assurland Pro →",
            recommendedName: "Assurland Pro – Retraite collective",
            advice:
              "Étudie les frais, les modalités de versement, les supports d’investissement et les conditions de sortie avant de choisir.",
            external: true,
            completionType: "none",
          },
        }}
        completionType="none"
      />
    </Suspense>
  );
}