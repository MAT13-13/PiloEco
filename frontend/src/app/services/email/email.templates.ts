import type {
  EmailTemplateData,
  EmailType,
} from "./email.types";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://pilo-eco.vercel.app";

function escapeHtml(value?: string) {
  if (!value) {
    return "";
  }

  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMoney(value?: number) {
  return Math.round(
    Math.max(0, value ?? 0)
  ).toLocaleString("fr-FR");
}

function greeting(firstName?: string) {
  const safeFirstName =
    escapeHtml(firstName?.trim());

  return safeFirstName
    ? `Bonjour ${safeFirstName} 👋`
    : "Bonjour 👋";
}

function actionButton(
  label: string,
  url?: string
) {
  const safeUrl =
    url && url.startsWith("http")
      ? url
      : APP_URL;

  return `
<table
  role="presentation"
  width="100%"
  cellspacing="0"
  cellpadding="0"
  border="0"
  style="margin-top:28px;"
>
  <tr>
    <td align="center">
      <a
        href="${safeUrl}"
        style="
          display:inline-block;
          padding:16px 28px;
          border-radius:14px;
          background:#22c55e;
          color:#052e16;
          font-size:16px;
          font-weight:800;
          text-decoration:none;
          box-shadow:0 10px 25px rgba(34,197,94,0.25);
        "
      >
        ${label}
      </a>
    </td>
  </tr>
</table>
`;
}

function metricCard(input: {
  icon: string;
  label: string;
  value: string;
  description?: string;
}) {
  return `
<table
  role="presentation"
  width="100%"
  cellspacing="0"
  cellpadding="0"
  border="0"
  style="
    margin:24px 0;
    border:1px solid #bbf7d0;
    border-radius:18px;
    background:#f0fdf4;
  "
>
  <tr>
    <td style="padding:24px;">
      <p style="
        margin:0;
        color:#15803d;
        font-size:14px;
        font-weight:800;
        text-transform:uppercase;
        letter-spacing:0.06em;
      ">
        ${input.icon} ${input.label}
      </p>

      <p style="
        margin:10px 0 0;
        color:#14532d;
        font-size:34px;
        line-height:1.1;
        font-weight:900;
      ">
        ${input.value}
      </p>

      ${
        input.description
          ? `
      <p style="
        margin:8px 0 0;
        color:#4b5563;
        font-size:14px;
        line-height:1.6;
      ">
        ${input.description}
      </p>
      `
          : ""
      }
    </td>
  </tr>
</table>
`;
}

function infoBox(
  title: string,
  content: string,
  icon = "💡"
) {
  return `
<table
  role="presentation"
  width="100%"
  cellspacing="0"
  cellpadding="0"
  border="0"
  style="
    margin:26px 0;
    border-radius:16px;
    background:#f8fafc;
    border:1px solid #e2e8f0;
  "
>
  <tr>
    <td style="padding:22px;">
      <p style="
        margin:0;
        color:#0f172a;
        font-size:16px;
        font-weight:800;
      ">
        ${icon} ${title}
      </p>

      <div style="
        margin-top:10px;
        color:#475569;
        font-size:15px;
        line-height:1.7;
      ">
        ${content}
      </div>
    </td>
  </tr>
</table>
`;
}

function featureRow(
  icon: string,
  title: string,
  description: string
) {
  return `
<tr>
  <td
    width="42"
    valign="top"
    style="
      padding:14px 0;
      font-size:24px;
    "
  >
    ${icon}
  </td>

  <td
    valign="top"
    style="
      padding:14px 0;
      border-bottom:1px solid #e2e8f0;
    "
  >
    <p style="
      margin:0;
      color:#0f172a;
      font-size:15px;
      font-weight:800;
    ">
      ${title}
    </p>

    <p style="
      margin:5px 0 0;
      color:#64748b;
      font-size:14px;
      line-height:1.5;
    ">
      ${description}
    </p>
  </td>
</tr>
`;
}

function layout(input: {
  title: string;
  eyebrow?: string;
  heroTitle: string;
  heroText?: string;
  content: string;
}) {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <meta
    name="color-scheme"
    content="light"
  />
  <title>${escapeHtml(input.title)}</title>
</head>

<body style="
  margin:0;
  padding:0;
  background:#eef3ef;
  font-family:Arial,Helvetica,sans-serif;
  color:#0f172a;
">

  <div style="
    display:none;
    max-height:0;
    overflow:hidden;
    opacity:0;
    color:transparent;
  ">
    ${escapeHtml(input.heroText ?? input.heroTitle)}
  </div>

  <table
    role="presentation"
    width="100%"
    cellspacing="0"
    cellpadding="0"
    border="0"
    style="background:#eef3ef;"
  >
    <tr>
      <td
        align="center"
        style="padding:28px 14px;"
      >

        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style="
            width:100%;
            max-width:640px;
            border-radius:24px;
            overflow:hidden;
            background:#ffffff;
            box-shadow:0 18px 45px rgba(15,23,42,0.08);
          "
        >

          <tr>
            <td style="
              padding:28px 34px;
              background:linear-gradient(
                135deg,
                #052e16 0%,
                #166534 55%,
                #22c55e 100%
              );
            ">
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
              >
                <tr>
                  <td>
                    <p style="
                      margin:0;
                      color:#ffffff;
                      font-size:25px;
                      font-weight:900;
                    ">
                      🐦 PiloEco
                    </p>

                    <p style="
                      margin:6px 0 0;
                      color:#dcfce7;
                      font-size:13px;
                      font-weight:600;
                    ">
                      Ton copilote d'économies
                    </p>
                  </td>

                  <td
                    align="right"
                    valign="middle"
                  >
                    <span style="
                      display:inline-block;
                      padding:8px 12px;
                      border-radius:999px;
                      background:rgba(255,255,255,0.16);
                      color:#ffffff;
                      font-size:12px;
                      font-weight:800;
                    ">
                      ⭐ Premium
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="
              padding:34px 34px 22px;
              background:#f8fff9;
            ">
              ${
                input.eyebrow
                  ? `
              <p style="
                margin:0 0 12px;
                color:#16a34a;
                font-size:12px;
                font-weight:900;
                text-transform:uppercase;
                letter-spacing:0.12em;
              ">
                ${input.eyebrow}
              </p>
              `
                  : ""
              }

              <h1 style="
                margin:0;
                color:#0f172a;
                font-size:32px;
                line-height:1.18;
                font-weight:900;
              ">
                ${input.heroTitle}
              </h1>

              ${
                input.heroText
                  ? `
              <p style="
                margin:16px 0 0;
                color:#475569;
                font-size:16px;
                line-height:1.7;
              ">
                ${input.heroText}
              </p>
              `
                  : ""
              }
            </td>
          </tr>

          <tr>
            <td style="
              padding:12px 34px 38px;
              background:#ffffff;
            ">
              ${input.content}
            </td>
          </tr>

          <tr>
            <td style="
              padding:28px 34px;
              background:#0f172a;
              text-align:center;
            ">
              <p style="
                margin:0;
                font-size:24px;
              ">
                🐦
              </p>

              <p style="
                margin:12px 0 0;
                color:#f8fafc;
                font-size:15px;
                line-height:1.6;
                font-weight:800;
              ">
                Chaque euro économisé est un pas
                vers tes projets.
              </p>

              <p style="
                margin:12px 0 0;
                color:#94a3b8;
                font-size:13px;
                line-height:1.6;
              ">
                Merci de faire confiance à PiloEco 💚
              </p>

              <p style="
                margin:18px 0 0;
                color:#64748b;
                font-size:11px;
                line-height:1.6;
              ">
                Tu reçois cet email car tu utilises
                PiloEco ou l'une de ses fonctionnalités.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
}

export function generateEmailTemplate(
  type: EmailType,
  data: EmailTemplateData
) {
  const safeProvider = escapeHtml(
    data.provider
  );

  const safeCurrentProvider = escapeHtml(
    data.currentProvider
  );

  const safeBetterProvider = escapeHtml(
    data.betterProvider
  );

  const safeOffer = escapeHtml(data.offer);

  const safeProjectTitle = escapeHtml(
    data.projectTitle
  );

  const safeMessage = escapeHtml(
    data.notificationMessage
  );

  const yearlySaving =
    formatMoney(data.yearlySaving);

  const monthlySaving =
    data.monthlySaving ??
    Math.round(
      Math.max(0, data.yearlySaving ?? 0) /
        12
    );

  switch (type) {
    case "welcome":
      return layout({
        title: "Bienvenue sur PiloEco",
        eyebrow: "Bienvenue",
        heroTitle:
          "👋 Bienvenue dans l'univers PiloEco",
        heroText:
          "Pilo va t'aider à repérer tes dépenses, trouver des économies et transformer chaque gain en projet concret.",
        content: `
<p style="
  margin:20px 0 0;
  color:#334155;
  font-size:16px;
  line-height:1.7;
">
  ${greeting(data.firstName)}
</p>

${infoBox(
  "Ton premier pas",
  `
  Commence par renseigner tes dépenses et tes contrats.
  Pilo pourra ensuite te proposer les missions les plus
  utiles pour toi.
  `,
  "🚀"
)}

${actionButton(
  "Découvrir PiloEco",
  data.actionUrl ?? `${APP_URL}/dashboard`
)}
`,
      });

    case "premium":
      return layout({
        title:
          "Bienvenue dans Pilo Premium",
        eyebrow:
          "Abonnement activé",
        heroTitle:
          "🎉 Bienvenue dans Pilo Premium",
        heroText:
          "Ton paiement est confirmé. Pilo peut maintenant travailler encore plus efficacement pour tes économies.",
        content: `
<p style="
  margin:20px 0 0;
  color:#334155;
  font-size:16px;
  line-height:1.7;
">
  ${greeting(data.firstName)}
</p>

<p style="
  margin:14px 0 0;
  color:#475569;
  font-size:16px;
  line-height:1.7;
">
  Ton abonnement est maintenant actif.
  Tu peux immédiatement profiter de toutes
  les fonctionnalités Premium de PiloEco.
</p>

<table
  role="presentation"
  width="100%"
  cellspacing="0"
  cellpadding="0"
  border="0"
  style="margin-top:24px;"
>
  ${featureRow(
    "🌱",
    "PiloLife",
    "Transforme tes économies en projets de vie."
  )}

  ${featureRow(
    "📊",
    "Monitoring intelligent",
    "Surveille tes contrats et tes dépenses automatiquement."
  )}

  ${featureRow(
    "💰",
    "Détection des économies",
    "Découvre les offres et missions les plus rentables."
  )}

  ${featureRow(
    "🔔",
    "Alertes personnalisées",
    "Sois prévenu des hausses, baisses et fins d'engagement."
  )}

  ${featureRow(
    "📧",
    "Emails intelligents",
    "Reçois les informations utiles au bon moment."
  )}
</table>

${infoBox(
  "Le conseil de Pilo",
  `
  Crée ton premier projet PiloLife, puis ajoute
  tes contrats à surveiller. Pilo pourra ainsi
  relier chaque économie à un objectif concret.
  `
)}

${actionButton(
  "🚀 Ouvrir Pilo Premium",
  data.actionUrl ?? `${APP_URL}/pilolife`
)}
`,
      });

    case "better_offer":
      return layout({
        title:
          "Une meilleure offre a été détectée",
        eyebrow:
          "Économie détectée",
        heroTitle:
          "💰 Pilo a trouvé une meilleure offre",
        heroText:
          "Une opportunité pourrait réduire le coût de ton contrat actuel.",
        content: `
<p style="
  margin:20px 0 0;
  color:#334155;
  font-size:16px;
  line-height:1.7;
">
  ${greeting(data.firstName)}
</p>

${
  safeCurrentProvider ||
  safeBetterProvider
    ? infoBox(
        "Comparaison de l'offre",
        `
        ${
          safeCurrentProvider
            ? `<p style="margin:0 0 8px;">
                Offre actuelle :
                <strong>${safeCurrentProvider}</strong>
              </p>`
            : ""
        }

        ${
          safeBetterProvider
            ? `<p style="margin:0;">
                Offre recommandée :
                <strong>${safeBetterProvider}</strong>
              </p>`
            : ""
        }
        `,
        "🔎"
      )
    : ""
}

${metricCard({
  icon: "💰",
  label: "Économie potentielle",
  value: `${yearlySaving} €/an`,
  description: `Environ ${formatMoney(
    monthlySaving
  )} € économisés chaque mois.`,
})}

${infoBox(
  "Le conseil de Pilo",
  `
  Vérifie les garanties, les frais éventuels
  et la durée d'engagement avant de changer
  d'offre.
  `
)}

${actionButton(
  "Voir la recommandation",
  data.actionUrl ?? `${APP_URL}/monitoring`
)}
`,
      });

    case "price_up":
      return layout({
        title:
          "Une hausse de prix a été détectée",
        eyebrow:
          "Alerte prix",
        heroTitle:
          "📈 Le prix de ton contrat a augmenté",
        heroText:
          "Pilo a repéré une évolution qui mérite ton attention.",
        content: `
<p style="
  margin:20px 0 0;
  color:#334155;
  font-size:16px;
  line-height:1.7;
">
  ${greeting(data.firstName)}
</p>

${infoBox(
  "Contrat concerné",
  `
  <p style="margin:0;">
    ${
      safeProvider
        ? `Fournisseur : <strong>${safeProvider}</strong>`
        : "Un de tes contrats surveillés est concerné."
    }
  </p>

  ${
    safeOffer
      ? `<p style="margin:8px 0 0;">
          Offre : <strong>${safeOffer}</strong>
        </p>`
      : ""
  }
  `,
  "📄"
)}

${metricCard({
  icon: "📈",
  label: "Nouveau prix",
  value: `${formatMoney(
    data.newPrice
  )} €/mois`,
  description:
    data.currentPrice !== undefined
      ? `Ancien prix : ${formatMoney(
          data.currentPrice
        )} €/mois.`
      : undefined,
})}

${infoBox(
  "Le conseil de Pilo",
  `
  Consulte les offres disponibles avant la
  prochaine échéance. Une comparaison rapide
  peut parfois compenser entièrement cette hausse.
  `
)}

${actionButton(
  "Comparer les offres",
  data.actionUrl ?? `${APP_URL}/monitoring`
)}
`,
      });

    case "price_down":
      return layout({
        title:
          "Une baisse de prix a été détectée",
        eyebrow:
          "Bonne nouvelle",
        heroTitle:
          "📉 Le prix de ton contrat a baissé",
        heroText:
          "Pilo a repéré une évolution favorable sur l'un de tes contrats.",
        content: `
<p style="
  margin:20px 0 0;
  color:#334155;
  font-size:16px;
  line-height:1.7;
">
  ${greeting(data.firstName)}
</p>

${infoBox(
  "Contrat concerné",
  `
  ${
    safeProvider
      ? `<p style="margin:0;">
          Fournisseur :
          <strong>${safeProvider}</strong>
        </p>`
      : ""
  }

  ${
    safeOffer
      ? `<p style="margin:8px 0 0;">
          Offre :
          <strong>${safeOffer}</strong>
        </p>`
      : ""
  }
  `,
  "📄"
)}

${metricCard({
  icon: "📉",
  label: "Nouveau prix",
  value: `${formatMoney(
    data.newPrice
  )} €/mois`,
  description:
    data.currentPrice !== undefined
      ? `Ancien prix : ${formatMoney(
          data.currentPrice
        )} €/mois.`
      : "Ton contrat devient plus avantageux.",
})}

${actionButton(
  "Voir mon contrat",
  data.actionUrl ?? `${APP_URL}/monitoring`
)}
`,
      });

    case "contract_end":
      return layout({
        title:
          "Ton contrat arrive à échéance",
        eyebrow:
          "Échéance prochaine",
        heroTitle:
          "⏰ Il est bientôt temps de comparer",
        heroText:
          "La fin d'engagement est souvent le meilleur moment pour négocier ou changer d'offre.",
        content: `
<p style="
  margin:20px 0 0;
  color:#334155;
  font-size:16px;
  line-height:1.7;
">
  ${greeting(data.firstName)}
</p>

${infoBox(
  "Contrat concerné",
  `
  ${
    safeProvider
      ? `<p style="margin:0;">
          Fournisseur :
          <strong>${safeProvider}</strong>
        </p>`
      : ""
  }

  ${
    data.contractEndDate
      ? `<p style="margin:8px 0 0;">
          Fin d'engagement :
          <strong>${escapeHtml(
            data.contractEndDate
          )}</strong>
        </p>`
      : ""
  }
  `,
  "📅"
)}

${infoBox(
  "Le conseil de Pilo",
  `
  Compare les offres quelques jours avant
  l'échéance pour éviter une reconduction peu
  avantageuse.
  `
)}

${actionButton(
  "Comparer les offres",
  data.actionUrl ?? `${APP_URL}/monitoring`
)}
`,
      });

    case "mission_completed":
      return layout({
        title:
          "Mission terminée",
        eyebrow:
          "Mission réussie",
        heroTitle:
          "🎉 Bravo, une nouvelle économie est validée",
        heroText:
          "Ton action vient de faire progresser tes économies et ton projet PiloLife.",
        content: `
<p style="
  margin:20px 0 0;
  color:#334155;
  font-size:16px;
  line-height:1.7;
">
  ${greeting(data.firstName)}
</p>

${metricCard({
  icon: "💰",
  label: "Économie ajoutée",
  value: `${formatMoney(
    data.savedAmount
  )} €`,
  description: safeProjectTitle
    ? `Cette économie fait avancer ton projet « ${safeProjectTitle} ».`
    : "Cette économie a été ajoutée à ta progression.",
})}

${infoBox(
  "Continue comme ça",
  `
  Chaque mission terminée rapproche un peu
  plus ton objectif de sa réalisation.
  `,
  "🌱"
)}

${actionButton(
  "Voir ma progression",
  data.actionUrl ?? `${APP_URL}/pilolife`
)}
`,
      });

    case "pilolife_progress": {
      const progress =
        data.targetAmount &&
        data.targetAmount > 0
          ? Math.min(
              100,
              Math.round(
                ((data.savedAmount ?? 0) /
                  data.targetAmount) *
                  100
              )
            )
          : 0;

      return layout({
        title:
          "Ton projet PiloLife avance",
        eyebrow:
          "Progression PiloLife",
        heroTitle:
          "🌱 Ton projet continue de grandir",
        heroText:
          "Tes économies prennent progressivement la forme d'un véritable projet.",
        content: `
<p style="
  margin:20px 0 0;
  color:#334155;
  font-size:16px;
  line-height:1.7;
">
  ${greeting(data.firstName)}
</p>

${metricCard({
  icon: "🎯",
  label:
    safeProjectTitle ||
    "Progression de ton projet",
  value: `${progress} %`,
  description: `${formatMoney(
    data.savedAmount
  )} € économisés sur un objectif de ${formatMoney(
    data.targetAmount
  )} €.`,
})}

<table
  role="presentation"
  width="100%"
  cellspacing="0"
  cellpadding="0"
  border="0"
  style="margin:24px 0;"
>
  <tr>
    <td style="
      height:12px;
      border-radius:999px;
      background:#e2e8f0;
      overflow:hidden;
    ">
      <div style="
        width:${progress}%;
        height:12px;
        border-radius:999px;
        background:#22c55e;
      "></div>
    </td>
  </tr>
</table>

${infoBox(
  "Le conseil de Pilo",
  `
  Termine une nouvelle mission ou valide une
  économie pour accélérer encore ton projet.
  `
)}

${actionButton(
  "Voir mon projet",
  data.actionUrl ?? `${APP_URL}/pilolife`
)}
`,
      });
    }

    default:
      return layout({
        title:
          data.notificationTitle ??
          "Notification PiloEco",
        eyebrow:
          "Information PiloEco",
        heroTitle:
          escapeHtml(
            data.notificationTitle ??
              "🐦 Pilo a une information pour toi"
          ),
        heroText:
          "Une nouvelle information est disponible dans ton espace PiloEco.",
        content: `
<p style="
  margin:20px 0 0;
  color:#334155;
  font-size:16px;
  line-height:1.7;
">
  ${greeting(data.firstName)}
</p>

${infoBox(
  "Message de Pilo",
  safeMessage ||
    "Une nouvelle information est disponible dans ton espace.",
  "🔔"
)}

${actionButton(
  "Ouvrir PiloEco",
  data.actionUrl ?? APP_URL
)}
`,
      });
  }
}