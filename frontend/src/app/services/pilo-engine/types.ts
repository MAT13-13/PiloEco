import { MonitoringCard } from "../../types/monitoring";
import { Echeance } from "./echeances";
import { PiloNotification } from "./notifications";

export type PiloAlert = {
  id: string;

  category: string;

  level: "green" | "yellow" | "red";

  title: string;

  description: string;

  saving: number;

  action: string;

  currentOffer: string;

  currentPrice: number;
};

export type JournalEntry = {
  id: string;
  date: string;
  icon: string;
  title: string;
  message: string;
};

export type PiloMission = {
  id: string;
  title: string;
  reward: number;
  status: "Nouvelle" | "En cours" | "Terminée";
};

export type PiloMonitoring = {
  score: number;

  yearlySavings: number;

  alerts: PiloAlert[];

  monitoring: MonitoringCard[];

  journal: JournalEntry[];

  missions: PiloMission[];

  insights: string[];

  echeances: Echeance[];

  notifications: PiloNotification[];
};