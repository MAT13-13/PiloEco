"use client";

import type { Depense } from "../services/depenses.service";
import { deleteDepense } from "../services/depenses.service";

type Props = {
  depenses: Depense[];
  onDelete: () => void;
  onEdit: (depense: Depense) => void;
};

export default function DepensesHistory({
  depenses,
  onDelete,
  onEdit,
}: Props) {
  async function handleDelete(id: string) {
    const confirmation = confirm("Supprimer cette dépense ?");

    if (!confirmation) return;

    await deleteDepense(id);
    onDelete();
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-5 text-xl font-bold text-white">
        📋 Historique des dépenses
      </h2>

      {depenses.length === 0 ? (
        <p className="text-slate-400">Aucune dépense.</p>
      ) : (
        <div className="space-y-3">
          {depenses.map((depense) => (
            <div
              key={depense.id}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4"
            >
              <div>
                <p className="font-semibold text-white">
                  {depense.description}
                </p>

                <p className="text-sm text-slate-400">
                  {depense.category}
                </p>

                <p className="text-xs text-slate-500">
                  {depense.date}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold text-emerald-400">
                  {Number(depense.amount).toFixed(2)} €
                </span>

                <button
                  onClick={() => onEdit(depense)}
                  className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                >
                  ✏ Modifier
                </button>

                <button
                  onClick={() => handleDelete(depense.id)}
                  className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                >
                  🗑 Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}