import { NextResponse } from "next/server";
import OpenAI from "openai";

type Depenses = {
  telephone: number;
  internet: number;
  assurance: number;
  electricite: number;
};

type Recommandation = {
  categorie: string;
  priorite: "Haute" | "Moyenne";
  economie: number;
  action: string;
};

function genererRecommandations(
  depenses: Depenses,
): Recommandation[] {
  const recommandations: Recommandation[] = [];

  if (depenses.telephone > 20) {
    recommandations.push({
      categorie: "Téléphone",
      priorite: "Haute",
      economie: Math.round((depenses.telephone - 20) * 12),
      action: "Comparer les forfaits mobiles",
    });
  }

  if (depenses.internet > 30) {
    recommandations.push({
      categorie: "Internet",
      priorite: "Haute",
      economie: Math.round((depenses.internet - 30) * 12),
      action: "Comparer les offres Internet",
    });
  }

  if (depenses.assurance > 40) {
    recommandations.push({
      categorie: "Assurance",
      priorite: "Moyenne",
      economie: Math.round(depenses.assurance * 0.2 * 12),
      action: "Comparer les assurances",
    });
  }

  if (depenses.electricite > 80) {
    recommandations.push({
      categorie: "Électricité",
      priorite: "Moyenne",
      economie: Math.round(depenses.electricite * 0.15 * 12),
      action: "Comparer les fournisseurs",
    });
  }

  return recommandations;
}

function calculerScore(depenses: Depenses): number {
  let score = 0;

  if (depenses.telephone <= 20) score += 25;
  else if (depenses.telephone <= 40) score += 15;
  else score += 5;

  if (depenses.internet <= 30) score += 25;
  else if (depenses.internet <= 45) score += 15;
  else score += 5;

  if (depenses.assurance <= 40) score += 25;
  else if (depenses.assurance <= 70) score += 15;
  else score += 5;

  if (depenses.electricite <= 80) score += 25;
  else if (depenses.electricite <= 120) score += 15;
  else score += 5;

  return Math.min(100, score);
}

async function genererDiagnostic(
  depenses: Depenses,
  recommandations: Recommandation[],
  economieAnnuelle: number,
  scorePilo: number,
): Promise<string> {
  const messageParDefaut =
    "Analyse prête. Vos dépenses peuvent être optimisées en comparant les contrats les plus coûteux.";

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error("OPENAI_API_KEY absente des variables d'environnement.");
    return messageParDefaut;
  }

  try {
    const openai = new OpenAI({
      apiKey,
    });

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

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || messageParDefaut;
  } catch (error) {
    console.error("Erreur OpenAI :", error);
    return messageParDefaut;
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<Depenses>;

    const depensesNettoyees: Depenses = {
      telephone: Number(body.telephone || 0),
      internet: Number(body.internet || 0),
      assurance: Number(body.assurance || 0),
      electricite: Number(body.electricite || 0),
    };

    const valeursInvalides = Object.values(depensesNettoyees).some(
      (valeur) => !Number.isFinite(valeur) || valeur < 0,
    );

    if (valeursInvalides) {
      return NextResponse.json(
        {
          message: "Certaines dépenses sont invalides.",
        },
        {
          status: 400,
        },
      );
    }

    const totalDepenses =
      depensesNettoyees.telephone +
      depensesNettoyees.internet +
      depensesNettoyees.assurance +
      depensesNettoyees.electricite;

    const recommandations =
      genererRecommandations(depensesNettoyees);

    const economieAnnuelle = recommandations.reduce(
      (total, recommandation) =>
        total + recommandation.economie,
      0,
    );

    const economiePossible = Math.round(
      economieAnnuelle / 12,
    );

    const scorePilo = calculerScore(depensesNettoyees);

    const diagnosticIA = await genererDiagnostic(
      depensesNettoyees,
      recommandations,
      economieAnnuelle,
      scorePilo,
    );

    const priorites = [...recommandations]
      .sort((a, b) => b.economie - a.economie)
      .map((recommandation) => recommandation.categorie);

    return NextResponse.json({
      message: "Analyse personnalisée prête",
      depenses: depensesNettoyees,
      totalDepenses,
      economiePossible,
      economieAnnuelle,
      scorePilo,
      recommandations,
      diagnosticIA,
      priorites,
      devise: "€",
    });
  } catch (error) {
    console.error("Erreur calcul-economies :", error);

    return NextResponse.json(
      {
        message:
          "Une erreur est survenue pendant l'analyse.",
      },
      {
        status: 500,
      },
    );
  }
}