"use client";

import { useState } from "react";
import Link from "next/link";

export default function AnimauxMissionPage() {
  const [nom, setNom] = useState("");
  const [espece, setEspece] = useState("Chien");
  const [age, setAge] = useState(2);
  const [cotisation, setCotisation] = useState(35);

  const prixPilo = 22;
  const economieMensuelle = Math.max(cotisation - prixPilo, 0);
  const economieAnnuelle = economieMensuelle * 12;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">

        <Link
          href="/dashboard"
          className="text-green-400 hover:underline"
        >
          ← Retour au Dashboard
        </Link>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            Mission Pilo
          </p>

          <h1 className="mt-4 text-4xl font-black">
            Comparer ton assurance animaux
          </h1>

          <p className="mt-4 text-slate-300">
            Pilo recherche une assurance mieux adaptée à ton compagnon.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">

            <label>
              <p className="mb-2 font-semibold">Nom de l'animal</p>

              <input
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
              />
            </label>

            <label>
              <p className="mb-2 font-semibold">Espèce</p>

              <select
                value={espece}
                onChange={(e) => setEspece(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
              >
                <option>Chien</option>
                <option>Chat</option>
              </select>
            </label>

            <label>
              <p className="mb-2 font-semibold">Âge</p>

              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
              />
            </label>

            <label>
              <p className="mb-2 font-semibold">
                Cotisation mensuelle
              </p>

              <input
                type="number"
                value={cotisation}
                onChange={(e) => setCotisation(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
              />
            </label>

          </div>

          <div className="mt-10 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">

            <p className="text-green-300">
              Économie annuelle estimée
            </p>

            <h2 className="mt-2 text-5xl font-black text-green-400">
              {economieAnnuelle} €
            </h2>

            <p className="mt-5 text-slate-300">
              Pilo recommande :
            </p>

            <h3 className="mt-2 text-2xl font-black">
              Assurance Animaux Éco
            </h3>

            <p className="mt-3 text-slate-400">
              Ton {espece.toLowerCase()}
              {nom ? ` ${nom}` : ""} pourrait être couvert pour
              seulement {prixPilo} €/mois.
            </p>

            <button className="mt-8 rounded-xl bg-green-500 px-8 py-3 font-bold text-black hover:bg-green-400">
              Voir cette offre
            </button>

          </div>

        </div>
      </div>
    </main>
  );
}