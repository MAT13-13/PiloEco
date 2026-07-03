type Props = {
  titre: string;
  emoji: string;
  economie: number;
};

export default function OpportunityCard({ titre, emoji, economie }: Props) {
  return (
    <div className="mt-8 rounded-2xl border border-green-500 bg-slate-900 p-6">
      <p className="text-sm font-bold text-green-400">🐦 Conseil de Pilo</p>

      <h2 className="mt-3 text-2xl font-bold">
        {emoji} Je commencerais par {titre}
      </h2>

      <p className="mt-4 text-slate-300">
        C&apos;est probablement là que tu gagneras le plus.
      </p>

      <p className="mt-4 text-green-400 font-bold">
        Économie estimée : {economie} € / mois
      </p>

      <button className="mt-6 w-full rounded-xl bg-green-500 py-3 font-bold text-black hover:bg-green-600">
        Voir comment économiser
      </button>
    </div>
  );
}