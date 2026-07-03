type Props = {
  title: string;
  provider: string;
  currentPrice: number;
  partnerPrice: number;
  saving: number;
  url: string;
};

export default function PartnerOfferCard({
  title,
  provider,
  currentPrice,
  partnerPrice,
  saving,
  url,
}: Props) {
  return (
    <div className="rounded-2xl border border-green-500/20 bg-slate-950 p-6 transition hover:border-green-400">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">{title}</h3>

        <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-bold text-green-400">
          {saving} €/an
        </span>
      </div>

      <div className="mt-6 space-y-2 text-slate-300">
        <p>Fournisseur recommandé : <b>{provider}</b></p>
        <p>Prix actuel : <b>{currentPrice.toFixed(2)} €/mois</b></p>
        <p>Prix estimé : <b className="text-green-400">{partnerPrice.toFixed(2)} €/mois</b></p>
      </div>

      <a
        href={url}
        target="_blank"
        className="mt-6 block w-full rounded-xl bg-green-500 py-3 text-center font-bold text-slate-950 transition hover:bg-green-400"
      >
        Comparer maintenant
      </a>
    </div>
  );
}