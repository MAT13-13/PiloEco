import { piloMessages } from "../data/piloMessages";

type Props = {
  economie: number;
};

export default function PiloCard({ economie }: Props) {
  let message = "";
  let humeur = "😊";

  if (economie < 20) {
    humeur = "🙂";
    message = piloMessages.faible;
  } else if (economie < 50) {
    humeur = "😄";
    message = piloMessages.moyen;
  } else if (economie < 100) {
    humeur = "🤩";
    message = piloMessages.bon;
  } else {
    humeur = "🥳";
    message = piloMessages.excellent;
  }

  return (
    <div className="mt-8 rounded-2xl border border-green-500 bg-slate-900 p-6 shadow-lg">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-800 text-6xl">
          {humeur}
        </div>

        <div>
          <h2 className="text-3xl font-bold text-green-400">
            {piloMessages.bienvenue}
          </h2>

          <p className="text-slate-400">{piloMessages.slogan}</p>
        </div>
      </div>

      <div className="rounded-xl bg-slate-950 p-5 border border-slate-800">
        <p className="text-lg text-white">{message}</p>

        <p className="mt-5 text-green-400 font-bold text-xl">
          💰 {economie} € / mois détectés
        </p>

        <p className="mt-2 text-slate-400">{piloMessages.fin}</p>
      </div>
    </div>
  );
}