import { Injectable } from '@nestjs/common';

type Depenses = {
  telephone: number;
  internet: number;
  assurance: number;
  electricite: number;
};

type Recommandation = {
  categorie: string;
  priorite: 'Haute' | 'Moyenne';
  economie: number;
  action: string;
};

@Injectable()
export class RecommendationService {
  generer(depenses: Depenses): Recommandation[] {
    const recommandations: Recommandation[] = [];

    if (depenses.telephone > 20) {
      recommandations.push({
        categorie: 'Téléphone',
        priorite: 'Haute',
        economie: Math.round((depenses.telephone - 20) * 12),
        action: 'Comparer les forfaits mobiles',
      });
    }

    if (depenses.internet > 30) {
      recommandations.push({
        categorie: 'Internet',
        priorite: 'Haute',
        economie: Math.round((depenses.internet - 30) * 12),
        action: 'Comparer les offres Internet',
      });
    }

    if (depenses.assurance > 40) {
      recommandations.push({
        categorie: 'Assurance',
        priorite: 'Moyenne',
        economie: Math.round(depenses.assurance * 0.2 * 12),
        action: 'Comparer les assurances',
      });
    }

    if (depenses.electricite > 80) {
      recommandations.push({
        categorie: 'Électricité',
        priorite: 'Moyenne',
        economie: Math.round(depenses.electricite * 0.15 * 12),
        action: 'Comparer les fournisseurs',
      });
    }

    return recommandations;
  }
}