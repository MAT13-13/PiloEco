"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { supabase } from "../lib/supabase";

import PremiumGate from "../components/PremiumGate";
import PiloNavigation from "../components/PiloNavigation";
import PiloCopilotCard from "../components/PiloCopilotCard";

import {
  getPiloLifeProjects,
  type PiloLifeProject,
} from "./services/pilolife.service";

import {
  allocateWalletToProject,
  allocateWalletToPurchasingPower,
  getPiloLifeWallet,
  type PiloLifeWallet,
} from "./services/pilolife-wallet.service";

import {
  getPiloLifeSettings,
  updateInvestmentMode,
  type PiloLifeInvestmentMode,
  type PiloLifeSettings,
} from "./services/pilolife-settings.service";

import type {
  PiloLifeRecommendation,
} from "./services/pilolife-recommendations.service";

import PiloLifeHero from "./components/PiloLifeHero";
import PiloLifeEmptyState from "./components/PiloLifeEmptyState";
import ProjectCard from "./components/ProjectCard";
import CreateProjectModal from "./components/CreateProjectModal";
import InvestWalletModal from "./components/InvestWalletModal";
import PiloTree from "./components/PiloTree";
import PiloLifeProjectBoost from "./components/PiloLifeProjectBoost";

const investmentModes: Array<{
  value: PiloLifeInvestmentMode;
  icon: string;
  title: string;
  description: string;
}> = [
  {
    value: "project",
    icon: "🌱",
    title: "Projet principal",
    description:
      "Toutes mes économies font avancer mon projet principal.",
  },
  {
    value: "wallet",
    icon: "💳",
    title: "Pouvoir d’achat",
    description:
      "Mes économies restent disponibles dans ma cagnotte.",
  },
  {
    value: "auto",
    icon: "🤖",
    title: "Laisser Pilo décider",
    description:
      "Pilo choisit automatiquement la meilleure utilisation.",
  },
];

function getInvestmentModeDetails(
  mode: PiloLifeInvestmentMode
) {
  return (
    investmentModes.find(
      (option) => option.value === mode
    ) ?? investmentModes[0]
  );
}

function PiloLifeDashboard() {
  const [projects, setProjects] = useState<
    PiloLifeProject[]
  >([]);

  const [wallet, setWallet] =
    useState<PiloLifeWallet | null>(null);

  const [settings, setSettings] =
    useState<PiloLifeSettings | null>(null);

  const [
    bestRecommendation,
    setBestRecommendation,
  ] =
    useState<PiloLifeRecommendation | null>(
      null
    );

  const [
    detectedYearlySaving,
    setDetectedYearlySaving,
  ] = useState(0);

  const [loading, setLoading] =
    useState(true);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [
    investModalOpen,
    setInvestModalOpen,
  ] = useState(false);

  const [
    settingsModalOpen,
    setSettingsModalOpen,
  ] = useState(false);

  const [
    savingSettings,
    setSavingSettings,
  ] = useState(false);

  const [userId, setUserId] = useState<
    string | null
  >(null);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const loadPiloLife = useCallback(
    async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const {
          data: { user },
          error: userError,
        } =
          await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (!user) {
          setUserId(null);
          setProjects([]);
          setWallet(null);
          setSettings(null);
          setBestRecommendation(null);
          setDetectedYearlySaving(0);

          return;
        }

        setUserId(user.id);

       console.log("Chargement projets...");
const projectsData = await getPiloLifeProjects(user.id);
console.log("✅ projets OK");

console.log("Chargement wallet...");
const walletData = await getPiloLifeWallet(user.id);
console.log("✅ wallet OK");

console.log("Chargement settings...");
const settingsData = await getPiloLifeSettings(user.id);
console.log("✅ settings OK");

        setProjects(projectsData);
        setWallet(walletData);
        setSettings(settingsData);
      } catch (error) {
        console.error(
          "Erreur lors du chargement de PiloLife :",
          error
        );

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Impossible de charger PiloLife pour le moment."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadPiloLife();
  }, [loadPiloLife]);

  useEffect(() => {
    function handleSavingValidated() {
      loadPiloLife();
    }

    window.addEventListener(
      "piloeconomy:validated",
      handleSavingValidated
    );

    return () => {
      window.removeEventListener(
        "piloeconomy:validated",
        handleSavingValidated
      );
    };
  }, [loadPiloLife]);

  const primaryProject =
    projects.find(
      (project) => project.is_primary
    ) ??
    projects[0] ??
    null;

  const currentMode =
    settings?.investment_mode ??
    "project";

  const currentModeDetails =
    getInvestmentModeDetails(
      currentMode
    );

  function handleBestRecommendationChange(
    recommendation:
      | PiloLifeRecommendation
      | null
  ) {
    setBestRecommendation(
      recommendation
    );

    setDetectedYearlySaving(
      recommendation?.yearlySaving ?? 0
    );
  }

  async function handleInvestmentModeChange(
    mode: PiloLifeInvestmentMode
  ) {
    if (!userId || savingSettings) {
      return;
    }

    try {
      setSavingSettings(true);
      setErrorMessage("");

      const updatedSettings =
        await updateInvestmentMode(
          userId,
          mode
        );

      setSettings(updatedSettings);
      setSettingsModalOpen(false);
    } catch (error) {
      console.error(
        "Erreur modification du mode d’investissement :",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible de modifier le mode d’investissement."
      );
    } finally {
      setSavingSettings(false);
    }
  }

  function handleInvest() {
    if (
      !wallet ||
      Number(wallet.balance ?? 0) <= 0
    ) {
      window.alert(
        "Ta cagnotte est vide pour le moment."
      );

      return;
    }

    setInvestModalOpen(true);
  }

  async function handleInvestProject(
    projectId: string,
    amount: number
  ) {
    if (!userId) {
      throw new Error(
        "Utilisateur introuvable."
      );
    }

    await allocateWalletToProject({
      userId,
      projectId,
      amount,
    });

    await loadPiloLife();

    window.alert(
      "🎉 Ton économie a bien été investie dans ce projet."
    );
  }

  async function handlePurchasingPower(
    amount: number
  ) {
    if (!userId) {
      throw new Error(
        "Utilisateur introuvable."
      );
    }

    await allocateWalletToPurchasingPower({
      userId,
      amount,
    });

    await loadPiloLife();

    window.alert(
      "💳 Cette économie est maintenant comptée dans ton pouvoir d’achat."
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white lg:ml-64">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-500/20 border-t-green-400" />

          <p className="mt-4 text-slate-300">
            Chargement de PiloLife...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:ml-64">
      <div className="mx-auto max-w-6xl">
        <PiloLifeHero />

        <PiloNavigation />

        {errorMessage && (
          <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
            {errorMessage}

            <button
              type="button"
              onClick={loadPiloLife}
              className="ml-3 font-bold text-red-100 underline"
            >
              Réessayer
            </button>
          </div>
        )}

        {!errorMessage &&
        projects.length === 0 ? (
          <PiloLifeEmptyState
            onCreate={() =>
              setModalOpen(true)
            }
          />
        ) : null}

        {!errorMessage &&
        projects.length > 0 ? (
          <>
            {primaryProject && (
              <section className="mt-10">
                <PiloTree
                  project={primaryProject}
                  walletBalance={Number(
                    wallet?.balance ?? 0
                  )}
                  totalCredited={Number(
                    wallet?.total_credited ??
                      0
                  )}
                  onInvest={handleInvest}
                />

                <article className="mt-6 flex flex-col gap-5 rounded-[2rem] border border-blue-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/20 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-3xl">
                      {
                        currentModeDetails.icon
                      }
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-300">
                        Gestion automatique
                      </p>

                      <h2 className="mt-1 text-xl font-black text-white">
                        {
                          currentModeDetails.title
                        }
                      </h2>

                      <p className="mt-1 text-sm text-slate-400">
                        {
                          currentModeDetails.description
                        }
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSettingsModalOpen(
                        true
                      )
                    }
                    className="shrink-0 rounded-2xl border border-blue-400/30 bg-blue-500/10 px-5 py-3 font-black text-blue-200 transition hover:border-blue-300 hover:bg-blue-500/20 hover:text-white"
                  >
                    Modifier
                  </button>
                </article>

                {bestRecommendation && (
                  <div className="mt-6">
                    <PiloCopilotCard
                      title={
                        bestRecommendation.title
                      }
                      category={
                        bestRecommendation.source ===
                        "monitoring"
                          ? "Monitoring"
                          : "Mission"
                      }
                      saving={
                        bestRecommendation.yearlySaving
                      }
                      durationMinutes={5}
                      priority={Math.min(
                        5,
                        Math.max(
                          1,
                          Math.ceil(
                            bestRecommendation.priorityScore /
                              20
                          )
                        )
                      )}
                      projectTitle={
                        primaryProject.title
                      }
                      monthsSaved={
                        bestRecommendation.estimatedMonthsSaved
                      }
                      href={
                        bestRecommendation.href
                      }
                      description={
                        bestRecommendation.reason
                      }
                    />
                  </div>
                )}

                <PiloLifeProjectBoost
                  project={primaryProject}
                  onBestRecommendationChange={
                    handleBestRecommendationChange
                  }
                />
              </section>
            )}

            <section className="mt-12">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-green-400">
                    Tes projets
                  </p>

                  <h2 className="mt-2 text-3xl font-black">
                    Mes objectifs
                  </h2>

                  <p className="mt-2 text-slate-400">
                    {projects.length}{" "}
                    objectif
                    {projects.length > 1
                      ? "s"
                      : ""}{" "}
                    en cours
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setModalOpen(true)
                  }
                  className="rounded-2xl bg-green-500 px-5 py-3 font-bold text-black transition hover:bg-green-400"
                >
                  + Nouvel objectif
                </button>
              </div>

              <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {projects.map(
                  (project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      detectedYearlySaving={
                        project.is_primary
                          ? detectedYearlySaving
                          : 0
                      }
                      onUpdated={
                        loadPiloLife
                      }
                    />
                  )
                )}
              </div>
            </section>
          </>
        ) : null}
      </div>

      <CreateProjectModal
        open={modalOpen}
        userId={userId}
        onClose={() =>
          setModalOpen(false)
        }
        onCreated={async () => {
          setModalOpen(false);
          await loadPiloLife();
        }}
      />

      <InvestWalletModal
        open={investModalOpen}
        balance={Number(
          wallet?.balance ?? 0
        )}
        projects={projects}
        onClose={() =>
          setInvestModalOpen(false)
        }
        onInvestProject={
          handleInvestProject
        }
        onUseForPurchasingPower={
          handlePurchasingPower
        }
      />

      {settingsModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/80 px-4 py-8 backdrop-blur-sm">
          <section className="w-full max-w-xl rounded-[2rem] border border-blue-500/25 bg-slate-900 p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-300">
                  Cagnotte intelligente
                </p>

                <h2 className="mt-2 text-2xl font-black text-white">
                  Choisis ton mode
                </h2>

                <p className="mt-2 text-slate-400">
                  Ce choix sera appliqué à
                  tes prochaines économies.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSettingsModalOpen(
                    false
                  )
                }
                disabled={savingSettings}
                className="rounded-full bg-slate-800 px-3 py-2 text-slate-300 transition hover:bg-slate-700 disabled:opacity-50"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {investmentModes.map(
                (option) => {
                  const selected =
                    currentMode ===
                    option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        handleInvestmentModeChange(
                          option.value
                        )
                      }
                      disabled={
                        savingSettings
                      }
                      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-60 ${
                        selected
                          ? "border-green-500/40 bg-green-500/10"
                          : "border-white/10 bg-slate-950/50 hover:border-blue-500/30"
                      }`}
                    >
                      <span className="text-3xl">
                        {option.icon}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block font-black text-white">
                          {option.title}
                        </span>

                        <span className="mt-1 block text-sm text-slate-400">
                          {
                            option.description
                          }
                        </span>
                      </span>

                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                          selected
                            ? "border-green-400 bg-green-500 text-xs text-slate-950"
                            : "border-slate-600"
                        }`}
                      >
                        {selected
                          ? "✓"
                          : ""}
                      </span>
                    </button>
                  );
                }
              )}
            </div>

            {savingSettings && (
              <p className="mt-5 text-center text-sm font-bold text-blue-300">
                Enregistrement...
              </p>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

export default function PiloLifePage() {
  return (
    <PremiumGate
      title="Transforme tes économies en projets"
      description="PiloLife relie automatiquement tes économies à tes objectifs de vie."
    >
      <PiloLifeDashboard />
    </PremiumGate>
  );
}