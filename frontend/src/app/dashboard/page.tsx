"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

import { supabase } from "../lib/supabase";
import Sidebar from "../components/Sidebar";
import MobileMenu from "../components/layout/MobileMenu";
import PiloNavigation from "../components/PiloNavigation";
import FadeIn from "../components/FadeIn";

import { createPiloEngine } from "../services/ai/pilo-engine.service";
import { generateMissions } from "../services/missions.service";

type Analyse = {
  id: string;
  telephone: number;
  internet: number;
  assurance: number;
  electricite: number;
  total_depenses: number;
  economie_possible: number;
  economie_annuelle: number;
  created_at: string;
};

type PiloValues = {
  telephone: string;
  internet: string;
  assurance: string;
  electricite: string;
};

type PiloDbProfile = {
  xp: number;
  level: number;
  total_savings: number;
  completed_missions: number;
  badges: string[];
  premium: boolean;
  role: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  const [values, setValues] = useState<PiloValues>({
    telephone: "",
    internet: "",
    assurance: "",
    electricite: "",
  });

  const [analyses, setAnalyses] = useState<Analyse[]>([]);
  const [missions, setMissions] = useState<any[]>([]);
  const [profile, setProfile] = useState<PiloDbProfile | null>(null);

  const [chargement, setChargement] = useState(false);
  const [message, setMessage] = useState("");

  const analyseLancee = useRef(false);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      const { data, error } = await supabase.auth.getUser();

      if (!mounted) return;

      if (error) {
        console.error(
          "Erreur de vérification de session :",
          error
        );
      }

      const currentUser = data.user ?? null;

      setUser(currentUser);
      setAuthChecking(false);

      if (currentUser) {
        await Promise.all([
          chargerAnalyses(currentUser.id),
          chargerMissions(currentUser.id),
          chargerProfil(currentUser.id),
        ]);
      }
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser = session?.user ?? null;

        setUser(currentUser);
        setAuthChecking(false);

        if (currentUser) {
          void Promise.all([
            chargerAnalyses(currentUser.id),
            chargerMissions(currentUser.id),
            chargerProfil(currentUser.id),
          ]);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!authChecking && !user) {
      router.replace("/login");
    }
  }, [authChecking, user, router]);

  useEffect(() => {
    if (!user || analyseLancee.current) return;

    const savedValues =
      localStorage.getItem("pilo-values");

    if (!savedValues) return;

    try {
      const parsedValues = JSON.parse(
        savedValues
      ) as PiloValues;

      setValues(parsedValues);

      analyseLancee.current = true;

      void calculerAnalyseAutomatique(
        parsedValues,
        user.id
      );
    } catch (error) {
      console.error(
        "Impossible de récupérer les valeurs Pilo :",
        error
      );

      localStorage.removeItem("pilo-values");
    }
  }, [user]);

  async function chargerAnalyses(
    utilisateurId: string
  ) {
    const { data, error } = await supabase
      .from("analyses")
      .select("*")
      .eq("utilisateur_id", utilisateurId)
      .order("created_at", {
        ascending: false,
      });

    if (!error && data) {
      setAnalyses(data as Analyse[]);
    }
  }

  async function chargerMissions(
    utilisateurId: string
  ) {
    const { data, error } = await supabase
      .from("missions")
      .select("*")
      .eq("user_id", utilisateurId);

    if (!error && data) {
      setMissions(data);
    }
  }

  async function chargerProfil(
    utilisateurId: string
  ) {
    const { data, error } = await supabase
      .from("profils")
      .select("*")
      .eq("id", utilisateurId)
      .single();

    if (!error && data) {
      setProfile(data as PiloDbProfile);
    }
  }

  async function deconnexion() {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      setMessage(
        "Impossible de te déconnecter pour le moment."
      );
      return;
    }

    setUser(null);
    setAnalyses([]);
    setMissions([]);
    setProfile(null);

    router.replace("/login");
    router.refresh();
  }

  async function calculerAnalyseAutomatique(
    dataValues: PiloValues,
    utilisateurId: string
  ) {
    setChargement(true);
    setMessage(
      "Pilo met ton analyse à jour..."
    );

    try {
      const response = await fetch(
        "/api/calcul-economies",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            telephone: Number(
              dataValues.telephone
            ),
            internet: Number(
              dataValues.internet
            ),
            assurance: Number(
              dataValues.assurance
            ),
            electricite: Number(
              dataValues.electricite
            ),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Impossible de réaliser l'analyse."
        );
      }

      const data = await response.json();

      const { error } = await supabase
        .from("analyses")
        .insert({
          utilisateur_id: utilisateurId,
          telephone: Number(
            dataValues.telephone
          ),
          internet: Number(
            dataValues.internet
          ),
          assurance: Number(
            dataValues.assurance
          ),
          electricite: Number(
            dataValues.electricite
          ),
          total_depenses:
            data.totalDepenses,
          economie_possible:
            data.economiePossible,
          economie_annuelle:
            data.economieAnnuelle,
        });

      if (error) {
        setMessage(
          "Analyse terminée, mais elle n'a pas pu être enregistrée."
        );
      } else {
        const nouvellesMissions =
          generateMissions({
            telephone: Number(
              dataValues.telephone
            ),
            internet: Number(
              dataValues.internet
            ),
            assurance: Number(
              dataValues.assurance
            ),
            electricite: Number(
              dataValues.electricite
            ),
          });

        for (const mission of nouvellesMissions) {
          const missionExistante =
            missions.find(
              (m) =>
                m.mission_id ===
                mission.mission_id
            );

          if (!missionExistante) {
            await supabase
              .from("missions")
              .insert({
                user_id: utilisateurId,
                mission_id:
                  mission.mission_id,
                title: mission.title,
                saving: mission.saving,
                status: mission.status,
              });

            continue;
          }

          if (
            missionExistante.status ===
            "Terminée"
          ) {
            continue;
          }

          await supabase
            .from("missions")
            .update({
              title: mission.title,
              saving: mission.saving,
            })
            .eq(
              "id",
              missionExistante.id
            );
        }

        localStorage.removeItem(
          "pilo-values"
        );

        await Promise.all([
          chargerAnalyses(utilisateurId),
          chargerMissions(utilisateurId),
        ]);

        setMessage(
          "Analyse mise à jour avec succès."
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Impossible de mettre l'analyse à jour."
      );
    }

    setChargement(false);
  }

  const totalEconomiesAnnuelles =
    analyses.reduce(
      (total, analyse) =>
        total +
        Number(
          analyse.economie_annuelle || 0
        ),
      0
    );

  const missionsTerminees =
    missions.filter(
      (mission) =>
        mission.status === "Terminée"
    );

  const economiesRealisees =
    missionsTerminees.reduce(
      (total, mission) =>
        total +
        Number(mission.saving || 0),
      0
    );

  const potentielRestant = missions
    .filter(
      (mission) =>
        mission.status !== "Terminée"
    )
    .reduce(
      (total, mission) =>
        total +
        Number(mission.saving || 0),
      0
    );

  const scoreProgression = Math.min(
    100,
    60 + missionsTerminees.length * 10
  );

  const piloBrain = createPiloEngine([
    {
      id: "mobile",
      name: "Téléphone",
      monthlyPrice: Number(
        values.telephone || 0
      ),
      recommendedPrice: 15,
    },
    {
      id: "internet",
      name: "Internet",
      monthlyPrice: Number(
        values.internet || 0
      ),
      recommendedPrice: 25,
    },
    {
      id: "electricite",
      name: "Électricité",
      monthlyPrice: Number(
        values.electricite || 0
      ),
      recommendedPrice: 72,
    },
    {
      id: "habitation",
      name: "Habitation",
      monthlyPrice: Number(
        values.assurance || 0
      ),
      recommendedPrice: 18,
    },
    {
      id: "banque",
      name: "Banque",
      monthlyPrice: 18,
      recommendedPrice: 6,
    },
  ]);

  const niveau = profile?.level || 1;

  const titreNiveau =
    niveau === 1
      ? "Débutant"
      : niveau === 2
        ? "Économe"
        : niveau === 3
          ? "Stratège"
          : niveau === 4
            ? "Expert"
            : "Maître Pilo";

  const economieAnnuelleAffichee =
    Number(profile?.total_savings || 0) >
    0
      ? Number(profile?.total_savings)
      : totalEconomiesAnnuelles;

  const premiumActif =
    profile?.premium === true;

  const missionsRestantes = Math.max(
    0,
    missions.length -
      missionsTerminees.length
  );

  const missionPrioritaire = [
    ...missions,
  ]
    .filter(
      (mission) =>
        mission.status !== "Terminée"
    )
    .sort(
      (a, b) =>
        Number(b.saving || 0) -
        Number(a.saving || 0)
    )[0];

  const piloSituation = (() => {
    if (
      missionPrioritaire &&
      Number(
        missionPrioritaire.saving || 0
      ) > 0
    ) {
      return {
        emoji: "🎯",
        title: "Une mission t'attend",
        message: `${missionPrioritaire.title} peut représenter jusqu'à ${Number(
          missionPrioritaire.saving || 0
        ).toLocaleString(
          "fr-FR"
        )} € par an.`,
        glowClass:
          "bg-green-500/35",
      };
    }

    if (
      economieAnnuelleAffichee > 0 &&
      missionsRestantes === 0
    ) {
      return {
        emoji: "🎉",
        title: "Tout est optimisé",
        message:
          "Tes missions actuelles sont terminées. Pilo continue de suivre ta progression.",
        glowClass:
          "bg-emerald-400/35",
      };
    }

    if (analyses.length === 0) {
      return {
        emoji: "🔎",
        title: "Commence ton analyse",
        message:
          "Quelques réponses suffisent pour lancer Pilo.",
        glowClass:
          "bg-blue-500/25",
      };
    }

    return {
      emoji: "🐦",
      title: "Pilo veille",
      message:
        piloBrain.pilo.message ||
        "Ton tableau de bord est à jour.",
      glowClass:
        "bg-green-500/25",
    };
  })();

  const displayName =
  user?.user_metadata?.first_name ||
  user?.user_metadata?.full_name?.split(" ")[0] ||
  user?.user_metadata?.name?.split(" ")[0] ||
  "";

  if (authChecking || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="text-center">
          <p className="text-5xl">
            🐦
          </p>

          <h1 className="mt-4 text-2xl font-black">
            {authChecking
              ? "Pilo vérifie ta session..."
              : "Redirection vers la connexion..."}
          </h1>

          <p className="mt-3 text-slate-400">
            Un instant, s&apos;il te
            plaît.
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <Sidebar />

      <main className="min-h-screen bg-slate-950 px-3 pb-0 pt-3 text-white sm:p-6 lg:ml-64">
        <section className="mx-auto w-full max-w-6xl">
          {/* MOBILE APP - COMPACT */}
          <div className="sm:hidden">
            <div className="flex items-center justify-between py-1">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-green-400">
                  🐦 Ton copilote d&apos;économies
                </p>
                <h1 className="mt-1 text-2xl font-black">
                  {displayName ? `Bonjour ${displayName} 👋` : "Bonjour 👋"}
                </h1>
              </div>

              <button
                onClick={deconnexion}
                aria-label="Se déconnecter"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-sm text-slate-400"
              >
                ↪
              </button>
            </div>

            {profile?.role === "admin" && (
              <Link
                href="/admin"
                className="mt-3 flex items-center justify-between rounded-xl bg-green-500 px-3 py-2 text-xs font-black text-slate-950"
              >
                <span>🛠 Administration</span>
                <span>→</span>
              </Link>
            )}

            <section className="mt-3 overflow-hidden rounded-2xl border border-green-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-green-950/30 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold text-slate-400">
                    Économies suivies par Pilo
                  </p>
                  <p className="mt-1 text-3xl font-black text-green-400">
                    {economieAnnuelleAffichee.toLocaleString("fr-FR")} €
                    <span className="ml-1 text-xs font-bold text-slate-500">/ an</span>
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-xl">
                  {piloSituation.emoji}
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2.5">
                <p className="text-sm font-black text-white">{piloSituation.title}</p>
                <p className="mt-0.5 line-clamp-2 text-[11px] leading-4 text-slate-400">
                  {piloSituation.message}
                </p>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-white/10 bg-slate-950/40 px-2 py-2 text-center">
                  <p className="text-[9px] font-bold uppercase text-slate-500">Niveau</p>
                  <p className="mt-0.5 text-xs font-black">{niveau}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-slate-950/40 px-2 py-2 text-center">
                  <p className="text-[9px] font-bold uppercase text-slate-500">Missions</p>
                  <p className="mt-0.5 text-xs font-black">{missionsTerminees.length}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-slate-950/40 px-2 py-2 text-center">
                  <p className="text-[9px] font-bold uppercase text-slate-500">Score</p>
                  <p className="mt-0.5 text-xs font-black text-green-400">{scoreProgression}%</p>
                </div>
              </div>
            </section>

            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <Link
                href="/analyse"
                className="rounded-2xl border border-green-500/30 bg-green-500/10 p-3.5"
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl">🔎</span>
                  <span className="text-xs font-black text-green-400">→</span>
                </div>
                <p className="mt-3 text-sm font-black">Analyse</p>
                <p className="mt-0.5 text-[10px] leading-4 text-slate-500">Trouver où économiser</p>
              </Link>

              <Link
                href="/missions"
                className="rounded-2xl border border-slate-800 bg-slate-900 p-3.5"
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl">🎯</span>
                  <span className="rounded-full bg-slate-950 px-2 py-1 text-[9px] font-black text-slate-400">
                    {missionsRestantes}
                  </span>
                </div>
                <p className="mt-3 text-sm font-black">Missions</p>
                <p className="mt-0.5 text-[10px] leading-4 text-slate-500">Tes actions à faire</p>
              </Link>

              <Link
                href="/monitoring"
                className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-3.5"
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl">📊</span>
                  {!premiumActif && (
                    <span className="rounded-full bg-purple-500/10 px-2 py-1 text-[8px] font-black uppercase text-purple-300">
                      Premium
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm font-black">Monitoring</p>
                <p className="mt-0.5 text-[10px] leading-4 text-slate-500">Contrats & échéances</p>
              </Link>

              <Link
                href="/pilolife"
                className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-3.5"
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl">🌿</span>
                  {!premiumActif && (
                    <span className="rounded-full bg-purple-500/10 px-2 py-1 text-[8px] font-black uppercase text-purple-300">
                      Premium
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm font-black">PiloLife</p>
                <p className="mt-0.5 text-[10px] leading-4 text-slate-500">Transformer en projets</p>
              </Link>
            </div>

            {missionPrioritaire && (
              <section className="mt-3 rounded-2xl border border-green-500/20 bg-slate-900 p-3.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-green-400">
                      🎯 Priorité de Pilo
                    </p>
                    <p className="mt-1 truncate text-sm font-black">{missionPrioritaire.title}</p>
                    {Number(missionPrioritaire.saving || 0) > 0 && (
                      <p className="mt-0.5 text-[11px] font-bold text-green-300">
                        Jusqu&apos;à {Number(missionPrioritaire.saving || 0).toLocaleString("fr-FR")} € / an
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/missions/${missionPrioritaire.mission_id}`}
                    className="shrink-0 rounded-xl bg-green-500 px-3 py-2 text-[10px] font-black text-slate-950"
                  >
                    Voir →
                  </Link>
                </div>
              </section>
            )}

            {premiumActif ? (
              <section className="mt-3 rounded-2xl border border-purple-400/30 bg-gradient-to-r from-purple-500/10 to-slate-900 p-3.5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-purple-200">💎 Pilo Premium actif</p>
                    <p className="mt-0.5 text-[10px] text-slate-500">Monitoring, alertes et PiloLife actifs.</p>
                  </div>
                  <span className="rounded-full bg-purple-500/10 px-2 py-1 text-[9px] font-black text-purple-300">ACTIF</span>
                </div>
              </section>
            ) : (
              <Link
                href="/premium"
                className="mt-3 flex items-center justify-between rounded-2xl border border-purple-400/30 bg-purple-500/10 p-3.5"
              >
                <div>
                  <p className="text-sm font-black text-purple-200">💎 Pilo Premium</p>
                  <p className="mt-0.5 text-[10px] text-slate-500">Pilo veille même quand tu n&apos;es pas là.</p>
                </div>
                <span className="text-sm font-black text-purple-300">→</span>
              </Link>
            )}

            <section className="mt-3 rounded-2xl border border-slate-800 bg-slate-900 p-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-500">Progression</p>
                  <p className="mt-0.5 text-sm font-black">Tu avances avec Pilo</p>
                </div>
                <p className="text-sm font-black text-green-400">{scoreProgression}%</p>
              </div>

              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-green-500 transition-all duration-500"
                  style={{ width: `${scoreProgression}%` }}
                />
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-slate-950/60 p-2.5">
                  <p className="text-[9px] text-slate-500">Validées</p>
                  <p className="mt-1 text-sm font-black text-green-400">
                    {economiesRealisees.toLocaleString("fr-FR")} €
                  </p>
                </div>
                <div className="rounded-xl bg-slate-950/60 p-2.5">
                  <p className="text-[9px] text-slate-500">Potentiel</p>
                  <p className="mt-1 text-sm font-black">{potentielRestant.toLocaleString("fr-FR")} €</p>
                </div>
                <div className="rounded-xl bg-slate-950/60 p-2.5">
                  <p className="text-[9px] text-slate-500">Terminées</p>
                  <p className="mt-1 text-sm font-black">{missionsTerminees.length}/{missions.length}</p>
                </div>
              </div>
            </section>

            {chargement && (
              <div className="mt-3 rounded-xl border border-green-500/20 bg-green-500/5 px-3 py-2 text-[10px] font-bold text-green-300">
                🐦 Pilo met ton analyse à jour...
              </div>
            )}

            {message && !chargement && (
              <p className="mt-3 text-center text-[10px] text-slate-600">{message}</p>
            )}

            <div className="h-24" />
          </div>

          {/* VERSION TABLETTE / DESKTOP INCHANGÉE */}
          <div className="hidden sm:block">
          {/* TOPBAR */}
          <div className="flex items-center justify-end">
            <button
              onClick={deconnexion}
              className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Déconnexion
            </button>
          </div>

          <PiloNavigation />

          {profile?.role ===
            "admin" && (
            <div className="mt-4 flex justify-end">
              <Link
                href="/admin"
                className="rounded-xl bg-green-500 px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-green-400"
              >
                🛠 Administration
              </Link>
            </div>
          )}

          {/* HERO COMPACT */}
          <FadeIn delay={0}>
            <section className="mt-6 overflow-hidden rounded-[2rem] border border-green-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-green-950/30 p-6 shadow-xl sm:p-7">
              <div className="grid items-center gap-6 lg:grid-cols-[1fr_200px]">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-green-400">
                    🐦 Ton copilote
                    d&apos;économies
                  </p>

          <h1 className="mt-3 text-3xl font-black sm:text-4xl">
  {displayName ? `Bonjour ${displayName} 👋` : "Bonjour 👋"}
</h1>

                  <div className="mt-5 flex flex-wrap items-end gap-x-3 gap-y-1">
                    <span className="text-4xl font-black text-green-400 sm:text-5xl">
                      {economieAnnuelleAffichee.toLocaleString(
                        "fr-FR"
                      )}{" "}
                      €
                    </span>

                    <span className="pb-1 text-sm font-bold text-slate-400">
                      / an suivis par Pilo
                    </span>
                  </div>

                  <div className="mt-5 flex max-w-2xl items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <span className="text-xl">
                      {
                        piloSituation.emoji
                      }
                    </span>

                    <div>
                      <p className="font-black text-white">
                        {
                          piloSituation.title
                        }
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {
                          piloSituation.message
                        }
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1.5 text-xs font-bold text-slate-300">
                      Niveau {niveau} ·{" "}
                      {titreNiveau}
                    </span>

                    <span className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1.5 text-xs font-bold text-slate-300">
                      {
                        missionsTerminees.length
                      }{" "}
                      missions terminées
                    </span>

                    <span className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1.5 text-xs font-bold text-slate-300">
                      Score{" "}
                      {scoreProgression}/100
                    </span>
                  </div>
                </div>

                <div className="hidden justify-center lg:flex">
                  <div className="relative h-44 w-44">
                    <div
                      className={`absolute inset-5 rounded-full ${piloSituation.glowClass} blur-3xl`}
                    />

                    <img
                      src="/pilo.png"
                      alt="Pilo"
                      className="relative z-10 h-full w-full object-contain drop-shadow-[0_20px_50px_rgba(34,197,94,0.4)]"
                    />
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* PREMIUM EN AVANT */}
          <FadeIn delay={0.1}>
            {premiumActif ? (
              <section className="mt-5 rounded-3xl border border-purple-400/30 bg-gradient-to-r from-purple-500/10 to-slate-900 p-6">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        💎
                      </span>

                      <p className="font-black text-purple-200">
                        Pilo Premium actif
                      </p>
                    </div>

                    <p className="mt-2 text-sm text-slate-400">
                      Monitoring,
                      alertes et PiloLife
                      sont actifs.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/monitoring"
                      className="rounded-xl bg-purple-500 px-4 py-3 text-sm font-black text-white transition hover:bg-purple-400"
                    >
                      📊 Monitoring
                    </Link>

                    <Link
                      href="/pilolife"
                      className="rounded-xl border border-purple-500/30 px-4 py-3 text-sm font-black text-purple-200 transition hover:bg-purple-500/10"
                    >
                      🌿 PiloLife
                    </Link>
                  </div>
                </div>
              </section>
            ) : (
              <section className="mt-5 overflow-hidden rounded-3xl border border-purple-400/30 bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-900 p-6 shadow-lg">
                <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-300">
                      💎 Pilo Premium
                    </p>

                    <h2 className="mt-2 text-2xl font-black">
                      Pilo veille même
                      quand tu n&apos;es
                      pas là
                    </h2>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-purple-500/10 px-3 py-1.5 text-xs font-bold text-purple-200">
                        📊 Monitoring
                      </span>

                      <span className="rounded-full bg-purple-500/10 px-3 py-1.5 text-xs font-bold text-purple-200">
                        🔔 Alertes
                      </span>

                      <span className="rounded-full bg-purple-500/10 px-3 py-1.5 text-xs font-bold text-purple-200">
                        📅 Échéances
                      </span>

                      <span className="rounded-full bg-purple-500/10 px-3 py-1.5 text-xs font-bold text-purple-200">
                        🌿 PiloLife
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/premium"
                    className="shrink-0 rounded-2xl bg-purple-500 px-6 py-4 text-center font-black text-white transition hover:scale-[1.02] hover:bg-purple-400"
                  >
                    Découvrir Premium →
                  </Link>
                </div>
              </section>
            )}
          </FadeIn>

                    {/* LA MISSION DE PILO */}
          <FadeIn delay={0.13}>
            <section className="mt-5 overflow-hidden rounded-3xl border border-green-500/20 bg-gradient-to-r from-green-500/10 via-slate-900 to-slate-900 p-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-green-400">
                    🐦 La mission de Pilo
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-white">
                    Reprendre du pouvoir d&apos;achat, simplement.
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Pilo t&apos;aide à identifier des économies et te propose
                    des solutions adaptées. Tu gardes toujours la main :
                    selon la solution, tu peux demander un devis à un partenaire
                    ou poursuivre directement ta démarche sans démarchage.
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    L&apos;objectif : réduire tes dépenses pour améliorer ton
                    quotidien, puis t&apos;accompagner tout au long de
                    l&apos;année avec le suivi de tes contrats, leurs échéances
                    et de nouvelles opportunités d&apos;économies.
                  </p>
                </div>

                <div className="shrink-0 lg:w-72">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-3 py-3 text-center">
                      <div className="text-xl">🔎</div>

                      <p className="mt-1 text-xs font-black text-green-300">
                        Analyse
                      </p>
                    </div>

                    <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-3 py-3 text-center">
                      <div className="text-xl">🎯</div>

                      <p className="mt-1 text-xs font-black text-green-300">
                        Missions
                      </p>
                    </div>

                    <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 px-3 py-3 text-center">
                      <div className="text-xl">📊</div>

                      <p className="mt-1 text-xs font-black text-purple-300">
                        Suivi
                      </p>
                    </div>

                    <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 px-3 py-3 text-center">
                      <div className="text-xl">🌿</div>

                      <p className="mt-1 text-xs font-black text-purple-300">
                        Projets
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-center text-[11px] font-bold text-slate-500">
                    Analyse → Économies → Suivi → Projets
                  </p>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* ACTIONS RAPIDES */}

          {/* ACTIONS RAPIDES */}
         {/* PARCOURS PILO */}
<FadeIn delay={0.15}>
  <section className="mt-5">
    {/* ÉTAPE 1 - ANALYSE */}
    <Link
      href="/analyse"
      className="group relative block overflow-hidden rounded-3xl border-2 border-green-500/50 bg-gradient-to-r from-green-500/20 via-green-500/10 to-slate-900 p-6 shadow-[0_0_35px_rgba(34,197,94,0.12)] transition hover:-translate-y-1 hover:border-green-400"
    >
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-green-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-500 text-2xl shadow-lg">
            🔎
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-green-500 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-950">
                Étape 1
              </span>

              <span className="text-xs font-black uppercase tracking-wider text-green-400">
                Commence ici
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
              Analyse ta situation
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Réponds à quelques questions. Pilo analyse ta situation
              et identifie les économies et missions adaptées à ton profil.
            </p>
          </div>
        </div>

        <div className="shrink-0 rounded-2xl bg-green-500 px-6 py-4 text-center font-black text-slate-950 transition group-hover:bg-green-400">
          Lancer mon analyse →
        </div>
      </div>
    </Link>

    {/* SUITE DU PARCOURS */}
    <div className="mt-4 grid gap-3 sm:grid-cols-3">
      <Link
        href="/missions"
        className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-1 hover:border-green-500/40"
      >
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-slate-700 px-2.5 py-1 text-[9px] font-black uppercase text-slate-400">
            Étape 2
          </span>

          <span className="text-2xl">🎯</span>
        </div>

        <p className="mt-4 font-black text-white">
          Mes missions
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          Découvre les solutions adaptées après ton analyse.
        </p>
      </Link>

      <Link
        href="/monitoring"
        className="group rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5 transition hover:-translate-y-1 hover:border-purple-500/40"
      >
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-purple-500/20 px-2.5 py-1 text-[9px] font-black uppercase text-purple-300">
            Étape 3
          </span>

          <span className="text-2xl">📊</span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <p className="font-black text-white">
            Monitoring
          </p>

          {!premiumActif && (
            <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[9px] font-black uppercase text-purple-300">
              Premium
            </span>
          )}
        </div>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          Pilo suit tes contrats, prix et échéances.
        </p>
      </Link>

      <Link
        href="/pilolife"
        className="group rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5 transition hover:-translate-y-1 hover:border-purple-500/40"
      >
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-purple-500/20 px-2.5 py-1 text-[9px] font-black uppercase text-purple-300">
            Étape 4
          </span>

          <span className="text-2xl">🌿</span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <p className="font-black text-white">
            PiloLife
          </p>

          {!premiumActif && (
            <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[9px] font-black uppercase text-purple-300">
              Premium
            </span>
          )}
        </div>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          Transforme tes économies en projets.
        </p>
      </Link>
    </div>

    <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-600">
      <span className="text-green-400">Analyse</span>
      <span>→</span>
      <span>Missions</span>
      <span>→</span>
      <span>Monitoring</span>
      <span>→</span>
      <span>PiloLife</span>
    </div>
  </section>
</FadeIn>
          {/* ANALYSE EN COURS */}
          {chargement && (
            <section className="mt-5 rounded-2xl border border-green-500/20 bg-green-500/5 p-4">
              <div className="flex items-center gap-3">
                <span className="animate-pulse text-xl">
                  🐦
                </span>

                <div>
                  <p className="text-sm font-black text-green-300">
                    Pilo met ton
                    analyse à jour
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Tes missions vont
                    être actualisées
                    automatiquement.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* PRIORITÉ */}
          {missionPrioritaire && (
            <FadeIn delay={0.2}>
              <section className="mt-5 rounded-3xl border border-green-500/20 bg-slate-900 p-6">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-green-400">
                      🎯 Ta priorité
                    </p>

                    <h2 className="mt-2 text-xl font-black">
                      {
                        missionPrioritaire.title
                      }
                    </h2>

                    {Number(
                      missionPrioritaire.saving ||
                        0
                    ) > 0 && (
                      <p className="mt-2 text-sm font-bold text-green-300">
                        Jusqu&apos;à{" "}
                        {Number(
                          missionPrioritaire.saving ||
                            0
                        ).toLocaleString(
                          "fr-FR"
                        )}{" "}
                        € / an
                      </p>
                    )}
                  </div>

                  <Link
                    href={`/missions/${missionPrioritaire.mission_id}`}
                    className="rounded-xl bg-green-500 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-green-400"
                  >
                    Voir la mission →
                  </Link>
                </div>
              </section>
            </FadeIn>
          )}

          {/* PROGRESSION COMPACTE */}
          <FadeIn delay={0.25}>
            <section className="mt-5 rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500">
                    Ta progression
                  </p>

                  <h2 className="mt-2 text-xl font-black">
                    Tu avances avec Pilo
                  </h2>
                </div>

                <p className="text-sm font-bold text-green-400">
                  {scoreProgression}%
                </p>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-green-500 transition-all duration-500"
                  style={{
                    width: `${scoreProgression}%`,
                  }}
                />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                  <p className="text-xs font-bold text-slate-500">
                    Économies validées
                  </p>

                  <p className="mt-1 text-xl font-black text-green-400">
                    {economiesRealisees.toLocaleString(
                      "fr-FR"
                    )}{" "}
                    €
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                  <p className="text-xs font-bold text-slate-500">
                    Potentiel restant
                  </p>

                  <p className="mt-1 text-xl font-black">
                    {potentielRestant.toLocaleString(
                      "fr-FR"
                    )}{" "}
                    €
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                  <p className="text-xs font-bold text-slate-500">
                    Missions terminées
                  </p>

                  <p className="mt-1 text-xl font-black">
                    {
                      missionsTerminees.length
                    }
                    /
                    {missions.length}
                  </p>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* MESSAGE SYSTÈME */}
          {message && !chargement && (
            <p className="mt-5 text-center text-xs text-slate-500">
              {message}
            </p>
          )}

          <div className="h-10" />
          </div>
        </section>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-slate-950/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl sm:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 rounded-xl bg-green-500/10 py-2 text-green-400">
            <span className="text-lg">🏠</span>
            <span className="text-[9px] font-black">Accueil</span>
          </Link>
          <Link href="/analyse" className="flex flex-col items-center gap-1 rounded-xl py-2 text-slate-500">
            <span className="text-lg">🔎</span>
            <span className="text-[9px] font-bold">Analyse</span>
          </Link>
          <Link href="/missions" className="flex flex-col items-center gap-1 rounded-xl py-2 text-slate-500">
            <span className="text-lg">🎯</span>
            <span className="text-[9px] font-bold">Missions</span>
          </Link>
          <Link href="/monitoring" className="flex flex-col items-center gap-1 rounded-xl py-2 text-slate-500">
            <span className="text-lg">📊</span>
            <span className="text-[9px] font-bold">Suivi</span>
          </Link>
          <Link href="/pilolife" className="flex flex-col items-center gap-1 rounded-xl py-2 text-slate-500">
            <span className="text-lg">🌿</span>
            <span className="text-[9px] font-bold">PiloLife</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
