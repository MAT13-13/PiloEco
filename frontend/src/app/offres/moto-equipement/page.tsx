"use client";

const LA_BECANERIE_URL =
  "https://track.effiliation.com/servlet/effi.click?id_compteur=23301538";

export default function MotoEquipementOffersPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          PiloEco
        </p>

        <h1 className="mt-3 text-4xl font-black">
          🏍️ Moto & équipement
        </h1>

        <p className="mt-4 text-slate-300">
          Découvre une solution partenaire pour entretenir,
          réparer ou équiper ta moto.
        </p>

        <article className="mt-10 rounded-3xl border border-green-500/30 bg-slate-900 p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
              Partenaire Pilo
            </p>

            <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
              Disponible
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-black">
            La Bécanerie
          </h2>

          <p className="mt-5 text-slate-300">
            Pièces, accessoires, équipements du pilote et
            solutions pour l’entretien de ta moto.
          </p>

          <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
            Tu seras redirigé vers le site du partenaire.
            Tu restes libre de poursuivre ou non ton achat.
          </div>

          <a
            href={LA_BECANERIE_URL}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="mt-7 inline-flex rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-green-400"
          >
            Découvrir La Bécanerie
          </a>
        </article>
      </div>
    </main>
  );
}