"use client";

import MissionLayout from "../../components/MissionLayout";

export default function ServicesAutoMissionPage() {
  return (
    <MissionLayout
      icon="🔧"
      title="Trouver la bonne pièce ou le bon équipement auto"
      subtitle="Choisis la rubrique recherchée. Tu pourras ensuite renseigner ta plaque directement sur Oscaro pour afficher les pièces compatibles avec ton véhicule."
      basePrice={180}
      recommendedPrice={140}
      recommendedName="Offre partenaire Oscaro"
      advice="Sélectionne la rubrique correspondant à ton besoin, puis vérifie la compatibilité avec ton véhicule directement chez notre partenaire."
      fields={[
        {
          name: "serviceType",
          label: "Quelle rubrique recherches-tu ?",
          type: "select",
          defaultValue: "Démarrage électrique",
          options: [
            "Démarrage électrique",
            "Direction / Suspension / Train",
            "Embrayage et boîte de vitesse",
            "Entretien et nettoyage",
            "Essuie-glaces et pièces",
            "Filtres et huile",
            "Freinage",
            "Optiques / Phares / Ampoules",
            "Outillage",
            "Pièces moteur",
            "Pneus et équipements roue",
            "Autre",
          ],
        },
        {
          name: "monthlyPrice",
          label: "Quel budget souhaites-tu consacrer à cet achat ?",
          type: "select",
          defaultValue: "De 50 € à 150 €",
          options: [
            "Moins de 50 €",
            "De 50 € à 150 €",
            "Plus de 150 €",
          ],
        },
      ]}
      dynamicOfferField="serviceType"
      dynamicOffers={{
        "Démarrage électrique": {
          href: "https://irh.oscaro.com/?P51395558C0F52191&redir=https%3A%2F%2Fwww.oscaro.com%2Fdemarrage-electrique-702600-c",
          buttonLabel: "Voir le démarrage électrique",
          recommendedName: "Oscaro – Démarrage électrique",
          advice:
            "Découvre les batteries, démarreurs, alternateurs et pièces liées au démarrage électrique.",
          external: true,
        },

        "Direction / Suspension / Train": {
          href: "https://irh.oscaro.com/?P51395558C0F52191&redir=https%3A%2F%2Fwww.oscaro.com%2Fdirection-suspension-train-702558-c",
          buttonLabel: "Voir les pièces de direction et suspension",
          recommendedName: "Oscaro – Direction, suspension et train",
          advice:
            "Découvre les pièces de direction, suspension et train adaptées à ton véhicule.",
          external: true,
        },

        "Embrayage et boîte de vitesse": {
          href: "https://irh.oscaro.com/?P51395558C0F52191&redir=https%3A%2F%2Fwww.oscaro.com%2Fembrayage-et-boite-de-vitesse-702611-c",
          buttonLabel: "Voir les pièces d’embrayage",
          recommendedName: "Oscaro – Embrayage et boîte de vitesse",
          advice:
            "Découvre les kits d’embrayage et les pièces liées à la boîte de vitesse.",
          external: true,
        },

        "Entretien et nettoyage": {
          href: "https://irh.oscaro.com/?P51395558C0F52191&redir=https%3A%2F%2Fwww.oscaro.com%2Fentretien-et-nettoyage-702667-c",
          buttonLabel: "Voir les produits d’entretien",
          recommendedName: "Oscaro – Entretien et nettoyage",
          advice:
            "Découvre les produits utiles pour entretenir, nettoyer et protéger ton véhicule.",
          external: true,
        },

        "Essuie-glaces et pièces": {
          href: "https://irh.oscaro.com/?P51395558C0F52191&redir=https%3A%2F%2Fwww.oscaro.com%2Fessuie-glaces-et-pieces-702578-c",
          buttonLabel: "Voir les essuie-glaces",
          recommendedName: "Oscaro – Essuie-glaces et pièces",
          advice:
            "Découvre les balais d’essuie-glace et les pièces compatibles avec ton véhicule.",
          external: true,
        },

        "Filtres et huile": {
          href: "https://irh.oscaro.com/?P51395558C0F52191&redir=https%3A%2F%2Fwww.oscaro.com%2Ffiltres-et-huile-702615-c",
          buttonLabel: "Voir les filtres et huiles",
          recommendedName: "Oscaro – Filtres et huile",
          advice:
            "Découvre les filtres, huiles moteur et produits nécessaires à l’entretien courant.",
          external: true,
        },

        Freinage: {
          href: "https://irh.oscaro.com/?P51395558C0F52191&redir=https%3A%2F%2Fwww.oscaro.com%2Ffreinage-702551-c",
          buttonLabel: "Voir les pièces de freinage",
          recommendedName: "Oscaro – Freinage",
          advice:
            "Découvre les plaquettes, disques et autres pièces de freinage adaptées à ton véhicule.",
          external: true,
        },

        "Optiques / Phares / Ampoules": {
          href: "https://irh.oscaro.com/?P51395558C0F52191&redir=https%3A%2F%2Fwww.oscaro.com%2Foptiques-phares-ampoules-702715-c",
          buttonLabel: "Voir les optiques et ampoules",
          recommendedName: "Oscaro – Optiques, phares et ampoules",
          advice:
            "Découvre les phares, optiques et ampoules compatibles avec ton véhicule.",
          external: true,
        },

        Outillage: {
          href: "https://irh.oscaro.com/?P51395558C0F52191&redir=https%3A%2F%2Fwww.oscaro.com%2Foutillage-702627-c",
          buttonLabel: "Voir l’outillage auto",
          recommendedName: "Oscaro – Outillage",
          advice:
            "Découvre l’outillage nécessaire pour entretenir ou réparer ton véhicule.",
          external: true,
        },

        "Pièces moteur": {
          href: "https://irh.oscaro.com/?P51395558C0F52191&redir=https%3A%2F%2Fwww.oscaro.com%2Fpieces-moteur-702538-c",
          buttonLabel: "Voir les pièces moteur",
          recommendedName: "Oscaro – Pièces moteur",
          advice:
            "Découvre les pièces moteur compatibles avec ton véhicule.",
          external: true,
        },

        "Pneus et équipements roue": {
          href: "https://irh.oscaro.com/?P51395558C0F52191&redir=https%3A%2F%2Fwww.oscaro.com%2Fpneus-et-equipements-roue-702700-c",
          buttonLabel: "Voir les pneus et équipements roue",
          recommendedName: "Oscaro – Pneus et équipements roue",
          advice:
            "Découvre les pneus et équipements liés aux roues de ton véhicule.",
          external: true,
        },

        Autre: {
          href: "https://irh.oscaro.com/?P51395558C0F52191&redir=https%3A%2F%2Fwww.oscaro.com%2F",
          buttonLabel: "Découvrir toutes les pièces Oscaro",
          recommendedName: "Oscaro – Toutes les pièces auto",
          advice:
            "Découvre toutes les catégories de pièces détachées disponibles sur Oscaro.",
          external: true,
        },
      }}
    />
  );
}