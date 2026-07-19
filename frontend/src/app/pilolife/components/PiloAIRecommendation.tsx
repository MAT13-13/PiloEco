"use client";

import Link from "next/link";

type Props = {
  title: string;
  saving: number;
  monthsSaved: number;
  href: string;
};

export default function PiloAIRecommendation({
  title,
  saving,
  monthsSaved,
  href,
}: Props) {
  return (
    <section className="mt-8 rounded-[2rem] border border-green-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-green-950/20 p-8">
      <p className="text-sm font-black uppercase tracking-[0.25em] text-green-400">
        🤖 Pilo IA
      </p>

      <h2 className="mt-3 text-3xl font-black">
        Commence par cette action
      </h2>

      <p className="mt-5 text-lg text-slate-300">
        <span className="font-bold text-white">
          {title}
        </span>
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <div className="rounded-xl bg-green-500/10 px-4 py-2 font-bold text-green-400">
          💰 {saving} €/an
        </div>

        <div className="rounded-xl bg-blue-500/10 px-4 py-2 font-bold text-blue-300">
          🚀 {monthsSaved} mois gagnés
        </div>
      </div>

      <Link
        href={href}
        className="mt-7 inline-flex rounded-2xl bg-green-500 px-6 py-3 font-black text-black transition hover:bg-green-400"
      >
        Commencer
      </Link>
    </section>
  );
}