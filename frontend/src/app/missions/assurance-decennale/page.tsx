"use client";

import { Suspense } from "react";
import MissionLayout from "../../components/MissionLayout";

const DECENNALE_URL =
  "https://stella-2.com/clc/1xumfaIDKujvDbncH2H9xw";

export default function AssuranceDecennaleMissionPage() {
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
        icon="🏗️"
        title="Trouver une assurance décennale"
        subtitle="Protège ton activité avec une assurance décennale adaptée à ton métier et à tes travaux."
        basePrice={0}
        recommendedPrice={0}
        recommendedName="Assurance décennale professionnelle"
        advice="Découvre les solutions d’assurance décennale proposées aux professionnels du bâtiment et vérifie les garanties adaptées à ton activité."
        fields={[
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
              "Autre",
            ],
          },
        ]}
        dynamicOfferResolver={() => "decennale"}
        dynamicOffers={{
          decennale: {
            href: DECENNALE_URL,
            buttonLabel: "Découvrir les assurances décennales →",
            recommendedName: "Assurance décennale professionnelle",
            advice:
              "Compare les solutions disponibles et vérifie les garanties, franchises et activités couvertes avant de souscrire.",
            external: true,
            completionType: "none",
          },
        }}
        completionType="none"
      />
    </Suspense>
  );
}