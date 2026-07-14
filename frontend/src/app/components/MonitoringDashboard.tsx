import MonitoringHeader from "./MonitoringHeader";
import MonitoringCard from "./MonitoringCard";

import type {
  MonitoringCard as MonitoringCardType,
} from "../types/monitoring";

type Props = {
  cards: MonitoringCardType[];
};

export default function MonitoringDashboard({
  cards,
}: Props) {
  return (
    <>
      <MonitoringHeader />

      {cards.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-xl font-bold text-white">
            Aucun contrat surveillé pour le moment
          </p>

          <p className="mt-2 text-slate-400">
            Ajoute un contrat pour que Pilo détecte les échéances,
            les hausses de prix et les économies possibles.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <MonitoringCard
              key={card.id}
              icon={card.icon}
              title={card.title}
              status={card.alert ?? "Aucune alerte détectée"}
              saving={`${card.yearlySaving.toLocaleString(
                "fr-FR"
              )} €/an`}
              color={card.color}
              href={card.href ?? "/recommendations"}
              buttonLabel={card.button}
              currentProvider={card.currentProvider}
              currentOffer={card.currentOffer}
              currentPrice={card.currentPrice}
              detectedProvider={card.detectedProvider}
              detectedOffer={card.detectedOffer}
              detectedPrice={card.detectedPrice}
            />
          ))}
        </div>
      )}
    </>
  );
}