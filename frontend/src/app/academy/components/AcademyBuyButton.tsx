"use client";

import { useState } from "react";

type AcademyProductSlug =
  | "site-ia"
  | "mon-business"
  | "30-jours-visibilite"
  | "neuroscience"
  | "pack";

type AcademyBuyButtonProps = {
  productSlug: AcademyProductSlug;
  children: React.ReactNode;
  className?: string;
};

export default function AcademyBuyButton({
  productSlug,
  children,
  className = "",
}: AcademyBuyButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    try {
      setLoading(true);

      const response = await fetch("/api/academy/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productSlug,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.url) {
        throw new Error(
          data?.error || "Impossible de démarrer le paiement."
        );
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Erreur paiement Academy :", error);

      alert(
        error instanceof Error
          ? error.message
          : "Impossible de démarrer le paiement."
      );

      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={loading}
      className={`${className} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {loading ? "Ouverture du paiement..." : children}
    </button>
  );
}