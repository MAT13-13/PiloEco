export type Echeance = {
  id: string;
  category: string;
  title: string;
  dueInDays: number;
  priority: "green" | "yellow" | "red";
  action: string;
};

export function buildEcheances(): Echeance[] {
  return [
    {
      id: "mobile",
      category: "telephone",
      title: "Fin d'engagement mobile",
      dueInDays: 18,
      priority: "yellow",
      action: "Comparer maintenant",
    },
    {
      id: "home",
      category: "habitation",
      title: "Renouvellement assurance habitation",
      dueInDays: 28,
      priority: "green",
      action: "Comparer les offres",
    },
    {
      id: "energy",
      category: "electricite",
      title: "Révision contrat énergie",
      dueInDays: 5,
      priority: "red",
      action: "Agir maintenant",
    },
  ];
}