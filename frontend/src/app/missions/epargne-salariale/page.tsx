"use client";

import { Suspense } from "react";
import MissionLayout from "../../components/MissionLayout";

const EPARGNE_SALARIALE_URL =
  "https://www.assurlandpro.com/assurance-epargne-salariale.html?partnerlinkid=120HL15&utm_medium=affiliation&utm_source=PiloEco&utm_campaign=epargnesalariale_conversion_email_CPA_generique";

export default function EpargneSalarialeMissionPage() {
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
        icon="💶"
        title="Mettre en place une épargne salariale"
        subtitle="Compare les solutions permettant à une entreprise d’aider ses salariés à se constituer une épargne."
        basePrice={0}
        recommendedPrice={0}
        recommendedName="Assurland Pro – Épargne salariale"
        advice="Compare les dispositifs proposés, les frais, les modalités d’abondement et les conditions de disponibilité de l’épargne."
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
            label: "As-tu déjà un dispositif d’épargne salariale ?",
            type: "select",
            defaultValue: "Non",
            options: [
              "Non",
              "Oui",
              "Un dispositif est en cours de création",
              "Je ne sais pas",
            ],
          },
          {
            name: "objective",
            label: "Quel est ton objectif principal ?",
            type: "select",
            defaultValue: "Fidéliser les salariés",
            options: [
              "Fidéliser les salariés",
              "Partager les résultats de l’entreprise",
              "Préparer la retraite des salariés",
              "Comparer un dispositif existant",
            ],
          },
        ]}
        dynamicOfferResolver={() => "epargne-salariale"}
        dynamicOffers={{
          "epargne-salariale": {
            href: EPARGNE_SALARIALE_URL,
            buttonLabel: "Comparer avec Assurland Pro →",
            recommendedName: "Assurland Pro – Épargne salariale",
            advice:
              "Étudie les frais, les dispositifs disponibles, les règles d’abondement et les conditions de déblocage avant de choisir.",
            external: true,
            completionType: "none",
          },
        }}
        completionType="none"
      />
    </Suspense>
  );
}