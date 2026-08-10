"use client";

import MissionLayout from "../../components/MissionLayout";

const autodistributionOffer = {
  href: "https://track.effiliation.com/servlet/effi.click?id_compteur=23301537",
  buttonLabel: "Découvrir Autodistribution",
  recommendedName: "Autodistribution – Pièces et équipements auto",
  advice:
    "Découvre les pièces, équipements et solutions automobiles disponibles chez Autodistribution.",
  external: true,
};

export default function ServicesAutoMissionPage() {
  return (
    <MissionLayout
      icon="🔧"
      title="Entretenir, réparer ou équiper ton véhicule"
      subtitle="Choisis ton besoin : trouve un garage avec AD, commande tes pièces sur Oscaro, découvre Autodistribution ou trouve tes pneus et jantes avec Autopink."
      basePrice={180}
      recommendedPrice={140}
      recommendedName="Solution partenaire automobile"
      advice="Sélectionne la rubrique correspondant à ton besoin pour accéder à l’offre partenaire adaptée."
      fields={[
        {
          name: "serviceType",
          label: "Que recherches-tu pour ton véhicule ?",
          type: "select",
          defaultValue: "Entretien ou réparation en garage",
          options: [
            "Entretien ou réparation en garage",
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
            "Pneus été",
            "Pneus hiver",
            "Pneus 4 saisons",
            "Pneus camionnette",
            "Pneus moto",
            "Jantes et roues complètes",
            "Autre",
          ],
        },
        {
          name: "monthlyPrice",
          label: "Quel budget souhaites-tu consacrer à ce besoin ?",
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
        "Entretien ou réparation en garage": {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23300914&url=https%3A%2F%2Fwww.ad.fr%2F",
          buttonLabel: "Trouver un garage AD",
          recommendedName: "AD – Entretien et réparation automobile",
          advice:
            "Trouve un garage AD pour entretenir ou réparer ton véhicule et consulte les services disponibles près de chez toi.",
          external: true,
        },

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

        "Pneus été": {
          href: "https://esa.autopink-shop.fr/?P51306958C0F5171&redir=https%3A%2F%2Fwww.autopink-shop.fr%2Fpneus_ete.html",
          buttonLabel: "Voir les pneus été",
          recommendedName: "Autopink – Pneus été",
          advice:
            "Trouve des pneus été adaptés à ton véhicule et sélectionne directement tes dimensions sur Autopink.",
          external: true,
        },

        "Pneus hiver": {
          href: "https://esa.autopink-shop.fr/?P51306958C0F5171&redir=https%3A%2F%2Fwww.autopink-shop.fr%2Fpneus_hiver.html",
          buttonLabel: "Voir les pneus hiver",
          recommendedName: "Autopink – Pneus hiver",
          advice:
            "Trouve des pneus hiver adaptés à ton véhicule pour améliorer l’adhérence par temps froid.",
          external: true,
        },

        "Pneus 4 saisons": {
          href: "https://esa.autopink-shop.fr/?P51306958C0F5171&redir=https%3A%2F%2Fwww.autopink-shop.fr%2Fpneus_toutes_saisons.html",
          buttonLabel: "Voir les pneus 4 saisons",
          recommendedName: "Autopink – Pneus 4 saisons",
          advice:
            "Trouve des pneus toutes saisons adaptés à ton véhicule pour une utilisation polyvalente toute l’année.",
          external: true,
        },

        "Pneus camionnette": {
          href: "https://esa.autopink-shop.fr/?P51306958C0F5171&redir=https%3A%2F%2Fwww.autopink-shop.fr%2Fpneu_camionnette.html",
          buttonLabel: "Voir les pneus camionnette",
          recommendedName: "Autopink – Pneus camionnette",
          advice:
            "Trouve des pneus adaptés aux utilitaires et camionnettes selon les dimensions de ton véhicule.",
          external: true,
        },

        "Pneus moto": {
          href: "https://esa.autopink-shop.fr/?P51306958C0F5171&redir=https%3A%2F%2Fwww.autopink-shop.fr%2Fpneus_moto.html",
          buttonLabel: "Voir les pneus moto",
          recommendedName: "Autopink – Pneus moto",
          advice:
            "Trouve les pneus adaptés à ta moto puis affine ton choix selon ton type de deux-roues.",
          external: true,
        },

        "Jantes et roues complètes": {
          href: "https://esa.autopink-shop.fr/?P51306958C0F5171&redir=https%3A%2F%2Fwww.autopink-shop.fr%2FRoues_completes.html",
          buttonLabel: "Voir les jantes et roues complètes",
          recommendedName: "Autopink – Jantes et roues complètes",
          advice:
            "Découvre les roues complètes et les solutions de jantes disponibles pour ton véhicule.",
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
      thirdOffer={autodistributionOffer}
      thirdOfferTitle="Autre partenaire automobile"
    />
  );
}