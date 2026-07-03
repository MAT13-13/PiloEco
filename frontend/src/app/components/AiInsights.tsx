const insights = [
  "Tu peux économiser environ 214 € ce mois-ci.",
  "Tes abonnements semblent élevés : vérifie Netflix, téléphone et assurances.",
  "Tes dépenses alimentation ont augmenté par rapport au mois dernier.",
];

export default function AiInsights() {
  return (
    <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
      <h2 className="text-xl font-bold text-green-400">
        🤖 Conseils de Pilo IA
      </h2>

      <div className="mt-5 space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="rounded-xl border border-green-500/20 bg-slate-950 p-4 text-slate-300"
          >
            💡 {insight}
          </div>
        ))}
      </div>
    </div>
  );
}