import MonitoringCard from "./MonitoringCard";
import MonitoringHeader from "./MonitoringHeader";
import { MonitoringCard as Card } from "../types/monitoring";

type Props = {
  cards: Card[];
};

export default function MonitoringDashboard({ cards }: Props) {
  return (
    <>
      <MonitoringHeader />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <MonitoringCard key={card.id} card={card} />
        ))}
      </div>
    </>
  );
}