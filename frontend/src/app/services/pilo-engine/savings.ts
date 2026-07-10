import { Offer } from "./offers";

export function calculateYearlySaving(
  currentMonthlyPrice: number,
  bestOffer: Offer
): number {
  const saving =
    (currentMonthlyPrice - bestOffer.monthlyPrice) * 12;

  return Math.max(Math.round(saving), 0);
}