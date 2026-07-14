"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  clearAllNotifications,
  deleteNotification,
  getMonitoringNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  type MonitoringNotification,
} from "../../monitoring/services/monitoring-notifications.service";

function getNotificationIcon(type: string) {
  if (type === "price_up") {
    return "📈";
  }

  if (type === "price_down") {
    return "📉";
  }

  if (type === "better_offer") {
    return "💰";
  }

  if (type === "contract_end") {
    return "📅";
  }

  return "🔔";
}

function formatNotificationDate(
  dateValue: string
) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(
    "fr-FR",
    {
      dateStyle: "short",
      timeStyle: "short",
    }
  ).format(date);
}

export default function DashboardNotifications() {
  const [
    notifications,
    setNotifications,
  ] = useState<
    MonitoringNotification[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    updatingId,
    setUpdatingId,
  ] = useState<string | null>(null);

  const [
    clearing,
    setClearing,
  ] = useState(false);

  const loadNotifications =
    useCallback(async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const data =
          await getMonitoringNotifications();

        setNotifications(data);
      } catch (error) {
        console.error(
          "Erreur chargement notifications :",
          error
        );

        setErrorMessage(
          "Impossible de charger les notifications."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const unreadCount = useMemo(
    () =>
      notifications.filter(
        (notification) =>
          !notification.is_read
      ).length,
    [notifications]
  );

  async function handleOpenNotification(
    notification: MonitoringNotification
  ) {
    if (notification.is_read) {
      return;
    }

    try {
      setUpdatingId(notification.id);

      await markNotificationAsRead(
        notification.id
      );

      setNotifications(
        (currentNotifications) =>
          currentNotifications.map(
            (currentNotification) =>
              currentNotification.id ===
              notification.id
                ? {
                    ...currentNotification,
                    is_read: true,
                  }
                : currentNotification
          )
      );
    } catch (error) {
      console.error(
        "Erreur lecture notification :",
        error
      );

      setErrorMessage(
        "Impossible de marquer la notification comme lue."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleMarkAllAsRead() {
    if (unreadCount === 0) {
      return;
    }

    try {
      setClearing(true);
      setErrorMessage("");

      await markAllNotificationsAsRead();

      setNotifications(
        (currentNotifications) =>
          currentNotifications.map(
            (notification) => ({
              ...notification,
              is_read: true,
            })
          )
      );
    } catch (error) {
      console.error(
        "Erreur lecture globale notifications :",
        error
      );

      setErrorMessage(
        "Impossible de tout marquer comme lu."
      );
    } finally {
      setClearing(false);
    }
  }

  async function handleDeleteNotification(
    notificationId: string
  ) {
    try {
      setUpdatingId(notificationId);
      setErrorMessage("");

      await deleteNotification(
        notificationId
      );

      setNotifications(
        (currentNotifications) =>
          currentNotifications.filter(
            (notification) =>
              notification.id !==
              notificationId
          )
      );
    } catch (error) {
      console.error(
        "Erreur suppression notification :",
        error
      );

      setErrorMessage(
        "Impossible de supprimer cette notification."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleClearAll() {
    if (
      notifications.length === 0 ||
      !window.confirm(
        "Supprimer toutes les notifications ?"
      )
    ) {
      return;
    }

    try {
      setClearing(true);
      setErrorMessage("");

      await clearAllNotifications();
      setNotifications([]);
    } catch (error) {
      console.error(
        "Erreur suppression notifications :",
        error
      );

      setErrorMessage(
        "Impossible de supprimer les notifications."
      );
    } finally {
      setClearing(false);
    }
  }

  return (
    <section className="mt-8 rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-400">
            Centre d’alertes
          </p>

          <div className="mt-2 flex items-center gap-3">
            <h2 className="text-2xl font-black text-white">
              🔔 Notifications
            </h2>

            {unreadCount > 0 && (
              <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-black text-white">
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleMarkAllAsRead}
            disabled={
              clearing ||
              unreadCount === 0
            }
            className="rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2 text-sm font-bold text-slate-200 transition hover:border-green-500/40 hover:text-green-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Tout marquer comme lu
          </button>

          <button
            type="button"
            onClick={handleClearAll}
            disabled={
              clearing ||
              notifications.length === 0
            }
            className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Tout supprimer
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          {errorMessage}

          <button
            type="button"
            onClick={loadNotifications}
            className="ml-2 font-bold underline"
          >
            Réessayer
          </button>
        </div>
      )}

      {loading ? (
        <div className="mt-6 flex items-center gap-3 text-slate-400">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-green-500/20 border-t-green-400" />
          Chargement des notifications...
        </div>
      ) : notifications.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/50 p-6 text-center">
          <p className="font-black text-white">
            Aucune notification
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Pilo t’avertira ici en cas de
            hausse, baisse, meilleure offre
            ou échéance proche.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {notifications
            .slice(0, 6)
            .map((notification) => (
              <article
                key={notification.id}
                className={`rounded-2xl border p-4 transition ${
                  notification.is_read
                    ? "border-white/10 bg-slate-950/40"
                    : "border-green-500/30 bg-green-500/10"
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenNotification(
                        notification
                      )
                    }
                    disabled={
                      updatingId ===
                      notification.id
                    }
                    className="flex flex-1 items-start gap-4 text-left disabled:opacity-60"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950/70 text-2xl">
                      {getNotificationIcon(
                        notification.type
                      )}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-black text-white">
                          {
                            notification.title
                          }
                        </p>

                        {!notification.is_read && (
                          <span className="rounded-full bg-green-500 px-2 py-1 text-[10px] font-black uppercase text-slate-950">
                            Nouveau
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-sm leading-6 text-slate-300">
                        {
                          notification.message
                        }
                      </p>

                      <p className="mt-2 text-xs text-slate-500">
                        {formatNotificationDate(
                          notification.created_at
                        )}
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteNotification(
                        notification.id
                      )
                    }
                    disabled={
                      updatingId ===
                      notification.id
                    }
                    aria-label="Supprimer la notification"
                    className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
                  >
                    🗑️
                  </button>
                </div>
              </article>
            ))}
        </div>
      )}
    </section>
  );
}