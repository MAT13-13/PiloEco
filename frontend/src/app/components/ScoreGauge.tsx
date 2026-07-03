"use client";

type Props = {
  score: number;
  totalSavings: number;
  level: string;
};

export default function ScoreGauge({ score, totalSavings, level }: Props) {
  return (
    <div className="rounded-3xl border border-green-500/20 bg-slate-950 p-8 text-center shadow-[0_0_35px_rgba(34,197,94,0.08)]">
      <p className="text-sm font-bold uppercase tracking-widest text-green-400">
        Score Économie
      </p>

      <div className="mt-6 text-7xl font-black text-green-400">
        {score}
        <span className="text-2xl text-slate-400">/100</span>
      </div>

      <h3 className="mt-4 text-3xl font-bold text-white">{level}</h3>

      <div className="mx-auto mt-6 h-4 max-w-xl rounded-full bg-slate-800">
        <div
          className="h-4 rounded-full bg-green-500"
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="mt-5 text-slate-400">
        Pilo estime que tu pourrais économiser{" "}
        <span className="font-bold text-green-400">{totalSavings} €/an</span>{" "}
        sans changer ton niveau de vie.
      </p>
    </div>
  );
}