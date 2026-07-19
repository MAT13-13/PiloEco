"use client";

import type { Depense } from "../services/finance/depenses.service";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  depenses: Depense[];
};

export default function DepensesCharts({ depenses }: Props) {
  const data = depenses.map((depense) => ({
    name: depense.category,
    montant: Number(depense.amount),
  }));

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-bold text-white">
        📊 Répartition des dépenses
      </h2>

      {data.length === 0 ? (
        <p className="text-slate-400">Pas encore de données.</p>
      ) : (
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="montant" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}