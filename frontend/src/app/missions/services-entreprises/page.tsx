"use client";

import { Suspense } from "react";
import MissionLayout from "../../components/MissionLayout";

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
        subtitle="Décris ton activité et Pilo t'aide à identifier les solutions adaptées à ton entreprise."
        basePrice={150}
        recommendedPrice={120}
        recommendedName="Services professionnels optimisés"
        advice="Compare les garanties, les exclusions, les franchises et le tarif avant de souscrire une assurance professionnelle."
       fields={[
  {
    name: "serviceType",
    label: "Quel service professionnel recherches-tu ?",
    type: "select",
    defaultValue: "Assurance décennale",
    options: [
      "Assurance décennale",
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
      "Autre",
    ],
  },
]}
        offerPath="/offres/services-entreprises"
        dynamicOfferField="serviceType"
        dynamicOffers={{
          "Assurance décennale": {
            href: "https://stella-2.com/clc/1xumfaIDKujvDbncH2H9xw",
            buttonLabel: "Découvrir les solutions décennales",
          },
        }}
      />
    </Suspense>
  );
}