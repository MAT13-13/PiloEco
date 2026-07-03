"use client";

type Insight = {
  icon: string;
  title: string;
  message: string;
  saving: number;
};

type Props = {
  insights: Insight[];
};

export default function PiloInsights({ insights }: Props) {
  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="text-2xl font-black text-white">
        🤖 Analyse de Pilo
      </h2>

      <p className="mt-2 text-slate-400">
        Voici les premières opportunités détectées automatiquement.
      </p>

      <div className="mt-6 space-y-4">
        {insights.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl bg-slate-950 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-bold text-white">
                  {item.icon} {item.title}
                </p>

                <p className="mt-2 text-slate-400">
                  {item.message}
                </p>
              </div>

              <div className="text-right">
                <p className="font-black text-green-400">
                  {item.saving} €/an
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}