export function buildAdvice(score: number) {
  if (score >= 85)
    return "Ton budget est déjà très bien optimisé.";

  if (score >= 70)
    return "Il reste encore quelques économies faciles à réaliser.";

  if (score >= 50)
    return "Je pense pouvoir te faire économiser plusieurs centaines d'euros par an.";

  return "Je vois beaucoup d'opportunités d'économies. On va les chercher ensemble.";
}