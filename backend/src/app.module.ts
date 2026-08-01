import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ScoreService } from './score/score.service';
import { RecommendationService } from './recommendations/recommendation.service';
import { AiModule } from './ai/ai.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    AiModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ScoreService,
    RecommendationService,
  ],
})
export class AppModule {}