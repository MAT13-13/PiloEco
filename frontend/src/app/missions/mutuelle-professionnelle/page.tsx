"use client";

import MissionLayout from "../../components/MissionLayout";

export default function MutuelleProfessionnelleMissionPage() {
  return (
    <MissionLayout
      icon="❤️"
      title="Mutuelle Professionnelle"
      subtitle="Trouve une solution de mutuelle santé adaptée à ton activité professionnelle et à ta situation."
      basePrice={90}
      recommendedPrice={70}
      recommendedName="Mutuelle santé TNS partenaire"
      offerPath="/offres/mutuelle-professionnelle"
      advice="Compare les garanties, les niveaux de remboursement, les exclusions et le tarif proposé avant de choisir ta mutuelle professionnelle."
      fields={[
        {
          name: "professionalStatus",
          label: "Quel est ton statut professionnel ?",
          type: "select",
          defaultValue: "Auto-entrepreneur",
          options: [
            "Auto-entrepreneur",
            "Artisan / Commerçant",
            "Profession libérale",
            "Gérant majoritaire de SARL",
            "Travailleur indépendant",
            "Autre",
          ],
        },
        {
          name: "coverage",
          label: "Qui souhaites-tu couvrir ?",
          type: "select",
          defaultValue: "Moi uniquement",
          options: [
            "Moi uniquement",
            "Moi + conjoint",
            "Moi + enfant(s)",
            "Toute ma famille",
          ],
        },
        {
          name: "priority",
          label: "Quel est ton besoin principal ?",
          type: "select",
          defaultValue: "Réduire le prix de ma mutuelle",
          options: [
            "Réduire le prix de ma mutuelle",
            "Améliorer mes remboursements",
            "Optique",
            "Dentaire",
            "Hospitalisation",
            "Médecines douces",
            "Trouver ma première mutuelle professionnelle",
          ],
        },
        {
          name: "currentPrice",
          label: "Combien paies-tu actuellement par mois ?",
          type: "number",
          defaultValue: "90",
        },
      ]}
    />
  );
}