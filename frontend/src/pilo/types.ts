export type PiloMemory = {
  likes: string[];
  dislikes: string[];
  goals: string[];
  notes: string[];
};

export type PiloProfile = {
  firstname?: string;
  score?: number;
  yearlySavings?: number;
};

export type PiloState = {
  mood: "happy" | "thinking" | "warning" | "celebrating";
};