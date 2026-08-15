import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { supabase } from "../lib/supabase";

type MissionCatalog = {
  id: string;
  slug: string;
  title: string;
  icon: string;
  category: string | null;
  status: "available" | "pending" | "disabled";
  route: string | null;
  sort_order: number;
  is_premium: boolean;
};

const analyseSlugMap: Record<string, string> = {
  // Missions actives
  famille: "famille",
  "beaute-artisanat": "beauteArtisanat",
  voyage: "voyage",
  mobile: "telephone",
  telephone: "telephone",
  "telephone-senior": "telephoneSenior",
  "site-internet-pro": "siteInternetPro",
  animaux: "animaux",
  "assurance-animaux": "animaux",
  "assurance-emprunteur": "assuranceEmprunteur",
  ambassadeur: "ambassadeur",
  "ambassadeur-gselect": "ambassadeur",
  "assurance-obseques": "assuranceObseques",
  "credit-immobilier": "creditImmobilier",
  "diagnostic-immobilier": "diagnosticImmobilier",
  habitation: "habitation",
  "assurance-habitation": "habitation",
  travaux: "travaux",
  "mutuelle-senior": "mutuelleSenior",
  "epargne-retraite": "epargneRetraite",
  auto: "auto",
  "assurance-auto": "auto",
  moto: "moto",
  "assurance-moto": "moto",
  "mobilites-douces": "mobilitesDouces",
  "services-auto": "servicesAuto",
  "service-auto": "servicesAuto",
  "moto-equipement": "motoEquipement",
  formation: "formation",
  securite: "securite",
  "alarme-securite": "securite",
  crypto: "crypto",
  cryptomonnaies: "crypto",
  cybersecurite: "cybersecurite",
  "services-entreprises": "servicesEntreprises",
  demenagement: "demenagement",
  debarras: "debarras",
  electricite: "electricite",
  gaz: "gaz",

  // En cours de partenariat
  mutuelle: "mutuelle",
  "mutuelle-sante": "mutuelle",
  internet: "internet",
  banque: "banque",
  streaming: "streaming",
  logiciels: "logiciels",
};

export default function AnalyseScreen() {
  const [availableCategories, setAvailableCategories] = useState<
    MissionCatalog[]
  >([]);
  const [pendingCategories, setPendingCategories] = useState<
    MissionCatalog[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadCategories() {
    try {
      setErrorMessage("");

      const { data, error } = await supabase
        .from("mission_catalog")
        .select(
          `
            id,
            slug,
            title,
            icon,
            category,
            status,
            route,
            sort_order,
            is_premium
          `
        )
        .neq("status", "disabled")
        .order("sort_order", {
          ascending: true,
        });

      if (error) {
        console.error(
          "Erreur mission_catalog analyse :",
          error
        );

        setErrorMessage(
          "Impossible de charger les analyses."
        );

        return;
      }

      const missions =
        (data as MissionCatalog[] | null) ?? [];

      const analyses = missions.filter(
        (mission) =>
          Boolean(analyseSlugMap[mission.slug])
      );

      setAvailableCategories(
        analyses.filter(
          (mission) =>
            mission.status === "available"
        )
      );

      setPendingCategories(
        analyses.filter(
          (mission) =>
            mission.status === "pending"
        )
      );
    } catch (error) {
      console.error(
        "Erreur chargement analyses :",
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
    void loadCategories();
  }, []);

  async function refreshCategories() {
    setRefreshing(true);
    await loadCategories();
  }

  async function openAnalyse(
    category?: string
  ) {
    const url = category
      ? `https://piloeco.com/analyse?category=${encodeURIComponent(
          category
        )}`
      : "https://piloeco.com/analyse";

    try {
      const supported =
        await Linking.canOpenURL(url);

      if (!supported) {
        console.error(
          "Impossible d'ouvrir l'analyse PiloEco :",
          url
        );

        return;
      }

      await Linking.openURL(url);
    } catch (error) {
      console.error(
        "Erreur ouverture analyse :",
        error
      );
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <Text style={styles.loadingIcon}>
          🐦
        </Text>

        <ActivityIndicator
          size="large"
          color="#22c55e"
          style={styles.loader}
        />

        <Text style={styles.loadingTitle}>
          Pilo prépare tes analyses...
        </Text>

        <Text style={styles.loadingText}>
          Synchronisation des catégories disponibles.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={
        false
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refreshCategories}
          tintColor="#22c55e"
          colors={["#22c55e"]}
        />
      }
    >
      <Text style={styles.kicker}>
        🔎 ANALYSE PILO
      </Text>

      <Text style={styles.title}>
        Que veux-tu analyser ?
      </Text>

      <Text style={styles.subtitle}>
        Choisis une catégorie disponible.
        Pilo te posera directement les
        questions utiles à ton besoin.
      </Text>

      {/* HERO */}

      <View style={styles.heroCard}>
        <Text style={styles.heroIcon}>
          🐦
        </Text>

        <View style={styles.heroContent}>
          <Text style={styles.heroLabel}>
            ÉTAPE 1
          </Text>

          <Text style={styles.heroTitle}>
            Commence par ton analyse
          </Text>

          <Text style={styles.heroText}>
            Pilo analyse ta situation puis
            t'oriente vers les missions et
            solutions déjà disponibles.
          </Text>
        </View>
      </View>

      {/* ANALYSE COMPLETE */}

      <TouchableOpacity
        style={styles.startButton}
        activeOpacity={0.85}
        onPress={() =>
          void openAnalyse()
        }
      >
        <View>
          <Text
            style={
              styles.startButtonLabel
            }
          >
            ANALYSE PILO
          </Text>

          <Text
            style={
              styles.startButtonText
            }
          >
            🔎 Voir toutes les analyses
          </Text>
        </View>

        <Text
          style={
            styles.startButtonArrow
          }
        >
          →
        </Text>
      </TouchableOpacity>

      {errorMessage ? (
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>
            Impossible de charger les analyses
          </Text>

          <Text style={styles.errorText}>
            {errorMessage}
          </Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={() =>
              void loadCategories()
            }
          >
            <Text style={styles.retryButtonText}>
              Réessayer
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* DISPONIBLES */}

      <View style={styles.sectionHeader}>
        <View style={styles.greenDot} />

        <Text
          style={styles.availableLabel}
        >
          DISPONIBLES MAINTENANT
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Choisis ton analyse
      </Text>

      <Text style={styles.sectionText}>
        Ces catégories disposent déjà
        d'une solution ou d'un partenaire
        sélectionné par Pilo.
      </Text>

      <View style={styles.grid}>
        {availableCategories.map(
          (category) => (
            <TouchableOpacity
              key={category.slug}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() =>
                void openAnalyse(
                  analyseSlugMap[category.slug]
                )
              }
            >
              <Text
                style={styles.icon}
              >
                {category.icon}
              </Text>

              <Text
                style={
                  styles.cardTitle
                }
              >
                {category.title}
              </Text>

              <Text
                style={
                  styles.cardText
                }
              >
                Analyser →
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {/* EN COURS */}

      <View style={styles.pendingSection}>
        <View
          style={styles.sectionHeader}
        >
          <View style={styles.amberDot} />

          <Text
            style={
              styles.pendingLabel
            }
          >
            PROCHAINEMENT
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          En cours de partenariat
        </Text>

        <Text style={styles.sectionText}>
          Pilo prépare actuellement des
          solutions pour ces catégories.
          Elles seront activées dès qu'un
          partenaire adapté sera
          disponible.
        </Text>

        <View style={styles.grid}>
          {pendingCategories.map(
            (category) => (
              <View
                key={category.slug}
                style={styles.pendingCard}
              >
                <View
                  style={
                    styles.pendingBadge
                  }
                >
                  <Text
                    style={
                      styles.pendingBadgeText
                    }
                  >
                    EN COURS
                  </Text>
                </View>

                <Text
                  style={
                    styles.pendingIcon
                  }
                >
                  {category.icon}
                </Text>

                <Text
                  style={
                    styles.pendingCardTitle
                  }
                >
                  {category.title}
                </Text>

                <Text
                  style={
                    styles.pendingCardText
                  }
                >
                  Solution en préparation
                </Text>
              </View>
            )
          )}
        </View>
      </View>

      {/* INFO */}

      <View style={styles.infoCard}>
        <Text
          style={styles.infoTitle}
        >
          🐦 Pilo s'adapte
        </Text>

        <Text
          style={styles.infoText}
        >
          Une catégorie en préparation
          devient accessible dès qu'une
          solution adaptée est disponible.
        </Text>
      </View>

      <View
        style={styles.bottomSpace}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: "#020617",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  loadingIcon: {
    fontSize: 55,
  },

  loader: {
    marginTop: 20,
  },

  loadingTitle: {
    marginTop: 18,
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
  },

  loadingText: {
    marginTop: 7,
    color: "#64748b",
    textAlign: "center",
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

  retryButtonText: {
    color: "#ffffff",
    fontWeight: "900",
  },

  screen: {
    flex: 1,
    backgroundColor: "#020617",
  },

  content: {
    padding: 20,
  },

  kicker: {
    color: "#22c55e",
    fontWeight: "900",
    fontSize: 10,
    letterSpacing: 2,
  },

  title: {
    marginTop: 9,
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "900",
  },

  subtitle: {
    marginTop: 10,
    color: "#94a3b8",
    lineHeight: 21,
    fontSize: 13,
  },

  heroCard: {
    marginTop: 24,
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#166534",
    backgroundColor: "#052e16",
    flexDirection: "row",
    gap: 13,
  },

  heroIcon: {
    fontSize: 35,
  },

  heroContent: {
    flex: 1,
  },

  heroLabel: {
    color: "#4ade80",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  heroTitle: {
    marginTop: 5,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
  },

  heroText: {
    marginTop: 6,
    color: "#bbf7d0",
    fontSize: 10,
    lineHeight: 17,
  },

  startButton: {
    marginTop: 15,
    minHeight: 68,
    paddingHorizontal: 17,
    paddingVertical: 12,
    borderRadius: 18,
    backgroundColor: "#22c55e",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:
      "space-between",
  },

  startButtonLabel: {
    color: "#14532d",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.3,
  },

  startButtonText: {
    marginTop: 3,
    color: "#020617",
    fontSize: 13,
    fontWeight: "900",
  },

  startButtonArrow: {
    color: "#020617",
    fontSize: 22,
    fontWeight: "900",
  },

  sectionHeader: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: "#22c55e",
  },

  amberDot: {
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: "#f59e0b",
  },

  availableLabel: {
    color: "#22c55e",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.6,
  },

  pendingLabel: {
    color: "#f59e0b",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.6,
  },

  sectionTitle: {
    marginTop: 7,
    color: "#ffffff",
    fontSize: 21,
    fontWeight: "900",
  },

  sectionText: {
    marginTop: 6,
    marginBottom: 4,
    color: "#64748b",
    fontSize: 11,
    lineHeight: 17,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent:
      "space-between",
  },

  card: {
    width: "48%",
    marginTop: 12,
    minHeight: 130,
    padding: 15,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  icon: {
    fontSize: 27,
  },

  cardTitle: {
    marginTop: 9,
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 13,
    lineHeight: 18,
  },

  cardText: {
    marginTop: 7,
    color: "#22c55e",
    fontSize: 9,
    fontWeight: "800",
  },

  pendingSection: {
    marginTop: 15,
    paddingTop: 5,
  },

  pendingCard: {
    position: "relative",
    width: "48%",
    marginTop: 12,
    minHeight: 130,
    padding: 15,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#78350f",
    backgroundColor: "#0f172a",
    opacity: 0.7,
  },

  pendingBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#92400e",
    backgroundColor: "#451a03",
  },

  pendingBadgeText: {
    color: "#fbbf24",
    fontSize: 6,
    fontWeight: "900",
  },

  pendingIcon: {
    fontSize: 27,
  },

  pendingCardTitle: {
    marginTop: 9,
    paddingRight: 35,
    color: "#cbd5e1",
    fontWeight: "900",
    fontSize: 13,
    lineHeight: 18,
  },

  pendingCardText: {
    marginTop: 7,
    color: "#64748b",
    fontSize: 9,
    lineHeight: 14,
  },

  infoCard: {
    marginTop: 28,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  infoTitle: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "900",
  },

  infoText: {
    marginTop: 7,
    color: "#94a3b8",
    fontSize: 10,
    lineHeight: 17,
  },

  bottomSpace: {
    height: 50,
  },
});