"use client";

import type { Mission } from "../services/missions.service";

type Props = {
  missions: Mission[];
};

export default function MissionCard({ missions }: Props) {
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
            <h3 className="text-xl font-bold text-white">
              {mission.title}
            </h3>

            <p className="mt-4 text-slate-400">
              {mission.description}
            </p>

            <div className="mt-6 rounded-xl bg-green-500/10 p-3 text-center font-bold text-green-400">
              🎁 {mission.reward}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}