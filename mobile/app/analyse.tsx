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

  // Mutuelle professionnelle
  "mutuelle-professionnelle":
    "mutuelleProfessionnelle",

  animaux: "animaux",
  "assurance-animaux": "animaux",
  "assurance-emprunteur":
    "assuranceEmprunteur",
  ambassadeur: "ambassadeur",
  "ambassadeur-gselect": "ambassadeur",
  "assurance-obseques": "assuranceObseques",
  "credit-immobilier": "creditImmobilier",
  "diagnostic-immobilier":
    "diagnosticImmobilier",
  "location-meublee": "locationMeublee",
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
  "services-entreprises":
    "servicesEntreprises",
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


type AnalyseUniverse = {
  id: string;
  label: string;
  icon: string;
  description: string;
  slugs: string[];
};

const analyseUniverses: AnalyseUniverse[] = [
  {
    id: "famille-quotidien",
    label: "Famille & Quotidien",
    icon: "👨‍👩‍👧",
    description: "Aides, quotidien et solutions utiles pour la famille.",
    slugs: ["famille", "beaute-artisanat"],
  },
  {
    id: "sante-protection",
    label: "Santé & Protection",
    icon: "❤️",
    description: "Santé, assurances et solutions de protection.",
    slugs: ["mutuelle", "mutuelle-sante", "mutuelle-senior", "mutuelle-professionnelle", "animaux", "assurance-animaux", "assurance-emprunteur", "assurance-obseques", "ambassadeur", "ambassadeur-gselect"],
  },
  {
    id: "energie-telecoms",
    label: "Énergie & Télécoms",
    icon: "⚡",
    description: "Électricité, gaz, téléphone et connexion Internet.",
    slugs: ["electricite", "gaz", "mobile", "telephone", "telephone-senior", "internet"],
  },
  {
    id: "maison-immobilier",
    label: "Maison & Immobilier",
    icon: "🏠",
    description: "Logement, immobilier, travaux, sécurité et déménagement.",
    slugs: ["credit-immobilier", "diagnostic-immobilier", "location-meublee", "habitation", "assurance-habitation", "travaux", "securite", "alarme-securite", "demenagement", "debarras"],
  },
  {
    id: "auto-moto-mobilite",
    label: "Auto, Moto & Mobilité",
    icon: "🚗",
    description: "Assurances, entretien, équipement et nouvelles mobilités.",
    slugs: ["auto", "assurance-auto", "moto", "assurance-moto", "services-auto", "service-auto", "moto-equipement", "mobilites-douces"],
  },
  {
    id: "finance-patrimoine",
    label: "Finance & Patrimoine",
    icon: "💰",
    description: "Épargne, patrimoine, banque et solutions financières.",
    slugs: ["epargne-retraite", "crypto", "cryptomonnaies", "banque"],
  },
  {
    id: "pro-numerique",
    label: "Pro & Numérique",
    icon: "💼",
    description: "Solutions professionnelles et services numériques.",
    slugs: ["site-internet-pro", "formation", "cybersecurite", "services-entreprises", "logiciels", "streaming"],
  },
  {
    id: "voyages-loisirs",
    label: "Voyages & Loisirs",
    icon: "✈️",
    description: "Voyages et solutions adaptées à tes projets de loisirs.",
    slugs: ["voyage"],
  },
];

export default function AnalyseScreen() {
  const [availableCategories, setAvailableCategories] =
    useState<MissionCatalog[]>([]);

  const [selectedUniverse, setSelectedUniverse] =
    useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] =
    useState(false);
  const [errorMessage, setErrorMessage] =
    useState("");

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

  const activeUniverse = selectedUniverse
    ? analyseUniverses.find(
        (universe) => universe.id === selectedUniverse
      ) ?? null
    : null;

  const activeCategories = activeUniverse
    ? availableCategories.filter((category) =>
        activeUniverse.slugs.includes(category.slug)
      )
    : [];

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <Text style={styles.loadingIcon}>🐦</Text>
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
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refreshCategories}
          tintColor="#22c55e"
          colors={["#22c55e"]}
        />
      }
    >
      <Text style={styles.kicker}>🔎 ANALYSE PILO</Text>

      <Text style={styles.title}>
        {activeUniverse
          ? activeUniverse.label
          : "Que veux-tu analyser ?"}
      </Text>

      <Text style={styles.subtitle}>
        {activeUniverse
          ? "Choisis maintenant l’analyse qui correspond à ton besoin."
          : "Choisis d’abord un univers. Pilo t’affichera uniquement les analyses disponibles dans ce domaine."}
      </Text>

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
            onPress={() => void loadCategories()}
          >
            <Text style={styles.retryButtonText}>
              Réessayer
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {!errorMessage && !activeUniverse ? (
        <>
          <View style={styles.heroCard}>
            <Text style={styles.heroIcon}>🐦</Text>
            <View style={styles.heroContent}>
              <Text style={styles.heroLabel}>ÉTAPE 1</Text>
              <Text style={styles.heroTitle}>
                Choisis ton univers
              </Text>
              <Text style={styles.heroText}>
                Pilo organise les analyses par domaine pour aller plus vite vers la bonne solution.
              </Text>
            </View>
          </View>

          <View style={styles.grid}>
            {analyseUniverses.map((universe) => {
              const count = availableCategories.filter(
                (category) =>
                  universe.slugs.includes(category.slug)
              ).length;

              return (
                <TouchableOpacity
                  key={universe.id}
                  style={styles.universeCard}
                  activeOpacity={0.8}
                  onPress={() =>
                    setSelectedUniverse(universe.id)
                  }
                >
                  <View style={styles.universeTop}>
                    <Text style={styles.universeIcon}>
                      {universe.icon}
                    </Text>
                    <View style={styles.countBadge}>
                      <Text style={styles.countText}>
                        {count}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.universeTitle}>
                    {universe.label}
                  </Text>

                  <Text style={styles.universeDescription}>
                    {universe.description}
                  </Text>

                  <Text style={styles.cardText}>
                    Voir les analyses →
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      ) : null}

      {!errorMessage && activeUniverse ? (
        <>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={() => setSelectedUniverse(null)}
          >
            <Text style={styles.backButtonText}>
              ← Retour aux univers
            </Text>
          </TouchableOpacity>

          <View style={styles.sectionHeader}>
            <View style={styles.greenDot} />
            <Text style={styles.availableLabel}>
              DISPONIBLES MAINTENANT
            </Text>
          </View>

          <Text style={styles.sectionTitle}>
            {activeUniverse.icon} {activeUniverse.label}
          </Text>

          <Text style={styles.sectionText}>
            Seules les analyses actuellement disponibles sont affichées.
          </Text>

          {activeCategories.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>
                Aucune analyse disponible actuellement.
              </Text>
            </View>
          ) : (
            <View style={styles.grid}>
              {activeCategories.map((category) => (
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
                  <Text style={styles.icon}>
                    {category.icon}
                  </Text>
                  <Text style={styles.cardTitle}>
                    {category.title}
                  </Text>
                  <Text style={styles.cardText}>
                    Analyser →
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </>
      ) : null}

      <View style={styles.bottomSpace} />
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
  loadingIcon: { fontSize: 55 },
  loader: { marginTop: 20 },
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
  heroIcon: { fontSize: 35 },
  heroContent: { flex: 1 },
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
  grid: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  universeCard: {
    width: "48%",
    marginBottom: 12,
    minHeight: 185,
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },
  universeTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  universeIcon: { fontSize: 31 },
  countBadge: {
    minWidth: 28,
    height: 28,
    paddingHorizontal: 8,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#166534",
    backgroundColor: "#052e16",
  },
  countText: {
    color: "#4ade80",
    fontSize: 10,
    fontWeight: "900",
  },
  universeTitle: {
    marginTop: 13,
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 14,
    lineHeight: 19,
  },
  universeDescription: {
    marginTop: 7,
    color: "#64748b",
    fontSize: 9,
    lineHeight: 14,
  },
  backButton: {
    marginTop: 24,
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },
  backButtonText: {
    color: "#cbd5e1",
    fontSize: 11,
    fontWeight: "900",
  },
  sectionHeader: {
    marginTop: 28,
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
  availableLabel: {
    color: "#22c55e",
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
    color: "#64748b",
    fontSize: 11,
    lineHeight: 17,
  },
  card: {
    width: "48%",
    marginBottom: 12,
    minHeight: 130,
    padding: 15,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },
  icon: { fontSize: 27 },
  cardTitle: {
    marginTop: 9,
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 13,
    lineHeight: 18,
  },
  cardText: {
    marginTop: 9,
    color: "#22c55e",
    fontSize: 9,
    fontWeight: "800",
  },
  emptyCard: {
    marginTop: 20,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },
  emptyTitle: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "900",
  },
  bottomSpace: { height: 50 },
});