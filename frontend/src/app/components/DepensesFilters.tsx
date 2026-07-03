"use client";

type Props = {
  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  month: string;
  setMonth: (value: string) => void;

  categories: string[];
};

export default function DepensesFilters({
  search,
  setSearch,
  category,
  setCategory,
  month,
  setMonth,
  categories,
}: Props) {
  return (
    <div className="mb-6 grid gap-4 md:grid-cols-3">

      <input
        type="text"
        placeholder="🔍 Rechercher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white outline-none"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
      >
        <option value="">Toutes les catégories</option>

        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
      />

    </div>
  );
}