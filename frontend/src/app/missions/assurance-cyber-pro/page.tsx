"use client";

import { Suspense } from "react";
import MissionLayout from "../../components/MissionLayout";

const ASSURANCE_CYBER_PRO_URL =
  "https://www.assurlandpro.com/assurance-cyber-risques.html?partnerlinkid=120HL04&utm_medium=affiliation&utm_source=PiloEco&utm_campaign=cyber_conversion_email_CPA_generique";

export default function AssuranceCyberProMissionPage() {
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
        icon="🔐"
        title="Comparer les assurances cyber-risque"
        subtitle="Protège ton entreprise face aux conséquences financières d’une cyberattaque, d’une fuite de données ou d’une interruption informatique."
        basePrice={0}
        recommendedPrice={0}
        recommendedName="Assurland Pro – Assurance cyber-risque"
        advice="Compare les incidents couverts, les plafonds d’indemnisation, les exclusions et les services d’assistance proposés."
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
              "Entreprise de services",
              "E-commerce",
              "Entreprise du bâtiment",
              "Autre",
            ],
          },
          {
            name: "companySize",
            label: "Quelle est la taille de ton entreprise ?",
            type: "select",
            defaultValue: "Aucun salarié",
            options: [
              "Aucun salarié",
              "1 à 9 salariés",
              "10 à 49 salariés",
              "50 salariés ou plus",
            ],
          },
          {
            name: "need",
            label: "Quel est ton besoin principal ?",
            type: "select",
            defaultValue: "Protéger les données de mon entreprise",
            options: [
              "Protéger les données de mon entreprise",
              "Couvrir les conséquences d’une cyberattaque",
              "Protéger mon activité en ligne",
              "Comparer mon contrat actuel",
              "Souscrire ma première assurance cyber",
            ],
          },
        ]}
        dynamicOfferResolver={() => "assurance-cyber-pro"}
        dynamicOffers={{
          "assurance-cyber-pro": {
            href: ASSURANCE_CYBER_PRO_URL,
            buttonLabel: "Comparer avec Assurland Pro →",
            recommendedName: "Assurland Pro – Assurance cyber-risque",
            advice:
              "Vérifie notamment la couverture des pertes d’exploitation, de la restauration des données, de l’assistance et de la responsabilité liée aux données personnelles.",
            external: true,
            completionType: "none",
          },
        }}
        completionType="none"
      />
    </Suspense>
  );
}