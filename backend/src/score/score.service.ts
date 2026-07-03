import { Injectable } from '@nestjs/common';

type ScoreInput = {
  telephone: number;
  internet: number;
  assurance: number;
  electricite: number;
};

@Injectable()
export class ScoreService {
  calculerScore(data: ScoreInput) {
    let score = 0;

    if (data.telephone <= 20) score += 25;
    else if (data.telephone <= 40) score += 15;
    else score += 5;

    if (data.internet <= 30) score += 25;
    else if (data.internet <= 45) score += 15;
    else score += 5;

    if (data.assurance <= 40) score += 25;
    else if (data.assurance <= 70) score += 15;
    else score += 5;

    if (data.electricite <= 80) score += 25;
    else if (data.electricite <= 120) score += 15;
    else score += 5;

    return Math.min(100, score);
  }
}