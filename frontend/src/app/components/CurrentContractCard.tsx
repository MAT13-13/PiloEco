"use client";

type Props = {
  provider: string;
  offer: string;
  price: number;
  endDate: string;
  onEdit: () => void;
};

export default function CurrentContractCard({
  provider,
  offer,
  price,
  endDate,
  onEdit,
}: Props) {
  return (
    <section className="relative mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
      <button
        type="button"
        onClick={onEdit}
        className="absolute right-6 top-6 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-4 py-2 font-bold text-slate-300 transition hover:border-green-500/40 hover:text-green-400"
      >
        ✏️ Modifier
      </button>

      <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
        Ton contrat
      </p>

      <p className="mt-5 pr-32 text-3xl font-black">
        {provider || "Non renseigné"}
      </p>

      {offer && (
        <p className="mt-2 text-slate-400">
          {offer}
        </p>
      )}

      <p className="mt-5 text-4xl font-black text-white">
        {price.toLocaleString("fr-FR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}{" "}
        €/mois
      </p>

      {endDate && (
        <p className="mt-4 text-sm text-slate-400">
          Échéance :{" "}
          {new Date(`${endDate}T12:00:00`).toLocaleDateString("fr-FR")}
        </p>
      )}
    </section>
  );
}
