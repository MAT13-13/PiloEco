"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";
import Sidebar from "../components/Sidebar";
import HistoryList from "../components/HistoryList";
import PiloCard from "../components/PiloCard";
import PiloAssistant from "../components/PiloAssistant";
import PartnerOfferCard from "../components/PartnerOfferCard";
import { partners } from "../data/partners";
import PiloAdviceGrid from "../components/PiloAdviceGrid";
import PiloPremiumCard from "../components/PiloPremiumCard";
import FadeIn from "../components/FadeIn";
import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardProgress from "../components/dashboard/DashboardProgress";
import PiloJournal from "../components/PiloJournal";
import HeroPilo from "../components/HeroPilo";
import { createPiloEngine } from "../services/ai/pilo-engine.service";
import PiloPriorityCard from "../components/PiloPriorityCard";
import PiloModules from "../components/PiloModules";
import { generateMissions } from "../services/missions.service";
import MobileMenu from "../components/layout/MobileMenu";
import PiloNavigation from "../components/PiloNavigation";
import DashboardNotifications from "../components/dashboard/DashboardNotifications";
import DashboardQuickActions from "../components/dashboard/DashboardQuickActions";
type Recommandation = {
  categorie: string;
  priorite: string;
  economie: number;
  action: string;
};

type ResultatEconomies = {
  economiePossible: number;
  economieAnnuelle: number;
  totalDepenses: number;
  scorePilo: number;
  recommandations: Recommandation[];
  diagnosticIA: string;
  priorites: string[];
};

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

  const [resultat, setResultat] = useState<ResultatEconomies | null>(null);
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
        console.error("Erreur de vérification de session :", error);
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
    } = supabase.auth.onAuthStateChange((_event, session) => {
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
    });

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

    const savedValues = localStorage.getItem("pilo-values");

    if (!savedValues) return;

    const parsedValues = JSON.parse(savedValues) as PiloValues;
    setValues(parsedValues);

    analyseLancee.current = true;
    calculerAnalyseAutomatique(parsedValues, user.id);
  }, [user]);

  async function chargerAnalyses(utilisateurId: string) {
    const { data, error } = await supabase
      .from("analyses")
      .select("*")
      .eq("utilisateur_id", utilisateurId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setAnalyses(data as Analyse[]);
    }
  }

  async function chargerMissions(utilisateurId: string) {
    const { data, error } = await supabase
      .from("missions")
      .select("*")
      .eq("user_id", utilisateurId);

    if (!error && data) {
      setMissions(data);
    }
  }
  async function chargerProfil(utilisateurId: string) {
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
    const { error } = await supabase.auth.signOut();

    if (error) {
      setMessage("Impossible de te déconnecter pour le moment.");
      return;
    }

    setUser(null);
    setResultat(null);
    setAnalyses([]);
    setMissions([]);
    setProfile(null);

    router.replace("/login");
    router.refresh();
  }

  async function calculerAnalyseAutomatique(
    dataValues: PiloValues,
    utilisateurId: string,
  ) {
    setChargement(true);
    setMessage("Pilo prépare ton résultat...");

    try {
      const response = await fetch("http://localhost:3001/calcul-economies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          telephone: Number(dataValues.telephone),
          internet: Number(dataValues.internet),
          assurance: Number(dataValues.assurance),
          electricite: Number(dataValues.electricite),
        }),
      });

      const data = await response.json();

      setResultat(data);
      const { error } = await supabase.from("analyses").insert({
        utilisateur_id: utilisateurId,
        telephone: Number(dataValues.telephone),
        internet: Number(dataValues.internet),
        assurance: Number(dataValues.assurance),
        electricite: Number(dataValues.electricite),
        total_depenses: data.totalDepenses,
        economie_possible: data.economiePossible,
        economie_annuelle: data.economieAnnuelle,
      });

      if (error) {
        setMessage("Résultat affiché, mais l'analyse n'a pas été enregistrée.");
      } else {
        const nouvellesMissions = generateMissions({
          telephone: Number(dataValues.telephone),
          internet: Number(dataValues.internet),
          assurance: Number(dataValues.assurance),
          electricite: Number(dataValues.electricite),
        });

        for (const mission of nouvellesMissions) {
          const missionExistante = missions.find(
            (m) => m.mission_id === mission.mission_id,
          );

          if (!missionExistante) {
            await supabase.from("missions").insert({
              user_id: utilisateurId,
              mission_id: mission.mission_id,
              title: mission.title,
              saving: mission.saving,
              status: mission.status,
            });

            continue;
          }

          if (missionExistante.status === "Terminée") {
            continue;
          }

          await supabase
            .from("missions")
            .update({
              title: mission.title,
              saving: mission.saving,
            })
            .eq("id", missionExistante.id);
        }

        setMessage("Analyse enregistrée et missions créées.");
        localStorage.removeItem("pilo-values");
        chargerAnalyses(utilisateurId);
        chargerMissions(utilisateurId);
      }
    } catch {
      setMessage("Erreur de connexion avec le backend.");
    }

    setChargement(false);
  }

  function getCurrentPrice(categorie: string) {
    if (categorie === "Téléphone") return Number(values.telephone);
    if (categorie === "Internet") return Number(values.internet);
    if (categorie === "Assurance") return Number(values.assurance);
    return Number(values.electricite);
  }

  const totalEconomiesMensuelles = analyses.reduce(
    (total, analyse) => total + Number(analyse.economie_possible || 0),
    0,
  );

  const totalEconomiesAnnuelles = analyses.reduce(
    (total, analyse) => total + Number(analyse.economie_annuelle || 0),
    0,
  );
  const missionsTerminees = missions.filter(
    (mission) => mission.status === "Terminée",
  );

  const economiesRealisees = missionsTerminees.reduce(
    (total, mission) => total + Number(mission.saving || 0),
    0,
  );

  const potentielRestant = missions
    .filter((mission) => mission.status !== "Terminée")
    .reduce((total, mission) => total + Number(mission.saving || 0), 0);

  const scoreProgression = Math.min(100, 60 + missionsTerminees.length * 10);
  const piloBrain = createPiloEngine([
    {
      id: "mobile",
      name: "Téléphone",
      monthlyPrice: Number(values.telephone || 0),
      recommendedPrice: 15,
    },
    {
      id: "internet",
      name: "Internet",
      monthlyPrice: Number(values.internet || 0),
      recommendedPrice: 25,
    },
    {
      id: "electricite",
      name: "Électricité",
      monthlyPrice: Number(values.electricite || 0),
      recommendedPrice: 72,
    },
    {
      id: "habitation",
      name: "Habitation",
      monthlyPrice: Number(values.assurance || 0),
      recommendedPrice: 18,
    },
    {
      id: "banque",
      name: "Banque",
      monthlyPrice: 18,
      recommendedPrice: 6,
    },
  ]);

  const piloProfile = {
    level: profile?.level || 1,
    title:
      (profile?.level || 1) === 1
        ? "Débutant"
        : (profile?.level || 1) === 2
          ? "Économe"
          : (profile?.level || 1) === 3
            ? "Stratège"
            : (profile?.level || 1) === 4
              ? "Expert"
              : "Maître Pilo",
    score: scoreProgression,
    progress: profile?.xp || 0,
    yearlySaving: Number(profile?.total_savings || totalEconomiesAnnuelles),
    monthlySaving: Math.round(
      Number(profile?.total_savings || totalEconomiesAnnuelles) / 12,
    ),
    missionsCompleted: Number(
      profile?.completed_missions || missionsTerminees.length,
    ),
    missionsRemaining: missions.length - missionsTerminees.length,
    premium: false,
    xp: Number(profile?.xp || 0),
  };

  const missionPrioritaire = [...missions]
    .filter((m) => m.status !== "Terminée")
    .sort((a, b) => Number(b.saving || 0) - Number(a.saving || 0))[0];
    const piloSituation = (() => {
  if (
    missionPrioritaire &&
    Number(missionPrioritaire.saving || 0) > 0
  ) {
    return {
      mood: "opportunity",
      emoji: "🎯",
      title: "J’ai une mission pour toi !",
      message: `La mission « ${missionPrioritaire.title} » pourrait te faire économiser ${Number(
        missionPrioritaire.saving || 0
      ).toLocaleString("fr-FR")} € par an.`,
      glowClass: "bg-green-500/35",
    };
  }

  if (
    piloProfile.yearlySaving > 0 &&
    piloProfile.missionsRemaining === 0
  ) {
    return {
      mood: "success",
      emoji: "🎉",
      title: "Tout est bien optimisé !",
      message: `Tu as déjà récupéré ${piloProfile.yearlySaving.toLocaleString(
        "fr-FR"
      )} € par an et terminé toutes tes missions actuelles.`,
      glowClass: "bg-emerald-400/35",
    };
  }

  if (analyses.length === 0) {
    return {
      mood: "waiting",
      emoji: "🔎",
      title: "On commence l’analyse ?",
      message:
        "Réponds à quelques questions et je chercherai les économies possibles dans ton budget.",
      glowClass: "bg-blue-500/25",
    };
  }

  return {
    mood: "calm",
    emoji: "🐦",
    title: "Je veille sur ton budget.",
    message:
      piloBrain.pilo.message ||
      "Je continue à suivre ta progression et à chercher de nouvelles économies.",
    glowClass: "bg-green-500/25",
  };
})();
  async function onCompleteMission(mission: any) {
    if (!user || mission.status === "Terminée") return;

    const nouveauXp = (profile?.xp || 0) + 50;
    const nouvellesEconomies =
      (profile?.total_savings || 0) + Number(mission.saving);

    const nouveauNiveau =
      nouveauXp >= 1200
        ? 5
        : nouveauXp >= 700
          ? 4
          : nouveauXp >= 300
            ? 3
            : nouveauXp >= 100
              ? 2
              : 1;

    const missionsTerminees = (profile?.completed_missions || 0) + 1;

    const { error: missionError } = await supabase
      .from("missions")
      .update({
        status: "Terminée",
      })
      .eq("id", mission.id);

    if (missionError) {
      alert("Erreur lors de la validation de la mission.");
      return;
    }

    const { error: profileError } = await supabase
      .from("profils")
      .update({
        xp: nouveauXp,
        level: nouveauNiveau,
        total_savings: nouvellesEconomies,
        completed_missions: missionsTerminees,
      })
      .eq("id", user.id);

    if (profileError) {
      alert("Erreur lors de la mise à jour du profil.");
      return;
    }

    await chargerMissions(user.id);
    await chargerProfil(user.id);

    setMessage("🎉 Mission validée !");
  }
  if (authChecking || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="text-center">
          <p className="text-5xl">🐦</p>

          <h1 className="mt-4 text-2xl font-black">
            {authChecking
              ? "Pilo vérifie ta session..."
              : "Redirection vers la connexion..."}
          </h1>

          <p className="mt-3 text-slate-400">Un instant, s’il te plaît.</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <Sidebar />
      <MobileMenu />

      <main className="min-h-screen bg-slate-950 p-6 text-white lg:ml-64">
        <section className="mx-auto w-full max-w-6xl">
          <div className="mb-8 flex items-center justify-end">
            <button
              onClick={deconnexion}
              className="rounded-xl bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700"
            >
              Déconnexion
            </button>
          </div>

          <PiloNavigation />

        <FadeIn delay={0}>
  <section className="mt-8 overflow-hidden rounded-[2rem] border border-green-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-green-950/40 p-7 shadow-2xl sm:p-9">
    <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-center">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.3em] text-green-400">
          🐦 Ton copilote d’économies
        </p>

        <h1 className="mt-4 text-4xl font-black sm:text-5xl">
          Bonjour Fiona 👋
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
          Pilo a détecté{" "}
          <span className="font-black text-green-400">
            {piloProfile.yearlySaving.toLocaleString(
              "fr-FR"
            )}{" "}
            €/an
          </span>{" "}
          d’économies potentielles.
        </p>

        <div className="mt-5 max-w-2xl rounded-2xl border border-green-400/20 bg-green-400/[0.06] px-5 py-4">
          <p className="font-black text-white">
            {piloSituation.emoji}{" "}
            {piloSituation.title}
          </p>

          <p className="mt-2 leading-relaxed text-slate-300">
            {piloSituation.message}
          </p>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Score Pilo
            </p>

            <p className="mt-2 text-2xl font-black text-white">
              {piloProfile.score}/100
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Missions restantes
            </p>

            <p className="mt-2 text-2xl font-black text-white">
              {piloProfile.missionsRemaining}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Niveau
            </p>

            <p className="mt-2 text-2xl font-black text-white">
              {piloProfile.level} ·{" "}
              {piloProfile.title}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-52 w-52 items-center justify-center">
          <div
            className={`absolute inset-5 animate-pulse rounded-full ${piloSituation.glowClass} blur-3xl`}
          />

          <img
            src="/pilo.png"
            alt="Pilo, la mascotte de PiloEco"
            className="relative z-10 h-full w-full animate-pilo object-contain drop-shadow-[0_20px_60px_rgba(34,197,94,0.45)] transition duration-300 hover:scale-105 hover:-rotate-2"
          />
        </div>

        {missionPrioritaire && (
          <Link
            href={`/missions/${missionPrioritaire.mission_id}`}
            className="w-full rounded-2xl border border-green-400/20 bg-green-400/[0.07] p-4 transition hover:border-green-400/50 hover:bg-green-400/[0.12]"
          >
            <p className="text-xs font-black uppercase tracking-wider text-green-400">
              🎯 Mission du moment
            </p>

            <p className="mt-2 font-black text-white">
              {missionPrioritaire.title}
            </p>

            <p className="mt-1 text-sm font-bold text-green-300">
              Jusqu’à{" "}
              {Number(
                missionPrioritaire.saving || 0
              ).toLocaleString("fr-FR")}{" "}
              €/an
            </p>
          </Link>
        )}

        <div className="grid w-full gap-3">
          <Link
            href="/analyse"
            className="rounded-2xl bg-green-500 px-6 py-4 text-center font-black text-slate-950 transition hover:scale-[1.02] hover:bg-green-400"
          >
            {analyses.length > 0
              ? "🔄 Relancer une analyse"
              : "🚀 Lancer une analyse"}
          </Link>

          <Link
            href="/monitoring"
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-6 py-4 text-center font-black text-white transition hover:border-green-500/40 hover:text-green-300"
          >
            📊 Ouvrir le Monitoring
          </Link>
        </div>
      </div>
    </div>
  </section>
</FadeIn>

          <FadeIn delay={0.15}>
            <DashboardQuickActions />
          </FadeIn>

          <FadeIn delay={0.2}>
            <DashboardNotifications />
          </FadeIn>

          {missionPrioritaire && (
            <FadeIn delay={0.2}>
              <PiloPriorityCard
                title={missionPrioritaire.title}
                emoji="🐦"
                saving={missionPrioritaire.saving}
                time="5 minutes"
                difficulty="Facile"
                priority={5}
                reason={piloBrain.pilo.message}
                href={`/missions/${missionPrioritaire.mission_id}`}
              />
            </FadeIn>
          )}

          <FadeIn delay={0.3}>
            <DashboardProgress
              economieAnnuelle={piloProfile.yearlySaving}
              score={scoreProgression}
              economiesRealisees={economiesRealisees}
              potentielRestant={potentielRestant}
              missionsTerminees={missionsTerminees.length}
              totalMissions={missions.length}
            />
          </FadeIn>
          {resultat && (
            <FadeIn delay={0.15}>
              <PiloAdviceGrid
                recommandations={resultat.recommandations || []}
              />
            </FadeIn>
          )}

          <FadeIn delay={0.45}>
            <PiloModules />
          </FadeIn>

          <FadeIn delay={0.75}>
            <PiloPremiumCard />
          </FadeIn>

          <DashboardStats
            analyses={analyses.length}
            economieMensuelle={totalEconomiesMensuelles}
            economieAnnuelle={totalEconomiesAnnuelles}
          />

          {chargement && (
            <section className="mt-8 rounded-3xl border border-green-500/20 bg-white/5 p-8 text-center">
              <div className="text-6xl">
                🐦
                <HeroPilo economie={totalEconomiesAnnuelles} />
              </div>
              <h2 className="mt-4 text-3xl font-black">
                Pilo prépare ton résultat...
              </h2>
              <p className="mt-3 text-slate-400">
                Je récupère ton analyse et je calcule tes économies.
              </p>
            </section>
          )}

          {!chargement && !resultat && (
            <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
              <h2 className="text-3xl font-black">Aucune analyse en cours</h2>
              <p className="mt-3 text-slate-400">
                Lance une nouvelle analyse pour que Pilo cherche tes économies.
              </p>

              <Link
                href="/analyse"
                className="mt-6 inline-block rounded-2xl bg-green-500 px-8 py-4 font-black text-slate-950 transition hover:bg-green-400"
              >
                Lancer une analyse
              </Link>
            </section>
          )}

          {resultat && (
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div>
                <PiloCard economie={resultat.economiePossible} />

                <PiloAssistant
                  score={resultat.scorePilo}
                  savings={resultat.economieAnnuelle}
                  recommandations={resultat.recommandations || []}
                  conseilsIA={[resultat.diagnosticIA || ""]}
                />
                <PiloJournal />

                <div className="mt-8 space-y-4">
                  <h2 className="text-2xl font-bold text-white">
                    💰 Passe à l'action
                  </h2>

                  {(resultat.recommandations || []).map((recommandation) => {
                    const partner = partners[recommandation.categorie];

                    if (!partner) return null;

                    return (
                      <PartnerOfferCard
                        key={recommandation.categorie}
                        title={recommandation.categorie}
                        provider={partner.provider}
                        currentPrice={getCurrentPrice(recommandation.categorie)}
                        partnerPrice={partner.partnerPrice}
                        saving={recommandation.economie}
                        url={partner.url}
                      />
                    );
                  })}
                </div>
              </div>

              <HistoryList analyses={analyses} />
            </div>
          )}
          <FadeIn delay={0.3}>
            <div className="mt-10 flex justify-center">
              <Link
                href="/analyse"
                className="rounded-2xl bg-green-500 px-6 py-4 font-black text-slate-950 transition hover:scale-105 hover:bg-green-400"
              >
                🔄 Relancer mon analyse
              </Link>
            </div>
          </FadeIn>
          {message && (
            <p className="mt-8 text-center text-sm text-slate-400">{message}</p>
          )}
        </section>
      </main>
    </>
  );
}