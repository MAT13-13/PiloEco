"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import {
  getPiloLifeProjects,
  type PiloLifeProject,
} from "./services/pilolife.service";

import PiloLifeHero from "./components/PiloLifeHero";
import PiloLifeEmptyState from "./components/PiloLifeEmptyState";
import ProjectCard from "./components/ProjectCard";
import CreateProjectModal from "./components/CreateProjectModal";
import PiloTree from "./components/PiloTree";

export default function PiloLifePage() {
  const [projects, setProjects] = useState<PiloLifeProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  async function loadProjects() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    setUserId(user.id);

    const data = await getPiloLifeProjects(user.id);
    setProjects(data);
    setLoading(false);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Chargement de PiloLife...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/dashboard" className="text-green-400 hover:text-green-300">
          ← Retour au dashboard
        </Link>

        <PiloLifeHero />

        {projects.length === 0 ? (
          <PiloLifeEmptyState onCreate={() => setModalOpen(true)} />
        ) : (
          <>
            <div className="mt-10 flex items-center justify-between gap-4">
              <h2 className="text-3xl font-black">Mes objectifs</h2>

              <button
                onClick={() => setModalOpen(true)}
                className="rounded-2xl bg-green-500 px-5 py-3 font-bold text-black hover:bg-green-400"
              >
                + Nouvel objectif
              </button>
            </div>

            <PiloTree project={projects[0]} />
          </>
        )}
      </div>

      <CreateProjectModal
        open={modalOpen}
        userId={userId}
        onClose={() => setModalOpen(false)}
        onCreated={loadProjects}
      />
    </main>
  );
}