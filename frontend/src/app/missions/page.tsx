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

export default function MissionsPage() {
  const [availableMissions, setAvailableMissions] = useState<
    MissionCatalog[]
  >([]);

  const [pendingMissions, setPendingMissions] = useState<
    MissionCatalog[]
  >([]);

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

        setPendingMissions(
          missions.filter(
            (mission) =>
              mission.status === "pending"
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

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-green-400 sm:text-sm">
          PiloEco
        </p>

        <h1 className="mt-2 text-3xl font-black sm:text-4xl">
          Mes missions
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
          Découvre les solutions déjà disponibles
          et les nouvelles catégories que Pilo prépare.
        </p>

        <PiloNavigation />

        {/* RÉSUMÉ */}
        {!loading && !errorMessage && (
          <section className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-4">
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

            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-400">
                En préparation
              </p>

              <p className="mt-2 text-3xl font-black text-white">
                {pendingMissions.length}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                catégories en cours de partenariat
              </p>
            </div>
          </section>
        )}

        {/* CHARGEMENT */}
        {loading && (
          <div className="mt-10 rounded-3xl border border-green-500/20 bg-green-500/5 p-8 text-center">
            <div className="text-4xl">
              🐦
            </div>

            <p className="mt-4 font-black text-green-300">
              Pilo prépare tes missions...
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Les solutions disponibles sont en cours
              de chargement.
            </p>
          </div>
        )}

        {/* ERREUR */}
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

        {!loading && !errorMessage && (
          <>
            {/* MISSIONS DISPONIBLES */}
            <section className="mt-10">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-green-400 sm:text-sm">
                  Disponibles maintenant
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Missions disponibles
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  Ces missions disposent déjà
                  d&apos;une solution ou d&apos;un
                  partenaire sélectionné par Pilo.
                </p>
              </div>

              {availableMissions.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
                  <p className="font-bold text-white">
                    Aucune mission disponible
                  </p>

                  <p className="mt-2 text-sm text-slate-400">
                    Pilo prépare actuellement de
                    nouvelles solutions.
                  </p>
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {availableMissions.map(
                    (mission) => {
                      const missionRoute =
                        mission.route ||
                        `/missions/${mission.slug}`;

                      return (
                        <Link
                          key={mission.id}
                          href={missionRoute}
                          className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-1 hover:border-green-400 hover:bg-slate-800 sm:p-6"
                        >
                          <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-green-500/5 blur-2xl" />

                          {mission.is_premium && (
                            <div className="absolute right-4 top-4 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-purple-300">
                              Premium
                            </div>
                          )}

                          <div className="relative">
                            <div className="text-3xl sm:text-4xl">
                              {mission.icon}
                            </div>

                            <h2 className="mt-4 pr-16 text-lg font-black leading-6 sm:text-xl">
                              {mission.title}
                            </h2>

                            <p className="mt-2 text-xs leading-5 text-slate-500 transition group-hover:text-green-300 sm:text-sm">
                              {mission.slug ===
                              "ambassadeur"
                                ? "Découvrir l'opportunité →"
                                : "Voir les recommandations →"}
                            </p>
                          </div>
                        </Link>
                      );
                    }
                  )}
                </div>
              )}
            </section>

            {/* MISSIONS EN COURS DE PARTENARIAT */}
            {pendingMissions.length > 0 && (
              <section className="mt-14 border-t border-slate-800 pt-10 sm:mt-20 sm:pt-12">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-400 sm:text-sm">
                    Prochainement
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    En cours de partenariat
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                    Pilo prépare actuellement de
                    nouvelles solutions pour ces
                    catégories. Elles seront
                    disponibles dès qu&apos;un
                    partenaire adapté aura été
                    sélectionné.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {pendingMissions.map(
                    (mission) => (
                      <div
                        key={mission.id}
                        className="relative overflow-hidden rounded-2xl border border-amber-500/15 bg-slate-900/60 p-5 sm:p-6"
                      >
                        <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-amber-500/5 blur-2xl" />

                        <div className="relative">
                          <div className="mb-4 flex items-start justify-between gap-3">
                            <div className="text-3xl sm:text-4xl">
                              {mission.icon}
                            </div>

                            <div className="max-w-[150px] rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-center text-[9px] font-black uppercase leading-4 text-amber-300">
                              En cours de partenariat
                            </div>
                          </div>

                          <h2 className="text-lg font-black leading-6 sm:text-xl">
                            {mission.title}
                          </h2>

                          <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
                            Solution partenaire en préparation
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </section>
            )}
          </>
        )}

        <div className="h-10" />
      </div>
    </main>
  );
}