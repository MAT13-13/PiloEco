import { Depense } from "../../services/finance/depenses.service";
import { PiloAlert } from "./types";
import { findBestOffer } from "./comparator";
import { calculateYearlySaving } from "./savings";

export function generateAlerts(depenses: Depense[]): PiloAlert[] {
  const alerts: PiloAlert[] = [];

  depenses.forEach((depense) => {
    const category = depense.category.toLowerCase();

    function createAlert(
      piloCategory: "telephone" | "internet" | "electricite" | "habitation",
      level: "green" | "yellow" | "red",
      title: string,
      description: string
    ) {
      const bestOffer = findBestOffer(piloCategory);

      if (!bestOffer) return;

      const saving = calculateYearlySaving(depense.amount, bestOffer);

      if (saving <= 0) return;

      alerts.push({
        id: crypto.randomUUID(),
        category: piloCategory,
        level,
        title,
        description: `${description} Meilleure offre détectée : ${bestOffer.name} à ${bestOffer.monthlyPrice} €/mois.`,
        saving,
        action: "Comparer",

        currentOffer: depense.description,
        currentPrice: depense.amount,
      });
    }

    if (
      category.includes("telephone") ||
      category.includes("mobile")
    ) {
      createAlert(
        "telephone",
        "red",
        "Forfait mobile trop cher",
        "Pilo a trouvé une offre mobile moins chère."
      );
    }

    if (category.includes("internet")) {
      createAlert(
        "internet",
        "yellow",
        "Internet à vérifier",
        "Une offre internet moins chère semble disponible."
      );
    }

    if (
      category.includes("electricite") ||
      category.includes("edf")
    ) {
      createAlert(
        "electricite",
        "yellow",
        "Électricité à comparer",
        "Une offre énergie plus compétitive peut réduire ta facture."
      );
    }

    if (
      category.includes("habitation") ||
      category.includes("assurance")
    ) {
      createAlert(
        "habitation",
        "green",
        "Assurance à surveiller",
        "Une comparaison peut permettre de réduire le coût."
      );
    }
  });

  return alerts;
}