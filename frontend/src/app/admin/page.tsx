import Link from "next/link";
import AdminGuard from "../components/AdminGuard";

const adminSections = [
  {
    title: "Dashboard Business",
    description:
      "Suivre les clics, les leads, les ventes et les commissions.",
    icon: "📊",
    href: "/admin/dashboard",
    available: true,
  },
  {
    title: "Partenaires",
    description:
      "Gérer les demandes, les profils partenaires et leurs offres.",
    icon: "🤝",
    href: "/admin/partenaires",
    available: true,
  },
  {
    title: "Offres",
    description:
      "Consulter et administrer toutes les offres partenaires.",
    icon: "🎁",
    href: "/admin/partenaires",
    available: true,
  },
  {
    title: "Utilisateurs",
    description:
      "Suivre les comptes, les accès et l'activité des utilisateurs.",
    icon: "👥",
    href: "#",
    available: false,
  },
  {
    title: "Abonnements Premium",
    description:
      "Consulter les abonnements, les paiements et les revenus Stripe.",
    icon: "💳",
    href: "#",
    available: false,
  },
  {
    title: "Emails",
    description:
      "Consulter l'historique des emails envoyés par PiloEco.",
    icon: "📧",
    href: "#",
    available: false,
  },
  {
    title: "Paramètres",
    description:
      "Configurer les outils et les réglages internes de PiloEco.",
    icon: "⚙️",
    href: "#",
    available: false,
  },
];

export default function AdminPage() {
  return (
  <AdminGuard>
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-400">
            Administration PiloEco
          </p>

          <h1 className="mt-3 text-4xl font-black">
            🛠 Portail administrateur
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Accède à tous les outils de gestion de PiloEco depuis un seul
            endroit.
          </p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {adminSections.map((section) => {
            const card = (
              <article
                className={`h-full rounded-3xl border p-6 transition ${
                  section.available
                    ? "border-white/10 bg-slate-900/70 hover:-translate-y-1 hover:border-green-400/40 hover:bg-slate-900"
                    : "cursor-not-allowed border-white/5 bg-slate-900/40 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-4xl">
                    {section.icon}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      section.available
                        ? "bg-green-400/10 text-green-400"
                        : "bg-white/10 text-slate-400"
                    }`}
                  >
                    {section.available ? "Disponible" : "Bientôt"}
                  </span>
                </div>

                <h2 className="mt-6 text-xl font-black">
                  {section.title}
                </h2>

                <p className="mt-3 text-slate-400">
                  {section.description}
                </p>

                <div className="mt-6 font-bold text-green-400">
                  {section.available
                    ? "Ouvrir →"
                    : "Fonction en préparation"}
                </div>
              </article>
            );

            return section.available ? (
              <Link
                key={section.title}
                href={section.href}
                className="block"
              >
                {card}
              </Link>
            ) : (
              <div key={section.title}>{card}</div>
            );
          })}
        </section>
      </div>
        </main>
  </AdminGuard>
  );
}