"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import AccountInsightsCard from "./components/AccountInsightsCard";

import {
  deleteAccountData,
  getAccountProfile,
  signOutAccount,
  updateAccountEmail,
  updateAccountPassword,
  updateAccountPreferences,
  updateAccountProfile,
  uploadAccountAvatar,
  type AccountPreferences,
  type AccountProfile,
  type NotificationFrequency,
} from "./services/account.service";

type MessageState = {
  type: "success" | "error";
  text: string;
} | null;

type ToggleProps = {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
};

function Toggle({
  label,
  description,
  checked,
  disabled = false,
  onChange,
}: ToggleProps) {
  return (
    <label
      className={`flex items-center justify-between gap-5 rounded-2xl border p-4 transition ${
        disabled
          ? "cursor-not-allowed border-slate-800 bg-slate-950/40 opacity-50"
          : "cursor-pointer border-slate-800 bg-slate-950/70 hover:border-green-500/30"
      }`}
    >
      <span>
        <span className="block font-semibold text-white">
          {label}
        </span>

        <span className="mt-1 block text-sm text-slate-400">
          {description}
        </span>
      </span>

      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) =>
          onChange(event.target.checked)
        }
        className="h-5 w-5 shrink-0 accent-green-500"
      />
    </label>
  );
}

function LoadingScreen() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="animate-pulse space-y-6">
          <div className="h-52 rounded-[2rem] bg-slate-900" />

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="h-96 rounded-[2rem] bg-slate-900" />
            <div className="h-96 rounded-[2rem] bg-slate-900" />
          </div>
        </div>
      </div>
    </main>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string | null) {
  if (!value) {
    return "Date inconnue";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date inconnue";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
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

const emptyPreferences: AccountPreferences = {
  notificationsEnabled: true,
  emailNotificationsEnabled: true,
  monitoringNotificationsEnabled: true,
  missionNotificationsEnabled: true,
  piloLifeNotificationsEnabled: true,
  marketingEmailsEnabled: false,
  notificationFrequency: "instant",
};

export default function AccountSettingsClient() {
  const router = useRouter();

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
      emptyPreferences
    );

  const [password, setPassword] =
    useState("");

  const [
    passwordConfirmation,
    setPasswordConfirmation,
  ] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [savingProfile, setSavingProfile] =
    useState(false);

  const [
    savingPreferences,
    setSavingPreferences,
  ] = useState(false);

  const [savingEmail, setSavingEmail] =
    useState(false);

  const [
    savingPassword,
    setSavingPassword,
  ] = useState(false);

  const [
    uploadingAvatar,
    setUploadingAvatar,
  ] = useState(false);

  const [signingOut, setSigningOut] =
    useState(false);

  const [
    deletingAccount,
    setDeletingAccount,
  ] = useState(false);

  const [message, setMessage] =
    useState<MessageState>(null);

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
      setMessage(null);

      const data =
        await getAccountProfile();

      setProfile(data);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setPreferences(data.preferences);
    } catch (error) {
      console.error(
        "Erreur chargement compte :",
        error
      );

      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Impossible de charger ton compte.",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAccount();
  }, []);

  function showMessage(
    nextMessage: MessageState
  ) {
    setMessage(nextMessage);

    window.setTimeout(() => {
      setMessage(null);
    }, 5000);
  }

  function updatePreference<
    Key extends keyof AccountPreferences
  >(
    key: Key,
    value: AccountPreferences[Key]
  ) {
    setPreferences((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleProfileSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setSavingProfile(true);

      await updateAccountProfile({
        firstName,
        lastName,
        avatarUrl:
          profile?.avatarUrl ?? null,
      });

      setProfile((current) =>
        current
          ? {
              ...current,
              firstName:
                firstName.trim(),
              lastName:
                lastName.trim(),
            }
          : current
      );

      showMessage({
        type: "success",
        text: "Ton profil a bien été mis à jour.",
      });
    } catch (error) {
      showMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Impossible de modifier ton profil.",
      });
    } finally {
      setSavingProfile(false);
    }
  }

  async function handleAvatarChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploadingAvatar(true);

      const avatarUrl =
        await uploadAccountAvatar(file);

      setProfile((current) =>
        current
          ? {
              ...current,
              avatarUrl,
            }
          : current
      );

      showMessage({
        type: "success",
        text: "Ta photo de profil a été mise à jour.",
      });
    } catch (error) {
      showMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Impossible d’envoyer cette image.",
      });
    } finally {
      setUploadingAvatar(false);
      event.target.value = "";
    }
  }

  async function handlePreferencesSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setSavingPreferences(true);

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

      showMessage({
        type: "success",
        text: "Tes préférences ont été enregistrées.",
      });
    } catch (error) {
      showMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Impossible d’enregistrer les préférences.",
      });
    } finally {
      setSavingPreferences(false);
    }
  }

  async function handleEmailSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setSavingEmail(true);

      await updateAccountEmail(email);

      showMessage({
        type: "success",
        text: "Un email de confirmation peut être nécessaire pour valider la nouvelle adresse.",
      });
    } catch (error) {
      showMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Impossible de modifier l’adresse email.",
      });
    } finally {
      setSavingEmail(false);
    }
  }

  async function handlePasswordSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setSavingPassword(true);

      await updateAccountPassword(
        password,
        passwordConfirmation
      );

      setPassword("");
      setPasswordConfirmation("");

      showMessage({
        type: "success",
        text: "Ton mot de passe a bien été modifié.",
      });
    } catch (error) {
      showMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Impossible de modifier le mot de passe.",
      });
    } finally {
      setSavingPassword(false);
    }
  }

  async function handleSignOut() {
    try {
      setSigningOut(true);

     await signOutAccount();

router.replace("/login");
router.refresh();
    } catch (error) {
      showMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Impossible de te déconnecter.",
      });

      setSigningOut(false);
    }
  }

  async function handleDeleteAccount() {
    const confirmation =
      window.prompt(
        'Pour confirmer, écris exactement "SUPPRIMER".'
      );

    if (confirmation !== "SUPPRIMER") {
      showMessage({
        type: "error",
        text: "La suppression du compte a été annulée.",
      });

      return;
    }

    const finalConfirmation =
      window.confirm(
        "Cette action supprimera tes données PiloEco. Continuer ?"
      );

    if (!finalConfirmation) {
      return;
    }

    try {
      setDeletingAccount(true);

      await deleteAccountData();

      router.replace("/");
      router.refresh();
    } catch (error) {
      showMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Impossible de supprimer ton compte.",
      });

      setDeletingAccount(false);
    }
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-red-500/20 bg-red-500/10 p-8 text-center">
          <p className="text-4xl">
            ⚠️
          </p>

          <h1 className="mt-4 text-2xl font-black">
            Impossible de charger ton compte
          </h1>

          <p className="mt-3 text-slate-300">
            Vérifie que tu es bien connecté puis réessaie.
          </p>

          <button
            type="button"
            onClick={loadAccount}
            className="mt-6 rounded-xl bg-white px-5 py-3 font-bold text-slate-950 transition hover:bg-slate-200"
          >
            Réessayer
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 text-sm font-semibold text-green-400 transition hover:text-green-300"
        >
          ← Retour
        </button>

        {message && (
          <div
            className={`fixed right-4 top-4 z-50 max-w-md rounded-2xl border px-5 py-4 shadow-2xl ${
              message.type === "success"
                ? "border-green-500/30 bg-green-950 text-green-100"
                : "border-red-500/30 bg-red-950 text-red-100"
            }`}
          >
            {message.text}
          </div>
        )}

        <section className="overflow-hidden rounded-[2rem] border border-green-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-green-950/40 p-6 shadow-[0_0_80px_rgba(34,197,94,0.08)] sm:p-8 lg:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-green-400">
                👤 Mon compte PiloEco
              </p>

              <h1 className="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">
                Bonjour{" "}
                {profile.firstName ||
                  "à toi"}{" "}
                👋
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Gère ton profil, ta sécurité, tes alertes et ton abonnement depuis un seul endroit.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span
                  className={`rounded-full border px-4 py-2 text-sm font-bold ${
                    profile.premium
                      ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
                      : "border-slate-700 bg-slate-900 text-slate-300"
                  }`}
                >
                  {profile.premium
                    ? "💎 PiloEco Premium"
                    : "🌱 Offre gratuite"}
                </span>

                <span className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-bold text-green-300">
                  Niveau {profile.level}
                </span>

                <span className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
                  Membre depuis{" "}
                  {formatDate(
                    profile.createdAt
                  )}
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt="Photo de profil"
                    className="h-32 w-32 rounded-full border-4 border-green-500/30 object-cover shadow-[0_0_50px_rgba(34,197,94,0.25)]"
                  />
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-green-500/30 bg-green-500/10 text-4xl font-black text-green-300 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                    {getInitials(
                      profile.firstName,
                      profile.lastName
                    )}
                  </div>
                )}

                <label className="absolute -bottom-2 left-1/2 -translate-x-1/2 cursor-pointer whitespace-nowrap rounded-full bg-green-500 px-4 py-2 text-xs font-black text-slate-950 shadow-lg transition hover:bg-green-400">
                  {uploadingAvatar
                    ? "Envoi..."
                    : "Changer"}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    disabled={
                      uploadingAvatar
                    }
                    onChange={
                      handleAvatarChange
                    }
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">
              Économies réalisées
            </p>

            <p className="mt-2 text-3xl font-black text-green-400">
              {formatCurrency(
                profile.totalSavings
              )}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">
              Missions terminées
            </p>

            <p className="mt-2 text-3xl font-black">
              {profile.completedMissions}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">
              Expérience
            </p>

            <p className="mt-2 text-3xl font-black">
              {profile.xp} XP
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">
              Badges débloqués
            </p>

            <p className="mt-2 text-3xl font-black">
              {profile.badges.length}
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-green-400">
                Progression
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Niveau {profile.level}
              </h2>
            </div>

            <p className="font-bold text-slate-300">
              {Math.round(levelProgress)} %
            </p>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-700"
              style={{
                width: `${levelProgress}%`,
              }}
            />
          </div>
        </section>
<AccountInsightsCard
  totalSavings={profile.totalSavings}
  completedMissions={profile.completedMissions}
  badges={profile.badges}
  createdAt={profile.createdAt}
/>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <form
            onSubmit={handleProfileSubmit}
            className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 sm:p-8"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-green-400">
              Profil
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Mes informations
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-300">
                  Prénom
                </span>

                <input
                  type="text"
                  value={firstName}
                  onChange={(event) =>
                    setFirstName(
                      event.target.value
                    )
                  }
                  required
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-green-500"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-300">
                  Nom
                </span>

                <input
                  type="text"
                  value={lastName}
                  onChange={(event) =>
                    setLastName(
                      event.target.value
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-green-500"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={savingProfile}
              className="mt-6 w-full rounded-xl bg-green-500 px-5 py-3 font-black text-slate-950 transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {savingProfile
                ? "Enregistrement..."
                : "Enregistrer mon profil"}
            </button>
          </form>

          <section className="rounded-[2rem] border border-amber-400/20 bg-gradient-to-br from-slate-900 to-amber-950/20 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-widest text-amber-300">
              Abonnement
            </p>

            <h2 className="mt-2 text-2xl font-black">
              {profile.premium
                ? "PiloEco Premium"
                : "Découvre Premium"}
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              {profile.premium
                ? "Ton compte profite du Monitoring intelligent, de PiloLife et de toutes les fonctionnalités Premium."
                : "Active le Monitoring intelligent et transforme automatiquement tes économies en projets de vie."}
            </p>

            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <p>
                ✓ Surveillance de tes contrats
              </p>
              <p>
                ✓ Alertes de hausses et baisses
              </p>
              <p>
                ✓ Accès complet à PiloLife
              </p>
              <p>
                ✓ Recommandations personnalisées
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                router.push(
                  profile.premium
                    ? "/abonnement"
                    : "/premium"
                )
              }
              className="mt-7 w-full rounded-xl bg-amber-400 px-5 py-3 font-black text-slate-950 transition hover:bg-amber-300"
            >
              {profile.premium
                ? "Gérer mon abonnement"
                : "Passer à Premium"}
            </button>
          </section>
        </div>

        <form
          onSubmit={
            handlePreferencesSubmit
          }
          className="mt-6 rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 sm:p-8"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-green-400">
            Notifications
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Choisir mes alertes
          </h2>

          <p className="mt-3 text-slate-400">
            Tu gardes le contrôle sur les messages reçus par PiloEco.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <Toggle
              label="Notifications PiloEco"
              description="Activer les notifications générales dans l’application."
              checked={
                preferences.notificationsEnabled
              }
              onChange={(checked) =>
                updatePreference(
                  "notificationsEnabled",
                  checked
                )
              }
            />

            <Toggle
              label="Notifications par email"
              description="Recevoir les alertes importantes sur ton adresse email."
              checked={
                preferences.emailNotificationsEnabled
              }
              onChange={(checked) =>
                updatePreference(
                  "emailNotificationsEnabled",
                  checked
                )
              }
            />

            <Toggle
              label="Alertes Monitoring"
              description="Être prévenu lorsqu’une meilleure offre ou une hausse est détectée."
              checked={
                preferences.monitoringNotificationsEnabled
              }
              disabled={
                !preferences.notificationsEnabled
              }
              onChange={(checked) =>
                updatePreference(
                  "monitoringNotificationsEnabled",
                  checked
                )
              }
            />

            <Toggle
              label="Nouvelles missions"
              description="Recevoir les nouvelles opportunités d’économie détectées."
              checked={
                preferences.missionNotificationsEnabled
              }
              disabled={
                !preferences.notificationsEnabled
              }
              onChange={(checked) =>
                updatePreference(
                  "missionNotificationsEnabled",
                  checked
                )
              }
            />

            <Toggle
              label="Progression PiloLife"
              description="Recevoir les étapes importantes de ton objectif principal."
              checked={
                preferences.piloLifeNotificationsEnabled
              }
              disabled={
                !preferences.notificationsEnabled
              }
              onChange={(checked) =>
                updatePreference(
                  "piloLifeNotificationsEnabled",
                  checked
                )
              }
            />

            <Toggle
              label="Conseils et nouveautés"
              description="Recevoir occasionnellement les nouveautés et astuces PiloEco."
              checked={
                preferences.marketingEmailsEnabled
              }
              disabled={
                !preferences.emailNotificationsEnabled
              }
              onChange={(checked) =>
                updatePreference(
                  "marketingEmailsEnabled",
                  checked
                )
              }
            />
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-slate-300">
              Fréquence des emails
            </span>

            <select
              value={
                preferences.notificationFrequency
              }
              disabled={
                !preferences.emailNotificationsEnabled
              }
              onChange={(event) =>
                updatePreference(
                  "notificationFrequency",
                  event.target
                    .value as NotificationFrequency
                )
              }
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-green-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="instant">
                Dès qu’une alerte importante est détectée
              </option>

              <option value="daily">
                Un résumé par jour
              </option>

              <option value="weekly">
                Un résumé par semaine
              </option>

              <option value="never">
                Aucun email
              </option>
            </select>
          </label>

          <button
            type="submit"
            disabled={
              savingPreferences
            }
            className="mt-6 rounded-xl bg-green-500 px-6 py-3 font-black text-slate-950 transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {savingPreferences
              ? "Enregistrement..."
              : "Enregistrer mes préférences"}
          </button>
        </form>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <form
            onSubmit={handleEmailSubmit}
            className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 sm:p-8"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
              Connexion
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Adresse email
            </h2>

            <label className="mt-6 block">
              <span className="text-sm font-semibold text-slate-300">
                Email du compte
              </span>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                required
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </label>

            <button
              type="submit"
              disabled={savingEmail}
              className="mt-6 w-full rounded-xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 font-black text-blue-300 transition hover:bg-blue-500/20 disabled:opacity-50"
            >
              {savingEmail
                ? "Modification..."
                : "Modifier mon email"}
            </button>
          </form>

          <form
            onSubmit={
              handlePasswordSubmit
            }
            className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 sm:p-8"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
              Sécurité
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Mot de passe
            </h2>

            <div className="mt-6 space-y-4">
              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                placeholder="Nouveau mot de passe"
                minLength={8}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-blue-500"
              />

              <input
                type="password"
                value={
                  passwordConfirmation
                }
                onChange={(event) =>
                  setPasswordConfirmation(
                    event.target.value
                  )
                }
                placeholder="Confirmer le mot de passe"
                minLength={8}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={
                savingPassword
              }
              className="mt-6 w-full rounded-xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 font-black text-blue-300 transition hover:bg-blue-500/20 disabled:opacity-50"
            >
              {savingPassword
                ? "Modification..."
                : "Modifier mon mot de passe"}
            </button>
          </form>
        </div>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-3xl">
              🎁
            </p>

            <h2 className="mt-4 text-xl font-black">
              Parrainage
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Invite tes proches à réduire leurs dépenses avec PiloEco.
            </p>

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/parrainage"
                )
              }
              className="mt-5 font-bold text-green-400 hover:text-green-300"
            >
              Découvrir le parrainage →
            </button>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-3xl">
              💬
            </p>

            <h2 className="mt-4 text-xl font-black">
              Aide et support
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Une question, un problème ou une idée pour améliorer PiloEco ?
            </p>

            <button
              type="button"
              onClick={() =>
                router.push("/support")
              }
              className="mt-5 font-bold text-green-400 hover:text-green-300"
            >
              Contacter le support →
            </button>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-3xl">
              📄
            </p>

            <h2 className="mt-4 text-xl font-black">
              Informations légales
            </h2>

            <div className="mt-3 space-y-2 text-sm">
              <button
                type="button"
                onClick={() =>
                  router.push("/cgu")
                }
                className="block text-slate-400 transition hover:text-white"
              >
                Conditions générales
              </button>

              <button
                type="button"
                onClick={() =>
                  router.push(
                    "/confidentialite"
                  )
                }
                className="block text-slate-400 transition hover:text-white"
              >
                Politique de confidentialité
              </button>

              <button
                type="button"
                onClick={() =>
                  router.push(
                    "/mentions-legales"
                  )
                }
                className="block text-slate-400 transition hover:text-white"
              >
                Mentions légales
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-red-500/20 bg-red-950/10 p-6 sm:p-8">
          <p className="text-sm font-bold uppercase tracking-widest text-red-400">
            Zone sensible
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Gestion du compte
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 font-black text-white transition hover:bg-slate-800 disabled:opacity-50"
            >
              {signingOut
                ? "Déconnexion..."
                : "Se déconnecter"}
            </button>

            <button
              type="button"
              onClick={
                handleDeleteAccount
              }
              disabled={
                deletingAccount
              }
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 font-black text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
            >
              {deletingAccount
                ? "Suppression..."
                : "Supprimer mes données"}
            </button>
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            La suppression efface les données PiloEco liées à ton compte. La suppression complète de l’utilisateur Supabase devra ensuite être réalisée par une fonction serveur sécurisée.
          </p>
        </section>

        <p className="py-10 text-center text-sm text-slate-600">
          PiloEco • Ton copilote pour une vie moins chère
        </p>
      </div>
    </main>
  );
}