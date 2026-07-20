import {
  checkMonitoringContract,
} from "@/app/monitoring/services/monitoring-check.service";

import {
  detectMonitoringEmail,
} from "./email.detector";

import {
  detectPiloLifeEmail,
} from "./email.pilolife";

import {
  getPremiumContracts,
  getPremiumUsers,
} from "./email.users";

export async function runDailyEmailScheduler() {
  console.log(
    "📅 Début du scheduler quotidien Premium..."
  );

  const [
    premiumContracts,
    premiumUsers,
  ] = await Promise.all([
    getPremiumContracts(),
    getPremiumUsers(),
  ]);

  console.log(
    `👑 ${premiumUsers.length} utilisateur(s) Premium trouvé(s)`
  );

  console.log(
    `📄 ${premiumContracts.length} contrat(s) Premium trouvé(s)`
  );

  let checkedContracts = 0;
  let checkedPiloLifeProjects = 0;

  let sentEmails = 0;
  let skippedEmails = 0;
  let failedChecks = 0;

  /*
   * 1. EMAILS MONITORING
   *
   * Cette boucle fonctionne par contrat.
   */
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

      const monitoringResult =
        await checkMonitoringContract(
          contract
        );

      checkedContracts += 1;

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
        sentEmails +=
          emailResult.sentTypes.length;
      } else {
        skippedEmails += 1;
      }

      console.log(
        `📧 ${emailResult.reason}`
      );
    } catch (error) {
      failedChecks += 1;

      console.error(
        `❌ Erreur contrat ${contract.id} :`,
        error
      );
    }
  }

  /*
   * 2. EMAILS PILOLIFE
   *
   * Cette boucle fonctionne par utilisateur.
   * Elle ne dépend pas du nombre de contrats.
   */
  for (const user of premiumUsers) {
    try {
      console.log(
        `🌱 Vérification PiloLife : ${user.userId}`
      );

      const piloLifeResult =
        await detectPiloLifeEmail({
          userId: user.userId,
          email: user.email,
          firstName:
            user.firstName,
        });

      checkedPiloLifeProjects += 1;

      if (piloLifeResult.sent) {
        sentEmails += 1;
      } else {
        skippedEmails += 1;
      }

      console.log(
        `🌱 ${piloLifeResult.reason}`
      );
    } catch (error) {
      failedChecks += 1;

      console.error(
        `❌ Erreur PiloLife ${user.userId} :`,
        error
      );
    }
  }

  console.log(
    [
      "✅ Scheduler Premium terminé",
      `🔍 ${checkedContracts} contrat(s) vérifié(s)`,
      `🌱 ${checkedPiloLifeProjects} projet(s) PiloLife vérifié(s)`,
      `📧 ${sentEmails} email(s) envoyé(s)`,
      `⏭️ ${skippedEmails} vérification(s) ignorée(s)`,
      `❌ ${failedChecks} erreur(s)`,
    ].join(" — ")
  );

  return {
    success:
      failedChecks === 0,

    totalPremiumUsers:
      premiumUsers.length,

    totalContracts:
      premiumContracts.length,

    checkedContracts,

    checkedPiloLifeProjects,

    sentEmails,

    skippedEmails,

    failedChecks,

    // Compatibilité avec l’ancien nom
    failedContracts:
      failedChecks,
  };
}