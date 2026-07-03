"use client";

import { usePremiumContext } from "./PremiumContext";

export function usePremium() {
  return usePremiumContext();
}