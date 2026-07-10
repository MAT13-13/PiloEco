type Props = {
  onCreate: () => void;
};

export default function PiloLifeEmptyState({ onCreate }: Props) {
  return (
    <section className="mt-10 rounded-3xl border border-green-500/30 bg-slate-900 p-10 text-center">
      <img src="/pilo.png" alt="Pilo" className="mx-auto h-56" />

      <h2 className="mt-6 text-3xl font-black">Bienvenue dans PiloLife</h2>

      <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
        Les économies sont plus motivantes lorsqu'elles servent votre vie.
        Créez votre premier objectif et laissez Pilo vous accompagner.
      </p>

      <button
        onClick={onCreate}
        className="mt-8 rounded-2xl bg-green-500 px-8 py-4 text-lg font-bold text-black transition hover:bg-green-400"
      >
        🌿 Créer mon premier objectif
      </button>
    </section>
  );
}