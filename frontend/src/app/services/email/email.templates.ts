import type {
  EmailTemplateData,
  EmailType,
} from "./email.types";

function layout(title: string, content: string) {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>

<body style="
  margin:0;
  padding:40px 20px;
  background:#f4f7f5;
  font-family:Arial,sans-serif;
  color:#0f172a;
">

  <div style="
    max-width:620px;
    margin:auto;
    background:white;
    border-radius:18px;
    padding:40px;
  ">

    <h1 style="
      margin-top:0;
      color:#16a34a;
    ">
      🌿 PiloEco
    </h1>

    ${content}

    <hr style="
      margin:40px 0;
      border:none;
      border-top:1px solid #eee;
    " />

    <p style="
      color:#777;
      font-size:13px;
      line-height:1.5;
    ">
      Tu reçois cet email car tu utilises PiloEco.
    </p>

  </div>

</body>
</html>
`;
}

function actionButton(
  label: string,
  url: string
) {
  return `
<a
  href="${url}"
  style="
    display:inline-block;
    margin-top:20px;
    padding:14px 24px;
    background:#16a34a;
    color:white;
    text-decoration:none;
    border-radius:12px;
    font-weight:bold;
  "
>
  ${label}
</a>
`;
}

export function generateEmailTemplate(
  type: EmailType,
  data: EmailTemplateData
) {
  switch (type) {
    case "premium":
      return layout(
        "Bienvenue dans Pilo Premium",
        `
<h2 style="font-size:28px;margin-bottom:16px;">
  🎉 Bienvenue dans Pilo Premium
</h2>

<p style="font-size:17px;line-height:1.7;">
  Bonjour${data.firstName ? ` ${data.firstName}` : ""} 👋
</p>

<p style="font-size:17px;line-height:1.7;">
  Ton paiement a bien été confirmé et ton abonnement
  <strong>Pilo Premium est maintenant actif</strong>.
</p>

<div style="
  margin:28px 0;
  padding:24px;
  border-radius:14px;
  background:#f0fdf4;
  border:1px solid #bbf7d0;
">

  <p style="
    margin-top:0;
    font-size:17px;
    font-weight:bold;
    color:#15803d;
  ">
    Tu peux maintenant profiter de :
  </p>

  <p style="margin:10px 0;">
    ✅ PiloLife et tes projets de vie
  </p>

  <p style="margin:10px 0;">
    ✅ Monitoring automatique de tes contrats
  </p>

  <p style="margin:10px 0;">
    ✅ Détection des meilleures offres
  </p>

  <p style="margin:10px 0;">
    ✅ Alertes de hausse et de baisse de prix
  </p>

  <p style="margin:10px 0;">
    ✅ Notifications et emails personnalisés
  </p>

</div>

<p style="font-size:17px;line-height:1.7;">
  Commence dès maintenant en créant ton premier objectif
  dans PiloLife ou en ajoutant un contrat à surveiller.
</p>

${actionButton(
  "🚀 Accéder à Pilo Premium",
  data.actionUrl ?? "https://pilo-eco.vercel.app/pilolife"
)}

<p style="
  margin-top:30px;
  color:#475569;
  line-height:1.6;
">
  Merci de faire confiance à PiloEco 💚
</p>
`
      );

    case "better_offer":
      return layout(
        "Nouvelle meilleure offre",
        `
<h2>Pilo a trouvé une meilleure offre 🎉</h2>

<p>
  Tu peux économiser
  <strong>${data.yearlySaving ?? 0} €/an</strong>
  en changeant simplement de contrat.
</p>

<p>
  👉 Offre recommandée :
  <strong>${data.betterProvider ?? ""}</strong>
</p>

${actionButton(
  "Voir l'offre",
  data.actionUrl ?? "#"
)}
`
      );

    case "contract_end":
      return layout(
        "Fin d'engagement",
        `
<h2>Ton contrat arrive bientôt à échéance ⏰</h2>

<p>
  Le contrat chez
  <strong>${data.provider ?? ""}</strong>
  arrive bientôt à sa fin.
</p>

${actionButton(
  "Comparer les offres",
  data.actionUrl ?? "#"
)}
`
      );

    case "mission_completed":
      return layout(
        "Mission terminée",
        `
<h2>Bravo 🎉</h2>

<p>
  Tes économies viennent de faire avancer ton projet
  <strong>${data.projectTitle ?? ""}</strong>
  de
  <strong>${data.savedAmount ?? 0} €</strong>.
</p>
`
      );

    default:
      return layout(
        "PiloEco",
        `
<h2>Notification</h2>

<p>
  ${data.notificationMessage ?? ""}
</p>
`
      );
  }
}