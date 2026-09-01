"use client";

import { Suspense } from "react";
import MissionLayout from "../../components/MissionLayout";

const RETRAITE_MADELIN_URL =
  "https://www.assurlandpro.com/retraite-madelin.html?partnerlinkid=120HL12&utm_medium=affiliation&utm_source=PiloEco&utm_campaign=madelin_conversion_email_CPA_generique";

export default function RetraiteMadelinMissionPage() {
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
        icon="💰"
        title="Préparer ta retraite en tant qu’indépendant"
        subtitle="Compare les solutions de retraite destinées aux travailleurs non salariés et prépare un complément de revenus."
        basePrice={0}
        recommendedPrice={0}
        recommendedName="Assurland Pro – Retraite Madelin"
        advice="Compare les frais, les modalités de versement, les supports proposés et les conditions de sortie avant de choisir."
        fields={[
          {
            name: "status",
            label: "Quel est ton statut professionnel ?",
            type: "select",
            defaultValue: "Travailleur indépendant",
            options: [
              "Travailleur indépendant",
              "Artisan",
              "Commerçant",
              "Profession libérale",
              "Gérant majoritaire",
              "Autre",
            ],
          },
          {
            name: "situation",
            label: "As-tu déjà une solution de retraite complémentaire ?",
            type: "select",
            defaultValue: "Non",
            options: [
              "Non",
              "Oui, un ancien contrat Madelin",
              "Oui, un PER individuel",
              "Je ne sais pas",
            ],
          },
          {
            name: "objective",
            label: "Quel est ton objectif principal ?",
            type: "select",
            defaultValue: "Préparer ma retraite",
            options: [
              "Préparer ma retraite",
              "Comparer mon contrat actuel",
              "Réduire les frais",
              "Améliorer le potentiel de mon épargne",
            ],
          },
        ]}
        dynamicOfferResolver={() => "retraite-madelin"}
        dynamicOffers={{
          "retraite-madelin": {
            href: RETRAITE_MADELIN_URL,
            buttonLabel: "Comparer avec Assurland Pro →",
            recommendedName: "Assurland Pro – Retraite Madelin",
            advice:
              "Vérifie les frais, les conditions de transfert et les modalités de sortie. Les anciens contrats Madelin peuvent notamment être comparés avec les solutions de retraite actuelles.",
            external: true,
            completionType: "none",
          },
        }}
        completionType="none"
      />
    </Suspense>
  );
}