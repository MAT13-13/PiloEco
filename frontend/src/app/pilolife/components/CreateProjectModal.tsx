"use client";

import { useState } from "react";
import { createPiloLifeProject } from "../services/pilolife.service";

const categories = [
  {
    icon: "🏡",
    label: "Maison",
    description: "Construire votre futur chez-vous.",
    type: "goal",
  },
  {
    icon: "✈️",
    label: "Voyage",
    description: "Préparer votre prochaine aventure.",
    type: "goal",
  },
  {
    icon: "🚗",
    label: "Véhicule",
    description: "Changer de voiture ou de moto.",
    type: "goal",
  },
  {
    icon: "💰",
    label: "Pouvoir d'achat",
    description: "Respirer financièrement chaque mois.",
    type: "pouvoir_achat",
  },
  {
    icon: "📈",
    label: "Épargne",
    description: "Construire une réserve de sécurité.",
    type: "goal",
  },
  {
    icon: "🐶",
    label: "Animal",
    description: "Préparer l'arrivée d'un compagnon.",
    type: "goal",
  },
  {
    icon: "💼",
    label: "Entreprise",
    description: "Développer votre activité.",
    type: "goal",
  },
  {
    icon: "🎯",
    label: "Personnalisé",
    description: "Créer votre propre objectif.",
    type: "goal",
  },
];

type Props = {
  open: boolean;
  userId: string | null;
  onClose: () => void;
  onCreated: () => void;
};

export default function CreateProjectModal({
  open,
  userId,
  onClose,
  onCreated,
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  async function handleCreate() {
    if (!userId) {
      alert("Vous devez être connecté.");
      return;
    }

    if (!title || !targetAmount) {
      alert("Merci de remplir le nom et le montant.");
      return;
    }

    setSaving(true);

    try {
      await createPiloLifeProject({
        user_id: userId,
        title,
        category: selectedCategory.label,
        type: selectedCategory.type,
        target_amount: Number(targetAmount),
        target_date: targetDate || null,
        is_primary: false,
      });

      setTitle("");
      setTargetAmount("");
      setTargetDate("");
      setSelectedCategory(categories[0]);

      onCreated();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Impossible de créer l'objectif pour le moment.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-green-500/30 bg-slate-950 p-8 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="float-right text-xl text-slate-400 hover:text-white"
        >
          ✕
        </button>

        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          🌿 PiloLife
        </p>

        <h2 className="mt-4 text-4xl font-black">Créer un objectif</h2>

        <p className="mt-3 text-slate-300">
          Pilo vous aide à donner une destination à vos économies.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {categories.map((category) => {
            const active = selectedCategory.label === category.label;

            return (
              <button
                key={category.label}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-green-400 bg-green-500/20"
                    : "border-white/10 bg-slate-900 hover:border-green-400/50"
                }`}
              >
                <div className="text-3xl">{category.icon}</div>
                <h3 className="mt-3 font-black">{category.label}</h3>
                <p className="mt-2 text-sm text-slate-400">
                  {category.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-8 rounded-3xl bg-slate-900 p-6">
          <p className="text-green-400 font-bold">
            {selectedCategory.icon} Excellent choix
          </p>

          <p className="mt-2 text-slate-300">{selectedCategory.description}</p>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div>
              <label className="text-sm text-slate-400">Nom du projet</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Maison dans le Var"
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-green-400"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">Montant cible</label>
              <input
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                type="number"
                placeholder="50000"
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-green-400"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">Date souhaitée</label>
              <input
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                type="date"
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-green-400"
              />
            </div>
          </div>

          <button
            onClick={handleCreate}
            disabled={saving}
            className="mt-6 w-full rounded-2xl bg-green-500 px-6 py-4 text-lg font-black text-black transition hover:bg-green-400 disabled:opacity-50"
          >
            {saving ? "Création..." : "🌿 Créer mon objectif"}
          </button>
        </div>
      </div>
    </div>
  );
}