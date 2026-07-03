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
import DashboardModules from "../components/DashboardModules";
import { getPiloCore } from "../services/pilo-core.service";
import { createPiloBrain } from "../services/pilo.service";
import PiloJournal from "../components/PiloJournal";
import HeroPilo from "../components/HeroPilo";
import { createPiloEngine } from "../services/pilo-engine.service";
import { createPiloProfile } from "../services/pilo-profile.service";

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
  const [chargement, setChargement] = useState(false);
  const [message, setMessage] = useState("");

  const analyseLancee = useRef(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);

      if (data.user) {
        chargerAnalyses(data.user.id);
        chargerMissions(data.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        chargerAnalyses(session.user.id);
        chargerMissions(session.user.id);
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
        setMessage("Analyse enregistrée avec succès.");
        localStorage.removeItem("pilo-values");
        chargerAnalyses(utilisateurId);
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
const piloBrain = createPiloBrain([
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

const piloProfile = createPiloProfile({
  score: scoreProgression,
  yearlySaving: totalEconomiesAnnuelles,
  monthlySaving: totalEconomiesMensuelles,
  missionsCompleted: missionsTerminees.length,
  missionsRemaining: missions.length - missionsTerminees.length,
  premium: false,
});

const pilo = getPiloCore({
  name: user?.user_metadata?.first_name,
  scoreProgression,
  totalEconomiesAnnuelles,
  missionsTerminees: missionsTerminees.length,
  totalMissions: missions.length,
});

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

          <FadeIn delay={0}>
            <DashboardWelcome
  name="Fiona"
  economieAnnuelle={piloBrain.yearlySaving}
  piloTitle={`${piloBrain.pilo.emoji} ${piloBrain.pilo.title}`}
  piloMessage={piloBrain.priorityMessage}
/>
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

            <PiloMissions missions={missions} />
          </FadeIn>

          <DashboardModules />

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
