"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import DepensesSummary from "../components/DepensesSummary";
import DepenseForm from "../components/DepenseForm";
import DepensesHistory from "../components/DepensesHistory";
import AiInsights from "../components/AiInsights";
import { Depense, getDepenses } from "../services/depenses.service";
import CategoryStats from "../components/CategoryStats";
import DepensesCharts from "../components/DepensesCharts";
import DepensesFilters from "../components/DepensesFilters";

export default function DepensesPage() {
  const [depenses, setDepenses] = useState<Depense[]>([]);
  const [editingDepense, setEditingDepense] = useState<Depense | null>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");

  async function loadDepenses() {
    const data = await getDepenses();
    setDepenses(data);
  }

  useEffect(() => {
    loadDepenses();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(depenses.map((depense) => depense.category))];
  }, [depenses]);

  const filteredDepenses = useMemo(() => {
    return depenses.filter((depense) => {
      const matchesSearch = depense.description
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "" || depense.category === category;

      const matchesMonth =
        month === "" || depense.date.startsWith(month);

      return matchesSearch && matchesCategory && matchesMonth;
    });
  }, [depenses, search, category, month]);

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center text-green-400 transition hover:text-green-300"
        >
          ← Retour au tableau de bord
        </Link>

        <div className="mb-10 mt-8">
          <h1 className="text-4xl font-bold">💰 Analyse de mes dépenses</h1>

          <p className="mt-3 max-w-3xl text-slate-400">
            MonEcoPilote analyse automatiquement tes dépenses afin de détecter
            les économies possibles et t'aider à améliorer ton budget.
          </p>
        </div>

        <DepensesFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          month={month}
          setMonth={setMonth}
          categories={categories}
        />

        <DepensesSummary depenses={filteredDepenses} />

        <div className="mt-8">
          <CategoryStats depenses={filteredDepenses} />
        </div>

        <div className="mt-8">
          <DepensesCharts depenses={filteredDepenses} />
        </div>

        <div className="mt-8">
          <DepenseForm
            onDepenseAdded={loadDepenses}
            editingDepense={editingDepense}
            onCancelEdit={() => setEditingDepense(null)}
          />
        </div>

        <div className="mt-8">
          <DepensesHistory
            depenses={filteredDepenses}
            onDelete={loadDepenses}
            onEdit={(depense) => setEditingDepense(depense)}
          />
        </div>

        <div className="mt-8">
          <AiInsights />
        </div>
      </div>
    </main>
  );
}