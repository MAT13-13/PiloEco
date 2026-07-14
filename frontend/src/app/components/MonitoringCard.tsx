"use client";

import Link from "next/link";

type MonitoringColor =
  | "green"
  | "blue"
  | "orange"
  | "red";

type Props = {
  icon: string;
  title: string;
  status: string;
  saving: string;
  color?: MonitoringColor;
  href?: string;
  buttonLabel?: string;
  currentProvider?: string;
  currentOffer?: string;
  currentPrice?: number;
  detectedProvider?: string;
  detectedOffer?: string | null;
  detectedPrice?: number | null;
  onEdit?: () => void;
  onDelete?: () => void;
  onValidateSaving?: () => void;
  validating?: boolean;
  deleting?: boolean;
};

const colorStyles: Record<
  MonitoringColor,
  {
    card: string;
    badge: string;
    badgeLabel: string;
    button: string;
  }
> = {
  green: {
    card: "border-green-500/30 bg-green-500/10",
    badge:
      "border-green-500/30 bg-green-500/15 text-green-300",
    badgeLabel: "Contrat optimisé",
    button: "bg-green-500 hover:bg-green-400",
  },
  blue: {
    card: "border-blue-500/30 bg-blue-500/10",
    badge:
      "border-blue-500/30 bg-blue-500/15 text-blue-300",
    badgeLabel: "À surveiller",
    button: "bg-blue-500 hover:bg-blue-400",
  },
  orange: {
    card: "border-orange-500/30 bg-orange-500/10",
    badge:
      "border-orange-500/30 bg-orange-500/15 text-orange-300",
    badgeLabel: "Opportunité détectée",
    button: "bg-orange-500 hover:bg-orange-400",
  },
  red: {
    card: "border-red-500/30 bg-red-500/10",
    badge:
      "border-red-500/30 bg-red-500/15 text-red-300",
    badgeLabel: "Priorité élevée",
    button: "bg-red-500 hover:bg-red-400",
  },
};

function getBadgeLabel(
  status: string,
  color: MonitoringColor
) {
  const normalizedStatus =
    status.trim().toLowerCase();

  if (normalizedStatus.includes("hausse")) {
    return "📈 Hausse détectée";
  }

  if (normalizedStatus.includes("baisse")) {
    return "📉 Baisse détectée";
  }

  if (
    normalizedStatus.includes("échéance") ||
    normalizedStatus.includes(
      "fin d'engagement"
    )
  ) {
    return "📅 Échéance proche";
  }

  if (
    normalizedStatus.includes(
      "économie validée"
    ) ||
    normalizedStatus.includes("validée")
  ) {
    return "✅ Économie validée";
  }

  if (
    normalizedStatus.includes(
      "meilleure offre"
    ) ||
    normalizedStatus.includes(
      "offre moins chère"
    ) ||
    normalizedStatus.includes(
      "économie estimée"
    ) ||
    normalizedStatus.includes(
      "économiser"
    )
  ) {
    return "💰 Meilleure offre";
  }

  return colorStyles[color].badgeLabel;
}

function formatMonthlyPrice(
  price?: number | null
) {
  if (
    price === undefined ||
    price === null
  ) {
    return null;
  }

  return `${price.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} €/mois`;
}

export default function MonitoringCard({
  icon,
  title,
  status,
  saving,
  color = "green",
  href = "/recommendations",
  buttonLabel = "Voir les recommandations",
  currentProvider,
  currentOffer,
  currentPrice,
  detectedProvider,
  detectedOffer,
  detectedPrice,
  onEdit,
  onDelete,
  onValidateSaving,
  deleting = false,
  validating = false,
}: Props) {
  const style = colorStyles[color];
  const badgeLabel =
    getBadgeLabel(status, color);

  const currentPriceLabel =
    formatMonthlyPrice(currentPrice);

  const detectedPriceLabel =
    formatMonthlyPrice(detectedPrice);

  const hasCurrentContract =
    Boolean(currentProvider) ||
    Boolean(currentOffer) ||
    Boolean(currentPriceLabel);

  const hasRecommendation =
    Boolean(detectedProvider) ||
    Boolean(detectedOffer) ||
    Boolean(detectedPriceLabel);

  const canValidateSaving =
    Boolean(onValidateSaving) &&
    saving !== "0 €/an" &&
    saving !== "0 €";

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[2rem] border p-6 shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${style.card}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/60 text-4xl">
            {icon}
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Monitoring Premium
            </p>

            <h3 className="mt-1 text-xl font-black text-white">
              {title}
            </h3>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-bold ${style.badge}`}
          >
            {badgeLabel}
          </span>

          {(onEdit || onDelete) && (
            <div className="flex flex-wrap justify-end gap-2">
              {onEdit && (
                <button
                  type="button"
                  onClick={onEdit}
                  disabled={deleting}
                  aria-label={`Modifier le contrat ${title}`}
                  title="Modifier le contrat"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm font-bold text-slate-300 transition hover:border-green-500/40 hover:text-green-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  ✏️ Modifier
                </button>
              )}

              {onDelete && (
                <button
                  type="button"
                  onClick={onDelete}
                  disabled={deleting}
                  aria-label={`Supprimer le contrat ${title}`}
                  title="Supprimer le contrat"
                  className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm font-bold text-red-300 transition hover:border-red-400/50 hover:bg-red-500/20 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deleting
                    ? "Suppression..."
                    : "🗑️ Supprimer"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
        <p className="text-sm font-bold text-white">
          Analyse de Pilo
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-300">
          {status}
        </p>
      </div>

      {hasCurrentContract && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/50 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            Ton contrat
          </p>

          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <p className="font-black text-white">
                {currentProvider ||
                  "Fournisseur non renseigné"}
              </p>

              {currentOffer && (
                <p className="mt-1 text-sm text-slate-400">
                  {currentOffer}
                </p>
              )}
            </div>

            {currentPriceLabel && (
              <p className="shrink-0 font-black text-white">
                {currentPriceLabel}
              </p>
            )}
          </div>
        </div>
      )}

      {hasRecommendation && (
        <div className="mt-4 rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
            💡 Recommandation de Pilo
          </p>

          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <p className="font-black text-white">
                {detectedProvider ||
                  "Offre recommandée"}
              </p>

              {detectedOffer && (
                <p className="mt-1 text-sm text-slate-300">
                  {detectedOffer}
                </p>
              )}
            </div>

            {detectedPriceLabel && (
              <p className="shrink-0 font-black text-green-400">
                {detectedPriceLabel}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
        <p className="text-sm text-slate-400">
          Économie potentielle détectée
        </p>

        <p className="mt-2 text-3xl font-black text-green-400">
          {saving}
        </p>
      </div>

      {canValidateSaving && (
        <button
          type="button"
          onClick={onValidateSaving}
          disabled={validating}
          className="mt-4 w-full rounded-2xl bg-green-500 py-4 font-black text-slate-950 transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {validating
            ? "Validation..."
            : "✅ J'ai changé d'offre"}
        </button>
      )}

      <div className="mt-auto pt-6">
        <Link
          href={href}
          className={`block w-full rounded-2xl py-4 text-center font-black text-slate-950 transition ${style.button}`}
        >
          {buttonLabel}
        </Link>
      </div>
    </article>
  );
}