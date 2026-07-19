export type EmailType =
  | "welcome"
  | "premium"
  | "better_offer"
  | "price_up"
  | "price_down"
  | "contract_end"
  | "mission_completed"
  | "pilolife_progress"
  | "generic";

export type SendEmailInput = {
  userId: string;
  to: string;
  type: EmailType;
  subject: string;
  html: string;
  metadata?: Record<string, unknown>;
};

export type SendEmailResult = {
  success: boolean;
  error?: string;
};

export type EmailTemplateData = {
  firstName?: string;

  provider?: string;
  currentProvider?: string;
  betterProvider?: string;

  offer?: string;

  yearlySaving?: number;
  monthlySaving?: number;

  currentPrice?: number;
  newPrice?: number;

  contractEndDate?: string;

  projectTitle?: string;
  savedAmount?: number;
  targetAmount?: number;

  notificationTitle?: string;
  notificationMessage?: string;

  actionUrl?: string;
};