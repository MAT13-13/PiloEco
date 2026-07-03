type Recommandation = {
  categorie: string;
  priorite: string;
  economie: number;
  action: string;
};

type Props = {
  score: number;
  savings: number;
  recommandations?: Recommandation[];
  conseilsIA?: string[];
};

const emojis: Record<string, string> = {
  Téléphone: "📱",
  Internet: "🌐",
  Assurance: "🛡️",
  Électricité: "⚡",
};
import { think } from "../../pilo/brain";
export default function PiloAssistant({
  score,
  savings,
  recommandations = [],
  conseilsIA = [],
}: Props) {
  const pilo = think(score);
  return (
    <div className="mt-8 rounded-3xl border border-green-500/20 bg-gradient-to-r from-slate-950 to-slate-900 p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500 text-3xl">
          🤖
        </div>

        <div className="flex-1">
          <p className="text-lg font-bold text-green-400">
            Assistant Pilo
          </p>

          <div className="mt-3 space-y-3">
  <p className="text-slate-300">
    {pilo.intro}
  </p>

  <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
    <p className="font-semibold text-green-400">
      💡 Mon conseil
    </p>

    <p className="mt-2 text-slate-300">
      {pilo.advice}
    </p>
  </div>

  <p className="italic text-slate-400">
    {pilo.motivation}
  </p>
</div>

          <div className="mt-6 space-y-4">
            {recommandations.map((item) => (
              <div
                key={item.categorie}
                className="rounded-xl bg-slate-950 border border-slate-800 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">
                    {emojis[item.categorie]} {item.categorie}
                  </span>

                  <span className="font-bold text-green-400">
                    {item.economie} €/an
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-400">
                  Priorité : {item.priorite}
                </p>

                <p className="mt-2 text-slate-300">
                  {item.action}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-green-500/20 bg-slate-950 p-5">
            <h3 className="mb-4 font-bold text-green-400">
              🧠 Diagnostic IA
            </h3>

            {conseilsIA.map((conseil, index) => (
              <p
                key={index}
                className="mb-3 rounded-lg bg-slate-900 p-3 text-slate-300"
              >
                {conseil}
              </p>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-green-500/10 p-5">
            <p className="font-bold text-green-400">
              Score Pilo : {score}/100
            </p>

            <p className="mt-2 text-slate-300">
              Potentiel total estimé :
              <span className="ml-2 font-bold text-green-400">
                {savings} €/an
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}