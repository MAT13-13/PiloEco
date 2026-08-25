import { useLocalSearchParams } from "expo-router";
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

const categoryAliases: Record<string, string[]> = {
  famille: ["famille", "famille-aides", "famille & aides"],

  "beaute-artisanat": [
    "beaute-artisanat",
    "beauté-artisanat",
    "beauté & artisanat",
    "beaute & artisanat",
  ],

  voyage: ["voyage"],

  telephone: ["telephone", "téléphone", "mobile"],

  "telephone-senior": [
    "telephone-senior",
    "téléphone-senior",
    "telephone senior",
    "téléphone senior",
  ],

  "site-internet-pro": [
    "site-internet-pro",
    "site internet pro",
  ],

  "mutuelle-professionnelle": [
    "mutuelle-professionnelle",
    "mutuelle professionnelle",
    "mutuelle pro",
    "tns",
  ],

  animaux: [
    "animaux",
    "animal",
    "assurance-animaux",
    "assurance animaux",
  ],

  "assurance-emprunteur": [
    "assurance-emprunteur",
    "assurance emprunteur",
  ],

  ambassadeur: [
    "ambassadeur",
    "ambassadeur-gselect",
    "gselect",
  ],

  "assurance-obseques": [
    "assurance-obseques",
    "assurance obsèques",
    "assurance obseques",
    "obseques",
    "obsèques",
  ],

  "credit-immobilier": [
    "credit-immobilier",
    "crédit-immobilier",
    "credit immobilier",
    "crédit immobilier",
  ],

  "diagnostic-immobilier": [
    "diagnostic-immobilier",
    "diagnostic immobilier",
  ],

  "location-meublee": [
    "location-meublee",
    "location meublée",
    "location meublee",
    "lmnp",
  ],

  habitation: [
    "habitation",
    "assurance-habitation",
    "assurance habitation",
  ],

  travaux: [
    "travaux",
    "travaux-renovation",
    "travaux rénovation",
    "travaux renovation",
  ],

  "mutuelle-senior": [
    "mutuelle-senior",
    "mutuelle senior",
  ],

  "epargne-retraite": [
    "epargne-retraite",
    "épargne-retraite",
    "epargne retraite",
    "épargne retraite",
  ],

  auto: [
    "auto",
    "automobile",
    "assurance-auto",
    "assurance auto",
  ],

  moto: [
    "moto",
    "assurance-moto",
    "assurance moto",
  ],

  "mobilites-douces": [
    "mobilites-douces",
    "mobilités-douces",
    "mobilites douces",
    "mobilités douces",
  ],

  "services-auto": [
    "services-auto",
    "service-auto",
    "services auto",
    "service auto",
  ],

  "moto-equipement": [
    "moto-equipement",
    "moto équipement",
    "moto equipement",
  ],

  formation: ["formation", "formations"],

  securite: [
    "securite",
    "sécurité",
    "alarme-securite",
    "alarme sécurité",
  ],

  crypto: [
    "crypto",
    "cryptomonnaie",
    "cryptomonnaies",
  ],

  cybersecurite: [
    "cybersecurite",
    "cybersécurité",
  ],

  "services-entreprises": [
    "services-entreprises",
    "services aux entreprises",
    "services-aux-entreprises",
  ],

  demenagement: [
    "demenagement",
    "déménagement",
  ],

  debarras: [
    "debarras",
    "débarras",
  ],

  electricite: [
    "electricite",
    "électricité",
    "energie",
    "énergie",
  ],

  gaz: ["gaz"],

  // En cours de partenariat
  mutuelle: [
    "mutuelle",
    "mutuelle-sante",
    "mutuelle santé",
  ],

  internet: ["internet"],
  banque: ["banque"],
  streaming: ["streaming"],
  logiciels: ["logiciels", "logiciel"],
};

function normalizeMissionValue(
  value: string | null | undefined
) {
  return (value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function missionMatchesCategory(
  mission: MissionCatalog,
  selectedCategory?: string
) {
  if (!selectedCategory) {
    return true;
  }

  const requested =
    normalizeMissionValue(selectedCategory);

  const aliases = (
    categoryAliases[requested] ?? [requested]
  ).map(normalizeMissionValue);

  const missionValues = [
    mission.slug,
    mission.category,
    mission.title,
  ].map(normalizeMissionValue);

  return aliases.some((alias) =>
    missionValues.some(
      (value) =>
        value === alias ||
        value.startsWith(`${alias}-`) ||
        alias.startsWith(`${value}-`)
    )
  );
}


type MissionUniverse = {
  id: string;
  label: string;
  icon: string;
  description: string;
  slugs: string[];
};

const missionUniverses: MissionUniverse[] = [
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

export default function MissionsScreen() {
  const { category } = useLocalSearchParams<{
    category?: string | string[];
  }>();

  const selectedCategory =
    typeof category === "string"
      ? category
      : Array.isArray(category)
        ? category[0]
        : undefined;

  const [availableMissions, setAvailableMissions] =
    useState<MissionCatalog[]>([]);

  const [selectedUniverse, setSelectedUniverse] =
    useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadMissions() {
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
          "Erreur mission_catalog :",
          error
        );

        setErrorMessage(
          "Impossible de charger les missions."
        );

        return;
      }

      const missions =
        (data as MissionCatalog[] | null) ?? [];

      const visibleMissions = selectedCategory
        ? missions.filter((mission) =>
            missionMatchesCategory(
              mission,
              selectedCategory
            )
          )
        : missions;

      setAvailableMissions(
        visibleMissions.filter(
          (mission) =>
            mission.status === "available"
        )
      );

    } catch (error) {
      console.error(
        "Erreur chargement missions :",
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
    void loadMissions();
  }, [selectedCategory]);

  async function refreshMissions() {
    setRefreshing(true);
    await loadMissions();
  }

  async function openMission(
    mission: MissionCatalog
  ) {
    try {
      const missionRoute =
        mission.route ||
        `/missions/${mission.slug}`;

      const url =
        `https://piloeco.com${missionRoute}`;

      const supported =
        await Linking.canOpenURL(url);

      if (!supported) {
        console.error(
          "Impossible d'ouvrir :",
          url
        );

        return;
      }

      await Linking.openURL(url);
    } catch (error) {
      console.error(
        "Erreur ouverture mission :",
        error
      );
    }
  }

  const activeUniverse = selectedUniverse
    ? missionUniverses.find(
        (universe) => universe.id === selectedUniverse
      ) ?? null
    : null;

  const activeUniverseMissions = activeUniverse
    ? availableMissions.filter((mission) =>
        activeUniverse.slugs.includes(mission.slug)
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
          Pilo prépare tes missions...
        </Text>
        <Text style={styles.loadingText}>
          Recherche des solutions disponibles.
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
          onRefresh={refreshMissions}
          tintColor="#22c55e"
          colors={["#22c55e"]}
        />
      }
    >
      <Text style={styles.kicker}>🎯 MES MISSIONS</Text>

      <Text style={styles.title}>
        {selectedCategory
          ? "Missions de cet univers"
          : activeUniverse
            ? activeUniverse.label
            : "Choisis ton univers"}
      </Text>

      <Text style={styles.subtitle}>
        {selectedCategory
          ? "Retrouve les missions et solutions disponibles pour la rubrique choisie."
          : activeUniverse
            ? "Choisis maintenant la mission qui correspond à ton besoin."
            : "Pilo organise les missions par domaine pour retrouver rapidement la bonne solution."}
      </Text>

      {errorMessage ? (
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>
            Impossible de charger les missions
          </Text>
          <Text style={styles.errorText}>
            {errorMessage}
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={loadMissions}
          >
            <Text style={styles.retryButtonText}>
              Réessayer
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {!errorMessage &&
      !selectedCategory &&
      !activeUniverse ? (
        <View style={styles.grid}>
          {missionUniverses.map((universe) => {
            const count = availableMissions.filter(
              (mission) =>
                universe.slugs.includes(mission.slug)
            ).length;

            return (
              <TouchableOpacity
                key={universe.id}
                activeOpacity={0.8}
                style={styles.universeCard}
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
                  Voir les missions →
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}

      {!errorMessage &&
      !selectedCategory &&
      activeUniverse ? (
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
            <Text style={styles.availableLabel}>
              DISPONIBLES MAINTENANT
            </Text>
            <Text style={styles.sectionTitle}>
              {activeUniverse.icon} {activeUniverse.label}
            </Text>
            <Text style={styles.sectionDescription}>
              Seules les missions actuellement disponibles sont affichées.
            </Text>
          </View>

          {activeUniverseMissions.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>
                Aucune mission disponible actuellement dans cet univers.
              </Text>
            </View>
          ) : (
            activeUniverseMissions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onPress={() => void openMission(mission)}
              />
            ))
          )}
        </>
      ) : null}

      {!errorMessage && selectedCategory ? (
        <>
          <View style={styles.sectionHeader}>
            <Text style={styles.availableLabel}>
              DISPONIBLES MAINTENANT
            </Text>
            <Text style={styles.sectionTitle}>
              Missions disponibles
            </Text>
            <Text style={styles.sectionDescription}>
              Seules les missions actuellement disponibles sont affichées.
            </Text>
          </View>

          {availableMissions.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>
                Aucune mission disponible dans cet univers
              </Text>
            </View>
          ) : (
            availableMissions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onPress={() => void openMission(mission)}
              />
            ))
          )}
        </>
      ) : null}

      <Text style={styles.refreshText}>
        Tire vers le bas pour actualiser
      </Text>
      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

function MissionCard({
  mission,
  onPress,
}: {
  mission: MissionCatalog;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.cardTop}>
        <Text style={styles.icon}>
          {mission.icon}
        </Text>

        {mission.is_premium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumBadgeText}>
              PREMIUM
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.cardTitle}>
        {mission.title}
      </Text>

      <Text style={styles.cardText}>
        {mission.slug === "ambassadeur" ||
        mission.slug === "ambassadeur-gselect"
          ? "Découvrir l'opportunité →"
          : "Voir les recommandations →"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#020617" },
  content: { padding: 20 },
  loadingScreen: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  loadingIcon: { fontSize: 55 },
  loader: { marginTop: 20 },
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
    color: "#22c55e",
    fontWeight: "900",
    fontSize: 11,
    letterSpacing: 2,
  },
  title: {
    marginTop: 10,
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 10,
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 21,
  },
  grid: {
    marginTop: 24,
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
    marginTop: 32,
    marginBottom: 6,
  },
  availableLabel: {
    color: "#22c55e",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.8,
  },
  sectionTitle: {
    marginTop: 7,
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
  },
  sectionDescription: {
    marginTop: 7,
    color: "#64748b",
    fontSize: 12,
    lineHeight: 18,
  },
  card: {
    marginTop: 12,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: { fontSize: 30 },
  cardTitle: {
    marginTop: 10,
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
  },
  cardText: {
    marginTop: 7,
    color: "#22c55e",
    fontSize: 11,
    fontWeight: "800",
  },
  premiumBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 50,
    backgroundColor: "#3b0764",
    borderWidth: 1,
    borderColor: "#7e22ce",
  },
  premiumBadgeText: {
    color: "#d8b4fe",
    fontSize: 8,
    fontWeight: "900",
  },
  errorCard: {
    marginTop: 30,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#7f1d1d",
    backgroundColor: "#450a0a",
  },
  errorTitle: {
    color: "#fecaca",
    fontSize: 16,
    fontWeight: "900",
  },
  errorText: {
    marginTop: 7,
    color: "#fca5a5",
    fontSize: 12,
  },
  retryButton: {
    marginTop: 15,
    paddingVertical: 11,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#ef4444",
  },
  retryButtonText: {
    color: "#ffffff",
    fontWeight: "900",
  },
  emptyCard: {
    marginTop: 12,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },
  emptyTitle: {
    color: "#ffffff",
    fontWeight: "900",
  },
  refreshText: {
    marginTop: 25,
    color: "#475569",
    textAlign: "center",
    fontSize: 10,
  },
  bottomSpace: { height: 50 },
});