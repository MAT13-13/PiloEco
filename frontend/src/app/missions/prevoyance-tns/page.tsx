"use client";

import { Suspense } from "react";
import MissionLayout from "../../components/MissionLayout";

const PREVOYANCE_TNS_URL =
  "https://www.assurlandpro.com/assurance-prevoyance-individuelle.html?partnerlinkid=120HL14&utm_medium=affiliation&utm_source=PiloEco&utm_campaign=prevoyancetns_conversion_email_CPA_generique";

export default function PrevoyanceTnsMissionPage() {
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
        title="Comparer les assurances prévoyance TNS"
        subtitle="Protège tes revenus et tes proches face aux conséquences d’un arrêt de travail, d’une invalidité ou d’un décès."
        basePrice={0}
        recommendedPrice={0}
        recommendedName="Assurland Pro – Prévoyance TNS"
        advice="Compare les niveaux d’indemnisation, les délais de franchise, les exclusions et les garanties proposées."
        fields={[
          {
            name: "status",
            label: "Quel est ton statut professionnel ?",
            type: "select",
            defaultValue: "Travailleur indépendant",
            options: [
              "Travailleur indépendant",
              "Auto-entrepreneur",
              "Artisan",
              "Commerçant",
              "Profession libérale",
              "Gérant majoritaire",
              "Autre",
            ],
          },
          {
            name: "need",
            label: "Quel est ton besoin principal ?",
            type: "select",
            defaultValue: "Maintenir mes revenus en cas d’arrêt",
            options: [
              "Maintenir mes revenus en cas d’arrêt",
              "Me protéger en cas d’invalidité",
              "Protéger mes proches en cas de décès",
              "Comparer mon contrat actuel",
              "Souscrire ma première prévoyance",
            ],
          },
          {
            name: "currentCoverage",
            label: "As-tu déjà un contrat de prévoyance ?",
            type: "select",
            defaultValue: "Non",
            options: [
              "Non",
              "Oui",
              "Je ne sais pas",
            ],
          },
        ]}
        dynamicOfferResolver={() => "prevoyance-tns"}
        dynamicOffers={{
          "prevoyance-tns": {
            href: PREVOYANCE_TNS_URL,
            buttonLabel: "Comparer avec Assurland Pro →",
            recommendedName: "Assurland Pro – Prévoyance TNS",
            advice:
              "Vérifie les délais de franchise, les montants d’indemnisation et les conditions liées à ton activité professionnelle.",
            external: true,
            completionType: "none",
          },
        }}
        completionType="none"
      />
    </Suspense>
  );
}