import { Offer } from "../data/offers";

export function explainOffer(currentPrice: number, offer: Offer): string {
  const saving = Math.max(
    0,
    Math.round((currentPrice - offer.monthlyPrice) * 12)
  );

  return `Tu paies actuellement ${currentPrice.toFixed(
    2
  )} €/mois. En choisissant ${offer.provider}, tu pourrais économiser environ ${saving} € par an. Cette offre bénéficie d'un excellent rapport qualité/prix avec ${
    offer.data ?? "une bonne enveloppe data"
  }, ${offer.network ?? "un réseau fiable"} et ${
    offer.commitment ?? "une offre flexible"
  }.`;
}