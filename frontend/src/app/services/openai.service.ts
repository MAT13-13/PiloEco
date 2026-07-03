export type PiloPrompt = {
  score: number;
  savings: number;
  depenses: {
    description: string;
    category: string;
    amount: number;
  }[];
};

export function buildPrompt(data: PiloPrompt) {
  return `
Tu es Pilo, le copilote financier de PiloEco.

Ton rôle est d'aider l'utilisateur à économiser de l'argent.

Score économie :
${data.score}/100

Économies potentielles :
${data.savings} €/an

Voici les dépenses :

${data.depenses
  .map(
    (d) =>
      `- ${d.description} | ${d.category} | ${d.amount} €`
  )
  .join("\n")}

Réponds en français.

Donne :

1. Une analyse bienveillante.
2. Trois conseils prioritaires.
3. Les économies possibles.
4. Une phrase motivante.
`;
}