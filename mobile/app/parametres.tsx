import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Linking,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import {
    defaultPreferences,
    deleteAccountData,
    getAccountProfile,
    signOutAccount,
    updateAccountEmail,
    updateAccountPassword,
    updateAccountPreferences,
    updateAccountProfile,
    type AccountPreferences,
    type AccountProfile,
    type NotificationFrequency,
} from "../lib/account.service";

function formatCurrency(value: number) {
  return `${Math.round(value).toLocaleString("fr-FR")} €`;
}

function formatDate(value: string | null) {
  if (!value) {
    return "Date inconnue";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date inconnue";
  }

  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getInitials(
  firstName: string,
  lastName: string
) {
  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`
      .trim()
      .toUpperCase();

  return initials || "P";
}

function getLevelProgress(
  xp: number,
  level: number
) {
  const levelThresholds: Record<
    number,
    {
      current: number;
      next: number;
    }
  > = {
    1: {
      current: 0,
      next: 100,
    },
    2: {
      current: 100,
      next: 300,
    },
    3: {
      current: 300,
      next: 700,
    },
    4: {
      current: 700,
      next: 1200,
    },
    5: {
      current: 1200,
      next: 2000,
    },
  };

  const threshold =
    levelThresholds[level] ??
    levelThresholds[5];

  const range =
    threshold.next - threshold.current;

  const progress =
    ((xp - threshold.current) / range) * 100;

  return Math.max(
    0,
    Math.min(100, progress)
  );
}

type ToggleRowProps = {
  label: string;
  description: string;
  value: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
};

function ToggleRow({
  label,
  description,
  value,
  disabled = false,
  onChange,
}: ToggleRowProps) {
  return (
    <View
      style={[
        styles.toggleRow,
        disabled && styles.toggleRowDisabled,
      ]}
    >
      <View style={styles.toggleTextWrap}>
        <Text style={styles.toggleLabel}>
          {label}
        </Text>

        <Text style={styles.toggleDescription}>
          {description}
        </Text>
      </View>

      <Switch
        value={value}
        disabled={disabled}
        onValueChange={onChange}
        trackColor={{
          false: "#334155",
          true: "#16a34a",
        }}
        thumbColor={
          value ? "#22c55e" : "#cbd5e1"
        }
      />
    </View>
  );
}

const frequencyOptions: {
  value: NotificationFrequency;
  label: string;
}[] = [
  {
    value: "instant",
    label: "Dès qu'une alerte importante est détectée",
  },
  {
    value: "daily",
    label: "Un résumé par jour",
  },
  {
    value: "weekly",
    label: "Un résumé par semaine",
  },
  {
    value: "never",
    label: "Aucun email",
  },
];

export default function ParametresScreen() {
  const [profile, setProfile] =
    useState<AccountProfile | null>(null);

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [preferences, setPreferences] =
    useState<AccountPreferences>(
      defaultPreferences
    );

  const [password, setPassword] =
    useState("");

  const [
    passwordConfirmation,
    setPasswordConfirmation,
  ] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const levelProgress = useMemo(
    () =>
      getLevelProgress(
        profile?.xp ?? 0,
        profile?.level ?? 1
      ),
    [profile]
  );

  async function loadAccount() {
    try {
      setLoading(true);

      const data =
        await getAccountProfile();

      setProfile(data);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setPreferences(data.preferences);
    } catch (error) {
      Alert.alert(
        "Erreur",
        error instanceof Error
          ? error.message
          : "Impossible de charger ton compte."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadAccount();
  }, []);

  function showSuccess(message: string) {
    Alert.alert(
      "C’est enregistré",
      message
    );
  }

  async function saveProfile() {
    try {
      setSaving(true);

      await updateAccountProfile({
        firstName,
        lastName,
        avatarUrl:
          profile?.avatarUrl ?? null,
      });

      await loadAccount();

      showSuccess(
        "Ton profil a bien été mis à jour."
      );
    } catch (error) {
      Alert.alert(
        "Erreur",
        error instanceof Error
          ? error.message
          : "Impossible de modifier ton profil."
      );
    } finally {
      setSaving(false);
    }
  }

  async function savePreferences() {
    try {
      setSaving(true);

      await updateAccountPreferences(
        preferences
      );

      setProfile((current) =>
        current
          ? {
              ...current,
              preferences,
            }
          : current
      );

      showSuccess(
        "Tes préférences ont été enregistrées."
      );
    } catch (error) {
      Alert.alert(
        "Erreur",
        error instanceof Error
          ? error.message
          : "Impossible d’enregistrer les préférences."
      );
    } finally {
      setSaving(false);
    }
  }

  async function saveEmail() {
    try {
      setSaving(true);

      await updateAccountEmail(email);

      showSuccess(
        "Un email de confirmation peut être nécessaire pour valider la nouvelle adresse."
      );
    } catch (error) {
      Alert.alert(
        "Erreur",
        error instanceof Error
          ? error.message
          : "Impossible de modifier l’adresse email."
      );
    } finally {
      setSaving(false);
    }
  }

  async function savePassword() {
    try {
      setSaving(true);

      await updateAccountPassword(
        password,
        passwordConfirmation
      );

      setPassword("");
      setPasswordConfirmation("");

      showSuccess(
        "Ton mot de passe a bien été modifié."
      );
    } catch (error) {
      Alert.alert(
        "Erreur",
        error instanceof Error
          ? error.message
          : "Impossible de modifier le mot de passe."
      );
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    try {
      await signOutAccount();
      router.replace("/login" as never);
    } catch (error) {
      Alert.alert(
        "Erreur",
        error instanceof Error
          ? error.message
          : "Impossible de te déconnecter."
      );
    }
  }

  function confirmLogout() {
    Alert.alert(
      "Déconnexion",
      "Veux-tu vraiment te déconnecter ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Se déconnecter",
          style: "destructive",
          onPress: () => {
            void logout();
          },
        },
      ]
    );
  }

  function confirmDeleteStep2() {
    Alert.alert(
      "Dernière confirmation",
      "Cette action supprimera les données PiloEco liées à ton compte. Continuer ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer mes données",
          style: "destructive",
          onPress: async () => {
            try {
              setSaving(true);
              await deleteAccountData();
              router.replace("/login" as never);
            } catch (error) {
              Alert.alert(
                "Erreur",
                error instanceof Error
                  ? error.message
                  : "Impossible de supprimer tes données."
              );
            } finally {
              setSaving(false);
            }
          },
        },
      ]
    );
  }

  function confirmDelete() {
    Alert.alert(
      "Zone sensible",
      "La suppression des données est irréversible. Veux-tu continuer ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Continuer",
          style: "destructive",
          onPress: confirmDeleteStep2,
        },
      ]
    );
  }

  async function openWeb(path: string) {
    const url =
      `https://piloeco.com${path}`;

    const supported =
      await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator
          size="large"
          color="#22c55e"
        />

        <Text style={styles.loadingText}>
          Chargement de ton compte...
        </Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.loadingScreen}>
        <Text style={styles.errorIcon}>
          ⚠️
        </Text>

        <Text style={styles.errorTitle}>
          Impossible de charger ton compte
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            void loadAccount()
          }
        >
          <Text style={styles.primaryButtonText}>
            Réessayer
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const averageSaving =
    profile.completedMissions > 0
      ? profile.totalSavings /
        profile.completedMissions
      : 0;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>
          ← Retour
        </Text>
      </TouchableOpacity>

      <View style={styles.hero}>
        <Text style={styles.kicker}>
          👤 MON COMPTE PILOECO
        </Text>

        <Text style={styles.heroTitle}>
          Bonjour {profile.firstName || "à toi"} 👋
        </Text>

        <Text style={styles.heroText}>
          Gère ton profil, ta sécurité, tes alertes
          et ton abonnement depuis un seul endroit.
        </Text>

        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {profile.premium
                ? "💎 PiloEco Premium"
                : "🌱 Offre gratuite"}
            </Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              Niveau {profile.level}
            </Text>
          </View>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {getInitials(
              profile.firstName,
              profile.lastName
            )}
          </Text>
        </View>

        <Text style={styles.memberText}>
          Membre depuis {formatDate(profile.createdAt)}
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>
            Économies réalisées
          </Text>
          <Text style={styles.statGreen}>
            {formatCurrency(
              profile.totalSavings
            )}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>
            Missions terminées
          </Text>
          <Text style={styles.statValue}>
            {profile.completedMissions}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>
            Expérience
          </Text>
          <Text style={styles.statValue}>
            {profile.xp} XP
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>
            Badges débloqués
          </Text>
          <Text style={styles.statValue}>
            {profile.badges.length}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.sectionKicker}>
              PROGRESSION
            </Text>
            <Text style={styles.sectionTitle}>
              Niveau {profile.level}
            </Text>
          </View>

          <Text style={styles.progressValue}>
            {Math.round(levelProgress)} %
          </Text>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${levelProgress}%`,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionKicker}>
          MES RÉSULTATS
        </Text>

        <Text style={styles.sectionTitle}>
          L’impact de mes économies
        </Text>

        <View style={styles.insightBox}>
          <Text style={styles.insightLabel}>
            Moyenne économisée
          </Text>
          <Text style={styles.insightValue}>
            {formatCurrency(averageSaving)}
          </Text>
          <Text style={styles.insightHint}>
            par mission terminée
          </Text>
        </View>

        <Text style={styles.badgesTitle}>
          🏅 Mes réussites
        </Text>

        {profile.badges.length > 0 ? (
          profile.badges.map((badge) => (
            <View
              key={badge}
              style={styles.badgeItem}
            >
              <Text style={styles.badgeItemText}>
                🏅 {badge}
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyBadgeCard}>
            <Text style={styles.emptyBadgeIcon}>
              🏅
            </Text>
            <Text style={styles.emptyBadgeTitle}>
              Ton premier badge t’attend
            </Text>
            <Text style={styles.emptyBadgeText}>
              Termine une mission ou franchis un nouveau
              cap d’économie pour le débloquer.
            </Text>
          </View>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionKicker}>
          PROFIL
        </Text>

        <Text style={styles.sectionTitle}>
          Mes informations
        </Text>

        <Text style={styles.inputLabel}>
          Prénom
        </Text>

        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Prénom"
          placeholderTextColor="#475569"
          style={styles.input}
        />

        <Text style={styles.inputLabel}>
          Nom
        </Text>

        <TextInput
          value={lastName}
          onChangeText={setLastName}
          placeholder="Nom"
          placeholderTextColor="#475569"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.primaryButton}
          disabled={saving}
          onPress={() =>
            void saveProfile()
          }
        >
          <Text style={styles.primaryButtonText}>
            Enregistrer mon profil
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.premiumCard}>
        <Text style={styles.premiumKicker}>
          ABONNEMENT
        </Text>

        <Text style={styles.sectionTitle}>
          {profile.premium
            ? "PiloEco Premium"
            : "Découvre Premium"}
        </Text>

        <Text style={styles.cardText}>
          {profile.premium
            ? "Ton compte profite du Monitoring, de PiloLife et de toutes les fonctionnalités Premium."
            : "Active le Monitoring et transforme tes économies en projets de vie."}
        </Text>

        <Text style={styles.checkText}>
          ✓ Surveillance de tes contrats
        </Text>
        <Text style={styles.checkText}>
          ✓ Alertes importantes
        </Text>
        <Text style={styles.checkText}>
          ✓ Accès complet à PiloLife
        </Text>
        <Text style={styles.checkText}>
          ✓ Recommandations personnalisées
        </Text>

        <TouchableOpacity
          style={styles.premiumButton}
          onPress={() =>
            router.push(
              profile.premium
                ? "/monitoring" as never
                : "/premium" as never
            )
          }
        >
          <Text style={styles.premiumButtonText}>
            {profile.premium
              ? "Ouvrir Monitoring"
              : "Passer à Premium"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionKicker}>
          NOTIFICATIONS
        </Text>

        <Text style={styles.sectionTitle}>
          Choisir mes alertes
        </Text>

        <Text style={styles.cardText}>
          Tu gardes le contrôle sur les messages reçus
          par PiloEco.
        </Text>

        <ToggleRow
          label="Notifications PiloEco"
          description="Activer les notifications générales dans l’application."
          value={
            preferences.notificationsEnabled
          }
          onChange={(value) =>
            setPreferences((current) => ({
              ...current,
              notificationsEnabled: value,
            }))
          }
        />

        <ToggleRow
          label="Notifications par email"
          description="Recevoir les alertes importantes sur ton adresse email."
          value={
            preferences.emailNotificationsEnabled
          }
          onChange={(value) =>
            setPreferences((current) => ({
              ...current,
              emailNotificationsEnabled: value,
            }))
          }
        />

        <ToggleRow
          label="Alertes Monitoring"
          description="Être prévenu lorsqu’une meilleure offre ou une hausse est détectée."
          value={
            preferences.monitoringNotificationsEnabled
          }
          disabled={
            !preferences.notificationsEnabled
          }
          onChange={(value) =>
            setPreferences((current) => ({
              ...current,
              monitoringNotificationsEnabled: value,
            }))
          }
        />

        <ToggleRow
          label="Nouvelles missions"
          description="Recevoir les nouvelles opportunités d’économie détectées."
          value={
            preferences.missionNotificationsEnabled
          }
          disabled={
            !preferences.notificationsEnabled
          }
          onChange={(value) =>
            setPreferences((current) => ({
              ...current,
              missionNotificationsEnabled: value,
            }))
          }
        />

        <ToggleRow
          label="Progression PiloLife"
          description="Recevoir les étapes importantes de ton objectif principal."
          value={
            preferences.piloLifeNotificationsEnabled
          }
          disabled={
            !preferences.notificationsEnabled
          }
          onChange={(value) =>
            setPreferences((current) => ({
              ...current,
              piloLifeNotificationsEnabled: value,
            }))
          }
        />

        <ToggleRow
          label="Conseils et nouveautés"
          description="Recevoir occasionnellement les nouveautés et astuces PiloEco."
          value={
            preferences.marketingEmailsEnabled
          }
          disabled={
            !preferences.emailNotificationsEnabled
          }
          onChange={(value) =>
            setPreferences((current) => ({
              ...current,
              marketingEmailsEnabled: value,
            }))
          }
        />

        <Text style={styles.inputLabel}>
          Fréquence des emails
        </Text>

        <View style={styles.frequencyWrap}>
          {frequencyOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.frequencyOption,
                preferences.notificationFrequency ===
                  option.value &&
                  styles.frequencyOptionActive,
              ]}
              disabled={
                !preferences.emailNotificationsEnabled
              }
              onPress={() =>
                setPreferences((current) => ({
                  ...current,
                  notificationFrequency:
                    option.value,
                }))
              }
            >
              <Text
                style={[
                  styles.frequencyText,
                  preferences.notificationFrequency ===
                    option.value &&
                    styles.frequencyTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          disabled={saving}
          onPress={() =>
            void savePreferences()
          }
        >
          <Text style={styles.primaryButtonText}>
            Enregistrer mes préférences
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.blueKicker}>
          CONNEXION
        </Text>

        <Text style={styles.sectionTitle}>
          Adresse email
        </Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor="#475569"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.secondaryButton}
          disabled={saving}
          onPress={() =>
            void saveEmail()
          }
        >
          <Text style={styles.secondaryButtonText}>
            Modifier mon email
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.blueKicker}>
          SÉCURITÉ
        </Text>

        <Text style={styles.sectionTitle}>
          Mot de passe
        </Text>

        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Nouveau mot de passe"
          placeholderTextColor="#475569"
          style={styles.input}
        />

        <TextInput
          value={passwordConfirmation}
          onChangeText={
            setPasswordConfirmation
          }
          secureTextEntry
          placeholder="Confirmer le mot de passe"
          placeholderTextColor="#475569"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.secondaryButton}
          disabled={saving}
          onPress={() =>
            void savePassword()
          }
        >
          <Text style={styles.secondaryButtonText}>
            Modifier mon mot de passe
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickGrid}>
        <TouchableOpacity
          style={styles.quickCard}
          onPress={() =>
            void openWeb("/parrainage")
          }
        >
          <Text style={styles.quickIcon}>
            🎁
          </Text>
          <Text style={styles.quickTitle}>
            Parrainage
          </Text>
          <Text style={styles.quickLink}>
            Découvrir →
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickCard}
          onPress={() =>
            void openWeb("/support")
          }
        >
          <Text style={styles.quickIcon}>
            💬
          </Text>
          <Text style={styles.quickTitle}>
            Aide et support
          </Text>
          <Text style={styles.quickLink}>
            Contacter →
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionKicker}>
          📄 INFORMATIONS LÉGALES
        </Text>

        <TouchableOpacity
          style={styles.legalRow}
          onPress={() =>
            void openWeb("/cgu")
          }
        >
          <Text style={styles.legalText}>
            Conditions générales
          </Text>
          <Text style={styles.chevron}>
            ›
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.legalRow}
          onPress={() =>
            void openWeb("/confidentialite")
          }
        >
          <Text style={styles.legalText}>
            Politique de confidentialité
          </Text>
          <Text style={styles.chevron}>
            ›
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.legalRow}
          onPress={() =>
            void openWeb("/mentions-legales")
          }
        >
          <Text style={styles.legalText}>
            Mentions légales
          </Text>
          <Text style={styles.chevron}>
            ›
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dangerCard}>
        <Text style={styles.dangerKicker}>
          ZONE SENSIBLE
        </Text>

        <Text style={styles.sectionTitle}>
          Gestion du compte
        </Text>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={confirmLogout}
        >
          <Text style={styles.logoutText}>
            Se déconnecter
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          disabled={saving}
          onPress={confirmDelete}
        >
          <Text style={styles.deleteText}>
            Supprimer mes données
          </Text>
        </TouchableOpacity>

        <Text style={styles.dangerHint}>
          La suppression efface les données PiloEco liées
          à ton compte. La suppression complète de
          l’utilisateur Supabase nécessite une fonction
          serveur sécurisée.
        </Text>
      </View>

      <Text style={styles.footer}>
        PiloEco • Ton copilote pour une vie moins chère
      </Text>

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#020617",
  },

  content: {
    padding: 20,
    paddingTop: 55,
  },

  loadingScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#020617",
    padding: 30,
  },

  loadingText: {
    marginTop: 14,
    color: "#94a3b8",
    fontWeight: "700",
  },

  errorIcon: {
    fontSize: 42,
  },

  errorTitle: {
    marginTop: 14,
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
  },

  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
  },

  backText: {
    color: "#22c55e",
    fontWeight: "900",
  },

  hero: {
    marginTop: 12,
    padding: 22,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#166534",
    backgroundColor: "#07111f",
  },

  kicker: {
    color: "#22c55e",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.7,
  },

  heroTitle: {
    marginTop: 10,
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "900",
  },

  heroText: {
    marginTop: 8,
    color: "#cbd5e1",
    fontSize: 12,
    lineHeight: 19,
  },

  badgeRow: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "#0f172a",
  },

  badgeText: {
    color: "#e2e8f0",
    fontSize: 9,
    fontWeight: "900",
  },

  avatar: {
    marginTop: 18,
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 3,
    borderColor: "#22c55e",
    backgroundColor: "#052e16",
  },

  avatarText: {
    color: "#86efac",
    fontSize: 24,
    fontWeight: "900",
  },

  memberText: {
    marginTop: 10,
    color: "#64748b",
    textAlign: "center",
    fontSize: 10,
  },

  statsGrid: {
    marginTop: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  statCard: {
    width: "48%",
    marginTop: 10,
    padding: 15,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  statLabel: {
    color: "#94a3b8",
    fontSize: 9,
  },

  statValue: {
    marginTop: 5,
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "900",
  },

  statGreen: {
    marginTop: 5,
    color: "#22c55e",
    fontSize: 19,
    fontWeight: "900",
  },

  card: {
    marginTop: 16,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  premiumCard: {
    marginTop: 16,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#78350f",
    backgroundColor: "#171324",
  },

  dangerCard: {
    marginTop: 16,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#7f1d1d",
    backgroundColor: "#12070b",
  },

  rowBetween: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  sectionKicker: {
    color: "#22c55e",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.4,
  },

  premiumKicker: {
    color: "#fbbf24",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.4,
  },

  blueKicker: {
    color: "#60a5fa",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.4,
  },

  dangerKicker: {
    color: "#f87171",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.4,
  },

  sectionTitle: {
    marginTop: 5,
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "900",
  },

  cardText: {
    marginTop: 8,
    color: "#94a3b8",
    fontSize: 11,
    lineHeight: 18,
  },

  progressValue: {
    color: "#ffffff",
    fontWeight: "900",
  },

  progressTrack: {
    marginTop: 14,
    height: 8,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "#1e293b",
  },

  progressBar: {
    height: "100%",
    borderRadius: 50,
    backgroundColor: "#22c55e",
  },

  insightBox: {
    marginTop: 14,
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#166534",
    backgroundColor: "#052e16",
  },

  insightLabel: {
    color: "#bbf7d0",
    fontSize: 9,
    fontWeight: "800",
  },

  insightValue: {
    marginTop: 4,
    color: "#22c55e",
    fontSize: 23,
    fontWeight: "900",
  },

  insightHint: {
    marginTop: 2,
    color: "#86efac",
    fontSize: 9,
  },

  badgesTitle: {
    marginTop: 18,
    color: "#ffffff",
    fontWeight: "900",
  },

  badgeItem: {
    marginTop: 8,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "#111827",
  },

  badgeItemText: {
    color: "#e2e8f0",
    fontWeight: "800",
  },

  emptyBadgeCard: {
    marginTop: 10,
    padding: 18,
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#334155",
  },

  emptyBadgeIcon: {
    fontSize: 28,
  },

  emptyBadgeTitle: {
    marginTop: 8,
    color: "#ffffff",
    fontWeight: "900",
  },

  emptyBadgeText: {
    marginTop: 5,
    color: "#64748b",
    textAlign: "center",
    fontSize: 9,
    lineHeight: 14,
  },

  inputLabel: {
    marginTop: 14,
    marginBottom: 6,
    color: "#cbd5e1",
    fontSize: 10,
    fontWeight: "800",
  },

  input: {
    minHeight: 48,
    marginBottom: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "#020617",
    color: "#ffffff",
  },

  primaryButton: {
    marginTop: 12,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#22c55e",
  },

  primaryButtonText: {
    color: "#020617",
    fontWeight: "900",
  },

  premiumButton: {
    marginTop: 14,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#fbbf24",
  },

  premiumButtonText: {
    color: "#1c1917",
    fontWeight: "900",
  },

  secondaryButton: {
    marginTop: 10,
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1d4ed8",
    backgroundColor: "#172554",
  },

  secondaryButtonText: {
    color: "#93c5fd",
    fontWeight: "900",
  },

  checkText: {
    marginTop: 8,
    color: "#cbd5e1",
    fontSize: 10,
  },

  toggleRow: {
    marginTop: 10,
    padding: 13,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#020617",
  },

  toggleRowDisabled: {
    opacity: 0.45,
  },

  toggleTextWrap: {
    flex: 1,
    paddingRight: 12,
  },

  toggleLabel: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "900",
  },

  toggleDescription: {
    marginTop: 3,
    color: "#64748b",
    fontSize: 9,
    lineHeight: 13,
  },

  frequencyWrap: {
    gap: 7,
  },

  frequencyOption: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "#020617",
  },

  frequencyOptionActive: {
    borderColor: "#22c55e",
    backgroundColor: "#052e16",
  },

  frequencyText: {
    color: "#94a3b8",
    fontSize: 10,
    fontWeight: "700",
  },

  frequencyTextActive: {
    color: "#bbf7d0",
  },

  quickGrid: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  quickCard: {
    width: "48%",
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  quickIcon: {
    fontSize: 25,
  },

  quickTitle: {
    marginTop: 8,
    color: "#ffffff",
    fontWeight: "900",
  },

  quickLink: {
    marginTop: 8,
    color: "#22c55e",
    fontSize: 10,
    fontWeight: "900",
  },

  legalRow: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },

  legalText: {
    color: "#cbd5e1",
    fontSize: 11,
    fontWeight: "800",
  },

  chevron: {
    color: "#475569",
    fontSize: 20,
  },

  logoutButton: {
    marginTop: 14,
    minHeight: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "#0f172a",
  },

  logoutText: {
    color: "#ffffff",
    fontWeight: "900",
  },

  deleteButton: {
    marginTop: 9,
    minHeight: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#7f1d1d",
    backgroundColor: "#450a0a",
  },

  deleteText: {
    color: "#fecaca",
    fontWeight: "900",
  },

  dangerHint: {
    marginTop: 10,
    color: "#64748b",
    fontSize: 8,
    lineHeight: 13,
  },

  footer: {
    marginTop: 28,
    color: "#334155",
    textAlign: "center",
    fontSize: 9,
  },

  bottomSpace: {
    height: 50,
  },
});