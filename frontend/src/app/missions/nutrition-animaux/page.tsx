"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type AnimalType = "Chien" | "Chat";

type DogProductType =
  | "Calculer la ration"
  | "Croquettes"
  | "Terrines"
  | "Moelleux par Thierry Marx";

type CatProductType =
  | "Croquettes"
  | "Terrines"
  | "Friandises"
  | "Moelleux par Thierry Marx";

type ProductType = DogProductType | CatProductType;

type OfferConfig = {
  href: string;
  title: string;
  description: string;
  buttonLabel: string;
};

const dogOffers: Record<DogProductType, OfferConfig> = {
  "Calculer la ration": {
    href: "https://bwx.babin-nutrition.com/?P5138E358C0F51F1&redir=https%3A%2F%2Fwww.babin-nutrition.com%2Fcalculez-la-ration-de-votre-chien",
    title: "Calculateur de ration Bab’in pour chien",
    description:
      "Estime la ration quotidienne adaptée à ton chien avant de choisir son alimentation.",
    buttonLabel: "Calculer la ration de mon chien",
  },

  Croquettes: {
    href: "https://bwx.babin-nutrition.com/?P5138E358C0F51F1&redir=https%3A%2F%2Fwww.babin-nutrition.com%2F3-croquettes-premium-chiens%3Ftype-de-produit%3Dcroquettes",
    title: "Croquettes premium Bab’in pour chiens",
    description:
      "Découvre les croquettes premium Bab’in proposées pour les chiens.",
    buttonLabel: "Voir les croquettes pour chiens",
  },

  Terrines: {
    href: "https://bwx.babin-nutrition.com/?P5138E358C0F51F1&redir=https%3A%2F%2Fwww.babin-nutrition.com%2F3-croquettes-premium-chiens%3Ftype-de-produit%3Dterrines",
    title: "Terrines Bab’in pour chiens",
    description:
      "Découvre les terrines Bab’in disponibles pour compléter ou varier l’alimentation de ton chien.",
    buttonLabel: "Voir les terrines pour chiens",
  },

  "Moelleux par Thierry Marx": {
    href: "https://bwx.babin-nutrition.com/?P5138E358C0F51F1&redir=https%3A%2F%2Fwww.babin-nutrition.com%2F3-croquettes-premium-chiens%3Ftype-de-produit%3Dmoelleux-par-thierry-marx",
    title: "Moelleux Bab’in par Thierry Marx pour chiens",
    description:
      "Découvre les recettes moelleuses Bab’in par Thierry Marx proposées pour les chiens.",
    buttonLabel: "Voir les moelleux pour chiens",
  },
};

const catOffers: Record<CatProductType, OfferConfig> = {
  Croquettes: {
    href: "https://bwx.babin-nutrition.com/?P5138E358C0F51F1&redir=https%3A%2F%2Fwww.babin-nutrition.com%2F13-croquettes-premium-chats%3Ftype-de-produit%3Dcroquettes",
    title: "Croquettes premium Bab’in pour chats",
    description:
      "Découvre les croquettes premium Bab’in proposées pour les chats.",
    buttonLabel: "Voir les croquettes pour chats",
  },

  Terrines: {
    href: "https://bwx.babin-nutrition.com/?P5138E358C0F51F1&redir=https%3A%2F%2Fwww.babin-nutrition.com%2F13-croquettes-premium-chats%3Ftype-de-produit%3Dterrines",
    title: "Terrines Bab’in pour chats",
    description:
      "Découvre les terrines Bab’in disponibles pour varier l’alimentation de ton chat.",
    buttonLabel: "Voir les terrines pour chats",
  },

  Friandises: {
    href: "https://bwx.babin-nutrition.com/?P5138E358C0F51F1&redir=https%3A%2F%2Fwww.babin-nutrition.com%2F13-croquettes-premium-chats%3Ftype-de-produit%3Dfriandise",
    title: "Friandises Bab’in pour chats",
    description:
      "Découvre les friandises Bab’in proposées pour les chats.",
    buttonLabel: "Voir les friandises pour chats",
  },

  "Moelleux par Thierry Marx": {
    href: "https://bwx.babin-nutrition.com/?P5138E358C0F51F1&redir=https%3A%2F%2Fwww.babin-nutrition.com%2F13-croquettes-premium-chats%3Ftype-de-produit%3Dmoelleux-par-thierry-marx",
    title: "Moelleux Bab’in par Thierry Marx pour chats",
    description:
      "Découvre les recettes moelleuses Bab’in par Thierry Marx proposées pour les chats.",
    buttonLabel: "Voir les moelleux pour chats",
  },
};

const dogProductOptions: DogProductType[] = [
  "Calculer la ration",
  "Croquettes",
  "Moelleux par Thierry Marx",
  "Terrines",
];

const catProductOptions: CatProductType[] = [
  "Croquettes",
  "Friandises",
  "Moelleux par Thierry Marx",
  "Terrines",
];

export default function NutritionAnimauxMissionPage() {
  const [animalType, setAnimalType] =
    useState<AnimalType>("Chien");

  const [productType, setProductType] =
    useState<ProductType>("Croquettes");

  const productOptions =
    animalType === "Chien"
      ? dogProductOptions
      : catProductOptions;

  const offer = useMemo(() => {
    if (animalType === "Chien") {
      return dogOffers[productType as DogProductType];
    }

    return catOffers[productType as CatProductType];
  }, [animalType, productType]);

  function updateAnimal(nextAnimal: AnimalType) {
    setAnimalType(nextAnimal);

    if (nextAnimal === "Chien") {
      setProductType("Croquettes");
      return;
    }

    setProductType("Croquettes");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/missions"
          className="text-green-400 hover:underline"
        >
          ← Retour aux missions
        </Link>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            🐾 Mission Pilo
          </p>

          <h1 className="mt-4 text-4xl font-black">
            Choisir une alimentation adaptée
          </h1>

          <p className="mt-4 text-slate-300">
            Sélectionne ton animal puis le type d’alimentation recherché.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <label>
              <p className="mb-2 font-semibold">
                Pour quel animal recherches-tu une alimentation ?
              </p>

              <select
                value={animalType}
                onChange={(event) =>
                  updateAnimal(event.target.value as AnimalType)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
              >
                <option value="Chien">Chien</option>
                <option value="Chat">Chat</option>
              </select>
            </label>

            <label>
              <p className="mb-2 font-semibold">
                Quel produit recherches-tu ?
              </p>

              <select
                value={productType}
                onChange={(event) =>
                  setProductType(event.target.value as ProductType)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
              >
                {productOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-10 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">
              Offre partenaire correspondant à ton choix
            </p>

            <h2 className="mt-4 text-3xl font-black">
              {offer.title}
            </h2>

            <p className="mt-3 text-slate-300">
              {offer.description}
            </p>

            <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">
                Ton choix
              </p>

              <p className="mt-1 font-bold text-white">
                {animalType} · {productType}
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
              En cliquant sur le bouton, tu seras redirigé vers le site de
              notre partenaire. Tu restes libre de poursuivre ou non ton
              achat.
            </div>

            <a
              href={offer.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-xl bg-green-500 px-8 py-3 font-bold text-black transition hover:bg-green-400"
            >
              {offer.buttonLabel}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}