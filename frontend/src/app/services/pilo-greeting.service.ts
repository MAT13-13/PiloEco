export function getPiloGreeting(name?: string) {
  const hour = new Date().getHours();

  const prenom = name?.trim() || "ami";

  if (hour < 12) {
    return `☀️ Bonjour ${prenom} !`;
  }

  if (hour < 18) {
    return `🌤️ Bon après-midi ${prenom} !`;
  }

  return `🌙 Bonsoir ${prenom} !`;
}