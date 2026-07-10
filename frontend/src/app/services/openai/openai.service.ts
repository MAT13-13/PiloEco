import OpenAI from "openai";

export type PiloPrompt = {
  name: string;
  score: number;
  savings: number;
  depenses: {
    description: string;
    category: string;
    amount: number;
  }[];
};

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export function buildPrompt(data: PiloPrompt) {
  return `
Tu es Pilo, le copilote financier bienveillant de PiloEco.

Tu ne fais jamais un rapport.
Tu parles comme un assistant simple, humain, rassurant et direct.

Score économie : ${data.score}/100
Économies potentielles : ${data.savings} €/an

Dépenses :
${data.depenses
  .map((d) => `- ${d.description} | ${d.category} | ${d.amount} €`)
  .join("\n")}

Règles obligatoires :
- Réponds en français.
- Maximum 5 phrases.
- Pas de liste numérotée.
- Pas de tirets.
- Pas de gros pavé.
- Une seule priorité principale.
- Ton chaleureux, motivant, jamais culpabilisant.
- Utilise le prénom ${data.name} si tu t'adresses à l'utilisateur.
- Termine par une phrase encourageante avec 💚.

Format attendu :
🐦 ${data.name}, j'ai regardé ton budget.

[Phrase courte sur les économies possibles.]

[Dis clairement par quoi commencer.]

[Explique en une phrase pourquoi.]

[Phrase motivante.]
`;
}

export async function generatePiloAdvice(data: PiloPrompt) {
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: buildPrompt(data),
  });

  return response.output_text;
}