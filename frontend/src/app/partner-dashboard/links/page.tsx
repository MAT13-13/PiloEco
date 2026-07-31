"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "../../lib/supabase";

type PartnerLinkProfile = {
  id: string;
  company: string;
  partner_code: string;
  total_clicks: number;
  total_leads: number;
  total_sales: number;
};

export default function PartnerLinksPage() {
  const router = useRouter();

  const [profile, setProfile] =
    useState<PartnerLinkProfile | null>(null);

  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadPartnerLink() {
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
              partner_code,
              total_clicks,
              total_leads,
              total_sales
            `
          )
          .eq("user_id", user.id)
          .maybeSingle();

        if (partnerError) {
          throw partnerError;
        }

        if (!partnerProfile) {
          setErrorMessage(
            "Aucun profil partenaire n’est associé à ce compte."
          );
          return;
        }

        if (!partnerProfile.partner_code) {
          setErrorMessage(
            "Aucun code partenaire n’a encore été généré."
          );
          return;
        }

        setProfile(partnerProfile);
      } catch (error) {
        console.error(
          "Erreur chargement lien partenaire :",
          error
        );

        setErrorMessage(
          "Impossible de charger ton lien partenaire."
        );
      } finally {
        setLoading(false);
      }
    }

    loadPartnerLink();
  }, [router]);

  async function copyPartnerLink() {
    if (!profile) {
      return;
    }

    const partnerLink =
      `${window.location.origin}/r/${profile.partner_code}`;

    try {
      await navigator.clipboard.writeText(partnerLink);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Erreur copie lien partenaire :",
        error
      );

      setErrorMessage(
        "Impossible de copier automatiquement le lien."
      );
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <p className="text-lg font-bold text-slate-300">
          Chargement de ton lien partenaire...
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
            Lien partenaire indisponible
          </h1>

          <p className="mt-4 text-red-200">
            {errorMessage}
          </p>

          <Link
  href="/partner-dashboard"
            className="mt-6 inline-block rounded-2xl bg-white px-5 py-3 font-black text-slate-950"
          >
            Retour au dashboard
          </Link>
        </div>
      </main>
    );
  }

  const partnerLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/r/${profile.partner_code}`
      : `https://piloeco.com/r/${profile.partner_code}`;

  const conversionRate =
    profile.total_clicks > 0
      ? (
          (profile.total_sales /
            profile.total_clicks) *
          100
        ).toFixed(1)
      : "0.0";

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/5 p-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
              Espace partenaire
            </p>

            <h1 className="mt-3 text-4xl font-black">
              Mon lien partenaire
            </h1>

            <p className="mt-2 text-slate-400">
              Partage ce lien pour suivre tes clics et tes conversions.
            </p>
          </div>

          <Link
            href="/partner-dashboard"
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-center font-bold transition hover:bg-white/10"
          >
            ← Retour au dashboard
          </Link>
        </header>

        <section className="mt-8 rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-emerald-500/5 p-7">
          <p className="text-sm font-bold uppercase tracking-widest text-green-400">
            Lien personnel de {profile.company}
          </p>

          <div className="mt-5 flex flex-col gap-4 lg:flex-row">
            <div className="flex-1 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 px-5 py-4">
              <p className="overflow-x-auto whitespace-nowrap font-mono text-sm text-slate-200 sm:text-base">
                {partnerLink}
              </p>
            </div>

            <button
              type="button"
              onClick={copyPartnerLink}
              className="rounded-2xl bg-green-400 px-7 py-4 font-black text-slate-950 transition hover:bg-green-300"
            >
              {copied ? "✅ Lien copié" : "📋 Copier le lien"}
            </button>
          </div>

          <p className="mt-4 text-sm text-slate-400">
            Code partenaire :
            <span className="ml-2 font-mono font-bold text-white">
              {profile.partner_code}
            </span>
          </p>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              ✅ Contrats
            </p>

            <p className="mt-3 text-4xl font-black text-green-400">
              {profile.total_sales.toLocaleString(
                "fr-FR"
              )}
            </p>
          </article>

          <article className="rounded-3xl bg-gradient-to-br from-green-500 to-emerald-700 p-6 text-slate-950">
            <p className="text-sm font-black">
              📈 Conversion
            </p>

            <p className="mt-3 text-4xl font-black">
              {conversionRate} %
            </p>
          </article>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-7">
          <h2 className="text-2xl font-black">
            Comment utiliser ton lien ?
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl bg-slate-900 p-5">
              <p className="text-3xl">1️⃣</p>

              <h3 className="mt-4 font-black">
                Copie ton lien
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Utilise le bouton pour récupérer ton lien personnel.
              </p>
            </article>

            <article className="rounded-2xl bg-slate-900 p-5">
              <p className="text-3xl">2️⃣</p>

              <h3 className="mt-4 font-black">
                Partage-le
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Ajoute-le à tes campagnes ou à tes supports.
              </p>
            </article>

            <article className="rounded-2xl bg-slate-900 p-5">
              <p className="text-3xl">3️⃣</p>

              <h3 className="mt-4 font-black">
                Suis tes résultats
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Les clics et conversions apparaîtront ici.
              </p>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}