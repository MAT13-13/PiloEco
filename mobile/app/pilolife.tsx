import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { openPremiumCheckout } from "../lib/premiumCheckout";
import { supabase } from "../lib/supabase";

type PiloLifeProject = {
  id: string;
  user_id: string;
  title: string;
  category: string;
  target_amount: number;
  saved_amount: number;
  monthly_saved: number;
  target_date: string | null;
  is_primary: boolean;
  created_at?: string | null;
  updated_at?: string | null;
};

type PiloLifeWallet = {
  user_id: string;
  balance: number;
  total_credited: number;
  total_allocated: number;
};

type InvestmentMode =
  | "project"
  | "wallet"
  | "auto";

type PiloLifeSettings = {
  user_id: string;
  investment_mode: InvestmentMode;
};

type ProjectFormMode =
  | "create"
  | "edit";

const investmentModes: Record<
  InvestmentMode,
  {
    icon: string;
    title: string;
    description: string;
  }
> = {
  project: {
    icon: "🌱",
    title: "Projet principal",
    description:
      "Tes économies font avancer ton projet principal.",
  },
  wallet: {
    icon: "💳",
    title: "Pouvoir d’achat",
    description:
      "Tes économies restent disponibles dans ta cagnotte.",
  },
  auto: {
    icon: "🤖",
    title: "Pilo décide",
    description:
      "Pilo choisit automatiquement la meilleure utilisation.",
  },
};

const projectCategories = [
  "Maison",
  "Voyage",
  "Véhicule",
  "Pouvoir d'achat",
  "Épargne",
  "Animal",
  "Entreprise",
  "Personnalisé",
];

function money(
  value: number | null | undefined
) {
  return `${Number(value ?? 0).toLocaleString(
    "fr-FR",
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }
  )} €`;
}

function getProjectIcon(
  category?: string | null
) {
  const value =
    category?.toLowerCase() ?? "";

  if (value.includes("voyage")) {
    return "✈️";
  }

  if (value.includes("maison")) {
    return "🏠";
  }

  if (
    value.includes("véhicule") ||
    value.includes("vehicule") ||
    value.includes("voiture")
  ) {
    return "🚗";
  }

  if (
    value.includes("épargne") ||
    value.includes("epargne")
  ) {
    return "📈";
  }

  if (value.includes("animal")) {
    return "🐶";
  }

  if (value.includes("entreprise")) {
    return "💼";
  }

  if (
    value.includes("pouvoir") ||
    value.includes("achat")
  ) {
    return "💳";
  }

  return "🎯";
}

function normalizeDate(
  value?: string | null
) {
  if (!value) {
    return "";
  }

  return value.slice(0, 10);
}

function ProjectCard({
  project,
  busy,
  onEdit,
  onDelete,
  onSetPrimary,
}: {
  project: PiloLifeProject;
  busy: boolean;
  onEdit: (
    project: PiloLifeProject
  ) => void;
  onDelete: (
    project: PiloLifeProject
  ) => void;
  onSetPrimary: (
    project: PiloLifeProject
  ) => void;
}) {
  const target =
    Number(project.target_amount ?? 0);

  const saved =
    Number(project.saved_amount ?? 0);

  const progress =
    target > 0
      ? Math.min(
          100,
          Math.max(
            0,
            (saved / target) * 100
          )
        )
      : 0;

  const remaining =
    Math.max(
      target - saved,
      0
    );

  return (
    <View style={styles.projectCard}>
      <View style={styles.projectHeader}>
        <View style={styles.projectIconBox}>
          <Text style={styles.projectIcon}>
            {getProjectIcon(
              project.category
            )}
          </Text>
        </View>

        <View style={styles.projectHeaderText}>
          <View style={styles.titleLine}>
            <Text
              style={styles.projectTitle}
              numberOfLines={1}
            >
              {project.title}
            </Text>

            {project.is_primary ? (
              <View
                style={
                  styles.primaryBadge
                }
              >
                <Text
                  style={
                    styles.primaryBadgeText
                  }
                >
                  PRINCIPAL
                </Text>
              </View>
            ) : null}
          </View>

          <Text
            style={
              styles.projectCategory
            }
          >
            {project.category ||
              "Projet PiloLife"}
          </Text>
        </View>
      </View>

      <View style={styles.progressHeader}>
        <Text style={styles.savedAmount}>
          {money(saved)}
        </Text>

        <Text style={styles.targetAmount}>
          sur {money(target)}
        </Text>
      </View>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
            },
          ]}
        />
      </View>

      <View style={styles.projectStats}>
        <View>
          <Text style={styles.statLabel}>
            Progression
          </Text>

          <Text style={styles.statValue}>
            {Math.round(progress)} %
          </Text>
        </View>

        <View style={styles.statRight}>
          <Text style={styles.statLabel}>
            Reste
          </Text>

          <Text style={styles.statValue}>
            {money(remaining)}
          </Text>
        </View>
      </View>

      {project.target_date ? (
        <View style={styles.dateRow}>
          <Text style={styles.dateLabel}>
            📅 Objectif
          </Text>

          <Text style={styles.dateValue}>
            {new Date(
              project.target_date
            ).toLocaleDateString(
              "fr-FR"
            )}
          </Text>
        </View>
      ) : null}

      <View style={styles.projectActions}>
        {!project.is_primary ? (
          <TouchableOpacity
            style={
              styles.primaryAction
            }
            disabled={busy}
            onPress={() =>
              onSetPrimary(project)
            }
          >
            <Text
              style={
                styles.primaryActionText
              }
            >
              ⭐ Principal
            </Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          style={styles.editAction}
          disabled={busy}
          onPress={() =>
            onEdit(project)
          }
        >
          <Text
            style={
              styles.editActionText
            }
          >
            ✏️ Modifier
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteAction}
          disabled={busy}
          onPress={() =>
            onDelete(project)
          }
        >
          <Text
            style={
              styles.deleteActionText
            }
          >
            🗑️ Supprimer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function PiloLifeScreen() {
  const [userId, setUserId] =
    useState<string | null>(null);

  const [premium, setPremium] =
    useState(false);

  const [projects, setProjects] =
    useState<PiloLifeProject[]>([]);

  const [wallet, setWallet] =
    useState<PiloLifeWallet | null>(
      null
    );

  const [settings, setSettings] =
    useState<PiloLifeSettings | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    actionLoading,
    setActionLoading,
  ] = useState(false);

  const [
    projectModalOpen,
    setProjectModalOpen,
  ] = useState(false);

  const [
    projectFormMode,
    setProjectFormMode,
  ] =
    useState<ProjectFormMode>(
      "create"
    );

  const [
    editingProject,
    setEditingProject,
  ] =
    useState<PiloLifeProject | null>(
      null
    );

  const [formTitle, setFormTitle] =
    useState("");

  const [
    formCategory,
    setFormCategory,
  ] = useState("Voyage");

  const [
    formTargetAmount,
    setFormTargetAmount,
  ] = useState("");

  const [
    formTargetDate,
    setFormTargetDate,
  ] = useState("");

  const [
    settingsModalOpen,
    setSettingsModalOpen,
  ] = useState(false);

  const loadPiloLife =
    useCallback(async () => {
      try {
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

          setErrorMessage(
            "Connecte-toi pour accéder à PiloLife."
          );

          return;
        }

        setUserId(user.id);

        const [
          projectsResult,
          walletResult,
          settingsResult,
          profileResult,
        ] = await Promise.all([
          supabase
            .from(
              "pilolife_projects"
            )
            .select("*")
            .eq(
              "user_id",
              user.id
            )
            .order(
              "is_primary",
              {
                ascending: false,
              }
            )
            .order(
              "created_at",
              {
                ascending: false,
              }
            ),

          supabase
            .from(
              "pilolife_wallets"
            )
            .select("*")
            .eq(
              "user_id",
              user.id
            )
            .maybeSingle(),

          supabase
            .from(
              "pilolife_settings"
            )
            .select("*")
            .eq(
              "user_id",
              user.id
            )
            .maybeSingle(),

          supabase
            .from("profils")
            .select("premium")
            .eq("id", user.id)
            .maybeSingle(),
        ]);

        if (
          projectsResult.error
        ) {
          throw projectsResult.error;
        }

        if (walletResult.error) {
          throw walletResult.error;
        }

        if (
          settingsResult.error
        ) {
          throw settingsResult.error;
        }

        if (profileResult.error) {
          throw profileResult.error;
        }

        setPremium(
          profileResult.data?.premium === true
        );

        setProjects(
          (projectsResult.data ??
            []) as PiloLifeProject[]
        );

        setWallet(
          walletResult.data as
            | PiloLifeWallet
            | null
        );

        setSettings(
          settingsResult.data as
            | PiloLifeSettings
            | null
        );
      } catch (error) {
        console.error(
          "Erreur chargement PiloLife mobile :",
          error
        );

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Impossible de charger PiloLife."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }, []);

  useEffect(() => {
    void loadPiloLife();
  }, [loadPiloLife]);

  async function refresh() {
    setRefreshing(true);
    await loadPiloLife();
  }

  function resetProjectForm() {
    setEditingProject(null);
    setFormTitle("");
    setFormCategory("Voyage");
    setFormTargetAmount("");
    setFormTargetDate("");
  }

  function openCreateProject() {
    resetProjectForm();

    setProjectFormMode(
      "create"
    );

    setProjectModalOpen(true);
  }

  function openEditProject(
    project: PiloLifeProject
  ) {
    setEditingProject(project);
    setProjectFormMode("edit");
    setFormTitle(project.title);

    setFormCategory(
      project.category ||
        "Personnalisé"
    );

    setFormTargetAmount(
      String(
        project.target_amount ??
          ""
      )
    );

    setFormTargetDate(
      normalizeDate(
        project.target_date
      )
    );

    setProjectModalOpen(true);
  }

  function closeProjectModal() {
    if (actionLoading) {
      return;
    }

    setProjectModalOpen(false);
  }

  async function saveProject() {
    if (
      !userId ||
      actionLoading
    ) {
      return;
    }

    const title =
      formTitle.trim();

    const category =
      formCategory.trim();

    const targetAmount =
      Number(
        formTargetAmount
          .replace(",", ".")
          .trim()
      );

    if (!title) {
      Alert.alert(
        "Nom manquant",
        "Donne un nom à ton projet."
      );

      return;
    }

    if (!category) {
      Alert.alert(
        "Catégorie manquante",
        "Choisis une catégorie."
      );

      return;
    }

    if (
      !Number.isFinite(
        targetAmount
      ) ||
      targetAmount <= 0
    ) {
      Alert.alert(
        "Montant invalide",
        "Le montant de l’objectif doit être supérieur à zéro."
      );

      return;
    }

    try {
      setActionLoading(true);

      if (
        projectFormMode ===
        "create"
      ) {
        const isPrimary =
          projects.length === 0;

        const { error } =
          await supabase
            .from(
              "pilolife_projects"
            )
            .insert({
              user_id: userId,
              title,
              category,
              target_amount:
                targetAmount,
              saved_amount: 0,
              monthly_saved: 0,
              target_date:
                formTargetDate.trim() ||
                null,
              is_primary:
                isPrimary,
              updated_at:
                new Date().toISOString(),
            });

        if (error) {
          throw error;
        }

        setProjectModalOpen(
          false
        );

        await loadPiloLife();

        Alert.alert(
          "Objectif créé 🎯",
          isPrimary
            ? "Ton premier objectif devient automatiquement ton projet principal."
            : "Ton nouvel objectif a bien été créé."
        );
      } else {
        if (!editingProject) {
          return;
        }

        const { error } =
          await supabase
            .from(
              "pilolife_projects"
            )
            .update({
              title,
              category,
              target_amount:
                targetAmount,
              target_date:
                formTargetDate.trim() ||
                null,
              updated_at:
                new Date().toISOString(),
            })
            .eq(
              "id",
              editingProject.id
            )
            .eq(
              "user_id",
              userId
            );

        if (error) {
          throw error;
        }

        setProjectModalOpen(
          false
        );

        await loadPiloLife();

        Alert.alert(
          "Projet modifié",
          "Tes modifications ont bien été enregistrées."
        );
      }
    } catch (error) {
      console.error(
        "Erreur sauvegarde projet PiloLife :",
        error
      );

      Alert.alert(
        "Enregistrement impossible",
        error instanceof Error
          ? error.message
          : "Impossible d’enregistrer ce projet."
      );
    } finally {
      setActionLoading(false);
    }
  }

  function confirmDeleteProject(
    project: PiloLifeProject
  ) {
    Alert.alert(
      "Supprimer ce projet ?",
      `${project.title}\n\nCette action supprimera l’objectif de PiloLife.`,
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () =>
            void deleteProject(
              project
            ),
        },
      ]
    );
  }

  async function deleteProject(
    project: PiloLifeProject
  ) {
    if (
      !userId ||
      actionLoading
    ) {
      return;
    }

    try {
      setActionLoading(true);

      const { error } =
        await supabase
          .from(
            "pilolife_projects"
          )
          .delete()
          .eq("id", project.id)
          .eq(
            "user_id",
            userId
          );

      if (error) {
        throw error;
      }

      const remaining =
        projects.filter(
          (item) =>
            item.id !==
            project.id
        );

      if (
        project.is_primary &&
        remaining.length > 0
      ) {
        const nextPrimary =
          remaining[0];

        const {
          error:
            primaryError,
        } =
          await supabase
            .from(
              "pilolife_projects"
            )
            .update({
              is_primary: true,
              updated_at:
                new Date().toISOString(),
            })
            .eq(
              "id",
              nextPrimary.id
            )
            .eq(
              "user_id",
              userId
            );

        if (primaryError) {
          throw primaryError;
        }
      }

      await loadPiloLife();

      Alert.alert(
        "Projet supprimé",
        "L’objectif a bien été supprimé."
      );
    } catch (error) {
      console.error(
        "Erreur suppression projet PiloLife :",
        error
      );

      Alert.alert(
        "Suppression impossible",
        error instanceof Error
          ? error.message
          : "Impossible de supprimer ce projet."
      );
    } finally {
      setActionLoading(false);
    }
  }

  async function setPrimaryProject(
    project: PiloLifeProject
  ) {
    if (
      !userId ||
      project.is_primary ||
      actionLoading
    ) {
      return;
    }

    try {
      setActionLoading(true);

      const {
        error: resetError,
      } =
        await supabase
          .from(
            "pilolife_projects"
          )
          .update({
            is_primary: false,
            updated_at:
              new Date().toISOString(),
          })
          .eq(
            "user_id",
            userId
          );

      if (resetError) {
        throw resetError;
      }

      const {
        error: primaryError,
      } =
        await supabase
          .from(
            "pilolife_projects"
          )
          .update({
            is_primary: true,
            updated_at:
              new Date().toISOString(),
          })
          .eq("id", project.id)
          .eq(
            "user_id",
            userId
          );

      if (primaryError) {
        throw primaryError;
      }

      await loadPiloLife();

      Alert.alert(
        "Projet principal",
        `${project.title} est maintenant ton projet principal.`
      );
    } catch (error) {
      console.error(
        "Erreur projet principal :",
        error
      );

      Alert.alert(
        "Modification impossible",
        error instanceof Error
          ? error.message
          : "Impossible de modifier le projet principal."
      );

      await loadPiloLife();
    } finally {
      setActionLoading(false);
    }
  }

  async function changeInvestmentMode(
    mode: InvestmentMode
  ) {
    if (
      !userId ||
      actionLoading
    ) {
      return;
    }

    try {
      setActionLoading(true);

      const now =
        new Date().toISOString();

      const existing =
        settings !== null;

      if (existing) {
        const { error } =
          await supabase
            .from(
              "pilolife_settings"
            )
            .update({
              investment_mode:
                mode,
              updated_at: now,
            })
            .eq(
              "user_id",
              userId
            );

        if (error) {
          throw error;
        }
      } else {
        const { error } =
          await supabase
            .from(
              "pilolife_settings"
            )
            .insert({
              user_id: userId,
              investment_mode:
                mode,
              updated_at: now,
            });

        if (error) {
          throw error;
        }
      }

      setSettings({
        user_id: userId,
        investment_mode: mode,
      });

      setSettingsModalOpen(
        false
      );

      Alert.alert(
        "Mode enregistré",
        "Ce choix sera appliqué à tes prochaines économies."
      );
    } catch (error) {
      console.error(
        "Erreur mode PiloLife :",
        error
      );

      Alert.alert(
        "Modification impossible",
        error instanceof Error
          ? error.message
          : "Impossible de modifier ce réglage."
      );
    } finally {
      setActionLoading(false);
    }
  }

  const primaryProject =
    projects.find(
      (project) =>
        project.is_primary
    ) ??
    projects[0] ??
    null;

  const otherProjects =
    primaryProject
      ? projects.filter(
          (project) =>
            project.id !==
            primaryProject.id
        )
      : projects;

  const investmentMode:
    InvestmentMode =
    settings?.investment_mode ??
    "project";

  const modeDetails =
    investmentModes[
      investmentMode
    ] ??
    investmentModes.project;

  const totalProjectSavings =
    projects.reduce(
      (total, project) =>
        total +
        Number(
          project.saved_amount ??
            0
        ),
      0
    );

  if (loading) {
    return (
      <View
        style={
          styles.loadingScreen
        }
      >
        <ActivityIndicator
          size="large"
          color="#22c55e"
        />

        <Text
          style={
            styles.loadingText
          }
        >
          Chargement de PiloLife...
        </Text>
      </View>
    );
  }

  if (!premium) {
    return (
      <View style={{ flex: 1, backgroundColor: "#020617", padding: 24, justifyContent: "center" }}>
        <Text style={{ textAlign: "center", fontSize: 58 }}>🌿</Text>
        <Text style={{ marginTop: 18, textAlign: "center", color: "#c084fc", fontSize: 11, fontWeight: "900", letterSpacing: 2 }}>PILO PREMIUM</Text>
        <Text style={{ marginTop: 10, textAlign: "center", color: "#fff", fontSize: 30, fontWeight: "900" }}>PiloLife</Text>
        <Text style={{ marginTop: 12, textAlign: "center", color: "#94a3b8", lineHeight: 22 }}>Passe Premium pour transformer tes économies en projets, suivre tes objectifs et gérer ta cagnotte Pilo.</Text>
        <TouchableOpacity style={{ marginTop: 26, minHeight: 56, paddingHorizontal: 18, paddingVertical: 16, borderRadius: 18, backgroundColor: "#a855f7", alignItems: "center", justifyContent: "center" }} onPress={() => void openPremiumCheckout()} activeOpacity={0.85}>
          <Text style={{ color: "#020617", fontSize: 14, fontWeight: "900", textAlign: "center" }}>💎 Passer Premium — 4,99 €/mois</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 11, textAlign: "center", color: "#64748b", fontSize: 10, fontWeight: "700" }}>🔒 Paiement sécurisé par Stripe</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={
          styles.content
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor="#22c55e"
            colors={[
              "#22c55e",
            ]}
          />
        }
      >
        <View style={styles.hero}>
          <Text
            style={styles.kicker}
          >
            🌿 PILOLIFE
          </Text>

          <Text
            style={styles.title}
          >
            Tes économies deviennent tes projets
          </Text>

          <Text
            style={
              styles.subtitle
            }
          >
            Crée tes objectifs, suis leur progression et choisis où vont tes économies.
          </Text>
        </View>

        {errorMessage ? (
          <View
            style={
              styles.errorCard
            }
          >
            <Text
              style={
                styles.errorTitle
              }
            >
              Impossible de charger PiloLife
            </Text>

            <Text
              style={
                styles.errorText
              }
            >
              {errorMessage}
            </Text>

            <TouchableOpacity
              style={
                styles.retryButton
              }
              onPress={() =>
                void loadPiloLife()
              }
            >
              <Text
                style={
                  styles.retryButtonText
                }
              >
                Réessayer
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View
              style={
                styles.walletCard
              }
            >
              <View
                style={
                  styles.walletTop
                }
              >
                <View>
                  <Text
                    style={
                      styles.walletKicker
                    }
                  >
                    💰 CAGNOTTE PILO
                  </Text>

                  <Text
                    style={
                      styles.walletAmount
                    }
                  >
                    {money(
                      wallet?.balance
                    )}
                  </Text>

                  <Text
                    style={
                      styles.walletAvailable
                    }
                  >
                    disponibles
                  </Text>
                </View>

                <View
                  style={
                    styles.walletIcon
                  }
                >
                  <Text
                    style={
                      styles.walletIconText
                    }
                  >
                    💎
                  </Text>
                </View>
              </View>

              <View
                style={
                  styles.walletDivider
                }
              />

              <View
                style={
                  styles.walletStats
                }
              >
                <View
                  style={
                    styles.walletStat
                  }
                >
                  <Text
                    style={
                      styles.walletStatLabel
                    }
                  >
                    Économies cumulées
                  </Text>

                  <Text
                    style={
                      styles.walletStatValue
                    }
                  >
                    {money(
                      wallet?.total_credited
                    )}
                  </Text>
                </View>

                <View
                  style={
                    styles.walletStatRight
                  }
                >
                  <Text
                    style={
                      styles.walletStatLabel
                    }
                  >
                    Déjà utilisées
                  </Text>

                  <Text
                    style={
                      styles.walletStatValue
                    }
                  >
                    {money(
                      wallet?.total_allocated
                    )}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={
                styles.modeCard
              }
            >
              <View
                style={
                  styles.modeIcon
                }
              >
                <Text
                  style={
                    styles.modeEmoji
                  }
                >
                  {
                    modeDetails.icon
                  }
                </Text>
              </View>

              <View
                style={
                  styles.modeContent
                }
              >
                <Text
                  style={
                    styles.modeKicker
                  }
                >
                  GESTION DE TES ÉCONOMIES
                </Text>

                <Text
                  style={
                    styles.modeTitle
                  }
                >
                  {
                    modeDetails.title
                  }
                </Text>

                <Text
                  style={
                    styles.modeDescription
                  }
                >
                  {
                    modeDetails.description
                  }
                </Text>
              </View>

              <TouchableOpacity
                style={
                  styles.modeEditButton
                }
                onPress={() =>
                  setSettingsModalOpen(
                    true
                  )
                }
              >
                <Text
                  style={
                    styles.modeEditText
                  }
                >
                  Modifier
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={
                styles.sectionHeader
              }
            >
              <Text
                style={
                  styles.sectionKicker
                }
              >
                TON OBJECTIF
              </Text>

              <Text
                style={
                  styles.sectionTitle
                }
              >
                Projet principal
              </Text>
            </View>

            {primaryProject ? (
              <ProjectCard
                project={
                  primaryProject
                }
                busy={
                  actionLoading
                }
                onEdit={
                  openEditProject
                }
                onDelete={
                  confirmDeleteProject
                }
                onSetPrimary={
                  setPrimaryProject
                }
              />
            ) : (
              <View
                style={
                  styles.emptyCard
                }
              >
                <Text
                  style={
                    styles.emptyIcon
                  }
                >
                  🌱
                </Text>

                <Text
                  style={
                    styles.emptyTitle
                  }
                >
                  Crée ton premier projet
                </Text>

                <Text
                  style={
                    styles.emptyText
                  }
                >
                  Voyage, maison, voiture, épargne... transforme tes économies en objectif concret.
                </Text>

                <TouchableOpacity
                  style={
                    styles.createButton
                  }
                  onPress={
                    openCreateProject
                  }
                >
                  <Text
                    style={
                      styles.createButtonText
                    }
                  >
                    + Créer mon objectif
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View
              style={
                styles.summaryCard
              }
            >
              <Text
                style={
                  styles.summaryKicker
                }
              >
                📈 TON PARCOURS
              </Text>

              <Text
                style={
                  styles.summaryTitle
                }
              >
                {money(
                  totalProjectSavings
                )}
              </Text>

              <Text
                style={
                  styles.summaryText
                }
              >
                déjà transformés en projets
              </Text>

              <View
                style={
                  styles.summaryBottom
                }
              >
                <View>
                  <Text
                    style={
                      styles.summarySmallLabel
                    }
                  >
                    Objectifs
                  </Text>

                  <Text
                    style={
                      styles.summarySmallValue
                    }
                  >
                    {
                      projects.length
                    }
                  </Text>
                </View>

                <View
                  style={
                    styles.summaryRight
                  }
                >
                  <Text
                    style={
                      styles.summarySmallLabel
                    }
                  >
                    Dans la cagnotte
                  </Text>

                  <Text
                    style={
                      styles.summarySmallValue
                    }
                  >
                    {money(
                      wallet?.balance
                    )}
                  </Text>
                </View>
              </View>
            </View>

            {otherProjects.length >
            0 ? (
              <>
                <View
                  style={
                    styles.sectionHeader
                  }
                >
                  <Text
                    style={
                      styles.sectionKicker
                    }
                  >
                    TES PROJETS
                  </Text>

                  <Text
                    style={
                      styles.sectionTitle
                    }
                  >
                    Mes autres objectifs
                  </Text>
                </View>

                {otherProjects.map(
                  (project) => (
                    <ProjectCard
                      key={
                        project.id
                      }
                      project={
                        project
                      }
                      busy={
                        actionLoading
                      }
                      onEdit={
                        openEditProject
                      }
                      onDelete={
                        confirmDeleteProject
                      }
                      onSetPrimary={
                        setPrimaryProject
                      }
                    />
                  )
                )}
              </>
            ) : null}

            {projects.length >
            0 ? (
              <TouchableOpacity
                style={
                  styles.newProjectButton
                }
                onPress={
                  openCreateProject
                }
              >
                <Text
                  style={
                    styles.newProjectButtonText
                  }
                >
                  + Nouvel objectif
                </Text>
              </TouchableOpacity>
            ) : null}
          </>
        )}

        <View
          style={
            styles.bottomSpace
          }
        />
      </ScrollView>

      <Modal
        visible={
          projectModalOpen
        }
        transparent
        animationType="slide"
        onRequestClose={
          closeProjectModal
        }
      >
        <View
          style={
            styles.modalBackdrop
          }
        >
          <View
            style={
              styles.modalCard
            }
          >
            <ScrollView
              showsVerticalScrollIndicator={
                false
              }
              keyboardShouldPersistTaps="handled"
            >
              <View
                style={
                  styles.modalHeader
                }
              >
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={
                      styles.modalKicker
                    }
                  >
                    {
                      projectFormMode ===
                      "create"
                        ? "NOUVEL OBJECTIF"
                        : "MODIFIER L’OBJECTIF"
                    }
                  </Text>

                  <Text
                    style={
                      styles.modalTitle
                    }
                  >
                    {
                      projectFormMode ===
                      "create"
                        ? "Créer un projet"
                        : editingProject?.title ||
                          "Projet"
                    }
                  </Text>
                </View>

                <TouchableOpacity
                  style={
                    styles.closeButton
                  }
                  onPress={
                    closeProjectModal
                  }
                  disabled={
                    actionLoading
                  }
                >
                  <Text
                    style={
                      styles.closeButtonText
                    }
                  >
                    ✕
                  </Text>
                </TouchableOpacity>
              </View>

              <Text
                style={
                  styles.fieldLabel
                }
              >
                Nom du projet
              </Text>

              <TextInput
                style={styles.input}
                value={formTitle}
                onChangeText={
                  setFormTitle
                }
                placeholder="Ex. Voyage au Japon"
                placeholderTextColor="#64748b"
              />

              <Text
                style={
                  styles.fieldLabel
                }
              >
                Catégorie
              </Text>

              <View
                style={
                  styles.categoryGrid
                }
              >
                {projectCategories.map(
                  (category) => {
                    const selected =
                      formCategory ===
                      category;

                    return (
                      <TouchableOpacity
                        key={
                          category
                        }
                        style={[
                          styles.categoryChoice,
                          selected &&
                            styles.categoryChoiceSelected,
                        ]}
                        onPress={() =>
                          setFormCategory(
                            category
                          )
                        }
                      >
                        <Text
                          style={[
                            styles.categoryChoiceText,
                            selected &&
                              styles.categoryChoiceTextSelected,
                          ]}
                        >
                          {getProjectIcon(
                            category
                          )}{" "}
                          {category}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                )}
              </View>

              <Text
                style={
                  styles.fieldLabel
                }
              >
                Montant de l’objectif
              </Text>

              <TextInput
                style={styles.input}
                value={
                  formTargetAmount
                }
                onChangeText={
                  setFormTargetAmount
                }
                placeholder="5000"
                placeholderTextColor="#64748b"
                keyboardType="decimal-pad"
              />

              <Text
                style={
                  styles.fieldLabel
                }
              >
                Date cible
              </Text>

              <TextInput
                style={styles.input}
                value={
                  formTargetDate
                }
                onChangeText={
                  setFormTargetDate
                }
                placeholder="AAAA-MM-JJ"
                placeholderTextColor="#64748b"
                autoCapitalize="none"
              />

              <Text
                style={
                  styles.dateHint
                }
              >
                Optionnel · format AAAA-MM-JJ
              </Text>

              <TouchableOpacity
                style={[
                  styles.saveButton,
                  actionLoading &&
                    styles.disabledButton,
                ]}
                onPress={() =>
                  void saveProject()
                }
                disabled={
                  actionLoading
                }
              >
                {actionLoading ? (
                  <ActivityIndicator
                    size="small"
                    color="#020617"
                  />
                ) : (
                  <Text
                    style={
                      styles.saveButtonText
                    }
                  >
                    {
                      projectFormMode ===
                      "create"
                        ? "Créer l’objectif"
                        : "Enregistrer les modifications"
                    }
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  styles.cancelButton
                }
                onPress={
                  closeProjectModal
                }
                disabled={
                  actionLoading
                }
              >
                <Text
                  style={
                    styles.cancelButtonText
                  }
                >
                  Annuler
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={
          settingsModalOpen
        }
        transparent
        animationType="fade"
        onRequestClose={() =>
          setSettingsModalOpen(
            false
          )
        }
      >
        <View
          style={
            styles.modalBackdrop
          }
        >
          <View
            style={
              styles.modeModalCard
            }
          >
            <View
              style={
                styles.modalHeader
              }
            >
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  style={
                    styles.modalKickerBlue
                  }
                >
                  CAGNOTTE INTELLIGENTE
                </Text>

                <Text
                  style={
                    styles.modalTitle
                  }
                >
                  Choisis ton mode
                </Text>
              </View>

              <TouchableOpacity
                style={
                  styles.closeButton
                }
                onPress={() =>
                  setSettingsModalOpen(
                    false
                  )
                }
                disabled={
                  actionLoading
                }
              >
                <Text
                  style={
                    styles.closeButtonText
                  }
                >
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            {(
              Object.keys(
                investmentModes
              ) as InvestmentMode[]
            ).map((mode) => {
              const option =
                investmentModes[
                  mode
                ];

              const selected =
                investmentMode ===
                mode;

              return (
                <TouchableOpacity
                  key={mode}
                  style={[
                    styles.modeChoice,
                    selected &&
                      styles.modeChoiceSelected,
                  ]}
                  disabled={
                    actionLoading
                  }
                  onPress={() =>
                    void changeInvestmentMode(
                      mode
                    )
                  }
                >
                  <Text
                    style={
                      styles.modeChoiceIcon
                    }
                  >
                    {option.icon}
                  </Text>

                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <Text
                      style={
                        styles.modeChoiceTitle
                      }
                    >
                      {
                        option.title
                      }
                    </Text>

                    <Text
                      style={
                        styles.modeChoiceText
                      }
                    >
                      {
                        option.description
                      }
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.radio,
                      selected &&
                        styles.radioSelected,
                    ]}
                  >
                    <Text
                      style={
                        styles.radioText
                      }
                    >
                      {selected
                        ? "✓"
                        : ""}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#020617",
  },

  content: {
    padding: 20,
    paddingTop: 28,
  },

  loadingScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#020617",
  },

  loadingText: {
    marginTop: 16,
    color: "#94a3b8",
    fontWeight: "700",
  },

  hero: {
    marginBottom: 24,
  },

  kicker: {
    color: "#4ade80",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
  },

  title: {
    marginTop: 10,
    color: "#ffffff",
    fontSize: 30,
    lineHeight: 37,
    fontWeight: "900",
  },

  subtitle: {
    marginTop: 10,
    color: "#94a3b8",
    fontSize: 15,
    lineHeight: 23,
  },

  errorCard: {
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#7f1d1d",
    backgroundColor: "#450a0a",
  },

  errorTitle: {
    color: "#fecaca",
    fontSize: 17,
    fontWeight: "900",
  },

  errorText: {
    marginTop: 7,
    color: "#fca5a5",
    lineHeight: 20,
  },

  retryButton: {
    alignSelf: "flex-start",
    marginTop: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: "#ef4444",
  },

  retryButtonText: {
    color: "#ffffff",
    fontWeight: "900",
  },

  walletCard: {
    padding: 20,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "#166534",
    backgroundColor: "#052e16",
  },

  walletTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  walletKicker: {
    color: "#86efac",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  walletAmount: {
    marginTop: 8,
    color: "#ffffff",
    fontSize: 38,
    fontWeight: "900",
  },

  walletAvailable: {
    marginTop: 2,
    color: "#86efac",
    fontSize: 13,
    fontWeight: "700",
  },

  walletIcon: {
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#14532d",
  },

  walletIconText: {
    fontSize: 28,
  },

  walletDivider: {
    height: 1,
    marginVertical: 18,
    backgroundColor: "#166534",
  },

  walletStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  walletStat: {
    flex: 1,
  },

  walletStatRight: {
    flex: 1,
    alignItems: "flex-end",
  },

  walletStatLabel: {
    color: "#86efac",
    fontSize: 11,
    fontWeight: "700",
  },

  walletStatValue: {
    marginTop: 5,
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
  },

  modeCard: {
    marginTop: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#1e3a8a",
    backgroundColor: "#0f172a",
  },

  modeIcon: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: "#172554",
  },

  modeEmoji: {
    fontSize: 25,
  },

  modeContent: {
    flex: 1,
    marginLeft: 12,
  },

  modeKicker: {
    color: "#93c5fd",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1,
  },

  modeTitle: {
    marginTop: 4,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
  },

  modeDescription: {
    marginTop: 3,
    color: "#94a3b8",
    fontSize: 10,
    lineHeight: 15,
  },

  modeEditButton: {
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: "#172554",
  },

  modeEditText: {
    color: "#bfdbfe",
    fontSize: 9,
    fontWeight: "900",
  },

  sectionHeader: {
    marginTop: 30,
    marginBottom: 12,
  },

  sectionKicker: {
    color: "#4ade80",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.8,
  },

  sectionTitle: {
    marginTop: 5,
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "900",
  },

  projectCard: {
    marginBottom: 12,
    padding: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  projectHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  projectIconBox: {
    width: 54,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: "#1e293b",
  },

  projectIcon: {
    fontSize: 27,
  },

  projectHeaderText: {
    flex: 1,
    marginLeft: 13,
  },

  titleLine: {
    flexDirection: "row",
    alignItems: "center",
  },

  projectTitle: {
    flexShrink: 1,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
  },

  primaryBadge: {
    marginLeft: 8,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 7,
    backgroundColor: "#14532d",
  },

  primaryBadgeText: {
    color: "#86efac",
    fontSize: 8,
    fontWeight: "900",
  },

  projectCategory: {
    marginTop: 4,
    color: "#64748b",
    fontSize: 12,
  },

  progressHeader: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "baseline",
  },

  savedAmount: {
    color: "#4ade80",
    fontSize: 22,
    fontWeight: "900",
  },

  targetAmount: {
    marginLeft: 6,
    color: "#64748b",
    fontSize: 12,
  },

  progressTrack: {
    height: 9,
    marginTop: 11,
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: "#1e293b",
  },

  progressFill: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#22c55e",
  },

  projectStats: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statRight: {
    alignItems: "flex-end",
  },

  statLabel: {
    color: "#64748b",
    fontSize: 11,
  },

  statValue: {
    marginTop: 3,
    color: "#e2e8f0",
    fontSize: 14,
    fontWeight: "900",
  },

  dateRow: {
    marginTop: 13,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#1e293b",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dateLabel: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "700",
  },

  dateValue: {
    color: "#cbd5e1",
    fontSize: 10,
    fontWeight: "900",
  },

  projectActions: {
    marginTop: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  primaryAction: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#166534",
    backgroundColor: "#052e16",
  },

  primaryActionText: {
    color: "#86efac",
    fontSize: 10,
    fontWeight: "900",
  },

  editAction: {
    flex: 1,
    minWidth: 105,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1d4ed8",
    backgroundColor: "#172554",
  },

  editActionText: {
    color: "#bfdbfe",
    fontSize: 10,
    fontWeight: "900",
  },

  deleteAction: {
    flex: 1,
    minWidth: 105,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#991b1b",
    backgroundColor: "#450a0a",
  },

  deleteActionText: {
    color: "#fecaca",
    fontSize: 10,
    fontWeight: "900",
  },

  emptyCard: {
    padding: 24,
    alignItems: "center",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  emptyIcon: {
    fontSize: 42,
  },

  emptyTitle: {
    marginTop: 13,
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
  },

  emptyText: {
    marginTop: 8,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 21,
  },

  createButton: {
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#22c55e",
  },

  createButtonText: {
    color: "#020617",
    fontWeight: "900",
  },

  summaryCard: {
    marginTop: 14,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#312e81",
    backgroundColor: "#0f172a",
  },

  summaryKicker: {
    color: "#c4b5fd",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  summaryTitle: {
    marginTop: 8,
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "900",
  },

  summaryText: {
    marginTop: 3,
    color: "#94a3b8",
  },

  summaryBottom: {
    marginTop: 18,
    paddingTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#1e293b",
  },

  summaryRight: {
    alignItems: "flex-end",
  },

  summarySmallLabel: {
    color: "#64748b",
    fontSize: 11,
  },

  summarySmallValue: {
    marginTop: 4,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
  },

  newProjectButton: {
    marginTop: 18,
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 18,
    backgroundColor: "#22c55e",
  },

  newProjectButtonText: {
    color: "#020617",
    fontSize: 15,
    fontWeight: "900",
  },

  bottomSpace: {
    height: 40,
  },

  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.8)",
  },

  modalCard: {
    maxHeight: "90%",
    padding: 20,
    paddingBottom: 28,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  modeModalCard: {
    margin: 18,
    padding: 20,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "#1e3a8a",
    backgroundColor: "#0f172a",
  },

  modalHeader: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  modalKicker: {
    color: "#4ade80",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  modalKickerBlue: {
    color: "#93c5fd",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  modalTitle: {
    marginTop: 5,
    color: "#ffffff",
    fontSize: 23,
    fontWeight: "900",
  },

  closeButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#1e293b",
  },

  closeButtonText: {
    color: "#cbd5e1",
    fontSize: 16,
    fontWeight: "900",
  },

  fieldLabel: {
    marginTop: 12,
    marginBottom: 7,
    color: "#cbd5e1",
    fontSize: 11,
    fontWeight: "900",
  },

  input: {
    minHeight: 50,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "#020617",
    color: "#ffffff",
    fontSize: 14,
  },

  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  categoryChoice: {
    paddingHorizontal: 11,
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "#020617",
  },

  categoryChoiceSelected: {
    borderColor: "#22c55e",
    backgroundColor: "#052e16",
  },

  categoryChoiceText: {
    color: "#94a3b8",
    fontSize: 10,
    fontWeight: "800",
  },

  categoryChoiceTextSelected: {
    color: "#86efac",
  },

  dateHint: {
    marginTop: 6,
    color: "#64748b",
    fontSize: 9,
  },

  saveButton: {
    marginTop: 24,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#22c55e",
  },

  saveButtonText: {
    color: "#020617",
    fontSize: 13,
    fontWeight: "900",
  },

  cancelButton: {
    marginTop: 10,
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "#020617",
  },

  cancelButtonText: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "900",
  },

  disabledButton: {
    opacity: 0.6,
  },

  modeChoice: {
    marginTop: 10,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "#020617",
  },

  modeChoiceSelected: {
    borderColor: "#22c55e",
    backgroundColor: "#052e16",
  },

  modeChoiceIcon: {
    fontSize: 27,
  },

  modeChoiceTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
  },

  modeChoiceText: {
    marginTop: 3,
    color: "#94a3b8",
    fontSize: 10,
    lineHeight: 15,
  },

  radio: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#475569",
  },

  radioSelected: {
    borderColor: "#4ade80",
    backgroundColor: "#22c55e",
  },

  radioText: {
    color: "#020617",
    fontSize: 12,
    fontWeight: "900",
  },
});