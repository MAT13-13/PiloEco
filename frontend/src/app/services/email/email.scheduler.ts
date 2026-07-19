import { checkMonitoringContract } from "@/app/monitoring/services/monitoring-check.service";

import { detectMonitoringEmail } from "./email.detector";
import { getPremiumContracts } from "./email.users";

export async function runDailyEmailScheduler() {
  console.log(
    "📅 Début du scheduler quotidien Premium..."
  );

  const premiumContracts =
    await getPremiumContracts();

  console.log(
    `👑 ${premiumContracts.length} contrat(s) Premium trouvé(s)`
  );

  let checkedContracts = 0;
  let sentEmails = 0;
  let skippedEmails = 0;
  let failedContracts = 0;

  for (const item of premiumContracts) {
    const {
      userId,
      email,
      firstName,
      contract,
    } = item;

    try {
      console.log(
        `🔍 Vérification : ${contract.category} (${contract.provider ?? "Fournisseur inconnu"})`
      );

      /*
       * Cette fonction doit maintenant vérifier :
       *
       * - une meilleure offre ;
       * - une hausse de prix ;
       * - une baisse de prix ;
       * - une échéance proche ;
       * - les informations PiloLife.
       */
      const monitoringResult =
        await checkMonitoringContract(contract);

      checkedContracts += 1;

      /*
       * On ne bloque plus le scheduler lorsque
       * hasBetterOffer est faux.
       *
       * Tous les résultats sont transmis au détecteur
       * afin qu'il puisse choisir le bon type d'email.
       */
      const emailResult =
        await detectMonitoringEmail({
          userId,
          email,
          firstName,
          contract:
            monitoringResult.contract,
          monitoringResult,
        });

      if (emailResult.sent) {
        sentEmails += 1;
      } else {
        skippedEmails += 1;
      }

      console.log(
        `📧 ${emailResult.reason}`
      );
    } catch (error) {
      failedContracts += 1;

      console.error(
        `❌ Erreur pendant la vérification du contrat ${contract.id} :`,
        error
      );
    }
  }

  console.log(
    [
      "✅ Scheduler Premium terminé",
      `🔍 ${checkedContracts} contrat(s) vérifié(s)`,
      `📧 ${sentEmails} email(s) envoyé(s)`,
      `⏭️ ${skippedEmails} email(s) ignoré(s)`,
      `❌ ${failedContracts} erreur(s)`,
    ].join(" — ")
  );

  return {
    success: failedContracts === 0,
    totalContracts: premiumContracts.length,
    checkedContracts,
    sentEmails,
    skippedEmails,
    failedContracts,
  };
}