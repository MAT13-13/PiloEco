"use client";

import type { MonitoringHistory } from "../monitoring/services/monitoring.service";

type Props = {
  history: MonitoringHistory[];
};

export default function MonitoringHistory({
  history,
}: Props) {
  if (history.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="text-3xl font-black">
        📜 Historique des changements d'offre
      </h2>

      <div className="mt-6 space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-slate-950 p-5"
          >
            <p className="font-bold text-green-400">
              {new Date(
                item.changed_at
              ).toLocaleDateString("fr-FR")}
            </p>

            <p className="mt-3 text-slate-300">
              {item.old_provider} ({item.old_monthly_price} €/mois)
            </p>

            <p className="text-xl">
              ⬇️
            </p>

            <p className="font-bold">
              {item.new_provider} ({item.new_monthly_price} €/mois)
            </p>

            <p className="mt-3 text-green-400 font-bold">
              +{item.yearly_saving} €/an économisés
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}