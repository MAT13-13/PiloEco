"use client";

import { useEffect, useState } from "react";
import {
  addDepense,
  updateDepense,
  type Depense,
} from "../services/depenses.service";

type DepenseFormProps = {
  onDepenseAdded?: () => void;
  editingDepense?: Depense | null;
  onCancelEdit?: () => void;
};

export default function DepenseForm({
  onDepenseAdded,
  editingDepense,
  onCancelEdit,
}: DepenseFormProps) {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Alimentation");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isEditing = Boolean(editingDepense);

  useEffect(() => {
    if (!editingDepense) return;

    setDate(editingDepense.date);
    setAmount(String(editingDepense.amount));
    setCategory(editingDepense.category);
    setDescription(editingDepense.description);
    setMessage("Mode modification activé ✏️");
  }, [editingDepense]);

  function resetForm() {
    setDate("");
    setAmount("");
    setCategory("Alimentation");
    setDescription("");
  }

  async function handleSubmit() {
    setMessage("");

    if (!date || !amount || !description) {
      setMessage("Merci de remplir la date, le montant et la description.");
      return;
    }

    try {
      setLoading(true);

      const depensePayload = {
        date,
        amount: Number(amount),
        category,
        description,
      };

      if (editingDepense) {
        await updateDepense(editingDepense.id, depensePayload);
        setMessage("Dépense modifiée avec succès ✅");

        if (onCancelEdit) {
          onCancelEdit();
        }
      } else {
        await addDepense(depensePayload);
        setMessage("Dépense enregistrée avec succès ✅");
      }

      resetForm();

      if (onDepenseAdded) {
        onDepenseAdded();
      }
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de l'enregistrement de la dépense.");
    } finally {
      setLoading(false);
    }
  }

  function handleCancelEdit() {
    resetForm();
    setMessage("");

    if (onCancelEdit) {
      onCancelEdit();
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-bold text-white">
        {isEditing ? "✏ Modifier une dépense" : "➕ Ajouter une dépense"}
      </h2>

      <form className="mt-5 grid gap-4 md:grid-cols-2">
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
        />

        <input
          type="number"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="Montant en €"
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
        >
          <option>Alimentation</option>
          <option>Logement</option>
          <option>Transport</option>
          <option>Assurance</option>
          <option>Abonnement</option>
          <option>Animaux</option>
          <option>Autre</option>
        </select>

        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-xl bg-green-500 px-5 py-3 font-bold text-slate-950 hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
        >
          {loading
            ? "Enregistrement..."
            : isEditing
              ? "Enregistrer les modifications"
              : "Enregistrer la dépense"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="rounded-xl border border-slate-700 px-5 py-3 font-bold text-white hover:bg-slate-800 md:col-span-2"
          >
            Annuler la modification
          </button>
        )}
      </form>

      {message && <p className="mt-4 text-sm text-slate-300">{message}</p>}
    </div>
  );
}