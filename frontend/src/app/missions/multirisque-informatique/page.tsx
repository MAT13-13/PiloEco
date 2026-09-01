"use client";

import { Suspense } from "react";
import MissionLayout from "../../components/MissionLayout";

const MULTIRISQUE_INFORMATIQUE_URL =
  "https://www.assurlandpro.com/assurance-informatique.html?partnerlinkid=120HL06&utm_medium=affiliation&utm_source=PiloEco&utm_campaign=mrinfo_conversion_email_CPA_generique";

export default function MultirisqueInformatiqueMissionPage() {
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
        icon="💻"
        title="Assurer ton matériel informatique"
        subtitle="Compare les assurances protégeant le matériel et les installations informatiques de ton entreprise."
        basePrice={0}
        recommendedPrice={0}
        recommendedName="Assurland Pro – Multirisque informatique"
        advice="Compare le matériel couvert, les causes de sinistre prises en charge, les franchises et les plafonds d’indemnisation."
        fields={[
          {
            name: "activity",
            label: "Quelle est ton activité ?",
            type: "select",
            defaultValue: "Entreprise de services",
            options: [
              "Entreprise de services",
              "Commerce",
              "Profession libérale",
              "Entreprise informatique",
              "E-commerce",
              "Artisanat",
              "Autre",
            ],
          },
          {
            name: "equipment",
            label: "Quel matériel souhaites-tu protéger ?",
            type: "select",
            defaultValue: "Ordinateurs et périphériques",
            options: [
              "Ordinateurs et périphériques",
              "Serveurs et équipements réseau",
              "Matériel informatique spécialisé",
              "Ensemble du parc informatique",
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
              "Améliorer mes garanties",
              "Protéger du matériel récemment acheté",
            ],
          },
        ]}
        dynamicOfferResolver={() => "multirisque-informatique"}
        dynamicOffers={{
          "multirisque-informatique": {
            href: MULTIRISQUE_INFORMATIQUE_URL,
            buttonLabel: "Comparer avec Assurland Pro →",
            recommendedName: "Assurland Pro – Multirisque informatique",
            advice:
              "Vérifie les équipements couverts ainsi que la prise en charge du vol, des dommages électriques, des dégâts des eaux et des autres sinistres.",
            external: true,
            completionType: "none",
          },
        }}
        completionType="none"
      />
    </Suspense>
  );
}