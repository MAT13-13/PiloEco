import type { CSSProperties } from "react";

import type { PiloLifeProject } from "../services/pilolife.service";

type Props = {
  project: PiloLifeProject;
  walletBalance?: number;
  totalCredited?: number;
  onInvest?: () => void;
};

type LeafPosition = {
  left: string;
  top: string;
  rotate: number;
  scale: number;
};

const leafPositions: LeafPosition[] = [
  {
    left: "48%",
    top: "4%",
    rotate: -10,
    scale: 1.1,
  },
  {
    left: "36%",
    top: "10%",
    rotate: -28,
    scale: 1,
  },
  {
    left: "60%",
    top: "11%",
    rotate: 24,
    scale: 1,
  },
  {
    left: "26%",
    top: "22%",
    rotate: -38,
    scale: 1.15,
  },
  {
    left: "45%",
    top: "20%",
    rotate: -8,
    scale: 1.2,
  },
  {
    left: "68%",
    top: "22%",
    rotate: 35,
    scale: 1.1,
  },
  {
    left: "18%",
    top: "37%",
    rotate: -45,
    scale: 1,
  },
  {
    left: "34%",
    top: "35%",
    rotate: -22,
    scale: 1.2,
  },
  {
    left: "55%",
    top: "34%",
    rotate: 18,
    scale: 1.25,
  },
  {
    left: "76%",
    top: "37%",
    rotate: 42,
    scale: 1,
  },
  {
    left: "25%",
    top: "50%",
    rotate: -30,
    scale: 1,
  },
  {
    left: "47%",
    top: "48%",
    rotate: 5,
    scale: 1.2,
  },
  {
    left: "67%",
    top: "51%",
    rotate: 30,
    scale: 1,
  },
  {
    left: "37%",
    top: "61%",
    rotate: -15,
    scale: 0.95,
  },
  {
    left: "58%",
    top: "61%",
    rotate: 18,
    scale: 0.95,
  },
  {
    left: "48%",
    top: "72%",
    rotate: 2,
    scale: 0.9,
  },
];

function formatEuro(value: number) {
  return Math.round(
    Math.max(0, value)
  ).toLocaleString("fr-FR");
}

function getProjectIcon(
  project: PiloLifeProject
) {
  const value =
    `${project.category} ${project.title}`.toLowerCase();

  if (
    value.includes("bébé") ||
    value.includes("bebe")
  ) {
    return "🍼";
  }

  if (value.includes("maison")) {
    return "🏡";
  }

  if (
    value.includes("voyage") ||
    value.includes("vacance")
  ) {
    return "✈️";
  }

  if (
    value.includes("voiture") ||
    value.includes("véhicule") ||
    value.includes("vehicule")
  ) {
    return "🚗";
  }

  if (
    value.includes("animal") ||
    value.includes("chien") ||
    value.includes("chat")
  ) {
    return "🐶";
  }

  if (
    value.includes("entreprise") ||
    value.includes("professionnel")
  ) {
    return "💼";
  }

  if (
    value.includes("épargne") ||
    value.includes("epargne")
  ) {
    return "📈";
  }

  return "🎯";
}

function getEstimatedDate(
  remainingAmount: number,
  monthlySaved: number
) {
  if (remainingAmount <= 0) {
    return "Objectif atteint";
  }

  if (monthlySaved <= 0) {
    return null;
  }

  const estimatedMonths = Math.ceil(
    remainingAmount / monthlySaved
  );

  const estimatedDate = new Date();

  estimatedDate.setDate(1);

  estimatedDate.setMonth(
    estimatedDate.getMonth() +
      estimatedMonths
  );

  return estimatedDate.toLocaleDateString(
    "fr-FR",
    {
      month: "long",
      year: "numeric",
    }
  );
}

export default function PiloTree({
  project,
  walletBalance = 0,
  totalCredited = 0,
  onInvest,
}: Props) {
  const targetAmount = Math.max(
    0,
    Number(project.target_amount) || 0
  );

  const savedAmount = Math.max(
    0,
    Number(project.saved_amount) || 0
  );

  const monthlySaved = Math.max(
    0,
    Number(project.monthly_saved) || 0
  );

  const remainingAmount = Math.max(
    targetAmount - savedAmount,
    0
  );

  const progress =
    targetAmount > 0
      ? Math.min(
          100,
          Math.max(
            0,
            (savedAmount / targetAmount) *
              100
          )
        )
      : 0;

  const roundedProgress =
    Math.round(progress);

  const visibleLeaves = Math.ceil(
    (progress / 100) *
      leafPositions.length
  );

  const estimatedDate =
    getEstimatedDate(
      remainingAmount,
      monthlySaved
    );

  const projectIcon =
    getProjectIcon(project);

  return (
    <section className="mt-8 space-y-6">
      <article className="rounded-[2rem] border border-green-500/25 bg-gradient-to-br from-slate-900 via-slate-950 to-green-950/30 p-6 shadow-[0_0_70px_rgba(34,197,94,0.1)] sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10 shadow-[0_0_35px_rgba(34,197,94,0.22)]">
              <img
                src="/pilo.png"
                alt="Pilo"
                className="h-16 w-16 object-contain"
              />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-green-400">
                🌿 Cagnotte Pilo
              </p>

              <p className="mt-2 text-4xl font-black text-white sm:text-5xl">
                {formatEuro(
                  walletBalance
                )}{" "}
                €
              </p>

              <p className="mt-1 text-sm text-slate-400">
                disponibles à investir
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onInvest}
            disabled={
              walletBalance <= 0 ||
              !onInvest
            }
            className="rounded-2xl bg-green-500 px-6 py-4 font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            💸 Investir mes économies
          </button>
        </div>

        {totalCredited > 0 && (
          <p className="mt-5 border-t border-white/10 pt-5 text-sm text-slate-400">
            Total économisé depuis le
            début :{" "}
            <span className="font-black text-green-300">
              {formatEuro(
                totalCredited
              )}{" "}
              €
            </span>
          </p>
        )}
      </article>

      <article className="relative overflow-hidden rounded-[2.5rem] border border-green-500/25 bg-gradient-to-b from-slate-900 via-slate-950 to-green-950/30 p-6 shadow-[0_0_100px_rgba(34,197,94,0.12)] sm:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />

        <div className="relative text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-green-400">
            Ton projet principal
          </p>

          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            {projectIcon}{" "}
            {project.title}
          </h2>

          <div className="relative mx-auto mt-8 h-[330px] max-w-md">
            <div className="absolute bottom-4 left-1/2 h-32 w-12 -translate-x-1/2 rounded-t-[60%] bg-gradient-to-r from-amber-950 via-amber-700 to-amber-900 shadow-[0_0_25px_rgba(120,80,30,0.3)]" />

            <div className="absolute bottom-24 left-1/2 h-28 w-6 -translate-x-[70px] -rotate-[48deg] rounded-full bg-amber-800" />

            <div className="absolute bottom-24 left-1/2 h-28 w-6 translate-x-[45px] rotate-[48deg] rounded-full bg-amber-800" />

            <div className="absolute bottom-32 left-1/2 h-24 w-5 -translate-x-[42px] -rotate-[28deg] rounded-full bg-amber-700" />

            <div className="absolute bottom-32 left-1/2 h-24 w-5 translate-x-[25px] rotate-[28deg] rounded-full bg-amber-700" />

            <div className="absolute left-1/2 top-3 h-64 w-80 -translate-x-1/2 rounded-[50%] bg-green-500/5 blur-2xl" />

            {leafPositions.map(
              (leaf, index) => {
                const active =
                  index < visibleLeaves;

                const leafStyle: CSSProperties =
                  {
                    left: leaf.left,
                    top: leaf.top,
                    transform: `translate(-50%, -50%) rotate(${leaf.rotate}deg) scale(${leaf.scale})`,
                    transitionDelay: `${index * 55}ms`,
                  };

                return (
                  <span
                    key={`${leaf.left}-${leaf.top}`}
                    className={`absolute text-5xl transition-all duration-700 ${
                      active
                        ? "scale-100 opacity-100 drop-shadow-[0_0_15px_rgba(34,197,94,0.7)]"
                        : "scale-0 opacity-0"
                    }`}
                    style={leafStyle}
                  >
                    🍃
                  </span>
                );
              }
            )}

            <div className="absolute bottom-0 left-1/2 h-5 w-64 -translate-x-1/2 rounded-[50%] bg-black/40 blur-sm" />

            {progress >= 100 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full border border-green-400/40 bg-green-500/15 px-6 py-4 text-xl font-black text-green-200 shadow-[0_0_50px_rgba(34,197,94,0.4)] backdrop-blur">
                  🎉 Objectif atteint !
                </div>
              </div>
            )}
          </div>

          <div className="mx-auto mt-2 max-w-2xl">
            <div className="flex items-end justify-between gap-4">
              <p className="text-left text-sm font-bold text-slate-400">
                Progression
              </p>

              <p className="text-3xl font-black text-green-400">
                {roundedProgress} %
              </p>
            </div>

            <div className="mt-3 h-5 overflow-hidden rounded-full border border-white/5 bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-700 via-green-500 to-green-300 shadow-[0_0_20px_rgba(34,197,94,0.65)] transition-all duration-1000"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <p className="mt-4 rounded-2xl border border-green-500/15 bg-green-500/5 px-4 py-3 text-sm font-black text-green-300">
              🌱 Tu as déjà financé{" "}
              {roundedProgress} % de ton
              projet.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
              <p className="text-2xl font-black text-white">
                {formatEuro(
                  savedAmount
                )}{" "}
                €
              </p>

              <span className="hidden text-slate-600 sm:inline">
                /
              </span>

              <p className="text-slate-400">
                Objectif :{" "}
                {formatEuro(
                  targetAmount
                )}{" "}
                €
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                <p className="text-sm text-slate-400">
                  Encore à économiser
                </p>

                <p className="mt-2 text-2xl font-black text-white">
                  {formatEuro(
                    remainingAmount
                  )}{" "}
                  €
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                <p className="text-sm text-slate-400">
                  📅 Fin estimée
                </p>

                <p className="mt-2 text-lg font-black capitalize text-white">
                  {remainingAmount === 0
                    ? "Objectif atteint"
                    : estimatedDate ??
                      "Ajoute des économies"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}