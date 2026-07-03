import type { Depense } from "./depenses.service";

const subscriptions = [
  "Netflix",
  "Spotify",
  "Disney",
  "Prime",
  "Canal",
  "Apple",
  "YouTube",
  "Deezer",
  "Amazon",
  "Xbox",
  "PlayStation",
];

export function detectSubscriptions(depenses: Depense[]) {
  const detected = depenses.filter((depense) =>
    subscriptions.some((service) =>
      depense.description.toLowerCase().includes(service.toLowerCase())
    )
  );

  const monthly = detected.reduce(
    (total, depense) => total + Number(depense.amount),
    0
  );

  return {
    count: detected.length,
    monthly,
    yearly: monthly * 12,
    detected,
  };
}