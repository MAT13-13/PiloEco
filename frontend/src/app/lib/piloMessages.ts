const piloMessages = [
  "💚 Je suis contente de te revoir.",
  "☀️ Bonjour ! Prête à faire quelques économies ?",
  "🐦 J'espère que tu passes une belle journée.",
  "✨ Je continue de veiller sur ton portefeuille.",
  "🌿 Chaque euro économisé est une victoire.",
  "🎉 Aujourd'hui est peut-être un bon jour pour économiser.",
  "💚 Merci de me faire confiance.",
  "😊 On regarde ensemble ce que l'on peut améliorer ?",
  "🌸 Je suis toujours là si tu as besoin de moi.",
  "🚀 Ensemble, on va faire grandir tes économies.",
  "🐦 Je n'oublie jamais tes objectifs.",
  "💡 Une petite économie aujourd'hui peut devenir un grand projet demain.",
  "🌍 Je cherche toujours les meilleures opportunités pour toi.",
  "🎯 On avance pas à pas vers tes projets.",
  "💚 J'aime te voir économiser sans te compliquer la vie.",
];

export function getRandomPiloMessage() {
  return piloMessages[
    Math.floor(Math.random() * piloMessages.length)
  ];
}