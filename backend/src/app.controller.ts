import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScoreService } from './score/score.service';
import { RecommendationService } from './recommendations/recommendation.service';
import { OpenAIService } from './ai/openai.service';

type Depenses = {
  telephone: number;
  internet: number;
  assurance: number;
  electricite: number;
};

@Controller()
export class AppController {
  constructor(
    private readonly scoreService: ScoreService,
    private readonly recommendationService: RecommendationService,
    private readonly openAIService: OpenAIService,
  ) {}

  @Get()
  getHome() {
    return {
      message: 'Bienvenue sur PiloEco 🚀',
      version: '0.5',
      status: 'OK',
    };
  }

  @Post('calcul-economies')
  async calculEconomies(@Body() depenses: Depenses) {
    const depensesNettoyees = {
      telephone: Number(depenses.telephone || 0),
      internet: Number(depenses.internet || 0),
      assurance: Number(depenses.assurance || 0),
      electricite: Number(depenses.electricite || 0),
    };

    const totalDepenses =
      depensesNettoyees.telephone +
      depensesNettoyees.internet +
      depensesNettoyees.assurance +
      depensesNettoyees.electricite;

    const recommandations =
      this.recommendationService.generer(depensesNettoyees);

    const economieAnnuelle = recommandations.reduce(
      (total, recommandation) => total + recommandation.economie,
      0,
    );

    const economiePossible = Math.round(economieAnnuelle / 12);

    const scorePilo = this.scoreService.calculerScore(depensesNettoyees);

    const diagnosticIA = await this.openAIService.genererDiagnostic(
      depensesNettoyees,
      recommandations,
      economieAnnuelle,
      scorePilo,
    );

    const priorites = recommandations
      .sort((a, b) => b.economie - a.economie)
      .map((recommandation) => recommandation.categorie);

    return {
      message: 'Analyse personnalisée prête',
      depenses: depensesNettoyees,
      totalDepenses,
      economiePossible,
      economieAnnuelle,
      scorePilo,
      recommandations,
      diagnosticIA,
      priorites,
      devise: '€',
    };
  }
}