export const PREMIUM_PRICE = 4.99;

export const PREMIUM_NAME = "Pilo Premium";

export const PREMIUM_FEATURES = {
  assistant: true,
  piloLife: true,
  unlimitedAnalysis: true,
  prioritySupport: true,
  futureModules: true,
};

export function isPremium() {
  // Stripe arrivera plus tard.
  // Pour l'instant on simule un utilisateur Premium.
  return true;
}