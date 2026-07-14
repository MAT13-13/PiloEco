"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "../lib/supabase";

import PremiumGate from "../components/PremiumGate";
import PiloNavigation from "../components/PiloNavigation";

import {
  getPiloLifeProjects,
  type PiloLifeProject,
} from "./services/pilolife.service";

import PiloLifeHero from "./components/PiloLifeHero";
import PiloLifeEmptyState from "./components/PiloLifeEmptyState";
import ProjectCard from "./components/ProjectCard";
import CreateProjectModal from "./components/CreateProjectModal";
import PiloTree from "./components/PiloTree";

function PiloLifeDashboard() {
  const [projects, setProjects] = useState<
    PiloLifeProject[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [userId, setUserId] = useState<
    string | null
  >(null);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  async function loadProjects() {
    try {
      setLoading(true);
      setErrorMessage("");

      const {
        data: { user },
        error: userError,
      } =
        await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        setUserId(null);
        setProjects([]);
        return;
      }

      setUserId(user.id);

      const data =
        await getPiloLifeProjects(
          user.id
        );

      setProjects(data);
    } catch (error) {
      console.error(
        "Erreur lors du chargement de PiloLife :",
        error
      );

      setErrorMessage(
        "Impossible de charger tes projets PiloLife pour le moment."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  const primaryProject =
    projects.find(
      (project) =>
        project.is_primary
    ) ??
    projects[0] ??
    null;

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white lg:ml-64">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-500/20 border-t-green-400" />

          <p className="mt-4 text-slate-300">
            Chargement de PiloLife...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:ml-64">
      <div className="mx-auto max-w-6xl">
        <PiloLifeHero />

        <PiloNavigation />

        {errorMessage && (
          <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
            {errorMessage}

            <button
              type="button"
              onClick={loadProjects}
              className="ml-3 font-bold text-red-100 underline"
            >
              Réessayer
            </button>
          </div>
        )}

        {!errorMessage &&
        projects.length === 0 ? (
          <PiloLifeEmptyState
            onCreate={() =>
              setModalOpen(true)
            }
          />
        ) : null}

        {!errorMessage &&
        projects.length > 0 ? (
          <>
            {primaryProject && (
              <section className="mt-10">
                <div className="mb-5">
                  <p className="text-sm font-bold uppercase tracking-widest text-green-400">
                    Projet principal
                  </p>

                  <h2 className="mt-2 text-3xl font-black">
                    Ton arbre PiloLife
                  </h2>
                </div>

                <PiloTree
                  project={
                    primaryProject
                  }
                />
              </section>
            )}

            <section className="mt-12">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-green-400">
                    Tes projets
                  </p>

                  <h2 className="mt-2 text-3xl font-black">
                    Mes objectifs
                  </h2>

                  <p className="mt-2 text-slate-400">
                    {projects.length}{" "}
                    objectif
                    {projects.length > 1
                      ? "s"
                      : ""}{" "}
                    en cours
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setModalOpen(true)
                  }
                  className="rounded-2xl bg-green-500 px-5 py-3 font-bold text-black transition hover:bg-green-400"
                >
                  + Nouvel objectif
                </button>
              </div>

              <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {projects.map(
                  (project) => (
                    <ProjectCard
                      key={project.id}
                      project={
                        project
                      }
                      onUpdated={
                        loadProjects
                      }
                    />
                  )
                )}
              </div>
            </section>
          </>
        ) : null}
      </div>

      <CreateProjectModal
        open={modalOpen}
        userId={userId}
        onClose={() =>
          setModalOpen(false)
        }
        onCreated={async () => {
          setModalOpen(false);
          await loadProjects();
        }}
      />
    </main>
  );
}

export default function PiloLifePage() {
  return (
    <PremiumGate
      title="Transforme tes économies en projets"
      description="PiloLife relie automatiquement tes économies à tes objectifs de vie."
    >
      <PiloLifeDashboard />
    </PremiumGate>
  );
}