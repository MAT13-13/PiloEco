type Props = {
  operateur: string;
  prix: number;
  economie: number;
  url: string;
  meilleur?: boolean;
};

export default function OfferCard({
  operateur,
  prix,
  economie,
  url,
  meilleur = false,
}: Props) {
  return (
    <div
      className={`relative flex items-center justify-between rounded-3xl border p-6 transition hover:scale-[1.02] ${
        meilleur
          ? "border-green-500 bg-green-500/10"
          : "border-white/10 bg-slate-900"
      }`}
    >
      {meilleur && (
        <div className="absolute -top-3 left-6 rounded-full bg-green-500 px-4 py-1 text-xs font-black text-slate-950">
          🏆 Meilleur choix
        </div>
      )}

      <div>
        <h3 className="text-2xl font-black text-white">{operateur}</h3>

        <p className="mt-2 text-slate-400">{prix.toFixed(2)} €/mois</p>

        <p className="mt-3 font-bold text-green-400">
          +{economie} €/an économisés
        </p>
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-green-500 px-6 py-3 font-black text-slate-950 transition hover:bg-green-400"
      >
        Voir l'offre
      </a>
    </div>
  );
}