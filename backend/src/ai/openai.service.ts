import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

type Depenses = {
  telephone: number;
  internet: number;
  assurance: number;
  electricite: number;
};

type Recommandation = {
  categorie: string;
  priorite: string;
  economie: number;
  action: string;
};

@Injectable()
export class OpenAIService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async genererDiagnostic(
    depenses: Depenses,
    recommandations: Recommandation[],
    economieAnnuelle: number,
    scorePilo: number,
  ) {
    const prompt = `
Tu es l'assistant IA de PiloEco.

Dépenses mensuelles :
- Téléphone : ${depenses.telephone} €
- Internet : ${depenses.internet} €
- Assurance : ${depenses.assurance} €
- Électricité : ${depenses.electricite} €

Score Pilo : ${scorePilo}/100
Économie annuelle estimée : ${economieAnnuelle} €

Recommandations calculées :
${JSON.stringify(recommandations)}

Rédige un diagnostic court, clair, motivant et professionnel.
Maximum 5 phrases.
Ne réponds pas en JSON.
`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    return (
      response.choices[0]?.message?.content ||
      "Analyse prête. Vos dépenses peuvent être optimisées en comparant les contrats les plus coûteux."
    );
  }
}