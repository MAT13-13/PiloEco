import Image from "next/image";

type Props = {
  economie: number;
};

export default function HeroPilo({ economie }: Props) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-green-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-green-950 p-8 shadow-2xl">
      <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-green-500/10 blur-3xl" />
      <div className="absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="mb-2 font-semibold uppercase tracking-wider text-green-400">
            PiloEco
          </p>

          <h1 className="text-4xl font-black leading-tight text-white">
            Bonjour 👋
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            Je suis déjà en train d'analyser tes dépenses afin de trouver les
            meilleures économies possibles.
          </p>

          <div className="mt-8 inline-flex items-center rounded-full bg-green-500/20 px-6 py-3">
            <span className="mr-3 text-3xl">💰</span>

            <div>
              <p className="text-sm text-green-300">Economies détectées</p>

              <p className="text-3xl font-black text-white">
                {economie} €/an
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-green-500/20 blur-3xl" />

            <Image
              src="/pilo.png"
              alt="Pilo"
              width={340}
              height={340}
              className="relative z-10 animate-pilo drop-shadow-2xl transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}