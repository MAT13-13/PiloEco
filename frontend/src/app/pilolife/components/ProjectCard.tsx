import { PiloLifeProject } from "../services/pilolife.service";

type Props = {
  project: PiloLifeProject;
};

export default function ProjectCard({ project }: Props) {
  return (
    <div className="rounded-3xl border border-green-500/20 bg-slate-900 p-8">
      <p className="text-sm font-bold uppercase text-green-400">
        {project.category}
      </p>

      <h2 className="mt-3 text-3xl font-black">
        {project.title}
      </h2>

      <p className="mt-6 text-slate-400">
        Objectif
      </p>

      <p className="mt-1 text-4xl font-black text-green-400">
        {Number(project.target_amount).toLocaleString("fr-FR")} €
      </p>

      {project.target_date && (
        <p className="mt-4 text-slate-300">
          Date cible :{" "}
          {new Date(project.target_date).toLocaleDateString("fr-FR")}
        </p>
      )}

      {project.is_primary && (
        <div className="mt-6 inline-flex rounded-full bg-green-500/20 px-4 py-2 text-sm font-bold text-green-400">
          ⭐ Projet principal
        </div>
      )}
    </div>
  );
}