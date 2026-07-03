export default function PiloPremiumCard() {
  return (
    <section className="mt-12 overflow-hidden rounded-[2rem] border border-green-500/20 bg-gradient-to-br from-green-950 via-slate-900 to-slate-950">
      <div className="grid items-center gap-10 p-10 lg:grid-cols-[280px_1fr]">

        <div className="flex justify-center">
          <img
            src="/pilo.png"
            alt="Pilo Premium"
            className="h-72 w-72 object-contain drop-shadow-[0_20px_70px_rgba(34,197,94,0.45)]"
          />
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            💎 Pilo Premium
          </p>

          <h2 className="mt-4 text-5xl font-black text-white">
            Je peux continuer à veiller sur ton portefeuille.
          </h2>

          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-slate-300">
            Même lorsque tu n'es pas connecté, je continue de rechercher des
            économies et je te préviens dès qu'une opportunité apparaît.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">

            <div className="rounded-2xl bg-white/5 p-5">
              🔔 Alertes automatiques
            </div>

            <div className="rounded-2xl bg-white/5 p-5">
              📅 Surveillance des contrats
            </div>

            <div className="rounded-2xl bg-white/5 p-5">
              🤝 Accompagnement au changement
            </div>

            <div className="rounded-2xl bg-white/5 p-5">
              🌿 Accès à PiloLife
            </div>

          </div>

          <button className="mt-10 rounded-2xl bg-green-500 px-10 py-5 text-xl font-black text-slate-950 transition hover:bg-green-400">
            Découvrir Pilo Premium
          </button>
        </div>
      </div>
    </section>
  );
}