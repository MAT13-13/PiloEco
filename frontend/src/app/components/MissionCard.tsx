"use client";

import type { Mission } from "../services/missions.service";

type Props = {
  missions: Mission[];
};

export default function MissionCard({ missions }: Props) {
  function handleMissionDone(mission: Mission) {
    alert(`Mission validée : ${mission.title}`);
  }

  return (
    <section className="mt-8 rounded-3xl border border-green-500/20 bg-slate-900 p-8">
      <p className="text-sm font-bold uppercase text-green-400">
        Mode Mission
      </p>

      <h2 className="mt-3 text-3xl font-black text-white">
        🎯 Missions personnalisées
      </h2>

      <p className="mt-3 text-slate-400">
        Ces missions sont générées automatiquement par Pilo selon tes dépenses.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {missions.map((mission) => (
          <div
            key={mission.title}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:border-green-500"
          >
            <h3 className="text-xl font-bold text-white">{mission.title}</h3>

            {"subtitle" in mission && (
              <p className="mt-4 text-slate-400">{String(mission.subtitle)}</p>
            )}

            {"saving" in mission && (
              <div className="mt-6 rounded-xl bg-green-500/10 p-3 text-center font-bold text-green-400">
                🎁 Économie possible : {String(mission.saving)} €
              </div>
            )}

            <button
              onClick={() => handleMissionDone(mission)}
              className="mt-5 w-full rounded-xl bg-green-500 px-4 py-3 font-bold text-black transition hover:bg-green-400"
            >
              ✅ J’ai réalisé cette mission
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}