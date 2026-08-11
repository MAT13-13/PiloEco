"use client";

import { Suspense } from "react";
import MissionLayout from "../../components/MissionLayout";

export default function TravauxMissionPage() {
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
        icon="🛠️"
        title="Optimiser tes travaux et rénovations"
        subtitle="Décris ton projet et Pilo t'aide à identifier les solutions adaptées à tes travaux."
        basePrice={5000}
        recommendedPrice={4000}
        recommendedName="Projet travaux optimisé"
        advice="Selon ton projet, ton logement et ta situation, Pilo peut identifier différentes solutions adaptées à tes besoins."
        fields={[
          {
            name: "projectType",
            label: "Quel type de travaux souhaites-tu réaliser ?",
            type: "select",
            defaultValue: "Rénovation énergétique",
            options: [
              "Adaptation du logement",
              "Aménagement intérieur",
              "Chauffage",
              "Climatisation réversible",
              "Cuisine",
              "Douche sécurisée",
              "Fenêtres",
              "Isolation",
              "Isolation des combles",
              "Isolation des murs par l'extérieur",
              "Menuiseries",
              "Monte-escalier",
              "Panneaux photovoltaïques",
              "Peinture et décoration",
              "Peinture intérieure",
              "Pompe à chaleur",
              "Rénovation énergétique",
              "Salle de bain",
              "Véranda",
              "Autre",
            ],
          },
          {
            name: "budget",
            label: "Quel est ton budget estimé ?",
            type: "number",
            defaultValue: 5000,
          },
        ]}
        offerPath="/offres/travaux"
        dynamicOfferField="projectType"
        dynamicOffers={{
          "Climatisation réversible": {
            href: "https://stella-2.com/clc/01BzYSmAO0Cqbe_WKOa6xQ",
            buttonLabel: "Obtenir des devis",
          },

          "Peinture et décoration": {
            href: "https://stella-2.com/clc/_xf3wKnnmcurgbft0H_yww",
            buttonLabel: "Obtenir des devis",
          },

          "Peinture intérieure": {
            href: "https://stella-2.com/clc/_xf3wKnnmcurgbft0H_yww",
            buttonLabel: "Obtenir des devis",
          },

          "Isolation des combles": {
            href: "https://stella-2.com/clc/DgrSoXK-ewCkjdmuDG_1_A",
            buttonLabel: "Obtenir un devis",
          },

          "Isolation des murs par l'extérieur": {
            href: "https://stella-2.com/clc/tetUTsGk4uDET_7LpuRpuQ",
            buttonLabel: "Estimer mes travaux",
          },

          "Véranda": {
            href: "https://stella-2.com/clc/RJejthsCv32yJKzNfgXupw",
            buttonLabel: "Recevoir des devis véranda",
          },
        }}
      />
    </Suspense>
  );
}