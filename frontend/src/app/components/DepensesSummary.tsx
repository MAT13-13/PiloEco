import type { Depense } from "../services/depenses.service";

type DepensesSummaryProps = {
  depenses: Depense[];
};

export default function DepensesSummary({ depenses }: DepensesSummaryProps) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const depensesDuMois = depenses.filter((depense) => {
    const depenseDate = new Date(depense.date);
    return (
      depenseDate.getMonth() === currentMonth &&
      depenseDate.getFullYear() === currentYear
    );
  });

  const totalMois = depensesDuMois.reduce((total, depense) => {
    return total + Number(depense.amount);
  }, 0);

  const economiesPossibles = Math.round(totalMois * 0.12);
  const budgetConseille = Math.max(1500, Math.round(totalMois * 1.2));

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-sm text-slate-400">Dépensé ce mois</p>
        <p className="mt-2 text-3xl font-bold text-white">
          {totalMois.toFixed(2)} €
        </p>
        <p className="mt-2 text-sm text-slate-400">
          Calculé avec tes vraies dépenses
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-sm text-slate-400">Économies possibles</p>
        <p className="mt-2 text-3xl font-bold text-green-400">
          {economiesPossibles.toFixed(2)} €
        </p>
        <p className="mt-2 text-sm text-slate-400">
          Estimation provisoire Pilo IA
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-sm text-slate-400">Budget conseillé</p>
        <p className="mt-2 text-3xl font-bold text-white">
          {budgetConseille.toFixed(2)} €
        </p>
        <p className="mt-2 text-sm text-slate-400">Objectif mensuel conseillé</p>
      </div>
    </div>
  );
}