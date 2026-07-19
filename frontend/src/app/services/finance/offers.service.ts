import type { Offer } from "../../data/offers";

export function findBestOffer(
  currentPrice: number,
  offers: Offer[]
): Offer | null {
  if (!offers.length) return null;

  return [...offers].sort((a, b) => {
    const savingA = currentPrice - a.monthlyPrice;
    const savingB = currentPrice - b.monthlyPrice;

    return savingB - savingA;
  })[0];
}