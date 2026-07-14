"use client";

type Props = {
  yearlySaving: number;
};

export default function SavingCard({
  yearlySaving,
}: Props) {
  const hasSaving = yearlySaving > 0;

  return (
    <section
      className={`mt-6 rounded-3xl border p-8 ${
        hasSaving
          ? "border-green-500/20 bg-green-500/10"
          : "border-white/10 bg-white/5"
      }`}
    >
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
        Économie estimée
      </p>

      <p
        className={`mt-4 text-5xl font-black ${
          hasSaving ? "text-green-400" : "text-white"
        }`}
      >
        {yearlySaving.toLocaleString("fr-FR")} €/an
      </p>

      <p className="mt-4 text-slate-400">
        {hasSaving
          ? "Une opportunité d’économie a été détectée."
          : "Ton contrat semble déjà compétitif."}
      </p>
    </section>
  );
}
