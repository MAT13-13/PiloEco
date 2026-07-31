"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AdminGuard from "../../components/AdminGuard";

import BusinessCards from "./components/BusinessCards";
import PartnerRanking from "./components/PartnerRanking";
import PartnersTable from "./components/PartnersTable";
import RevenueChart from "./components/RevenueChart";
import RevenuePie from "./components/RevenuePie";

import {
  getDashboardStatistics,
  type DashboardStatistics,
} from "./services/dashboard.service";

export default function AdminDashboardPage() {
  const [statistics, setStatistics] =
    useState<DashboardStatistics | null>(null);

  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setErrorMessage(null);

        const data =
          await getDashboardStatistics();

        setStatistics(data);
      } catch (error) {
        console.error(
          "Erreur dashboard administrateur :",
          error
        );

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Une erreur est survenue pendant le chargement."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <AdminGuard>
        <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex min-h-[60vh] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-green-400" />

                <p className="mt-5 font-semibold text-slate-400">
                  Chargement du tableau de bord...
                </p>
              </div>
            </div>
          </div>
        </main>
      </AdminGuard>
    );
  }

  if (errorMessage || !statistics) {
    return (
      <AdminGuard>
        <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/admin"
              className="text-sm font-bold text-green-400 hover:text-green-300"
            >
              ← Retour au portail administrateur
            </Link>

            <section className="mt-8 rounded-3xl border border-red-500/30 bg-red-500/10 p-8">
              <h1 className="text-2xl font-black text-red-300">
                Impossible de charger le dashboard
              </h1>

              <p className="mt-4 text-red-200">
                {errorMessage ??
                  "Les statistiques sont indisponibles."}
              </p>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                className="mt-6 rounded-xl bg-red-500 px-5 py-3 font-bold text-white transition hover:bg-red-400"
              >
                Réessayer
              </button>
            </section>
          </div>
        </main>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-7xl">
          <header className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-400">
                Administration PiloEco
              </p>

              <h1 className="mt-3 text-4xl font-black">
                📊 Dashboard Business
              </h1>

              <p className="mt-3 max-w-2xl text-slate-400">
                Suivi des clics, des leads, des ventes et
                des commissions générées par les partenaires.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin"
                className="rounded-xl border border-white/10 bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-slate-800"
              >
                🛠 Portail admin
              </Link>

              <Link
                href="/admin/partenaires"
                className="rounded-xl border border-white/10 bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-slate-800"
              >
                🤝 Gérer les partenaires
              </Link>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                className="rounded-xl bg-green-400 px-5 py-3 font-black text-slate-950 transition hover:bg-green-300"
              >
                🔄 Actualiser
              </button>
            </div>
          </header>

          <div className="space-y-8">
            <BusinessCards
              statistics={statistics}
            />

            <PartnerRanking
              statistics={statistics}
            />

            <section className="grid gap-6 xl:grid-cols-2">
              <RevenueChart />
              <RevenuePie />
            </section>

            <PartnersTable
              statistics={statistics}
            />
          </div>
        </div>
      </main>
    </AdminGuard>
  );
}