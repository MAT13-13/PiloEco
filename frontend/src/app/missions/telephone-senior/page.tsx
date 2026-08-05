"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type EquipmentType =
  | "Smartphone simplifié"
  | "Téléphone mobile simple 4G"
  | "Téléphone fixe senior"
  | "Forfait mobile senior Doro Connect";

type OfferConfig = {
  href: string;
  title: string;
  description: string;
  buttonLabel: string;
  budgetLabel: string;
  budgetOptions: string[];
};

const offers: Record<EquipmentType, OfferConfig> = {
  "Smartphone simplifié": {
    href: "https://uxe.doro.com/?P51186158C0F52111&redir=https%3A%2F%2Fwww.doro.com%2Ffr-fr%2Ftelephones-et-accessoires%2Fsmartphones%2F",
    title: "Smartphones Doro pour seniors",
    description:
      "Découvre les smartphones Doro simplifiés, avec une interface lisible et des fonctions pensées pour les seniors.",
    buttonLabel: "Voir les smartphones Doro",
    budgetLabel: "Quel budget souhaites-tu consacrer au smartphone ?",
    budgetOptions: [
      "Moins de 250 €",
      "De 250 € à 300 €",
      "Plus de 300 €",
    ],
  },

  "Téléphone mobile simple 4G": {
    href: "https://uxe.doro.com/?P51186158C0F52111&redir=https%3A%2F%2Fwww.doro.com%2Ffr-fr%2Ftelephones-et-accessoires%2Ftelephones-mobiles%2F",
    title: "Téléphones mobiles simples 4G Doro",
    description:
      "Découvre les téléphones portables Doro 4G simples à utiliser. Les modèles proposés restent dans une gamme allant jusqu’à environ 160 €.",
    buttonLabel: "Voir les téléphones mobiles Doro",
    budgetLabel: "Quel budget souhaites-tu consacrer au téléphone mobile ?",
    budgetOptions: [
      "Moins de 80 €",
      "De 80 € à 120 €",
      "De 120 € à 160 €",
    ],
  },

  "Téléphone fixe senior": {
    href: "https://uxe.doro.com/?P51186158C0F52111&redir=https%3A%2F%2Fwww.doro.com%2Ffr-fr%2Ftelephones-et-accessoires%2Fappareils-pour-la-maison%2F",
    title: "Téléphones fixes Doro pour seniors",
    description:
      "Découvre les téléphones fixes et sans fil Doro pour la maison. Les modèles proposés restent dans une gamme allant jusqu’à environ 110 €.",
    buttonLabel: "Voir les téléphones fixes Doro",
    budgetLabel: "Quel budget souhaites-tu consacrer au téléphone fixe ?",
    budgetOptions: [
      "Moins de 50 €",
      "De 50 € à 80 €",
      "De 80 € à 110 €",
    ],
  },

  "Forfait mobile senior Doro Connect": {
    href: "https://uxe.doro.com/?P51186158C0F52111&redir=https%3A%2F%2Fwww.doro.com%2Ffr-fr%2Fdoro-connect%2F",
    title: "Doro Connect – Forfait mobile senior",
    description:
      "Découvre Doro Connect, une offre mobile pensée pour les seniors avec un accompagnement adapté.",
    buttonLabel: "Découvrir Doro Connect",
    budgetLabel: "Quel budget mensuel souhaites-tu consacrer au forfait ?",
    budgetOptions: [
      "Moins de 10 € par mois",
      "De 10 € à 20 € par mois",
      "Plus de 20 € par mois",
    ],
  },
};

const equipmentOptions: EquipmentType[] = [
  "Forfait mobile senior Doro Connect",
  "Smartphone simplifié",
  "Téléphone fixe senior",
  "Téléphone mobile simple 4G",
];

export default function TelephoneSeniorMissionPage() {
  const [equipmentType, setEquipmentType] =
    useState<EquipmentType>("Smartphone simplifié");

  const offer = offers[equipmentType];

  const [budgetByEquipment, setBudgetByEquipment] = useState<
    Record<EquipmentType, string>
  >({
    "Smartphone simplifié":
      offers["Smartphone simplifié"].budgetOptions[0],
    "Téléphone mobile simple 4G":
      offers["Téléphone mobile simple 4G"].budgetOptions[0],
    "Téléphone fixe senior":
      offers["Téléphone fixe senior"].budgetOptions[0],
    "Forfait mobile senior Doro Connect":
      offers["Forfait mobile senior Doro Connect"].budgetOptions[0],
  });

  const currentBudget = budgetByEquipment[equipmentType];

  const summary = useMemo(() => {
    return `${equipmentType} · ${currentBudget}`;
  }, [equipmentType, currentBudget]);

  function updateEquipment(nextEquipment: EquipmentType) {
    setEquipmentType(nextEquipment);
  }

  function updateBudget(nextBudget: string) {
    setBudgetByEquipment((current) => ({
      ...current,
      [equipmentType]: nextBudget,
    }));
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
            📱 Mission Pilo
          </p>

          <h1 className="mt-4 text-4xl font-black">
            Choisir un téléphone senior adapté
          </h1>

          <p className="mt-4 text-slate-300">
            Sélectionne simplement le type d’équipement recherché et la
            fourchette de prix souhaitée.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <label>
              <p className="mb-2 font-semibold">
                Quel équipement recherches-tu ?
              </p>

              <select
                value={equipmentType}
                onChange={(event) =>
                  updateEquipment(event.target.value as EquipmentType)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
              >
                {equipmentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <p className="mb-2 font-semibold">
                {offer.budgetLabel}
              </p>

              <select
                value={currentBudget}
                onChange={(event) => updateBudget(event.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
              >
                {offer.budgetOptions.map((option) => (
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
                {summary}
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
              En cliquant sur le bouton, tu seras redirigé vers le site de
              notre partenaire. Tu restes libre de poursuivre ou non ton
              achat ou ta souscription.
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