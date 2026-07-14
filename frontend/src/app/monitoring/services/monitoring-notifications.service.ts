import { supabase } from "../../lib/supabase";

export type MonitoringNotification = {
  id: string;
  user_id: string;
  contract_id: string | null;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

type CreateNotificationInput = {
  userId: string;
  contractId: string;
  type:
    | "price_up"
    | "price_down"
    | "better_offer"
    | "contract_end"
    | "info";
  title: string;
  message: string;
};

export async function createMonitoringNotification(
  input: CreateNotificationInput
) {
  const { error } = await supabase
    .from("monitoring_notifications")
    .insert({
      user_id: input.userId,
      contract_id: input.contractId,
      type: input.type,
      title: input.title,
      message: input.message,
      is_read: false,
    });

  if (error) {
    throw error;
  }
}

export async function getMonitoringNotifications(): Promise<
  MonitoringNotification[]
> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("monitoring_notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return (data ??
    []) as MonitoringNotification[];
}

export async function getUnreadNotificationsCount() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return 0;
  }

  const { count, error } = await supabase
    .from("monitoring_notifications")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", user.id)
    .eq("is_read", false);

  if (error) {
    throw error;
  }

  return count ?? 0;
}

export async function markNotificationAsRead(
  notificationId: string
) {
  const { error } = await supabase
    .from("monitoring_notifications")
    .update({
      is_read: true,
    })
    .eq("id", notificationId);

  if (error) {
    throw error;
  }
}

export async function markAllNotificationsAsRead() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { error } = await supabase
    .from("monitoring_notifications")
    .update({
      is_read: true,
    })
    .eq("user_id", user.id)
    .eq("is_read", false);

  if (error) {
    throw error;
  }
}

export async function deleteNotification(
  notificationId: string
) {
  const { error } = await supabase
    .from("monitoring_notifications")
    .delete()
    .eq("id", notificationId);

  if (error) {
    throw error;
  }
}

export async function clearAllNotifications() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { error } = await supabase
    .from("monitoring_notifications")
    .delete()
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }
}