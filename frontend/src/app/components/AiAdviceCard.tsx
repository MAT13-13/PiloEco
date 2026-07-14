"use client";

type Props = {
  advice: string | null;
};

export default function AiAdviceCard({
  advice,
}: Props) {
  return (
    <section className="mt-6 rounded-3xl border border-green-500/20 bg-green-500/10 p-8">
      <p className="font-bold text-green-400">
        🤖 Conseil de Pilo
      </p>

      <p className="mt-4 whitespace-pre-line leading-8 text-slate-300">
        {advice || "Pilo n’a pas encore généré de conseil."}
      </p>
    </section>
  );
}
