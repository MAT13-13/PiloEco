"use client";

import { Suspense } from "react";
import MissionLayout from "../../components/MissionLayout";

const DECENNALE_URL =
  "https://stella-2.com/clc/1xumfaIDKujvDbncH2H9xw";

const EXPERT_COMPTABLE_COMPARATEUR =
  "https://stella-2.com/clc/a2b_OcHUikKcHH0aTcwY0w";

const EXPERT_COMPTABLE_ACCOMPAGNEMENT =
  "https://stella-2.com/clc/FvVij8PK-xYc5YRqdCsQ3Q";

export default function ServicesEntreprisesMissionPage() {
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
        title="Optimiser tes services professionnels"
        subtitle="Choisis le service dont ton entreprise a besoin et découvre les solutions partenaires proposées par Pilo."
        basePrice={150}
        recommendedPrice={120}
        recommendedName="Service professionnel adapté"
        advice="Pilo t'oriente vers une solution professionnelle adaptée à ton besoin."
        fields={[
          {
            name: "serviceType",
            label: "Quel service professionnel recherches-tu ?",
            type: "select",
            defaultValue: "Assurance décennale",
            options: [
              "Assurance décennale",
              "Expert-comptable – Comparer plusieurs cabinets",
              "Expert-comptable – Accompagnement comptable",
            ],
          },
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
              "Commerce",
              "Profession libérale",
              "Indépendant",
              "Micro-entrepreneur",
              "Société",
              "Autre",
            ],
          },
        ]}
        offerPath="/offres/services-entreprises"
        dynamicOfferField="serviceType"
        dynamicOffers={{
          "Assurance décennale": {
            href: DECENNALE_URL,
            buttonLabel:
              "Découvrir les solutions décennales →",
            recommendedName:
              "Assurance décennale professionnelle",
            advice:
              "Découvre les solutions d’assurance décennale proposées pour les professionnels du bâtiment et vérifie les garanties adaptées à ton activité.",
            external: true,
          },

          "Expert-comptable – Comparer plusieurs cabinets": {
            href: EXPERT_COMPTABLE_COMPARATEUR,
            buttonLabel:
              "Comparer les experts-comptables →",
            recommendedName:
              "Comparateur d’experts-comptables",
            advice:
              "Compare plusieurs cabinets d’expertise comptable près de chez toi et reçois jusqu’à 3 propositions gratuites, sans engagement.",
            external: true,
          },

          "Expert-comptable – Accompagnement comptable": {
            href: EXPERT_COMPTABLE_ACCOMPAGNEMENT,
            buttonLabel:
              "Trouver un expert-comptable →",
            recommendedName:
              "Accompagnement par un expert-comptable",
            advice:
              "Trouve un expert-comptable pour la tenue de ta comptabilité, les comptes annuels, les déclarations fiscales ou des conseils juridiques, fiscaux et sociaux.",
            external: true,
          },
        }}
      />
    </Suspense>
  );
}