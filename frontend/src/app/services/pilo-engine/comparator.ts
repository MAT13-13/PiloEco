import { offers, Offer, OfferCategory } from "./offers";

export function findBestOffer(
  category: OfferCategory
): Offer | null {
  const categoryOffers = offers.filter(
    (offer) => offer.category === category
  );

  if (categoryOffers.length === 0) {
    return null;
  }

  return categoryOffers.reduce((best, current) =>
    current.monthlyPrice < best.monthlyPrice ? current : best
  );
}