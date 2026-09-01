"use client";

import { Suspense } from "react";
import MissionLayout from "../../components/MissionLayout";

const RC_PRO_URL =
  "https://www.assurlandpro.com/responsabilite-civile-professionnelle.html?partnerlinkid=120HL00&utm_medium=affiliation&utm_source=PiloEco&utm_campaign=rcpro_conversion_email_CPA_generique";

export default function RcProMissionPage() {
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
        title="Comparer les assurances RC Pro"
        subtitle="Protège ton activité contre les dommages que tu pourrais causer à un client, un fournisseur ou un tiers."
        basePrice={0}
        recommendedPrice={0}
        recommendedName="Assurland Pro – RC Professionnelle"
        advice="Compare les garanties, les plafonds d’indemnisation, les franchises et les exclusions selon ton activité."
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
              "Prestataire de services",
              "Entreprise du bâtiment",
              "Autre",
            ],
          },
          {
            name: "need",
            label: "Quel est ton besoin ?",
            type: "select",
            defaultValue: "Souscrire ma première RC Pro",
            options: [
              "Souscrire ma première RC Pro",
              "Comparer mon contrat actuel",
              "Réduire le prix de mon assurance",
              "Améliorer mes garanties",
            ],
          },
        ]}
        dynamicOfferResolver={() => "rc-pro"}
        dynamicOffers={{
          "rc-pro": {
            href: RC_PRO_URL,
            buttonLabel: "Comparer avec Assurland Pro →",
            recommendedName: "Assurland Pro – RC Professionnelle",
            advice:
              "Vérifie que les activités réellement exercées sont bien couvertes par le contrat proposé.",
            external: true,
            completionType: "none",
          },
        }}
        completionType="none"
      />
    </Suspense>
  );
}