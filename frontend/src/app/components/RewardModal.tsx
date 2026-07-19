"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  saving: number;
  project: string;
  progress: number;
  previousProgress?: number;
  savedAmount: number;
  targetAmount: number;
  onClose: () => void;
};

function formatMoney(value: number) {
  return Math.round(value).toLocaleString(
    "fr-FR"
  );
}

export default function RewardModal({
  open,
  saving,
  project,
  progress,
  previousProgress,
  savedAmount,
  targetAmount,
  onClose,
}: Props) {
  const router = useRouter();

  const [displayedSaving, setDisplayedSaving] =
    useState(0);

  const [
    displayedProgress,
    setDisplayedProgress,
  ] = useState(0);

  const [leafVisible, setLeafVisible] =
    useState(false);

  const startProgress = useMemo(
    () =>
      previousProgress ??
      Math.max(0, progress - 2),
    [previousProgress, progress]
  );

  useEffect(() => {
    if (!open) {
      setDisplayedSaving(0);
      setDisplayedProgress(startProgress);
      setLeafVisible(false);

      return;
    }

    setDisplayedSaving(0);
    setDisplayedProgress(startProgress);
    setLeafVisible(false);

    const savingDuration = 1200;
    const progressDuration = 1400;
    const intervalDuration = 20;

    const savingSteps =
      savingDuration / intervalDuration;

    const progressSteps =
      progressDuration / intervalDuration;

    let savingStep = 0;
    let progressStep = 0;

    let progressInterval:
      | number
      | undefined;

    const savingInterval =
      window.setInterval(() => {
        savingStep += 1;

        const nextSaving = Math.round(
          (saving / savingSteps) *
            savingStep
        );

        setDisplayedSaving(
          Math.min(nextSaving, saving)
        );

        if (savingStep >= savingSteps) {
          window.clearInterval(
            savingInterval
          );

          setDisplayedSaving(saving);
        }
      }, intervalDuration);

    const progressTimeout =
      window.setTimeout(() => {
        progressInterval =
          window.setInterval(() => {
            progressStep += 1;

            const difference =
              progress - startProgress;

            const nextProgress =
              startProgress +
              (difference / progressSteps) *
                progressStep;

            setDisplayedProgress(
              difference >= 0
                ? Math.min(
                    nextProgress,
                    progress
                  )
                : Math.max(
                    nextProgress,
                    progress
                  )
            );

            if (
              progressStep >= progressSteps
            ) {
              if (
                progressInterval !==
                undefined
              ) {
                window.clearInterval(
                  progressInterval
                );
              }

              setDisplayedProgress(
                progress
              );
            }
          }, intervalDuration);
      }, 350);

    const leafTimeout =
      window.setTimeout(() => {
        setLeafVisible(true);
      }, 1150);

    return () => {
      window.clearInterval(
        savingInterval
      );

      window.clearTimeout(
        progressTimeout
      );

      window.clearTimeout(leafTimeout);

      if (
        progressInterval !== undefined
      ) {
        window.clearInterval(
          progressInterval
        );
      }
    };
  }, [
    open,
    saving,
    progress,
    startProgress,
  ]);

  if (!open) {
    return null;
  }

  const safeTargetAmount = Math.max(
    0,
    Number(targetAmount) || 0
  );

  const safeSavedAmount = Math.max(
    0,
    Number(savedAmount) || 0
  );

  const remainingAmount = Math.max(
    0,
    safeTargetAmount -
      safeSavedAmount
  );

  const progressGain = Math.max(
    0,
    progress - startProgress
  );

  function handleViewProject() {
    onClose();
    router.push("/pilolife");
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/80 px-4 py-6 backdrop-blur-md">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute left-[8%] top-[12%] animate-bounce text-3xl">
          🎊
        </span>

        <span className="absolute right-[10%] top-[16%] animate-pulse text-3xl">
          ✨
        </span>

        <span className="absolute bottom-[18%] left-[12%] animate-pulse text-3xl">
          🌿
        </span>

        <span className="absolute bottom-[14%] right-[12%] animate-bounce text-3xl">
          🎉
        </span>

        <span className="absolute left-[30%] top-[7%] animate-ping text-xl">
          ✨
        </span>

        <span className="absolute right-[30%] top-[9%] animate-ping text-xl">
          🌱
        </span>
      </div>

      <section className="relative my-auto w-full max-w-lg overflow-hidden rounded-[2rem] border border-green-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-green-950 p-6 shadow-[0_0_100px_rgba(34,197,94,0.25)] sm:p-8">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-green-500/10 blur-3xl" />

        <div className="relative text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10 text-5xl shadow-[0_0_50px_rgba(34,197,94,0.25)]">
            🎉
          </div>

          <p className="mt-5 text-xs font-black uppercase tracking-[0.3em] text-green-400">
            Économie validée
          </p>

          <h2 className="mt-2 text-4xl font-black text-white">
            Bravo !
          </h2>

          <p className="mt-2 text-slate-300">
            Cette économie rapproche ton
            projet de sa réalisation.
          </p>

          <div className="mt-6 rounded-3xl border border-green-500/20 bg-green-500/10 p-5">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-green-300">
              Ajouté à ta cagnotte
            </p>

            <p className="mt-2 text-5xl font-black text-green-400 sm:text-6xl">
              +
              {formatMoney(
                displayedSaving
              )}{" "}
              €
            </p>

            <p className="mt-2 text-sm text-green-200/70">
              d’économie annuelle
            </p>
          </div>

          <div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-left">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-500/10 text-4xl">
                🌳
              </div>

              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  Projet principal
                </p>

                <p className="mt-1 truncate text-xl font-black text-white">
                  {project}
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-slate-400">
                  Économisé
                </p>

                <p className="mt-1 text-lg font-black text-white">
                  {formatMoney(
                    safeSavedAmount
                  )}{" "}
                  €
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-slate-400">
                  Objectif
                </p>

                <p className="mt-1 text-lg font-black text-white">
                  {formatMoney(
                    safeTargetAmount
                  )}{" "}
                  €
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400">
                  Progression
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {Math.round(
                    startProgress
                  )}{" "}
                  % →{" "}
                  {Math.round(progress)} %
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-black text-green-400">
                  {Math.round(
                    displayedProgress
                  )}{" "}
                  %
                </p>

                {progressGain > 0 && (
                  <p className="text-xs font-bold text-green-300">
                    +
                    {progressGain.toLocaleString(
                      "fr-FR",
                      {
                        maximumFractionDigits: 1,
                      }
                    )}{" "}
                    %
                  </p>
                )}
              </div>
            </div>

            <div className="mt-3 h-4 overflow-hidden rounded-full border border-white/5 bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-600 to-green-400 shadow-[0_0_18px_rgba(34,197,94,0.7)] transition-[width] duration-75"
                style={{
                  width: `${Math.min(
                    Math.max(
                      displayedProgress,
                      0
                    ),
                    100
                  )}%`,
                }}
              />
            </div>

            <div className="mt-4 rounded-2xl border border-green-500/15 bg-green-500/5 p-4 text-center">
              {remainingAmount > 0 ? (
                <>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Encore à économiser
                  </p>

                  <p className="mt-1 text-2xl font-black text-green-300">
                    {formatMoney(
                      remainingAmount
                    )}{" "}
                    €
                  </p>
                </>
              ) : (
                <p className="text-lg font-black text-green-300">
                  🎯 Objectif atteint !
                </p>
              )}
            </div>

            <div className="mt-5 flex justify-center">
              <div
                className={`relative flex h-20 w-20 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10 transition duration-700 ${
                  leafVisible
                    ? "scale-100 opacity-100"
                    : "scale-0 opacity-0"
                }`}
              >
                <span className="text-5xl">
                  🌿
                </span>

                <span className="absolute right-1 top-1 animate-ping text-lg">
                  ✨
                </span>
              </div>
            </div>

            <p
              className={`mt-3 text-center text-sm font-bold text-green-300 transition duration-700 ${
                leafVisible
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              Une nouvelle feuille vient
              de pousser.
            </p>
          </div>

          <button
            type="button"
            onClick={handleViewProject}
            className="mt-5 w-full rounded-2xl bg-green-500 py-4 font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-green-400"
          >
            🌳 Voir mon projet
          </button>

          <button
            type="button"
            onClick={onClose}
            className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 py-3 font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            Continuer sur le Monitoring
          </button>
        </div>
      </section>
    </div>
  );
}