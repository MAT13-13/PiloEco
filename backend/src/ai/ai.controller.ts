import { Body, Controller, Post } from '@nestjs/common';
import { OpenAIService } from './openai.service';

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

@Controller('ai')
export class AiController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post('diagnostic')
  async diagnostic(
    @Body()
    body: {
      depenses: Depenses;
      recommandations: Recommandation[];
      economieAnnuelle: number;
      scorePilo: number;
    },
  ) {
    const diagnostic = await this.openAIService.genererDiagnostic(
      body.depenses,
      body.recommandations,
      body.economieAnnuelle,
      body.scorePilo,
    );

    return { diagnostic };
  }
}