"use client";

import { createContext, useContext } from "react";
import { isPremium } from "./premium";

type PremiumContextType = {
  premium: boolean;
};

const PremiumContext = createContext<PremiumContextType>({
  premium: false,
});

export function PremiumProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const premium = isPremium();

  return (
    <PremiumContext.Provider value={{ premium }}>
      {children}
    </PremiumContext.Provider>
  );
}

export function usePremiumContext() {
  return useContext(PremiumContext);
}