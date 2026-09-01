"use client";

import { Suspense } from "react";
import MissionLayout from "../../components/MissionLayout";

const RESPONSABILITE_MANDATAIRES_URL =
  "https://www.assurlandpro.com/assurance-responsabilite-mandataires-sociaux.html?partnerlinkid=120HL11&utm_medium=affiliation&utm_source=PiloEco&utm_campaign=mandataires_conversion_email_CPA_generique";

export default function ResponsabiliteMandatairesMissionPage() {
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
        icon="👔"
        title="Protéger la responsabilité des dirigeants"
        subtitle="Compare les assurances couvrant la responsabilité personnelle des dirigeants et mandataires sociaux."
        basePrice={0}
        recommendedPrice={0}
        recommendedName="Assurland Pro – Responsabilité des mandataires"
        advice="Compare les fautes de gestion couvertes, les frais de défense, les plafonds d’indemnisation et les exclusions."
        fields={[
          {
            name: "companyType",
            label: "Quelle est la forme de ton entreprise ?",
            type: "select",
            defaultValue: "SAS / SASU",
            options: [
              "SAS / SASU",
              "SARL / EURL",
              "SA",
              "Association",
              "Autre société",
            ],
          },
          {
            name: "role",
            label: "Quelle est ta fonction ?",
            type: "select",
            defaultValue: "Président ou dirigeant",
            options: [
              "Président ou dirigeant",
              "Gérant",
              "Administrateur",
              "Mandataire social",
              "Responsable associatif",
              "Autre",
            ],
          },
          {
            name: "need",
            label: "Quel est ton besoin principal ?",
            type: "select",
            defaultValue: "Protéger ma responsabilité personnelle",
            options: [
              "Protéger ma responsabilité personnelle",
              "Couvrir les frais de défense",
              "Comparer mon contrat actuel",
              "Souscrire une première assurance",
            ],
          },
        ]}
        dynamicOfferResolver={() => "responsabilite-mandataires"}
        dynamicOffers={{
          "responsabilite-mandataires": {
            href: RESPONSABILITE_MANDATAIRES_URL,
            buttonLabel: "Comparer avec Assurland Pro →",
            recommendedName:
              "Assurland Pro – Responsabilité des mandataires sociaux",
            advice:
              "Vérifie les fonctions et personnes assurées, les fautes couvertes, les frais de défense et les exclusions du contrat.",
            external: true,
            completionType: "none",
          },
        }}
        completionType="none"
      />
    </Suspense>
  );
}