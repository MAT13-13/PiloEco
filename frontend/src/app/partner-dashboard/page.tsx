"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../lib/supabase";

type PartnerProfile = {
  id: string;
  company: string;
  contact_name: string | null;
  email: string;
  status: string;
  invitation_status: string;
  commission_percent: number | null;
  commission_fixed: number | null;
  total_clicks: number;
  total_leads: number;
  total_sales: number;
  total_revenue: number;
  contract_url: string | null;
};

export default function PartnerDashboardPage() {
  const router = useRouter();

  const [profile, setProfile] =
    useState<PartnerProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    async function loadPartnerProfile() {
      try {
        const {
          data: userData,
          error: userError,
        } = await supabase.auth.getUser();

        const user = userData.user;

        if (userError || !user) {
          router.replace("/login");
          return;
        }

        const {
          data: roleProfile,
          error: roleError,
        } = await supabase
          .from("profils")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();

        if (roleError) {
  setErrorMessage(
    "Impossible de vérifier ton rôle."
  );
  return;
}

if (
  roleProfile?.role !== "partner" &&
  roleProfile?.role !== "admin"
) {
  router.replace("/dashboard");
  return;
}

        const {
          data: partnerProfile,
          error: partnerError,
        } = await supabase
          .from("partner_profiles")
          .select(
            `
              id,
              company,
              contact_name,
              email,
              status,
              invitation_status,
              commission_percent,
              commission_fixed,
              total_clicks,
              total_leads,
              total_sales,
              total_revenue,
              contract_url
            `
          )
          .eq("user_id", user.id)
          .maybeSingle();

        if (partnerError) {
          throw partnerError;
        }

        if (!partnerProfile) {
          setErrorMessage(
            "Aucun espace partenaire n’est encore associé à ce compte."
          );
          return;
        }

        setProfile(partnerProfile);
      } catch (error) {
        console.error(
          "Erreur chargement espace partenaire :",
          error
        );

        setErrorMessage(
          "Impossible de charger ton espace partenaire."
        );
      } finally {
        setLoading(false);
      }
    }

    loadPartnerProfile();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-lg font-bold text-slate-300">
          Chargement de ton espace partenaire...
        </p>
      </main>
    );
  }

  if (errorMessage || !profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="w-full max-w-lg rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <p className="text-5xl">⚠️</p>

          <h1 className="mt-4 text-2xl font-black">
            Espace partenaire indisponible
          </h1>

          <p className="mt-4 text-red-200">
            {errorMessage}
          </p>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 rounded-2xl bg-white px-5 py-3 font-black text-slate-950"
          >
            Se déconnecter
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/5 p-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
              Espace partenaire
            </p>

            <h1 className="mt-3 text-4xl font-black">
              Bonjour {profile.company} 👋
            </h1>

            <p className="mt-2 text-slate-400">
              Suis tes performances et tes revenus générés avec PiloEco.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-bold transition hover:bg-white/10"
          >
            Se déconnecter
          </button>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-bold text-slate-400">
              👆 Clics
            </p>

            <p className="mt-3 text-4xl font-black">
              {profile.total_clicks.toLocaleString(
                "fr-FR"
              )}
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-bold text-slate-400">
              📩 Leads
            </p>

            <p className="mt-3 text-4xl font-black">
              {profile.total_leads.toLocaleString(
                "fr-FR"
              )}
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-bold text-slate-400">
              ✅ Contrats signés
            </p>

            <p className="mt-3 text-4xl font-black text-green-400">
              {profile.total_sales.toLocaleString(
                "fr-FR"
              )}
            </p>
          </article>

          <article className="rounded-3xl bg-gradient-to-br from-green-500 to-emerald-700 p-6 text-slate-950">
            <p className="text-sm font-black">
              💰 Revenus générés
            </p>

            <p className="mt-3 text-4xl font-black">
              {profile.total_revenue.toLocaleString(
                "fr-FR",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}{" "}
              €
            </p>
          </article>
        </section>

<section className="mt-6">
  <Link
    href="/partner-dashboard/links"
    className="inline-flex rounded-2xl bg-green-400 px-6 py-4 font-black text-slate-950 transition hover:bg-green-300"
  >
    🔗 Voir mon lien partenaire
  </Link>
</section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <h2 className="text-2xl font-black">
              🤝 Informations du partenariat
            </h2>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between gap-4 border-b border-white/10 pb-4">
                <span className="text-slate-400">
                  Entreprise
                </span>

                <span className="font-bold">
                  {profile.company}
                </span>
              </div>

              <div className="flex justify-between gap-4 border-b border-white/10 pb-4">
                <span className="text-slate-400">
                  Contact
                </span>

                <span className="font-bold">
                  {profile.contact_name ?? "Non renseigné"}
                </span>
              </div>

              <div className="flex justify-between gap-4 border-b border-white/10 pb-4">
                <span className="text-slate-400">
                  Email
                </span>

                <span className="font-bold">
                  {profile.email}
                </span>
              </div>

              <div className="flex justify-between gap-4 border-b border-white/10 pb-4">
                <span className="text-slate-400">
                  Statut
                </span>

                <span className="font-bold text-green-400">
                  {profile.status}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-400">
                  Invitation
                </span>

                <span className="font-bold">
                  {profile.invitation_status}
                </span>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <h2 className="text-2xl font-black">
              💶 Rémunération
            </h2>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-slate-900 p-5">
                <p className="text-sm text-slate-400">
                  Commission en pourcentage
                </p>

                <p className="mt-2 text-3xl font-black text-green-400">
                  {profile.commission_percent ?? 0} %
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900 p-5">
                <p className="text-sm text-slate-400">
                  Commission fixe
                </p>

                <p className="mt-2 text-3xl font-black text-green-400">
                  {profile.commission_fixed ?? 0} €
                </p>
              </div>

              {profile.contract_url && (
                <a
                  href={profile.contract_url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl bg-white px-5 py-4 text-center font-black text-slate-950 transition hover:bg-green-400"
                >
                  📄 Consulter le contrat
                </a>
              )}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}