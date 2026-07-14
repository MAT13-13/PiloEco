type MonitoringEmail = {
  to: string;

  subject: string;

  message: string;
};

export async function sendPriceIncreaseEmail(
  email: MonitoringEmail
) {
  console.log(
    "📧 Prix augmenté",
    email
  );
}

export async function sendPriceDropEmail(
  email: MonitoringEmail
) {
  console.log(
    "📧 Prix baissé",
    email
  );
}

export async function sendBetterOfferEmail(
  email: MonitoringEmail
) {
  console.log(
    "📧 Nouvelle meilleure offre",
    email
  );
}

export async function sendContractEndingEmail(
  email: MonitoringEmail
) {
  console.log(
    "📧 Contrat bientôt terminé",
    email
  );
}