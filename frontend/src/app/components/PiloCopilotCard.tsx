"use client";

import Link from "next/link";

type Props = {
  title: string;
  category: string;
  saving: number;
  durationMinutes?: number;
  priority?: number;
  projectTitle?: string | null;
  monthsSaved?: number;
  href: string;
  description?: string;
};

function getPriorityLabel(priority: number) {
  if (priority >= 5) {
    return "Priorité maximale";
  }

  if (priority === 4) {
    return "Très recommandée";
  }

  if (priority === 3) {
    return "Recommandée";
  }

  return "À envisager";
}

function getPriorityStars(priority: number) {
  return "⭐".repeat(
    Math.min(5, Math.max(1, priority))
  );
}

function formatSaving(value: number) {
  return Math.round(
    Math.max(0, value)
  ).toLocaleString("fr-FR");
}

export default function PiloCopilotCard({
  title,
  category,
  saving,
  durationMinutes = 5,
  priority = 5,
  projectTitle,
  monthsSaved = 0,
  href,
  description,
}: Props) {
  const priorityLabel =
    getPriorityLabel(priority);

  const priorityStars =
    getPriorityStars(priority);

  return (
    <article className="relative overflow-hidden rounded-[2rem] border border-green-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-green-950/30 p-8 shadow-[0_0_80px_rgba(34,197,94,0.15)]">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-green-500/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-green-500/20 bg-green-500/10">
            <img
              src="/pilo.png"
              alt="Pilo"
              className="h-16 w-16 object-contain"
            />
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-green-400">
              🤖 Pilo te conseille
            </p>

            <h2 className="mt-2 text-3xl font-black text-white">
              Commence par cette action
            </h2>

            <p className="mt-2 text-sm font-bold text-slate-500">
              {category}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/60 p-6">
          <h3 className="text-2xl font-black text-white">
            {title}
          </h3>

          <p className="mt-4 leading-7 text-slate-300">
            {description ??
              "C'est actuellement l'action qui fera le plus avancer ton projet."}
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5 text-center">
            <p className="text-xs font-bold uppercase text-green-300">
              💰 Économie
            </p>

            <p className="mt-3 text-3xl font-black text-green-400">
              +{formatSaving(saving)} €
            </p>

            <p className="mt-1 text-sm text-green-200">
              par an
            </p>
          </div>

          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5 text-center">
            <p className="text-xs font-bold uppercase text-blue-300">
              🚀 Projet
            </p>

            <p className="mt-3 text-3xl font-black text-blue-300">
              {monthsSaved}
            </p>

            <p className="mt-1 text-sm text-blue-200">
              mois gagnés
            </p>
          </div>

          <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-5 text-center">
            <p className="text-xs font-bold uppercase text-orange-300">
              ⏱ Temps
            </p>

            <p className="mt-3 text-3xl font-black text-orange-300">
              {durationMinutes}
            </p>

            <p className="mt-1 text-sm text-orange-200">
              minutes
            </p>
          </div>
        </div>

        {projectTitle &&
          monthsSaved > 0 && (
            <div className="mt-6 rounded-3xl border border-green-500/20 bg-green-500/10 p-6">
              <p className="text-lg font-bold text-green-300">
                🌱 Tu pourrais atteindre{" "}
                <span className="text-white">
                  {projectTitle}
                </span>{" "}
                environ{" "}
                <span className="text-white">
                  {monthsSaved} mois
                </span>{" "}
                plus tôt.
              </p>
            </div>
          )}

        <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/50 p-5">
          <div>
            <p className="text-sm text-slate-400">
              Priorité
            </p>

            <p className="mt-1 text-xl">
              {priorityStars}
            </p>
          </div>

          <div className="text-right">
            <p className="font-black text-green-300">
              {priorityLabel}
            </p>
          </div>
        </div>

        <Link
          href={href}
          className="mt-8 block w-full rounded-2xl bg-green-500 py-4 text-center text-lg font-black text-slate-950 transition hover:bg-green-400"
        >
          🚀 Commencer maintenant
        </Link>
      </div>
    </article>
  );
}