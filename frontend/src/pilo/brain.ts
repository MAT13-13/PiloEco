import { buildAdvice } from "./advice";
import { piloPersonality } from "./personality";

export function think(score: number) {
  const intro =
    piloPersonality.intro[
      Math.floor(Math.random() * piloPersonality.intro.length)
    ];

  return {
    intro,
    advice: buildAdvice(score),
    motivation:
      piloPersonality.encouragement[
        Math.floor(
          Math.random() * piloPersonality.encouragement.length
        )
      ],
  };
}