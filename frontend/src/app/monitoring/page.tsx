"use client";

import Link from "next/link";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import PremiumGate from "../components/PremiumGate";
import MonitoringCard from "../components/MonitoringCard";
import MonitoringHistory from "../components/MonitoringHistory";
import PiloNavigation from "../components/PiloNavigation";
import RewardModal from "../components/RewardModal";

import EditContractModal, {
  type EditableContract,
} from "../components/EditContractModal";

import {
  checkMonitoringContracts,
  deleteMonitoringContract,
  getMonitoringAlerts,
  getMonitoringHistory,
  getMonitoringSummary,
  updateMonitoringContract,
  validateMonitoringSaving,
  type MonitoringAlert,
  type MonitoringHistory as MonitoringHistoryItem,
} from "./services/monitoring.service";

function MonitoringDashboard() {
  const [alerts, setAlerts] = useState<
    MonitoringAlert[]
  >([]);

  const [history, setHistory] = useState<
    MonitoringHistoryItem[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [
    selectedContract,
    setSelectedContract,
  ] = useState<MonitoringAlert | null>(
    null
  );

  const [editOpen, setEditOpen] =
    useState(false);

  const [savingEdit, setSavingEdit] =
    useState(false);

  const [
    deletingContractId,
    setDeletingContractId,
  ] = useState<string | null>(null);

  const [
    validatingContractId,
    setValidatingContractId,
  ] = useState<string | null>(null);

  const [rewardOpen, setRewardOpen] =
    useState(false);

  const [
    rewardSaving,
    setRewardSaving,
  ] = useState(0);

  const [
    rewardProject,
    setRewardProject,
  ] = useState("");

  const [
    rewardProgress,
    setRewardProgress,
  ] = useState(0);

  const [
    rewardPreviousProgress,
    setRewardPreviousProgress,
  ] = useState(0);

  const [
    rewardSavedAmount,
    setRewardSavedAmount,
  ] = useState(0);

  const [
    rewardTargetAmount,
    setRewardTargetAmount,
  ] = useState(0);

  const loadMonitoring = useCallback(
    async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        await checkMonitoringContracts();

        const [
          monitoringData,
          historyData,
        ] = await Promise.all([
          getMonitoringAlerts(),
          getMonitoringHistory(),
        ]);

        setAlerts(monitoringData);
        setHistory(historyData);
      } catch (error) {
        console.error(
          "Erreur lors du chargement du monitoring :",
          error
        );

        setErrorMessage(
          "Impossible de charger le Monitoring pour le moment."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadMonitoring();
  }, [loadMonitoring]);

  const summary =
    getMonitoringSummary(alerts);

  function openEditModal(
    alert: MonitoringAlert
  ) {
    setSelectedContract(alert);
    setEditOpen(true);
    setErrorMessage("");
  }

  function closeEditModal() {
    if (savingEdit) {
      return;
    }

    setEditOpen(false);
    setSelectedContract(null);
  }

  async function handleSaveContract(
    contract: EditableContract
  ) {
    if (!selectedContract) {
      return;
    }

    try {
      setSavingEdit(true);
      setErrorMessage("");

      await updateMonitoringContract(
        selectedContract.id,
        {
          category:
            selectedContract.category,
          provider: contract.provider,
          current_offer:
            contract.offer || null,
          monthly_price:
            contract.monthlyPrice,
          end_date:
            contract.endDate || null,
        }
      );

      await loadMonitoring();

      setEditOpen(false);
      setSelectedContract(null);
    } catch (error) {
      console.error(
        "Erreur modification contrat :",
        error
      );

      throw new Error(
        error instanceof Error
          ? error.message
          : "Impossible de modifier le contrat."
      );
    } finally {
      setSavingEdit(false);
    }
  }

  async function handleValidateSaving(
    contract: MonitoringAlert
  ) {
    if (validatingContractId) {
      return;
    }

    if (
      !contract.detectedProvider ||
      !contract.detectedOffer ||
      contract.detectedPrice == null
    ) {
      window.alert(
        "Aucune recommandation disponible."
      );

      return;
    }

    const confirmed = window.confirm(
      `Confirmer que tu as changé pour ${contract.detectedProvider} ?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setValidatingContractId(
        contract.id
      );

      setErrorMessage("");

      const result =
        await validateMonitoringSaving(
          contract.id,
          {
            provider:
              contract.detectedProvider,
            offer:
              contract.detectedOffer,
            monthly_price:
              contract.detectedPrice,
            yearly_saving:
              contract.yearlySaving,
          }
        );

      await loadMonitoring();

      setRewardSaving(
        result.savingAdded
      );

      setRewardProject(
        result.projectTitle ??
          "Mon projet principal"
      );

      setRewardPreviousProgress(
        result.previousProgress
      );

      setRewardProgress(
        result.progress
      );

      setRewardSavedAmount(
        result.savedAmount
      );

      setRewardTargetAmount(
        result.targetAmount
      );

      setRewardOpen(true);

      window.dispatchEvent(
        new CustomEvent(
          "piloeconomy:validated",
          {
            detail: {
              saving:
                result.savingAdded,
              projectTitle:
                result.projectTitle,
            },
          }
        )
      );
    } catch (error) {
      console.error(
        "Erreur validation économie :",
        error
      );

      window.alert(
        error instanceof Error
          ? error.message
          : "Impossible de valider cette économie."
      );
    } finally {
      setValidatingContractId(null);
    }
  }

  async function handleDeleteContract(
    contract: MonitoringAlert
  ) {
    if (deletingContractId) {
      return;
    }

    const confirmed = window.confirm(
      `Supprimer le contrat ${contract.title} du Monitoring ?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingContractId(
        contract.id
      );

      setErrorMessage("");

      await deleteMonitoringContract(
        contract.id
      );

      setAlerts((currentAlerts) =>
        currentAlerts.filter(
          (currentAlert) =>
            currentAlert.id !==
            contract.id
        )
      );

      if (
        selectedContract?.id ===
        contract.id
      ) {
        setEditOpen(false);
        setSelectedContract(null);
      }
    } catch (error) {
      console.error(
        "Erreur suppression contrat :",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible de supprimer ce contrat."
      );
    } finally {
      setDeletingContractId(null);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white lg:ml-64">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-500/20 border-t-green-400" />

          <p className="mt-4 text-slate-300">
            Pilo analyse tes contrats...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-3 pb-28 pt-3 text-white sm:px-6 sm:py-10 lg:ml-64">
      <div className="mx-auto max-w-6xl">
        <div className="sm:hidden">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-green-400">
                💎 PiloEco Premium
              </p>
              <h1 className="mt-1 text-2xl font-black">
                📊 Monitoring
              </h1>
              <p className="mt-1 text-[11px] leading-4 text-slate-500">
                Pilo surveille tes contrats et tes économies.
              </p>
            </div>

            <Link
              href="/monitoring/add"
              className="rounded-xl bg-green-500 px-3 py-2 text-[10px] font-black text-slate-950"
            >
              + Contrat
            </Link>
          </div>
        </div>

        <div className="hidden sm:block">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            PiloEco Premium
          </p>

          <h1 className="text-4xl font-black">
            🦜 Pilo Monitoring
          </h1>

          <p className="mt-3 text-slate-400">
            Pilo surveille tes contrats, tes hausses de prix et tes économies.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black text-white transition hover:border-green-400/40 hover:bg-white/10 hover:text-green-300"
            >
              ← Retour au dashboard
            </Link>

            <Link
              href="/monitoring/add"
              className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-green-400"
            >
              ➕ Ajouter un contrat
            </Link>
          </div>

          <PiloNavigation />
        </div>

        <section className="mt-4 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-4">
          <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-2.5 sm:rounded-3xl sm:p-6">
            <p className="text-[8px] font-black uppercase leading-3 text-green-400 sm:text-sm sm:tracking-wider">
              Économies détectées
            </p>

            <p className="mt-1 text-lg font-black sm:mt-3 sm:text-4xl">
              {summary.totalSaving > 0
                ? `${summary.totalSaving.toLocaleString(
                    "fr-FR"
                  )} €`
                : "À comparer"}
            </p>

            <p className="mt-1 text-[8px] leading-3 text-slate-500 sm:mt-2 sm:text-sm sm:text-slate-400">
              {summary.totalSaving > 0
                ? "par an"
                : "Aucune économie chiffrée pour le moment"}
            </p>
          </div>

          <div className="rounded-xl border border-orange-500/20 bg-orange-500/10 p-2.5 sm:rounded-3xl sm:p-6">
            <p className="text-[8px] font-black uppercase leading-3 text-orange-300 sm:text-sm sm:tracking-wider">
              Alertes actives
            </p>

            <p className="mt-1 text-lg font-black sm:mt-3 sm:text-4xl">
              {summary.activeAlerts}
            </p>

            <p className="mt-1 text-[8px] leading-3 text-slate-500 sm:mt-2 sm:text-sm sm:text-slate-400">
              action
              {summary.activeAlerts > 1
                ? "s"
                : ""}{" "}
              à vérifier
            </p>
          </div>

          <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-2.5 sm:rounded-3xl sm:p-6">
            <p className="text-[8px] font-black uppercase leading-3 text-blue-300 sm:text-sm sm:tracking-wider">
              Contrats surveillés
            </p>

            <p className="mt-1 text-lg font-black sm:mt-3 sm:text-4xl">
              {
                summary.monitoredContracts
              }
            </p>

            <p className="mt-1 text-[8px] leading-3 text-slate-500 sm:mt-2 sm:text-sm sm:text-slate-400">
              univers suivis par Pilo
            </p>
          </div>
        </section>

        {errorMessage && (
          <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
            {errorMessage}

            <button
              type="button"
              onClick={loadMonitoring}
              className="ml-3 font-bold underline"
            >
              Réessayer
            </button>
          </div>
        )}

        {!errorMessage &&
          alerts.length === 0 && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-center sm:mt-8 sm:rounded-3xl sm:p-8">
              <p className="text-xl font-black">
                Aucun contrat surveillé
              </p>

              <p className="mt-2 text-slate-400">
                Ajoute un contrat pour
                que Pilo commence sa
                surveillance.
              </p>
            </div>
          )}

        {!errorMessage &&
          alerts.length > 0 && (
            <div className="mt-4 grid gap-3 sm:mt-8 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
              {alerts.map((alert) => (
                <MonitoringCard
                  key={alert.id}
                  icon={alert.icon}
                  title={alert.title}
                  status={
                    alert.alert ??
                    "Aucune alerte détectée"
                  }
                  saving={
                    alert.yearlySaving > 0
                      ? `${alert.yearlySaving.toLocaleString(
                          "fr-FR"
                        )} €/an`
                      : "À comparer"
                  }
                  color={alert.color}
                  href={
                    alert.href ??
                    "/recommendations"
                  }
                  buttonLabel={
                    alert.button
                  }
                  currentProvider={
                    alert.currentProvider
                  }
                  currentOffer={
                    alert.currentOffer
                  }
                  currentPrice={
                    alert.currentPrice
                  }
                  detectedProvider={
                    alert.detectedProvider
                  }
                  detectedOffer={
                    alert.detectedOffer
                  }
                  detectedPrice={
                    alert.detectedPrice
                  }
                  onEdit={() =>
                    openEditModal(alert)
                  }
                  onDelete={() =>
                    handleDeleteContract(
                      alert
                    )
                  }
                  onValidateSaving={() =>
                    handleValidateSaving(
                      alert
                    )
                  }
                  validating={
                    validatingContractId ===
                    alert.id
                  }
                  deleting={
                    deletingContractId ===
                    alert.id
                  }
                />
              ))}
            </div>
          )}

        {!errorMessage && (
          <MonitoringHistory
            history={history}
          />
        )}
      </div>

      {selectedContract && (
        <EditContractModal
          open={editOpen}
          categoryLabel={
            selectedContract.title
          }
          saving={savingEdit}
          initialContract={{
            provider:
              selectedContract.currentProvider ??
              "",
            offer:
              selectedContract.currentOffer ??
              "",
            monthlyPrice:
              selectedContract.currentPrice,
            endDate:
              selectedContract.updatedAt.includes(
                "T"
              )
                ? ""
                : selectedContract.updatedAt,
          }}
          onClose={closeEditModal}
          onSave={handleSaveContract}
        />
      )}

      <RewardModal
        open={rewardOpen}
        saving={rewardSaving}
        project={rewardProject}
        previousProgress={
          rewardPreviousProgress
        }
        progress={rewardProgress}
        savedAmount={rewardSavedAmount}
        targetAmount={
          rewardTargetAmount
        }
        onClose={() =>
          setRewardOpen(false)
        }
      />

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-slate-950/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl sm:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 rounded-xl py-2 text-slate-500">
            <span className="text-lg">🏠</span><span className="text-[9px] font-bold">Accueil</span>
          </Link>
          <Link href="/analyse" className="flex flex-col items-center gap-1 rounded-xl py-2 text-slate-500">
            <span className="text-lg">🔎</span><span className="text-[9px] font-bold">Analyse</span>
          </Link>
          <Link href="/missions" className="flex flex-col items-center gap-1 rounded-xl py-2 text-slate-500">
            <span className="text-lg">🎯</span><span className="text-[9px] font-bold">Missions</span>
          </Link>
          <Link href="/monitoring" className="flex flex-col items-center gap-1 rounded-xl bg-green-500/10 py-2 text-green-400">
            <span className="text-lg">📊</span><span className="text-[9px] font-black">Suivi</span>
          </Link>
          <Link href="/pilolife" className="flex flex-col items-center gap-1 rounded-xl py-2 text-slate-500">
            <span className="text-lg">🌿</span><span className="text-[9px] font-bold">PiloLife</span>
          </Link>
        </div>
      </nav>
    </main>
  );
}

export default function MonitoringPage() {
  return (
    <PremiumGate
      title="Surveillance 24h/24"
      description="Pilo surveille tes contrats, tes prix et tes échéances en permanence."
    >
      <MonitoringDashboard />
    </PremiumGate>
  );
}