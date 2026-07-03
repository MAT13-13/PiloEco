import type { Depense } from "../services/depenses.service";

type CategoryStatsProps = {
  depenses: Depense[];
};

export default function CategoryStats({ depenses }: CategoryStatsProps) {
  const totalParCategorie = depenses.reduce<Record<string, number>>(
    (acc, depense) => {
      acc[depense.category] =
        (acc[depense.category] || 0) + Number(depense.amount);

      return acc;
    },
    {}
  );

  const categories = Object.entries(totalParCategorie)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-5 text-xl font-bold text-white">
        📊 Top catégories
      </h2>

      {categories.length === 0 ? (
        <p className="text-slate-400">Aucune donnée pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {categories.map((item) => (
            <div key={item.category}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-slate-300">{item.category}</span>
                <span className="font-bold text-white">
                  {item.total.toFixed(2)} €
                </span>
              </div>

              <div className="h-3 rounded-full bg-slate-800">
                <div
                  className="h-3 rounded-full bg-green-500"
                  style={{
                    width: `${Math.min(
                      100,
                      (item.total / categories[0].total) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}