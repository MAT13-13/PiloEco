"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import PiloNavigation from "../components/PiloNavigation";
import { supabase } from "../lib/supabase";

type MissionCatalog = {
  id: string;
  slug: string;
  title: string;
  icon: string;
  category: string | null;
  status: "available" | "pending" | "disabled";
  route: string | null;
  sort_order: number;
  is_premium: boolean;
};

type MissionUniverse = {
  id: string;
  label: string;
  icon: string;
  description: string;
  slugs: string[];
};

const missionUniverses: MissionUniverse[] = [
  {
    id: "assurances-protection",
    label: "Assurances & Protection",
    icon: "🛡️",
    description:
      "Assurances, mutuelles et solutions pour protéger ton quotidien.",
    slugs: [
      "mutuelle",
      "mutuelle-sante",
      "mutuelle-senior",
      "animaux",
      "assurance-animaux",
      "auto",
      "assurance-auto",
      "moto",
      "assurance-moto",
      "mobilites-douces",
      "habitation",
      "assurance-habitation",
      "assurance-emprunteur",
      "assurance-obseques",
      "prevoyance",
      "ambassadeur",
      "ambassadeur-gselect",
    ],
  },

  {
    id: "energie",
    label: "Énergie",
    icon: "⚡",
    description:
      "Électricité et gaz pour mieux maîtriser tes factures d’énergie.",
    slugs: ["electricite", "gaz"],
  },

  {
    id: "telecoms-numerique",
    label: "Télécoms & Numérique",
    icon: "📱",
    description:
      "Téléphone, Internet et solutions numériques pour ton quotidien.",
    slugs: [
      "mobile",
      "telephone",
      "telephone-senior",
      "internet",
      "cybersecurite",
      "logiciels",
      "streaming",
    ],
  },

  {
    id: "maison-immobilier",
    label: "Maison & Immobilier",
    icon: "🏠",
    description:
      "Immobilier, logement, travaux et solutions pour ta maison.",
    slugs: [
      "credit-immobilier",
      "diagnostic-immobilier",
      "location-meublee",
      "travaux",
      "securite",
      "alarme-securite",
    ],
  },

{
    id: "finance-patrimoine",
    label: "Finance & Patrimoine",
    icon: "💰",
    description:
      "Épargne, patrimoine, banque et solutions financières.",
   slugs: [
  "epargne-retraite",
  "assurance-vie",
  "rachat-credits",
  "crypto",
  "cryptomonnaies",
  "banque",
],
    
  },

  {
    id: "services-quotidien",
    label: "Services du quotidien",
    icon: "🧰",
    description:
      "Déménagement, débarras, auto et services pratiques du quotidien.",
    slugs: [
      "demenagement",
      "debarras",
      "services-auto",
      "service-auto",
      "moto-equipement",
      "pieces-auto",
      "piece-auto",
      "pneus",
    ],
  },

  {
    id: "pro-entreprises",
    label: "Pro & Entreprises",
    icon: "💼",
    description:
      "Solutions et services pour les professionnels et les entreprises.",
   slugs: [
  "mutuelle-professionnelle",
  "prevoyance-tns",
  "mutuelle-collective",
  "rc-pro",
  "multirisque-pro",
  "multirisque-informatique",
  "bris-machine",
  "perte-exploitation",
  "protection-juridique-pro",
  "assurance-pret-pro",
  "responsabilite-mandataires",
  "marchandises-transportees",
  "assurance-cyber-pro",
  "retraite-collective",
  "epargne-salariale",
  "retraite-madelin",
  "assurance-decennale",
  "expert-comptable",
  "site-internet-pro",
  "formation",
  "visibilite-google",
],
  },

  {
    id: "famille-scolarite",
    label: "Famille & Scolarité",
    icon: "👨‍👩‍👧",
    description:
      "Scolarité, accompagnement éducatif et solutions utiles pour la famille.",
    slugs: [
      "famille",
      "famille-aides",
      "famille-scolarite",
    ],
  },

  {
    id: "beaute-artisanat",
    label: "Beauté & Artisanat",
    icon: "🌸",
    description:
      "Beauté, créations artisanales et idées faites main.",
    slugs: ["beaute-artisanat"],
  },

  {
    id: "voyages-loisirs",
    label: "Voyages & Loisirs",
    icon: "✈️",
    description:
      "Voyages et solutions adaptées à tes projets de loisirs.",
    slugs: ["voyage"],
  },
];

export default function MissionsPage() {
  const [availableMissions, setAvailableMissions] = useState<
    MissionCatalog[]
  >([]);

  const [selectedUniverse, setSelectedUniverse] =
    useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadMissions() {
      try {
        setLoading(true);
        setErrorMessage("");

        const { data, error } = await supabase
          .from("mission_catalog")
          .select(
            `
              id,
              slug,
              title,
              icon,
              category,
              status,
              route,
              sort_order,
              is_premium
            `
          )
          .neq("status", "disabled")
          .order("sort_order", {
            ascending: true,
          });

        if (!mounted) {
          return;
        }

        if (error) {
          console.error(
            "Erreur chargement mission_catalog :",
            error
          );

          setErrorMessage(
            "Impossible de charger les missions pour le moment."
          );

          return;
        }

        const missions =
          (data as MissionCatalog[] | null) ?? [];

        setAvailableMissions(
          missions.filter(
            (mission) =>
              mission.status === "available"
          )
        );
      } catch (error) {
        console.error(
          "Erreur inattendue mission_catalog :",
          error
        );

        if (mounted) {
          setErrorMessage(
            "Impossible de charger les missions pour le moment."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadMissions();

    return () => {
      mounted = false;
    };
  }, []);

  const activeUniverse = selectedUniverse
    ? missionUniverses.find(
        (universe) => universe.id === selectedUniverse
      ) ?? null
    : null;

  const activeUniverseMissions = activeUniverse
    ? availableMissions.filter((mission) =>
        activeUniverse.slugs.includes(mission.slug)
      )
    : [];

  return (
    <>
      <main className="min-h-screen bg-slate-950 text-white">
        {/* =========================
            MOBILE - VERSION COMPACTE
           ========================= */}
        <div className="sm:hidden">
          <div className="mx-auto max-w-md px-3 pb-28 pt-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-green-400">
                  🎯 Univers Pilo
                </p>

                <h1 className="mt-1 text-2xl font-black">
                  Mes missions
                </h1>
              </div>

              {!loading && !errorMessage && (
                <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-3 py-2 text-center">
                  <p className="text-lg font-black text-green-400">
                    {availableMissions.length}
                  </p>
                  <p className="text-[8px] font-black uppercase tracking-wide text-slate-500">
                    disponibles
                  </p>
                </div>
              )}
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              Choisis un domaine puis découvre les solutions disponibles.
            </p>

            {loading && (
              <div className="mt-4 rounded-2xl border border-green-500/20 bg-green-500/5 px-4 py-5 text-center">
                <div className="text-3xl">🐦</div>
                <p className="mt-2 text-sm font-black text-green-300">
                  Pilo prépare tes missions...
                </p>
                <p className="mt-1 text-[10px] text-slate-500">
                  Chargement des solutions disponibles.
                </p>
              </div>
            )}

            {!loading && errorMessage && (
              <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
                <p className="text-sm font-black text-red-300">
                  Impossible de charger les missions
                </p>
                <p className="mt-1 text-[11px] leading-4 text-slate-400">
                  {errorMessage}
                </p>
              </div>
            )}

            {!loading && !errorMessage && !activeUniverse && (
              <section className="mt-4">
                <div className="grid grid-cols-2 gap-2.5">
                  {missionUniverses.map((universe) => {
                    const count = availableMissions.filter((mission) =>
                      universe.slugs.includes(mission.slug)
                    ).length;

                    return (
                      <button
                        key={universe.id}
                        type="button"
                        onClick={() => {
                          if (universe.id === "famille-scolarite") {
                            window.location.href = "/missions/famille";
                            return;
                          }

                          setSelectedUniverse(universe.id);
                        }}
                        className="min-h-[145px] rounded-2xl border border-white/10 bg-slate-900 p-3.5 text-left transition active:scale-[0.98]"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-3xl">
                            {universe.icon}
                          </span>

                          <span className="rounded-full border border-white/10 bg-slate-950/70 px-2 py-1 text-[8px] font-black text-slate-400">
                            {count} mission{count > 1 ? "s" : ""}
                          </span>
                        </div>

                        <h2 className="mt-3 text-sm font-black leading-5">
                          {universe.label}
                        </h2>

                        <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-slate-500">
                          {universe.description}
                        </p>

                        <p className="mt-2 text-[10px] font-black text-green-400">
                          Voir →
                        </p>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {!loading && !errorMessage && activeUniverse && (
              <section className="mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedUniverse(null)}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-[11px] font-black text-slate-300"
                >
                  ← Tous les univers
                </button>

                <div className="mt-3 rounded-2xl border border-green-500/20 bg-green-500/5 p-3.5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950/70 text-2xl">
                      {activeUniverse.icon}
                    </div>

                    <div className="min-w-0">
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-green-400">
                        Univers Pilo
                      </p>
                      <h2 className="mt-0.5 text-lg font-black">
                        {activeUniverse.label}
                      </h2>
                      <p className="mt-1 text-[10px] leading-4 text-slate-500">
                        {activeUniverse.description}
                      </p>
                    </div>
                  </div>
                </div>

                {activeUniverseMissions.length === 0 ? (
                  <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-900 p-4">
                    <p className="text-sm font-bold text-white">
                      Aucune mission disponible actuellement dans cet univers.
                    </p>
                  </div>
                ) : (
                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    {activeUniverseMissions.map((mission) => {
                      const missionRoute =
                        mission.route || `/missions/${mission.slug}`;

                      const missionTitle =
                        mission.slug === "mobilites-douces"
                          ? "Assurance mobilité douce"
                          : mission.slug === "famille" ||
                              mission.slug === "famille-aides" ||
                              mission.slug === "famille-scolarite"
                            ? "Famille & scolarité"
                            : mission.title;

                      return (
                        <Link
                          key={mission.id}
                          href={missionRoute}
                          className="relative min-h-[132px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-3.5 transition active:scale-[0.98]"
                        >
                          {mission.is_premium && (
                            <span className="absolute right-2.5 top-2.5 rounded-full bg-purple-500/10 px-2 py-1 text-[7px] font-black uppercase text-purple-300">
                              Premium
                            </span>
                          )}

                          <div className="text-2xl">
                            {mission.icon}
                          </div>

                          <h3 className="mt-3 pr-10 text-[13px] font-black leading-4">
                            {missionTitle}
                          </h3>

                          <p className="mt-2 text-[9px] font-bold leading-4 text-green-400">
                            {mission.slug === "ambassadeur" ||
                            mission.slug === "ambassadeur-gselect"
                              ? "Découvrir →"
                              : "Voir →"}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </section>
            )}
          </div>
        </div>

        {/* =========================
            TABLETTE / DESKTOP
            INCHANGÉ
           ========================= */}
        <div className="hidden sm:block">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-green-400">
              PiloEco
            </p>

            <h1 className="mt-2 text-4xl font-black">
              Mes missions
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-6 text-slate-300">
              Choisis un univers pour retrouver rapidement les missions et
              solutions disponibles.
            </p>

            <PiloNavigation />

            {!loading && !errorMessage && (
              <section className="mt-8">
                <div className="max-w-sm rounded-2xl border border-green-500/20 bg-green-500/5 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-green-400">
                    Disponibles
                  </p>

                  <p className="mt-2 text-3xl font-black text-white">
                    {availableMissions.length}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    missions accessibles maintenant
                  </p>
                </div>
              </section>
            )}

            {loading && (
              <div className="mt-10 rounded-3xl border border-green-500/20 bg-green-500/5 p-8 text-center">
                <div className="text-4xl">🐦</div>

                <p className="mt-4 font-black text-green-300">
                  Pilo prépare tes missions...
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Les solutions disponibles sont en cours de chargement.
                </p>
              </div>
            )}

            {!loading && errorMessage && (
              <div className="mt-10 rounded-3xl border border-red-500/20 bg-red-500/10 p-6">
                <p className="font-black text-red-300">
                  Impossible de charger les missions
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  {errorMessage}
                </p>
              </div>
            )}

            {!loading && !errorMessage && !activeUniverse && (
              <section className="mt-10">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-green-400">
                  Univers Pilo
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Choisis ton domaine
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  Seules les missions actuellement disponibles sont affichées.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
                  {missionUniverses.map((universe) => {
                    const count = availableMissions.filter((mission) =>
                      universe.slugs.includes(mission.slug)
                    ).length;

                    return (
                      <button
                        key={universe.id}
                        type="button"
                        onClick={() => {
                          if (universe.id === "famille-scolarite") {
                            window.location.href = "/missions/famille";
                            return;
                          }

                          setSelectedUniverse(universe.id);
                        }}
                        className="group rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:-translate-y-1 hover:border-green-500/50 hover:bg-green-500/10"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span className="text-5xl">
                            {universe.icon}
                          </span>

                          <span className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-xs font-bold text-slate-400 group-hover:border-green-500/30 group-hover:text-green-300">
                            {count} mission{count > 1 ? "s" : ""}
                          </span>
                        </div>

                        <h3 className="mt-5 text-xl font-black">
                          {universe.label}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {universe.description}
                        </p>

                        <p className="mt-5 text-sm font-bold text-green-400">
                          Voir les missions →
                        </p>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {!loading && !errorMessage && activeUniverse && (
              <section className="mt-10">
                <button
                  type="button"
                  onClick={() => setSelectedUniverse(null)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-slate-300 transition hover:border-green-500/40 hover:text-green-400"
                >
                  ← Retour aux univers
                </button>

                <div className="mt-8">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-green-400">
                    {activeUniverse.icon} Univers Pilo
                  </p>

                  <h2 className="mt-2 text-3xl font-black">
                    {activeUniverse.label}
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                    {activeUniverse.description}
                  </p>
                </div>

                {activeUniverseMissions.length === 0 ? (
                  <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <p className="font-bold text-white">
                      Aucune mission disponible actuellement dans cet univers.
                    </p>
                  </div>
                ) : (
                  <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3">
                    {activeUniverseMissions.map((mission) => {
                      const missionRoute =
                        mission.route || `/missions/${mission.slug}`;

                      const missionTitle =
                        mission.slug === "mobilites-douces"
                          ? "Assurance mobilité douce"
                          : mission.slug === "famille" ||
                              mission.slug === "famille-aides" ||
                              mission.slug === "famille-scolarite"
                            ? "Famille & scolarité"
                            : mission.title;

                      return (
                        <Link
                          key={mission.id}
                          href={missionRoute}
                          className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-green-400 hover:bg-slate-800"
                        >
                          <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-green-500/5 blur-2xl" />

                          {mission.is_premium && (
                            <div className="absolute right-4 top-4 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-purple-300">
                              Premium
                            </div>
                          )}

                          <div className="relative">
                            <div className="text-4xl">
                              {mission.icon}
                            </div>

                            <h3 className="mt-4 pr-16 text-xl font-black leading-6">
                              {missionTitle}
                            </h3>

                            <p className="mt-2 text-sm leading-5 text-slate-500 transition group-hover:text-green-300">
                              {mission.slug === "ambassadeur" ||
                              mission.slug === "ambassadeur-gselect"
                                ? "Découvrir l'opportunité →"
                                : "Voir les recommandations →"}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </section>
            )}

            <div className="h-10" />
          </div>
        </div>
      </main>

      {/* NAVIGATION BAS D'ÉCRAN - MOBILE */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-slate-950/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl sm:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
          <Link
            href="/dashboard"
            className="flex flex-col items-center gap-1 rounded-xl py-2 text-slate-500"
          >
            <span className="text-lg">🏠</span>
            <span className="text-[9px] font-bold">Accueil</span>
          </Link>

          <Link
            href="/analyse"
            className="flex flex-col items-center gap-1 rounded-xl py-2 text-slate-500"
          >
            <span className="text-lg">🔎</span>
            <span className="text-[9px] font-bold">Analyse</span>
          </Link>

          <Link
            href="/missions"
            className="flex flex-col items-center gap-1 rounded-xl bg-green-500/10 py-2 text-green-400"
          >
            <span className="text-lg">🎯</span>
            <span className="text-[9px] font-black">Missions</span>
          </Link>

          <Link
            href="/monitoring"
            className="flex flex-col items-center gap-1 rounded-xl py-2 text-slate-500"
          >
            <span className="text-lg">📊</span>
            <span className="text-[9px] font-bold">Suivi</span>
          </Link>

          <Link
            href="/pilolife"
            className="flex flex-col items-center gap-1 rounded-xl py-2 text-slate-500"
          >
            <span className="text-lg">🌿</span>
            <span className="text-[9px] font-bold">PiloLife</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
