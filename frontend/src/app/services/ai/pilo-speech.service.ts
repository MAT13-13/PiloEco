type SpeechInput = {
  humeur: string;
  diagnostic: string;
  economie: number;
  missions: number;
};

export function generatePiloSpeech({
  humeur,
  diagnostic,
  economie,
  missions,
}: SpeechInput) {
  const intro = {
    heureux: [
      "Bonne nouvelle !",
      "J'ai de bonnes nouvelles.",
      "Je suis content de ce que j'ai trouvé.",
    ],
    normal: [
      "J'ai regardé ton budget.",
      "Je viens d'analyser tes dépenses.",
      "Je continue mes recherches.",
    ],
    inquiet: [
      "Je pense qu'on peut faire mieux.",
      "J'ai trouvé plusieurs dépenses importantes.",
      "Je voudrais attirer ton attention.",
    ],
  };

  let humeurKey: keyof typeof intro = "normal";

  if (humeur.includes("🏆")) humeurKey = "heureux";
  else if (diagnostic === "urgent") humeurKey = "inquiet";

  const phrase =
    intro[humeurKey][Math.floor(Math.random() * intro[humeurKey].length)];

  return `${phrase} Tu peux économiser ${economie} € par an. ${missions} mission(s) sont déjà terminées.`;
}