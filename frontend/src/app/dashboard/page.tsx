"use client";

import { useEffect, useRef, useState } from "react";
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
import PiloEvolution from "../components/PiloEvolution";
import PiloPremiumCard from "../components/PiloPremiumCard";
import PiloMissions from "../components/PiloMissions";
import FadeIn from "../components/FadeIn";
import DashboardWelcome from "../components/dashboard/DashboardWelcome";
import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardProgress from "../components/dashboard/DashboardProgress";
import PiloJournal from "../components/PiloJournal";
import HeroPilo from "../components/HeroPilo";
import { createPiloEngine } from "../services/ai/pilo-engine.service";
import PiloProfileCard from "../components/PiloProfileCard";
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
  const [user, setUser] = useState<User | null>(null);

  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

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
  const [aiAdvice, setAiAdvice] = useState("");

  const analyseLancee = useRef(false);

 useEffect(() => {
  supabase.auth.getUser().then(({ data }) => {
    setUser(data.user);

    if (data.user) {
      chargerAnalyses(data.user.id);
      chargerMissions(data.user.id);
      chargerProfil(data.user.id);
    }
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);

    if (session?.user) {
      chargerAnalyses(session.user.id);
      chargerMissions(session.user.id);
      chargerProfil(session.user.id);
    }
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);

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

  async function inscription() {
    setChargement(true);
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password: motDePasse,
    });

    if (error) {
      setMessage(error.message);
    } else {
      if (data.user) {
        await supabase.from("profils").insert({
          id: data.user.id,
          email,
        });
      }

      setMessage("Compte créé. Vérifie tes emails pour confirmer ton compte.");
    }

    setChargement(false);
  }

  async function connexion() {
    setChargement(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: motDePasse,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Connexion réussie.");
    }

    setChargement(false);
  }

  async function deconnexion() {
    await supabase.auth.signOut();
    setResultat(null);
    setAnalyses([]);
    setMissions([]);
    setMessage("Déconnexion réussie.");
  }

  async function calculerAnalyseAutomatique(
    dataValues: PiloValues,
    utilisateurId: string
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
const piloResponse = await fetch("/api/pilo", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
 body: JSON.stringify({
    name: "Fiona",
    score: data.scorePilo,
    savings: data.economieAnnuelle,
    depenses: [
      {
        description: "Téléphone",
        category: "Téléphone",
        amount: Number(dataValues.telephone),
      },
      {
        description: "Internet",
        category: "Internet",
        amount: Number(dataValues.internet),
      },
      {
        description: "Assurance",
        category: "Assurance",
        amount: Number(dataValues.assurance),
      },
      {
        description: "Électricité",
        category: "Électricité",
        amount: Number(dataValues.electricite),
      },
    ],
  }),
});

const piloData = await piloResponse.json();

if (piloData.success) {
  setAiAdvice(piloData.advice);
}

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
    (m) => m.mission_id === mission.mission_id
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
    0
  );

  const totalEconomiesAnnuelles = analyses.reduce(
    (total, analyse) => total + Number(analyse.economie_annuelle || 0),
    0
  );
 const missionsTerminees = missions.filter(
  (mission) => mission.status === "Terminée"
);

const economiesRealisees = missionsTerminees.reduce(
  (total, mission) => total + Number(mission.saving || 0),
  0
);

const potentielRestant = missions
  .filter((mission) => mission.status !== "Terminée")
  .reduce((total, mission) => total + Number(mission.saving || 0), 0);

const scoreProgression = Math.min(
  100,
  60 + missionsTerminees.length * 10
);
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
    Number(profile?.total_savings || totalEconomiesAnnuelles) / 12
  ),
  missionsCompleted: Number(
    profile?.completed_missions || missionsTerminees.length
  ),
  missionsRemaining: missions.length - missionsTerminees.length,
  premium: false,
  xp: Number(profile?.xp || 0),
};


const missionPrioritaire = [...missions]
  .filter((m) => m.status !== "Terminée")
  .sort((a, b) => Number(b.saving || 0) - Number(a.saving || 0))[0];
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

  const missionsTerminees =
    (profile?.completed_missions || 0) + 1;

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

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
        <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <p className="mb-3 text-center font-bold text-green-400">PiloEco</p>

          <h1 className="mb-4 text-center text-4xl font-bold">
            Connecte-toi
          </h1>

          <p className="mb-8 text-center text-slate-300">
            Connecte-toi pour voir ton analyse et enregistrer ton historique.
          </p>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Ton email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-white p-4 text-black placeholder:text-slate-500"
            />

            <input
              type="password"
              placeholder="Mot de passe"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              className="w-full rounded-xl bg-white p-4 text-black placeholder:text-slate-500"
            />

            <button
              onClick={connexion}
              disabled={chargement}
              className="w-full rounded-xl bg-green-500 py-4 font-bold text-black transition hover:bg-green-400 disabled:opacity-50"
            >
              Se connecter
            </button>

            <button
              onClick={inscription}
              disabled={chargement}
              className="w-full rounded-xl bg-white py-4 font-bold text-black transition hover:bg-slate-200 disabled:opacity-50"
            >
              Créer un compte
            </button>
          </div>

          {message && (
            <p className="mt-6 text-center text-sm text-slate-300">
              {message}
            </p>
          )}
        </section>
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
  <DashboardWelcome
    name="Fiona"
    economieAnnuelle={piloBrain.yearlySaving}
    piloTitle={`${piloBrain.pilo.emoji} ${piloBrain.pilo.title}`}
    piloMessage={piloBrain.pilo.message}
  />
</FadeIn>

<FadeIn delay={0.1}>
  <PiloProfileCard
  level={piloProfile.level}
  title={piloProfile.title}
  score={piloProfile.score}
  progress={piloProfile.progress}
  yearlySaving={piloProfile.yearlySaving}
  monthlySaving={piloProfile.monthlySaving}
  missionsCompleted={piloProfile.missionsCompleted}
  missionsRemaining={piloProfile.missionsRemaining}
  premium={piloProfile.premium}
  xp={piloProfile.xp}
/>
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
<FadeIn delay={0.15}>
  <section className="mt-8 overflow-hidden rounded-3xl border border-green-500/20 bg-gradient-to-r from-slate-900 via-slate-900 to-green-950 p-8 shadow-xl">
    <div className="flex flex-col items-center gap-8 lg:flex-row">
      <div className="text-center lg:w-1/4">
        <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-green-500/10 text-7xl">
          🐦
        </div>

        <p className="mt-4 font-bold text-green-300">
          Pilo IA
        </p>
      </div>

      <div className="flex-1">
        <p className="text-sm uppercase tracking-[0.3em] text-green-400">
          Assistant intelligent
        </p>

        <h2 className="mt-3 text-3xl font-black">
  {aiAdvice || piloBrain.pilo.message}
</h2>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          J'ai analysé tes dépenses et trouvé
          <span className="font-black text-green-400">
            {" "}{piloProfile.yearlySaving} € d'économies potentielles par an
          </span>.
        </p>

        <p className="mt-4 text-slate-400 whitespace-pre-line">
  {aiAdvice}
</p>
       <div className="mt-8 flex flex-wrap gap-4">
  <Link
    href="/monitoring"
    className="rounded-2xl bg-green-500 px-6 py-3 font-bold text-slate-950 transition hover:scale-105 hover:bg-green-400"
  >
    🚀 Voir mes recommandations
  </Link>

  <Link
    href="/analyses"
    className="rounded-2xl border border-slate-700 px-6 py-3 font-bold transition hover:border-green-500"
  >
    📊 Voir mes analyses
  </Link>
</div>
      
      </div>
    </div>
  </section>
</FadeIn>
<FadeIn delay={0.2}>
  <div className="mt-8 grid gap-6 lg:grid-cols-3">
    <div className="rounded-3xl border border-green-500/20 bg-white/5 p-6">
      <p className="text-sm uppercase tracking-widest text-green-400">
        💰 Économies détectées
      </p>

      <p className="mt-4 text-5xl font-black text-green-400">
        {piloProfile.yearlySaving} €
      </p>

      <p className="mt-2 text-slate-400">
        Potentiel annuel actuellement identifié.
      </p>
    </div>

    <div className="rounded-3xl border border-green-500/20 bg-white/5 p-6">
      <p className="text-sm uppercase tracking-widest text-green-400">
        🎯 Missions
      </p>

      <p className="mt-4 text-5xl font-black">
        {missions.length}
      </p>

      <p className="mt-2 text-slate-400">
        Missions disponibles.
      </p>
    </div>

    <div className="rounded-3xl border border-green-500/20 bg-white/5 p-6">
      <p className="text-sm uppercase tracking-widest text-green-400">
        📊 Analyses
      </p>

      <p className="mt-4 text-5xl font-black">
        {analyses.length}
      </p>

      <p className="mt-2 text-slate-400">
        Analyses enregistrées.
      </p>
    </div>
  </div>
</FadeIn>
          {resultat && (
            <FadeIn delay={0.15}>
              <PiloAdviceGrid recommandations={resultat.recommandations || []} />
            </FadeIn>
          )}

          <FadeIn delay={0.3}>
            <PiloEvolution
              economieAnnuelle={
                resultat?.economieAnnuelle ?? totalEconomiesAnnuelles
              }
            />

            <DashboardProgress
              score={scoreProgression}
              economiesRealisees={economiesRealisees}
              potentielRestant={potentielRestant}
              missionsTerminees={missionsTerminees.length}
              totalMissions={missions.length}
            />

            
          </FadeIn>

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
              <div className="text-6xl">🐦
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
            <p className="mt-8 text-center text-sm text-slate-400">
              {message}
            </p>
          )}
        </section>
      </main>
    </>
  );
}