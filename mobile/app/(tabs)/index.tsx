import type { User } from "@supabase/supabase-js";
import { Link, router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import PiloDrawer from "../../components/PiloDrawer";
import { supabase } from "../../lib/supabase";

type Analyse = {
  id: string;
  telephone: number;
  internet: number;
  assurance: number;
  electricite: number;
  total_depenses: number;
  economie_possible: number;
  economie_annuelle: number;
  created_at: string;
};

type Mission = {
  id: string;
  mission_id: string;
  title: string;
  saving: number;
  status: string;
  user_id: string;
};

type PiloProfile = {
  xp: number;
  level: number;
  total_savings: number;
  completed_missions: number;
  badges: string[] | null;
  premium: boolean;
  role: string;
};

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<PiloProfile | null>(null);
  const [analyses, setAnalyses] = useState<Analyse[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  async function chargerDashboard(currentUser: User) {
    const [analysesResponse, missionsResponse, profileResponse] =
      await Promise.all([
        supabase
          .from("analyses")
          .select("*")
          .eq("utilisateur_id", currentUser.id)
          .order("created_at", { ascending: false }),

        supabase
          .from("missions")
          .select("*")
          .eq("user_id", currentUser.id),

        supabase
          .from("profils")
          .select("*")
          .eq("id", currentUser.id)
          .single(),
      ]);

    if (analysesResponse.error) {
      console.error(
        "Erreur analyses :",
        analysesResponse.error.message
      );
    }

    if (missionsResponse.error) {
      console.error(
        "Erreur missions :",
        missionsResponse.error.message
      );
    }

    if (profileResponse.error) {
      console.error(
        "Erreur profil :",
        profileResponse.error.message
      );
    }

    setAnalyses(
      (analysesResponse.data as Analyse[] | null) ?? []
    );

    setMissions(
      (missionsResponse.data as Mission[] | null) ?? []
    );

    setProfile(
      (profileResponse.data as PiloProfile | null) ?? null
    );
  }

  useEffect(() => {
    let mounted = true;

    async function initialiser() {
      const { data, error } =
        await supabase.auth.getUser();

      if (!mounted) return;

      if (error || !data.user) {
        setLoading(false);
        router.replace("/login");
        return;
      }

      setUser(data.user);

      await chargerDashboard(data.user);

      if (mounted) {
        setLoading(false);
      }
    }

    void initialiser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;

        const currentUser =
          session?.user ?? null;

        setUser(currentUser);

        if (!currentUser) {
          router.replace("/login");
          return;
        }

        await chargerDashboard(currentUser);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function rafraichir() {
    if (!user) return;

    setRefreshing(true);

    await chargerDashboard(user);

    setRefreshing(false);
  }

  async function deconnexion() {
    await supabase.auth.signOut();

    setUser(null);
    setProfile(null);
    setAnalyses([]);
    setMissions([]);

    router.replace("/login");
  }

  const totalEconomiesAnnuelles = useMemo(() => {
    return analyses.reduce(
      (total, analyse) =>
        total +
        Number(analyse.economie_annuelle || 0),
      0
    );
  }, [analyses]);

  const missionsTerminees = useMemo(() => {
    return missions.filter(
      (mission) =>
        mission.status === "Terminée"
    );
  }, [missions]);

  const economiesRealisees = useMemo(() => {
    return missionsTerminees.reduce(
      (total, mission) =>
        total +
        Number(mission.saving || 0),
      0
    );
  }, [missionsTerminees]);

  const potentielRestant = useMemo(() => {
    return missions
      .filter(
        (mission) =>
          mission.status !== "Terminée"
      )
      .reduce(
        (total, mission) =>
          total +
          Number(mission.saving || 0),
        0
      );
  }, [missions]);

  const scoreProgression = Math.min(
    100,
    60 + missionsTerminees.length * 10
  );

  const niveau = profile?.level || 1;

  const titreNiveau =
    niveau === 1
      ? "Débutant"
      : niveau === 2
        ? "Économe"
        : niveau === 3
          ? "Stratège"
          : niveau === 4
            ? "Expert"
            : "Maître Pilo";

  const economieAnnuelleAffichee =
    Number(profile?.total_savings || 0) > 0
      ? Number(profile?.total_savings)
      : totalEconomiesAnnuelles;

  const premiumActif =
    profile?.premium === true;

  const missionsRestantes = Math.max(
    0,
    missions.length -
      missionsTerminees.length
  );

  const missionPrioritaire = useMemo(() => {
    return [...missions]
      .filter(
        (mission) =>
          mission.status !== "Terminée"
      )
      .sort(
        (a, b) =>
          Number(b.saving || 0) -
          Number(a.saving || 0)
      )[0];
  }, [missions]);

  const piloSituation = useMemo(() => {
    if (
      missionPrioritaire &&
      Number(missionPrioritaire.saving || 0) > 0
    ) {
      return {
        emoji: "🎯",
        title: "Une mission t'attend",
        message: `${
          missionPrioritaire.title
        } peut représenter jusqu'à ${Number(
          missionPrioritaire.saving || 0
        ).toLocaleString("fr-FR")} € par an.`,
      };
    }

    if (
      economieAnnuelleAffichee > 0 &&
      missionsRestantes === 0
    ) {
      return {
        emoji: "🎉",
        title: "Tout est optimisé",
        message:
          "Tes missions actuelles sont terminées. Pilo continue de suivre ta progression.",
      };
    }

    if (analyses.length === 0) {
      return {
        emoji: "🔎",
        title: "Commence ton analyse",
        message:
          "Quelques réponses suffisent pour lancer Pilo.",
      };
    }

    return {
      emoji: "🐦",
      title: "Pilo veille",
      message:
        "Ton tableau de bord est à jour.",
    };
  }, [
    analyses.length,
    economieAnnuelleAffichee,
    missionPrioritaire,
    missionsRestantes,
  ]);

  const displayName =
    user?.user_metadata?.first_name ||
    user?.user_metadata?.full_name
      ?.split(" ")[0] ||
    user?.user_metadata?.name
      ?.split(" ")[0] ||
    "";

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <Text style={styles.loadingPilo}>
          🐦
        </Text>

        <ActivityIndicator
          size="large"
          color="#22c55e"
          style={{ marginTop: 18 }}
        />

        <Text style={styles.loadingTitle}>
          Pilo prépare ton espace...
        </Text>

        <Text style={styles.loadingText}>
          Tes économies et tes missions arrivent.
        </Text>
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
          onRefresh={rafraichir}
          tintColor="#22c55e"
          colors={["#22c55e"]}
        />
      }
    >
      {/* HEADER */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setDrawerOpen(true)}
        >
          <Text style={styles.menuButtonText}>☰</Text>
        </TouchableOpacity>

        <View style={styles.headerBrand}>
          <Text style={styles.brand}>
            PiloEco
          </Text>

          <Text style={styles.tagline}>
            Ton copilote d'économies
          </Text>
        </View>

        <View
          style={[
            styles.premiumStatusDot,
            premiumActif &&
              styles.premiumStatusDotActive,
          ]}
        >
          <Text style={styles.premiumStatusDotText}>
            {premiumActif ? "💎" : "🐦"}
          </Text>
        </View>
      </View>

      {/* HERO */}

      <View style={styles.heroCard}>
        <Text style={styles.heroLabel}>
          🐦 TON COPILOTE D'ÉCONOMIES
        </Text>

        <Text style={styles.heroTitle}>
          {displayName
            ? `Bonjour ${displayName} 👋`
            : "Bonjour 👋"}
        </Text>

        <View style={styles.savingRow}>
          <Text style={styles.savingAmount}>
            {economieAnnuelleAffichee.toLocaleString(
              "fr-FR"
            )}{" "}
            €
          </Text>

          <Text style={styles.savingText}>
            / an suivis par Pilo
          </Text>
        </View>

        <View style={styles.situationCard}>
          <Text style={styles.situationEmoji}>
            {piloSituation.emoji}
          </Text>

          <View style={styles.situationContent}>
            <Text style={styles.situationTitle}>
              {piloSituation.title}
            </Text>

            <Text style={styles.situationText}>
              {piloSituation.message}
            </Text>
          </View>
        </View>

        <View style={styles.heroTags}>
          <View style={styles.heroTag}>
            <Text style={styles.heroTagText}>
              Niveau {niveau} · {titreNiveau}
            </Text>
          </View>

          <View style={styles.heroTag}>
            <Text style={styles.heroTagText}>
              {missionsTerminees.length} terminées
            </Text>
          </View>

          <View style={styles.heroTag}>
            <Text style={styles.heroTagText}>
              Score {scoreProgression}/100
            </Text>
          </View>
        </View>
      </View>

      {/* PREMIUM */}

      {premiumActif ? (
        <View style={styles.premiumActiveCard}>
          <Text style={styles.premiumLabel}>
            💎 PILO PREMIUM ACTIF
          </Text>

          <Text style={styles.premiumTitle}>
            Pilo veille pour toi
          </Text>

          <Text style={styles.premiumDescription}>
            Monitoring, alertes et PiloLife sont actifs.
          </Text>

          <View style={styles.premiumButtons}>
            <Link
              href="/monitoring"
              asChild
            >
              <TouchableOpacity
                style={styles.premiumPrimaryButton}
              >
                <Text
                  style={
                    styles.premiumPrimaryButtonText
                  }
                >
                  📊 Monitoring
                </Text>
              </TouchableOpacity>
            </Link>

            <Link
              href="/pilolife"
              asChild
            >
              <TouchableOpacity
                style={styles.premiumSecondaryButton}
              >
                <Text
                  style={
                    styles.premiumSecondaryButtonText
                  }
                >
                  🌿 PiloLife
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      ) : (
        <View style={styles.premiumCard}>
          <Text style={styles.premiumLabel}>
            💎 PILO PREMIUM
          </Text>

          <Text style={styles.premiumTitle}>
            Pilo veille même quand tu n'es pas là
          </Text>

          <View style={styles.badges}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                📊 Monitoring
              </Text>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                🔔 Alertes
              </Text>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                📅 Échéances
              </Text>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                🌿 PiloLife
              </Text>
            </View>
          </View>

          <Link href="/premium" asChild>
            <TouchableOpacity
              style={styles.discoverButton}
            >
              <Text
                style={styles.discoverButtonText}
              >
                Découvrir Premium →
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}

      {/* MISSION PILO */}

      <View style={styles.missionPiloCard}>
        <Text style={styles.missionPiloLabel}>
          🐦 LA MISSION DE PILO
        </Text>

        <Text style={styles.missionPiloTitle}>
          Reprendre du pouvoir d'achat,
          simplement.
        </Text>

        <Text style={styles.missionPiloText}>
          Pilo t'aide à identifier des économies et
          te propose des solutions adaptées. Tu gardes
          toujours la main sur tes démarches.
        </Text>

        <View style={styles.flowGrid}>
          <View style={styles.flowGreen}>
            <Text style={styles.flowIcon}>
              🔎
            </Text>

            <Text style={styles.flowGreenText}>
              Analyse
            </Text>
          </View>

          <View style={styles.flowGreen}>
            <Text style={styles.flowIcon}>
              🎯
            </Text>

            <Text style={styles.flowGreenText}>
              Missions
            </Text>
          </View>

          <View style={styles.flowPurple}>
            <Text style={styles.flowIcon}>
              📊
            </Text>

            <Text style={styles.flowPurpleText}>
              Suivi
            </Text>
          </View>

          <View style={styles.flowPurple}>
            <Text style={styles.flowIcon}>
              🌿
            </Text>

            <Text style={styles.flowPurpleText}>
              Projets
            </Text>
          </View>
        </View>
      </View>

      {/* ACTIONS */}

      <Text style={styles.sectionTitle}>
        Tes actions
      </Text>

      <View style={styles.actionRow}>
        <Link href="/analyse" asChild>
          <TouchableOpacity
            style={styles.actionCard}
          >
            <Text style={styles.actionIcon}>
              🔎
            </Text>

            <Text style={styles.actionTitle}>
              Analyse
            </Text>

            <Text style={styles.actionText}>
              Mettre mon budget à jour
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/missions" asChild>
          <TouchableOpacity
            style={styles.actionCard}
          >
            <Text style={styles.actionIcon}>
              🎯
            </Text>

            <Text style={styles.actionTitle}>
              Mes missions
            </Text>

            <Text style={styles.actionText}>
              Voir les opportunités
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.actionRow}>
        <Link href="/monitoring" asChild>
          <TouchableOpacity
            style={styles.actionCard}
          >
            <Text style={styles.actionIcon}>
              📊
            </Text>

            <Text style={styles.actionTitle}>
              Monitoring
            </Text>

            {!premiumActif && (
              <Text style={styles.premiumMini}>
                PREMIUM
              </Text>
            )}

            <Text style={styles.actionText}>
              Suivre mes contrats
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/pilolife" asChild>
          <TouchableOpacity
            style={styles.actionCard}
          >
            <Text style={styles.actionIcon}>
              🌿
            </Text>

            <Text style={styles.actionTitle}>
              PiloLife
            </Text>

            {!premiumActif && (
              <Text style={styles.premiumMini}>
                PREMIUM
              </Text>
            )}

            <Text style={styles.actionText}>
              Faire avancer mes projets
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* PRIORITE */}

      {missionPrioritaire && (
        <View style={styles.priorityCard}>
          <Text style={styles.priorityLabel}>
            🎯 TA PRIORITÉ
          </Text>

          <Text style={styles.priorityTitle}>
            {missionPrioritaire.title}
          </Text>

          {Number(
            missionPrioritaire.saving || 0
          ) > 0 && (
            <Text style={styles.prioritySaving}>
              Jusqu'à{" "}
              {Number(
                missionPrioritaire.saving || 0
              ).toLocaleString("fr-FR")}{" "}
              € / an
            </Text>
          )}

          <Link href="/missions" asChild>
            <TouchableOpacity
              style={styles.priorityButton}
            >
              <Text
                style={styles.priorityButtonText}
              >
                Voir mes missions →
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}

      {/* PROGRESSION */}

      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <View>
            <Text style={styles.progressLabel}>
              TA PROGRESSION
            </Text>

            <Text style={styles.progressTitle}>
              Tu avances avec Pilo
            </Text>
          </View>

          <Text style={styles.progressPercent}>
            {scoreProgression}%
          </Text>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${scoreProgression}%`,
              },
            ]}
          />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>
              Économies validées
            </Text>

            <Text style={styles.statGreen}>
              {economiesRealisees.toLocaleString(
                "fr-FR"
              )}{" "}
              €
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>
              Potentiel restant
            </Text>

            <Text style={styles.statWhite}>
              {potentielRestant.toLocaleString(
                "fr-FR"
              )}{" "}
              €
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>
              Missions
            </Text>

            <Text style={styles.statWhite}>
              {missionsTerminees.length}/
              {missions.length}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.refreshHint}>
        Tire l'écran vers le bas pour actualiser les
        données.
      </Text>

      <View style={{ height: 40 }} />
      </ScrollView>

      <PiloDrawer
        visible={drawerOpen}
        premium={premiumActif}
        onClose={() => setDrawerOpen(false)}
        onLogout={() => void deconnexion()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#020617",
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 18,
  },

  loadingScreen: {
    flex: 1,
    backgroundColor: "#020617",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  loadingPilo: {
    fontSize: 62,
  },

  loadingTitle: {
    marginTop: 18,
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
  },

  loadingText: {
    marginTop: 8,
    textAlign: "center",
    color: "#64748b",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  brand: {
    color: "#22c55e",
    fontSize: 29,
    fontWeight: "900",
  },

  tagline: {
    marginTop: 2,
    color: "#64748b",
    fontSize: 11,
  },

  menuButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  menuButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
  },

  headerBrand: {
    flex: 1,
    marginLeft: 11,
  },

  premiumStatusDot: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  premiumStatusDotActive: {
    borderColor: "#7e22ce",
    backgroundColor: "#17112b",
  },

  premiumStatusDotText: {
    fontSize: 18,
  },

  logoutButton: {
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },

  logoutText: {
    color: "#94a3b8",
    fontSize: 10,
    fontWeight: "800",
  },

  heroCard: {
    padding: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#14532d",
    backgroundColor: "#0f172a",
  },

  heroLabel: {
    color: "#22c55e",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.8,
  },

  heroTitle: {
    marginTop: 9,
    color: "#ffffff",
    fontSize: 29,
    fontWeight: "900",
  },

  savingRow: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "flex-end",
    flexWrap: "wrap",
  },

  savingAmount: {
    color: "#22c55e",
    fontSize: 38,
    fontWeight: "900",
  },

  savingText: {
    paddingBottom: 5,
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "700",
  },

  situationCard: {
    marginTop: 17,
    padding: 14,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#020617",
    flexDirection: "row",
    gap: 10,
  },

  situationEmoji: {
    fontSize: 20,
  },

  situationContent: {
    flex: 1,
  },

  situationTitle: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "900",
  },

  situationText: {
    marginTop: 4,
    color: "#94a3b8",
    fontSize: 11,
    lineHeight: 17,
  },

  heroTags: {
    marginTop: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },

  heroTag: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#020617",
  },

  heroTagText: {
    color: "#cbd5e1",
    fontSize: 9,
    fontWeight: "800",
  },

  premiumCard: {
    marginTop: 15,
    padding: 19,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#7e22ce",
    backgroundColor: "#17112b",
  },

  premiumActiveCard: {
    marginTop: 15,
    padding: 19,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#a855f7",
    backgroundColor: "#17112b",
  },

  premiumLabel: {
    color: "#c084fc",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.8,
  },

  premiumTitle: {
    marginTop: 7,
    color: "#ffffff",
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "900",
  },

  premiumDescription: {
    marginTop: 7,
    color: "#c4b5fd",
    fontSize: 11,
  },

  badges: {
    marginTop: 13,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 50,
    backgroundColor: "#3b0764",
  },

  badgeText: {
    color: "#e9d5ff",
    fontSize: 9,
    fontWeight: "800",
  },

  discoverButton: {
    marginTop: 15,
    alignItems: "center",
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: "#a855f7",
  },

  discoverButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "900",
  },

  premiumButtons: {
    marginTop: 15,
    flexDirection: "row",
    gap: 8,
  },

  premiumPrimaryButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 13,
    backgroundColor: "#a855f7",
  },

  premiumPrimaryButtonText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "900",
  },

  premiumSecondaryButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#7e22ce",
  },

  premiumSecondaryButtonText: {
    color: "#e9d5ff",
    fontSize: 11,
    fontWeight: "900",
  },

  missionPiloCard: {
    marginTop: 15,
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#166534",
    backgroundColor: "#082f20",
  },

  missionPiloLabel: {
    color: "#4ade80",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.7,
  },

  missionPiloTitle: {
    marginTop: 7,
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "900",
    lineHeight: 25,
  },

  missionPiloText: {
    marginTop: 8,
    color: "#cbd5e1",
    fontSize: 11,
    lineHeight: 18,
  },

  flowGrid: {
    marginTop: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },

  flowGreen: {
    width: "48%",
    padding: 10,
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "#14532d",
  },

  flowPurple: {
    width: "48%",
    padding: 10,
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "#3b0764",
  },

  flowIcon: {
    fontSize: 18,
  },

  flowGreenText: {
    marginTop: 3,
    color: "#bbf7d0",
    fontSize: 10,
    fontWeight: "900",
  },

  flowPurpleText: {
    marginTop: 3,
    color: "#e9d5ff",
    fontSize: 10,
    fontWeight: "900",
  },

  sectionTitle: {
    marginTop: 22,
    marginBottom: 10,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
  },

  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },

  actionCard: {
    flex: 1,
    minHeight: 120,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  actionIcon: {
    fontSize: 23,
  },

  actionTitle: {
    marginTop: 9,
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
  },

  actionText: {
    marginTop: 5,
    color: "#64748b",
    fontSize: 10,
    lineHeight: 15,
  },

  premiumMini: {
    marginTop: 4,
    alignSelf: "flex-start",
    color: "#c084fc",
    fontSize: 7,
    fontWeight: "900",
  },

  priorityCard: {
    marginTop: 6,
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#166534",
    backgroundColor: "#0f172a",
  },

  priorityLabel: {
    color: "#22c55e",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.8,
  },

  priorityTitle: {
    marginTop: 8,
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "900",
  },

  prioritySaving: {
    marginTop: 6,
    color: "#86efac",
    fontSize: 12,
    fontWeight: "800",
  },

  priorityButton: {
    marginTop: 14,
    paddingVertical: 12,
    borderRadius: 13,
    alignItems: "center",
    backgroundColor: "#22c55e",
  },

  priorityButtonText: {
    color: "#020617",
    fontSize: 11,
    fontWeight: "900",
  },

  progressCard: {
    marginTop: 15,
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  progressLabel: {
    color: "#64748b",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.8,
  },

  progressTitle: {
    marginTop: 5,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
  },

  progressPercent: {
    color: "#22c55e",
    fontSize: 12,
    fontWeight: "900",
  },

  progressTrack: {
    marginTop: 14,
    height: 7,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "#1e293b",
  },

  progressFill: {
    height: "100%",
    borderRadius: 50,
    backgroundColor: "#22c55e",
  },

  statsRow: {
    marginTop: 13,
    flexDirection: "row",
    gap: 6,
  },

  statCard: {
    flex: 1,
    padding: 10,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#020617",
  },

  statLabel: {
    color: "#64748b",
    fontSize: 7,
    fontWeight: "700",
  },

  statGreen: {
    marginTop: 4,
    color: "#22c55e",
    fontSize: 14,
    fontWeight: "900",
  },

  statWhite: {
    marginTop: 4,
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
  },

  refreshHint: {
    marginTop: 14,
    textAlign: "center",
    color: "#475569",
    fontSize: 9,
  },
});