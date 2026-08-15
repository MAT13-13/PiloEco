import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
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

type MonitoringContract = {
  id: string;
  user_id: string;
  category: string;
  provider: string;
  monthly_price: number;
  previous_price?: number | null;
  current_offer?: string | null;
  better_offer?: string | null;
  end_date?: string | null;
  yearly_saving?: number | null;
  status?: string | null;
  last_checked_at?: string | null;
  last_price_change_at?: string | null;
  updated_at?: string | null;
};

type PiloProfile = {
  premium?: boolean | null;
};

const categoryConfig: Record<
  string,
  {
    icon: string;
    label: string;
  }
> = {
  telephone: {
    icon: "📱",
    label: "Téléphone",
  },
  mobile: {
    icon: "📱",
    label: "Téléphone",
  },
  internet: {
    icon: "🌐",
    label: "Internet",
  },
  electricite: {
    icon: "⚡",
    label: "Électricité",
  },
  gaz: {
    icon: "🔥",
    label: "Gaz",
  },
  habitation: {
    icon: "🏠",
    label: "Habitation",
  },
  auto: {
    icon: "🚗",
    label: "Auto",
  },
  moto: {
    icon: "🏍️",
    label: "Moto",
  },
  animaux: {
    icon: "🐶",
    label: "Animaux",
  },
  banque: {
    icon: "🏦",
    label: "Banque",
  },
  streaming: {
    icon: "📺",
    label: "Streaming",
  },
  mutuelle: {
    icon: "❤️",
    label: "Mutuelle",
  },
  assurance: {
    icon: "🛡️",
    label: "Assurance",
  },
  "telephone-senior": {
    icon: "👴",
    label: "Téléphone senior",
  },
  "mutuelle-senior": {
    icon: "👵",
    label: "Mutuelle senior",
  },
  "assurance-emprunteur": {
    icon: "🏦",
    label: "Assurance emprunteur",
  },
  "assurance-obseques": {
    icon: "🕊️",
    label: "Assurance obsèques",
  },
  "mobilites-douces": {
    icon: "🚲",
    label: "Vélo / NVEI",
  },
  securite: {
    icon: "🔐",
    label: "Sécurité",
  },
  logiciels: {
    icon: "💻",
    label: "Logiciels",
  },
  cybersecurite: {
    icon: "🛡️",
    label: "Cybersécurité",
  },
};

function getCategoryInfo(category: string) {
  const normalized =
    category?.toLowerCase().trim() || "";

  return (
    categoryConfig[normalized] || {
      icon: "📄",
      label: category?.trim() || "Contrat",
    }
  );
}

function getMissionSlug(category: string) {
  const normalized =
    category?.toLowerCase().trim() || "";

  const missionSlugs: Record<string, string> = {
    telephone: "mobile",
    mobile: "mobile",
    internet: "internet",
    electricite: "electricite",
    gaz: "gaz",
    habitation: "habitation",
    "assurance-habitation": "habitation",
    auto: "auto",
    "assurance-auto": "auto",
    moto: "moto",
    "assurance-moto": "moto",
    animaux: "animaux",
    "assurance-animaux": "animaux",
    banque: "banque",
    streaming: "streaming",
    mutuelle: "mutuelle",
    "mutuelle-sante": "mutuelle",
    "telephone-senior": "telephone-senior",
    "mutuelle-senior": "mutuelle-senior",
    "assurance-emprunteur": "assurance-emprunteur",
    "assurance-obseques": "assurance-obseques",
    "mobilites-douces": "mobilites-douces",
    securite: "securite",
    "alarme-securite": "securite",
    logiciels: "logiciels",
    cybersecurite: "cybersecurite",
  };

  return missionSlugs[normalized] ?? null;
}

function getStatusConfig(status?: string | null) {
  const normalized =
    status?.toLowerCase() || "";

  if (
    normalized.includes("hausse") ||
    normalized.includes("alerte")
  ) {
    return {
      emoji: "🔴",
      label:
        status || "À surveiller",
      type: "danger" as const,
    };
  }

  if (
    normalized.includes("meilleure") ||
    normalized.includes("offre")
  ) {
    return {
      emoji: "🟡",
      label:
        status || "Opportunité détectée",
      type: "warning" as const,
    };
  }

  if (normalized.includes("baisse")) {
    return {
      emoji: "🟢",
      label:
        status || "Baisse détectée",
      type: "success" as const,
    };
  }

  return {
    emoji: "🟢",
    label:
      status || "Contrat surveillé",
    type: "success" as const,
  };
}

function formatMoney(value?: number | null) {
  return Number(value || 0).toLocaleString(
    "fr-FR",
    {
      maximumFractionDigits: 2,
    }
  );
}

function formatDate(
  value?: string | null
) {
  if (!value) {
    return "Non renseignée";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Non renseignée";
  }

  return date.toLocaleDateString("fr-FR");
}

function normalizeDateInput(
  value?: string | null
) {
  if (!value) {
    return "";
  }

  return value.slice(0, 10);
}

export default function MonitoringScreen() {
  const [contracts, setContracts] = useState<
    MonitoringContract[]
  >([]);

  const [premium, setPremium] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [editOpen, setEditOpen] =
    useState(false);

  const [editingContract, setEditingContract] =
    useState<MonitoringContract | null>(null);

  const [editProvider, setEditProvider] =
    useState("");

  const [editPrice, setEditPrice] =
    useState("");

  const [editOffer, setEditOffer] =
    useState("");

  const [editEndDate, setEditEndDate] =
    useState("");

  const [savingEdit, setSavingEdit] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  async function loadMonitoring() {
    try {
      setErrorMessage("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.replace("/login");
        return;
      }

      const [
        contractsResponse,
        profileResponse,
      ] = await Promise.all([
        supabase
          .from("monitoring_contracts")
          .select("*")
          .eq("user_id", user.id)
          .order("updated_at", {
            ascending: false,
          }),

        supabase
          .from("profils")
          .select("premium")
          .eq("id", user.id)
          .maybeSingle(),
      ]);

      if (contractsResponse.error) {
        console.error(
          "Erreur monitoring :",
          contractsResponse.error.message
        );

        setErrorMessage(
          "Impossible de charger tes contrats."
        );
      }

      if (profileResponse.error) {
        console.error(
          "Erreur profil Monitoring :",
          profileResponse.error.message
        );
      }

      setContracts(
        (contractsResponse.data as
          | MonitoringContract[]
          | null) ?? []
      );

      const profile =
        profileResponse.data as
          | PiloProfile
          | null;

      setPremium(
        profile?.premium === true
      );
    } catch (error) {
      console.error(
        "Erreur Monitoring :",
        error
      );

      setErrorMessage(
        "Une erreur est survenue pendant le chargement."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    void loadMonitoring();
  }, []);

  async function refreshMonitoring() {
    setRefreshing(true);
    await loadMonitoring();
  }

  async function openMissionForCategory(
    category: string
  ) {
    const missionSlug =
      getMissionSlug(category);

    const url = missionSlug
      ? `https://piloeco.com/missions/${missionSlug}`
      : "https://piloeco.com/missions";

    try {
      const supported =
        await Linking.canOpenURL(url);

      if (!supported) {
        Alert.alert(
          "Mission indisponible",
          "Impossible d’ouvrir cette mission pour le moment."
        );

        return;
      }

      await Linking.openURL(url);
    } catch (error) {
      console.error(
        "Erreur ouverture mission Monitoring :",
        error
      );

      Alert.alert(
        "Mission indisponible",
        "Impossible d’ouvrir cette mission pour le moment."
      );
    }
  }

  function openEdit(
    contract: MonitoringContract
  ) {
    setEditingContract(contract);

    setEditProvider(
      contract.provider || ""
    );

    setEditPrice(
      String(
        contract.monthly_price ?? ""
      )
    );

    setEditOffer(
      contract.current_offer || ""
    );

    setEditEndDate(
      normalizeDateInput(
        contract.end_date
      )
    );

    setEditOpen(true);
  }

  function closeEdit() {
    if (savingEdit) {
      return;
    }

    setEditOpen(false);
    setEditingContract(null);
  }

  async function saveEdit() {
    if (
      !editingContract ||
      savingEdit
    ) {
      return;
    }

    const provider =
      editProvider.trim();

    const monthlyPrice =
      Number(
        editPrice
          .replace(",", ".")
          .trim()
      );

    if (!provider) {
      Alert.alert(
        "Fournisseur manquant",
        "Renseigne le fournisseur du contrat."
      );

      return;
    }

    if (
      !Number.isFinite(monthlyPrice) ||
      monthlyPrice < 0
    ) {
      Alert.alert(
        "Prix invalide",
        "Renseigne un prix mensuel valide."
      );

      return;
    }

    try {
      setSavingEdit(true);

      const {
        data: { user },
        error: userError,
      } =
        await supabase.auth.getUser();

      if (userError || !user) {
        router.replace("/login");
        return;
      }

      const { data, error } =
        await supabase
          .from("monitoring_contracts")
          .update({
            provider,
            monthly_price:
              monthlyPrice,
            current_offer:
              editOffer.trim() ||
              null,
            end_date:
              editEndDate.trim() ||
              null,
            updated_at:
              new Date().toISOString(),
          })
          .eq(
            "id",
            editingContract.id
          )
          .eq(
            "user_id",
            user.id
          )
          .select("*")
          .single();

      if (error) {
        throw error;
      }

      setContracts(
        (current) =>
          current.map(
            (contract) =>
              contract.id ===
              editingContract.id
                ? (data as MonitoringContract)
                : contract
          )
      );

      setEditOpen(false);
      setEditingContract(null);

      Alert.alert(
        "Contrat mis à jour",
        "Les informations du contrat ont bien été enregistrées."
      );
    } catch (error) {
      console.error(
        "Erreur modification contrat :",
        error
      );

      Alert.alert(
        "Modification impossible",
        error instanceof Error
          ? error.message
          : "Impossible de modifier ce contrat."
      );
    } finally {
      setSavingEdit(false);
    }
  }

  function confirmDelete(
    contract: MonitoringContract
  ) {
    const category =
      getCategoryInfo(
        contract.category
      );

    Alert.alert(
      "Supprimer ce contrat ?",
      `${category.label} — ${
        contract.provider ||
        "Fournisseur non renseigné"
      }\n\nCette action supprimera ce contrat de ton Monitoring.`,
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () =>
            void deleteContract(
              contract.id
            ),
        },
      ]
    );
  }

  async function deleteContract(
    contractId: string
  ) {
    if (deletingId) {
      return;
    }

    try {
      setDeletingId(contractId);

      const {
        data: { user },
        error: userError,
      } =
        await supabase.auth.getUser();

      if (userError || !user) {
        router.replace("/login");
        return;
      }

      const { error } =
        await supabase
          .from("monitoring_contracts")
          .delete()
          .eq(
            "id",
            contractId
          )
          .eq(
            "user_id",
            user.id
          );

      if (error) {
        throw error;
      }

      setContracts(
        (current) =>
          current.filter(
            (contract) =>
              contract.id !==
              contractId
          )
      );

      Alert.alert(
        "Contrat supprimé",
        "Le contrat a bien été retiré du Monitoring."
      );
    } catch (error) {
      console.error(
        "Erreur suppression contrat :",
        error
      );

      Alert.alert(
        "Suppression impossible",
        error instanceof Error
          ? error.message
          : "Impossible de supprimer ce contrat."
      );
    } finally {
      setDeletingId(null);
    }
  }

  const totalSaving = useMemo(() => {
    return contracts.reduce(
      (total, contract) =>
        total +
        Number(
          contract.yearly_saving || 0
        ),
      0
    );
  }, [contracts]);

  const alertCount = useMemo(() => {
    return contracts.filter(
      (contract) => {
        const status =
          contract.status
            ?.toLowerCase()
            .trim() || "";

        return (
          status.includes("hausse") ||
          status.includes("meilleure") ||
          status.includes("alerte")
        );
      }
    ).length;
  }, [contracts]);

  const monthlyTotal = useMemo(() => {
    return contracts.reduce(
      (total, contract) =>
        total +
        Number(
          contract.monthly_price || 0
        ),
      0
    );
  }, [contracts]);

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <Text style={styles.loadingIcon}>
          📊
        </Text>

        <ActivityIndicator
          size="large"
          color="#a855f7"
          style={styles.loader}
        />

        <Text style={styles.loadingTitle}>
          Pilo vérifie tes contrats...
        </Text>

        <Text style={styles.loadingText}>
          Prix, échéances et opportunités arrivent.
        </Text>
      </View>
    );
  }

  if (!premium) {
    return (
      <View style={{ flex: 1, backgroundColor: "#020617", padding: 24, justifyContent: "center" }}>
        <Text style={{ textAlign: "center", fontSize: 58 }}>💎</Text>
        <Text style={{ marginTop: 18, textAlign: "center", color: "#c084fc", fontSize: 11, fontWeight: "900", letterSpacing: 2 }}>PILO PREMIUM</Text>
        <Text style={{ marginTop: 10, textAlign: "center", color: "#fff", fontSize: 30, fontWeight: "900" }}>Monitoring Premium</Text>
        <Text style={{ marginTop: 12, textAlign: "center", color: "#94a3b8", lineHeight: 22 }}>Active Premium pour suivre tes contrats, leurs prix, leurs échéances et les opportunités détectées par Pilo.</Text>
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
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refreshMonitoring}
          tintColor="#a855f7"
          colors={["#a855f7"]}
        />
      }
    >
      <Text style={styles.kicker}>
        💎 PILO PREMIUM
      </Text>

      <Text style={styles.title}>
        Monitoring
      </Text>

      <Text style={styles.subtitle}>
        Pilo suit tes contrats, leurs prix et leurs échéances pour t'aider à
        repérer les changements importants.
      </Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          router.push("/monitoring-add")
        }
      >
        <Text style={styles.addButtonText}>
          ➕ Ajouter un contrat
        </Text>
      </TouchableOpacity>

      {!premium && (
        <View style={styles.premiumCard}>
          <Text style={styles.premiumLabel}>
            💎 FONCTION PREMIUM
          </Text>

          <Text style={styles.premiumTitle}>
            Active la veille automatique
          </Text>

          <Text style={styles.premiumText}>
            Tes contrats apparaissent ici. Avec Premium, Pilo peut également
            suivre les évolutions et les échéances pour toi.
          </Text>

          <TouchableOpacity
            style={styles.premiumButton}
            onPress={() =>
              void openPremiumCheckout()
            }
          >
            <Text style={styles.premiumButtonText}>
              Découvrir Premium →
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {errorMessage ? (
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>
            Impossible de charger le Monitoring
          </Text>

          <Text style={styles.errorText}>
            {errorMessage}
          </Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={() =>
              void loadMonitoring()
            }
          >
            <Text style={styles.retryText}>
              Réessayer
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>
              TON SUIVI
            </Text>

            <Text style={styles.summaryTitle}>
              Pilo garde un œil dessus 👀
            </Text>

            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>
                  Contrats
                </Text>

                <Text style={styles.statValue}>
                  {contracts.length}
                </Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statLabel}>
                  Alertes
                </Text>

                <Text
                  style={
                    alertCount > 0
                      ? styles.statWarning
                      : styles.statValue
                  }
                >
                  {alertCount}
                </Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statLabel}>
                  Économies
                </Text>

                <Text style={styles.statGreen}>
                  {formatMoney(totalSaving)} €
                </Text>
              </View>
            </View>

            <View style={styles.monthlyCard}>
              <Text style={styles.monthlyLabel}>
                Total mensuel surveillé
              </Text>

              <Text style={styles.monthlyValue}>
                {formatMoney(monthlyTotal)} €/mois
              </Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>
              TES CONTRATS
            </Text>

            <Text style={styles.sectionTitle}>
              Contrats surveillés
            </Text>
          </View>

          {contracts.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyIcon}>
                📭
              </Text>

              <Text style={styles.emptyTitle}>
                Aucun contrat suivi
              </Text>

              <Text style={styles.emptyText}>
                Ajoute ton premier contrat pour retrouver ici son fournisseur,
                son prix, son offre et son échéance.
              </Text>

              <TouchableOpacity
                style={styles.emptyAddButton}
                onPress={() =>
                  router.push("/monitoring-add")
                }
              >
                <Text style={styles.emptyAddButtonText}>
                  ➕ Ajouter mon premier contrat
                </Text>
              </TouchableOpacity>

              <View style={styles.tip}>
                <Text style={styles.tipTitle}>
                  🔄 Le réflexe Pilo
                </Text>

                <Text style={styles.tipText}>
                  Nouveau contrat ? Pense à renseigner son fournisseur, son prix
                  et sa date d'échéance.
                </Text>
              </View>
            </View>
          ) : (
            contracts.map(
              (contract) => {
                const category =
                  getCategoryInfo(
                    contract.category
                  );

                const status =
                  getStatusConfig(
                    contract.status
                  );

                return (
                  <View
                    key={contract.id}
                    style={styles.contractCard}
                  >
                    <View style={styles.contractTop}>
                      <View style={styles.contractIdentity}>
                        <Text style={styles.contractIcon}>
                          {category.icon}
                        </Text>

                        <View style={{ flex: 1 }}>
                          <Text style={styles.contractCategory}>
                            {category.label}
                          </Text>

                          <Text style={styles.contractProvider}>
                            {contract.provider ||
                              "Fournisseur non renseigné"}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={[
                          styles.statusBadge,
                          status.type === "danger"
                            ? styles.statusDanger
                            : status.type === "warning"
                              ? styles.statusWarning
                              : styles.statusSuccess,
                        ]}
                      >
                        <Text style={styles.statusText}>
                          {status.emoji}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.contractPrice}>
                      {formatMoney(
                        contract.monthly_price
                      )}{" "}
                      €/mois
                    </Text>

                    {contract.current_offer ? (
                      <Text style={styles.contractOffer}>
                        Offre actuelle : {contract.current_offer}
                      </Text>
                    ) : null}

                    <View style={styles.contractInfoGrid}>
                      <View style={styles.contractInfoCard}>
                        <Text style={styles.contractInfoLabel}>
                          Échéance
                        </Text>

                        <Text style={styles.contractInfoValue}>
                          {formatDate(
                            contract.end_date
                          )}
                        </Text>
                      </View>

                      <View style={styles.contractInfoCard}>
                        <Text style={styles.contractInfoLabel}>
                          Économie
                        </Text>

                        <Text style={styles.contractSaving}>
                          {formatMoney(
                            contract.yearly_saving
                          )}{" "}
                          €/an
                        </Text>
                      </View>
                    </View>

                    {contract.better_offer ? (
                      <View style={styles.opportunityCard}>
                        <Text style={styles.opportunityLabel}>
                          💡 OPPORTUNITÉ
                        </Text>

                        <Text style={styles.opportunityText}>
                          {contract.better_offer}
                        </Text>

                        <TouchableOpacity
                          style={styles.opportunityButton}
                          onPress={() =>
                            void openMissionForCategory(
                              contract.category
                            )
                          }
                          activeOpacity={0.85}
                        >
                          <Text style={styles.opportunityButtonText}>
                            Voir la mission →
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}

                    <View style={styles.statusLine}>
                      <Text style={styles.statusLineText}>
                        {status.label}
                      </Text>
                    </View>

                    <View style={styles.actionsRow}>
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={() =>
                          openEdit(contract)
                        }
                        disabled={
                          deletingId === contract.id
                        }
                      >
                        <Text style={styles.editButtonText}>
                          ✏️ Modifier
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.deleteButton,
                          deletingId === contract.id &&
                            styles.disabledButton,
                        ]}
                        onPress={() =>
                          confirmDelete(contract)
                        }
                        disabled={
                          deletingId === contract.id
                        }
                      >
                        {deletingId === contract.id ? (
                          <ActivityIndicator
                            size="small"
                            color="#fecaca"
                          />
                        ) : (
                          <Text style={styles.deleteButtonText}>
                            🗑️ Supprimer
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }
            )
          )}
        </>
      )}

      <Text style={styles.refreshHint}>
        Tire vers le bas pour actualiser tes contrats.
      </Text>

      <View style={styles.bottomSpace} />
      </ScrollView>

      <Modal
        visible={editOpen}
        transparent
        animationType="slide"
        onRequestClose={closeEdit}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.modalHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.modalKicker}>
                    MODIFIER LE CONTRAT
                  </Text>

                  <Text style={styles.modalTitle}>
                    {editingContract
                      ? getCategoryInfo(
                          editingContract.category
                        ).label
                      : "Contrat"}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeEdit}
                  disabled={savingEdit}
                >
                  <Text style={styles.closeButtonText}>
                    ✕
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.fieldLabel}>
                Fournisseur / partenaire
              </Text>

              <TextInput
                style={styles.input}
                value={editProvider}
                onChangeText={setEditProvider}
                placeholder="Ex. Orange, EDF..."
                placeholderTextColor="#64748b"
              />

              <Text style={styles.fieldLabel}>
                Prix mensuel
              </Text>

              <TextInput
                style={styles.input}
                value={editPrice}
                onChangeText={setEditPrice}
                placeholder="19.99"
                placeholderTextColor="#64748b"
                keyboardType="decimal-pad"
              />

              <Text style={styles.fieldLabel}>
                Offre actuelle
              </Text>

              <TextInput
                style={styles.input}
                value={editOffer}
                onChangeText={setEditOffer}
                placeholder="Nom de l'offre"
                placeholderTextColor="#64748b"
              />

              <Text style={styles.fieldLabel}>
                Fin d'engagement / échéance
              </Text>

              <TextInput
                style={styles.input}
                value={editEndDate}
                onChangeText={setEditEndDate}
                placeholder="AAAA-MM-JJ"
                placeholderTextColor="#64748b"
                autoCapitalize="none"
              />

              <Text style={styles.dateHint}>
                Format attendu : AAAA-MM-JJ
              </Text>

              <TouchableOpacity
                style={[
                  styles.saveButton,
                  savingEdit &&
                    styles.disabledButton,
                ]}
                onPress={() =>
                  void saveEdit()
                }
                disabled={savingEdit}
              >
                {savingEdit ? (
                  <ActivityIndicator
                    size="small"
                    color="#020617"
                  />
                ) : (
                  <Text style={styles.saveButtonText}>
                    Enregistrer les modifications
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closeEdit}
                disabled={savingEdit}
              >
                <Text style={styles.cancelButtonText}>
                  Annuler
                </Text>
              </TouchableOpacity>
            </ScrollView>
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
  },

  loadingScreen: {
    flex: 1,
    backgroundColor: "#020617",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  loadingIcon: {
    fontSize: 58,
  },

  loader: {
    marginTop: 20,
  },

  loadingTitle: {
    marginTop: 18,
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
  },

  loadingText: {
    marginTop: 7,
    color: "#64748b",
    textAlign: "center",
  },

  kicker: {
    color: "#c084fc",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
  },

  title: {
    marginTop: 8,
    color: "#ffffff",
    fontSize: 31,
    fontWeight: "900",
  },

  subtitle: {
    marginTop: 10,
    color: "#94a3b8",
    lineHeight: 21,
    fontSize: 13,
  },

  addButton: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#22c55e",
  },

  addButtonText: {
    color: "#020617",
    fontWeight: "900",
  },

  premiumCard: {
    marginTop: 22,
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#7e22ce",
    backgroundColor: "#17112b",
  },

  premiumLabel: {
    color: "#c084fc",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  premiumTitle: {
    marginTop: 8,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
  },

  premiumText: {
    marginTop: 8,
    color: "#cbd5e1",
    lineHeight: 19,
    fontSize: 11,
  },

  premiumButton: {
    marginTop: 14,
    paddingVertical: 12,
    borderRadius: 13,
    alignItems: "center",
    backgroundColor: "#a855f7",
  },

  premiumButtonText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "900",
  },

  summaryCard: {
    marginTop: 22,
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  summaryLabel: {
    color: "#a855f7",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.7,
  },

  summaryTitle: {
    marginTop: 7,
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "900",
  },

  statsRow: {
    marginTop: 16,
    flexDirection: "row",
    gap: 7,
  },

  statCard: {
    flex: 1,
    padding: 11,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#020617",
  },

  statLabel: {
    color: "#64748b",
    fontSize: 8,
    fontWeight: "700",
  },

  statValue: {
    marginTop: 5,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
  },

  statGreen: {
    marginTop: 5,
    color: "#22c55e",
    fontSize: 15,
    fontWeight: "900",
  },

  statWarning: {
    marginTop: 5,
    color: "#fbbf24",
    fontSize: 18,
    fontWeight: "900",
  },

  monthlyCard: {
    marginTop: 10,
    padding: 13,
    borderRadius: 14,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  monthlyLabel: {
    color: "#64748b",
    fontSize: 9,
  },

  monthlyValue: {
    marginTop: 4,
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
  },

  sectionHeader: {
    marginTop: 30,
    marginBottom: 2,
  },

  sectionLabel: {
    color: "#c084fc",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.7,
  },

  sectionTitle: {
    marginTop: 6,
    color: "#ffffff",
    fontSize: 21,
    fontWeight: "900",
  },

  contractCard: {
    marginTop: 12,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  contractTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  contractIdentity: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  contractIcon: {
    fontSize: 28,
  },

  contractCategory: {
    color: "#64748b",
    fontSize: 9,
    fontWeight: "800",
    textTransform: "uppercase",
  },

  contractProvider: {
    marginTop: 3,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
  },

  statusBadge: {
    width: 34,
    height: 34,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },

  statusSuccess: {
    backgroundColor: "#052e16",
    borderColor: "#166534",
  },

  statusWarning: {
    backgroundColor: "#451a03",
    borderColor: "#92400e",
  },

  statusDanger: {
    backgroundColor: "#450a0a",
    borderColor: "#991b1b",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "900",
  },

  contractPrice: {
    marginTop: 15,
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "900",
  },

  contractOffer: {
    marginTop: 5,
    color: "#94a3b8",
    fontSize: 11,
  },

  contractInfoGrid: {
    marginTop: 14,
    flexDirection: "row",
    gap: 8,
  },

  contractInfoCard: {
    flex: 1,
    padding: 11,
    borderRadius: 13,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  contractInfoLabel: {
    color: "#64748b",
    fontSize: 8,
    fontWeight: "700",
  },

  contractInfoValue: {
    marginTop: 5,
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "800",
  },

  contractSaving: {
    marginTop: 5,
    color: "#22c55e",
    fontSize: 11,
    fontWeight: "900",
  },

  opportunityCard: {
    marginTop: 13,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "#422006",
    borderWidth: 1,
    borderColor: "#78350f",
  },

  opportunityLabel: {
    color: "#fbbf24",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  opportunityText: {
    marginTop: 5,
    color: "#fde68a",
    fontSize: 11,
    lineHeight: 17,
  },

  opportunityButton: {
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#f59e0b",
  },

  opportunityButtonText: {
    color: "#020617",
    fontSize: 10,
    fontWeight: "900",
  },

  statusLine: {
    marginTop: 12,
    paddingTop: 11,
    borderTopWidth: 1,
    borderTopColor: "#1e293b",
  },

  statusLineText: {
    color: "#94a3b8",
    fontSize: 10,
    fontWeight: "700",
  },

  actionsRow: {
    marginTop: 14,
    flexDirection: "row",
    gap: 9,
  },

  editButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#3b82f6",
    backgroundColor: "#172554",
  },

  editButtonText: {
    color: "#bfdbfe",
    fontSize: 11,
    fontWeight: "900",
  },

  deleteButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#991b1b",
    backgroundColor: "#450a0a",
  },

  deleteButtonText: {
    color: "#fecaca",
    fontSize: 11,
    fontWeight: "900",
  },

  disabledButton: {
    opacity: 0.6,
  },

  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.78)",
  },

  modalCard: {
    maxHeight: "88%",
    padding: 20,
    paddingBottom: 28,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  modalHeader: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  modalKicker: {
    color: "#60a5fa",
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

  emptyCard: {
    marginTop: 12,
    padding: 22,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  emptyIcon: {
    textAlign: "center",
    fontSize: 40,
  },

  emptyTitle: {
    marginTop: 10,
    textAlign: "center",
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
  },

  emptyText: {
    marginTop: 8,
    color: "#94a3b8",
    textAlign: "center",
    fontSize: 11,
    lineHeight: 18,
  },

  emptyAddButton: {
    marginTop: 18,
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#22c55e",
  },

  emptyAddButtonText: {
    color: "#020617",
    fontWeight: "900",
    fontSize: 11,
  },

  tip: {
    marginTop: 18,
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#7e22ce",
    backgroundColor: "#17112b",
  },

  tipTitle: {
    color: "#e9d5ff",
    fontWeight: "900",
    fontSize: 11,
  },

  tipText: {
    marginTop: 6,
    color: "#cbd5e1",
    fontSize: 10,
    lineHeight: 17,
  },

  errorCard: {
    marginTop: 22,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#7f1d1d",
    backgroundColor: "#450a0a",
  },

  errorTitle: {
    color: "#fecaca",
    fontWeight: "900",
  },

  errorText: {
    marginTop: 6,
    color: "#fca5a5",
    fontSize: 11,
  },

  retryButton: {
    marginTop: 13,
    paddingVertical: 11,
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#ef4444",
  },

  retryText: {
    color: "#ffffff",
    fontWeight: "900",
  },

  refreshHint: {
    marginTop: 22,
    color: "#475569",
    fontSize: 9,
    textAlign: "center",
  },

  bottomSpace: {
    height: 50,
  },
});