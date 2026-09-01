"use client";

import { Suspense } from "react";
import MissionLayout from "../../components/MissionLayout";

const ASSURANCE_PRET_PRO_URL =
  "https://www.assurlandpro.com/assurance-pret-professionnel.html?partnerlinkid=120HL10&utm_medium=affiliation&utm_source=PiloEco&utm_campaign=pretpro_conversion_email_CPA_generique";

export default function AssurancePretProMissionPage() {
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
        icon="🏦"
        title="Comparer les assurances de prêt professionnel"
        subtitle="Trouve une assurance adaptée au financement de ton entreprise, de ton matériel ou de tes locaux professionnels."
        basePrice={0}
        recommendedPrice={0}
        recommendedName="Assurland Pro – Assurance prêt professionnel"
        advice="Compare les garanties, les exclusions, les délais de carence et le coût total de l’assurance sur la durée du prêt."
        fields={[
          {
            name: "project",
            label: "Quel projet souhaites-tu financer ?",
            type: "select",
            defaultValue: "Achat de matériel professionnel",
            options: [
              "Achat de matériel professionnel",
              "Achat de locaux professionnels",
              "Création d’entreprise",
              "Reprise d’entreprise",
              "Développement de l’activité",
              "Autre projet professionnel",
            ],
          },
          {
            name: "loanStatus",
            label: "Où en est ton financement ?",
            type: "select",
            defaultValue: "Projet en préparation",
            options: [
              "Projet en préparation",
              "Demande de prêt en cours",
              "Offre de prêt reçue",
              "Prêt professionnel déjà assuré",
            ],
          },
          {
            name: "need",
            label: "Quel est ton besoin principal ?",
            type: "select",
            defaultValue: "Trouver une assurance pour mon prêt",
            options: [
              "Trouver une assurance pour mon prêt",
              "Comparer l’assurance proposée par la banque",
              "Réduire le coût de mon assurance",
              "Améliorer mes garanties",
            ],
          },
        ]}
        dynamicOfferResolver={() => "assurance-pret-pro"}
        dynamicOffers={{
          "assurance-pret-pro": {
            href: ASSURANCE_PRET_PRO_URL,
            buttonLabel: "Comparer avec Assurland Pro →",
            recommendedName: "Assurland Pro – Assurance prêt professionnel",
            advice:
              "Vérifie les garanties décès, invalidité et incapacité ainsi que leurs exclusions et conditions d’application.",
            external: true,
            completionType: "none",
          },
        }}
        completionType="none"
      />
    </Suspense>
  );
}