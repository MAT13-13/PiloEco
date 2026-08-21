"use client";

const SMART_MARKETING_URL =
  "https://smart-marketing.fr/?utm_source=piloeco&utm_medium=partenaire&utm_campaign=piloeco&utm_id=sm";

export default function VisibiliteGooglePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <a
          href="/missions"
          className="inline-flex rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-slate-300 transition hover:border-green-500/40 hover:text-green-400"
        >
          ← Retour aux missions
        </a>

        <section className="mt-8 overflow-hidden rounded-3xl border border-green-500/20 bg-slate-900 p-6 sm:p-8">
          <div className="text-5xl">📍</div>

          <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-green-400">
            Pro & Entreprises
          </p>

          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            Améliore ta visibilité sur Google
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
            Fais connaître ton entreprise localement et développe ta présence
            sur Google et Google Maps grâce à un accompagnement spécialisé.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-green-400">
              Partenaire PiloEco
            </p>

            <h2 className="mt-2 text-2xl font-black">Smart Marketing</h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Smart Marketing accompagne les professionnels dans
              l’optimisation de leur fiche Google Business Profile afin
              d’améliorer leur visibilité locale sur Google et Google Maps.
            </p>

            <a
              href={SMART_MARKETING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-green-500 px-5 py-4 text-center text-sm font-black text-slate-950 transition hover:bg-green-400 sm:w-auto"
            >
              🚀 Améliorer ma visibilité
            </a>
          </div>

          <p className="mt-5 text-xs leading-5 text-slate-500">
            Tu seras redirigé vers le site de Smart Marketing pour découvrir
            l’accompagnement proposé.
          </p>
        </section>
      </div>
    </main>
  );
}