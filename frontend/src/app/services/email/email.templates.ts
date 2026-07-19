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
<title>${title}</title>
</head>

<body style="
margin:0;
padding:40px;
background:#f4f7f5;
font-family:Arial,sans-serif;
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

<hr style="margin:40px 0;border:none;border-top:1px solid #eee;" />

<p style="
color:#777;
font-size:13px;
">

Tu reçois cet email car tu utilises PiloEco Premium.

</p>

</div>

</body>
</html>
`;
}

export function generateEmailTemplate(
  type: EmailType,
  data: EmailTemplateData
) {
  switch (type) {
    case "better_offer":
      return layout(
        "Nouvelle meilleure offre",
        `
<h2>Pilo a trouvé une meilleure offre 🎉</h2>

<p>

Tu peux économiser

<b>${data.yearlySaving ?? 0} €/an</b>

en changeant simplement de contrat.

</p>

<p>

👉 Offre recommandée :
<b>${data.betterProvider ?? ""}</b>

</p>

<a
href="${data.actionUrl ?? "#"}"
style="
display:inline-block;
padding:14px 24px;
background:#16a34a;
color:white;
text-decoration:none;
border-radius:12px;
font-weight:bold;
"
>

Voir l'offre

</a>
`
      );

    case "contract_end":
      return layout(
        "Fin d'engagement",
        `
<h2>Ton contrat arrive bientôt à échéance ⏰</h2>

<p>

Le contrat chez

<b>${data.provider}</b>

arrive bientôt à sa fin.

</p>

<a
href="${data.actionUrl ?? "#"}"
style="
display:inline-block;
padding:14px 24px;
background:#16a34a;
color:white;
text-decoration:none;
border-radius:12px;
font-weight:bold;
"
>

Comparer les offres

</a>
`
      );

    case "mission_completed":
      return layout(
        "Mission terminée",
        `
<h2>Bravo 🎉</h2>

<p>

Tes économies viennent de faire avancer ton projet

<b>${data.projectTitle}</b>

de

<b>${data.savedAmount} €</b>

!

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