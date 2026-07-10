import PremiumGate from "../components/PremiumGate";
import MonitoringCard from "../components/MonitoringCard";

function MonitoringDashboard() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:ml-64">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          PiloEco Premium
        </p>

        <h1 className="text-4xl font-black">🦜 Pilo Monitoring</h1>

        <p className="mt-3 text-slate-400">
          Pilo surveille tes contrats, tes hausses de prix et tes économies.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <MonitoringCard
            icon="📱"
            title="Téléphone"
            status="Contrat surveillé"
            saving="96 €/an"
            color="green"
          />

          <MonitoringCard
            icon="⚡"
            title="Électricité"
            status="Meilleure offre trouvée"
            saving="184 €/an"
            color="orange"
          />

          <MonitoringCard
            icon="🏠"
            title="Habitation"
            status="Échéance proche"
            saving="132 €/an"
            color="blue"
          />

          <MonitoringCard
            icon="🚗"
            title="Assurance auto"
            status="Hausse détectée"
            saving="84 €/an"
            color="red"
          />

          <MonitoringCard
            icon="🏦"
            title="Banque"
            status="Frais stables"
            saving="0 €"
            color="green"
          />

          <MonitoringCard
            icon="📺"
            title="Streaming"
            status="Abonnement oublié"
            saving="144 €/an"
            color="orange"
          />
        </div>
      </div>
    </main>
  );
}

export default function MonitoringPage() {
  return (
    <PremiumGate
      title="Surveillance 24h/24"
      description="Pilo surveille tes contrats, tes prix et tes échéances en permanence."
    >
      <MonitoringDashboard />
    </PremiumGate>
  );
}