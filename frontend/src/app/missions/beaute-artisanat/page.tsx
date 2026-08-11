"use client";

import MissionLayout from "../../components/MissionLayout";

export default function BeauteArtisanatMissionPage() {
  return (
    <MissionLayout
      icon="🌸"
      title="Beauté & créations artisanales"
      subtitle="Trouve une création faite main, personnalisée et adaptée à ton envie, ton style ou l'occasion."
      basePrice={50}
      recommendedPrice={35}
      recommendedName="Création artisanale personnalisée"
      advice="Privilégie une création adaptée à ton budget, à l'occasion et au niveau de personnalisation souhaité."
      offerPath="/offres/beaute-artisanat"
      fields={[
        {
          name: "creationType",
          label: "Quel type de création recherches-tu ?",
          type: "select",
          defaultValue: "Press-on nails personnalisés",
          options: [
            "Press-on nails personnalisés",
            "Bougie florale faite main",
            "Cadre floral",
            "Macramé & décoration",
            "Cadeau naissance artisanal",
            "Fleurs séchées & composition",
            "Autre création personnalisée",
          ],
        },
        {
          name: "occasion",
          label: "Pour quelle occasion ?",
          type: "select",
          defaultValue: "Pour me faire plaisir",
          options: [
            "Pour me faire plaisir",
            "Anniversaire",
            "Naissance",
            "Mariage",
            "Saint-Valentin",
            "Fête des mères",
            "Noël",
            "Remerciement",
            "Décoration de la maison",
            "Autre occasion",
          ],
        },
        {
          name: "style",
          label: "Quel style recherches-tu ?",
          type: "select",
          defaultValue: "Floral",
          options: [
            "Floral",
            "Bohème",
            "Naturel",
            "Élégant",
            "Minimaliste",
            "Romantique",
            "Coloré",
            "Personnalisé",
          ],
        },
        {
          name: "budget",
          label: "Quel est ton budget ?",
          type: "select",
          defaultValue: "30 à 50 €",
          options: [
            "Moins de 20 €",
            "20 à 30 €",
            "30 à 50 €",
            "50 à 80 €",
            "80 à 120 €",
            "Plus de 120 €",
          ],
        },
        {
          name: "personalization",
          label: "Souhaites-tu une création personnalisée ?",
          type: "select",
          defaultValue: "Oui",
          options: [
            "Oui",
            "Non",
            "Je ne sais pas encore",
          ],
        },
      ]}
    />
  );
}