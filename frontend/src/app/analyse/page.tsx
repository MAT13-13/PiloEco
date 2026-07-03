"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PiloMascot from "../components/PiloMascot";
import QuestionCard from "../components/QuestionCard";
import { motion, AnimatePresence } from "framer-motion";
import { savePiloMissions } from "../services/pilo-missions.service";
import { supabase } from "../lib/supabase";

const questions = [
  {
    key: "telephone",
    emoji: "📱",
    title: "Combien payez-vous votre forfait mobile ?",
    placeholder: "Ex : 35",
  },
  {
    key: "internet",
    emoji: "🌐",
    title: "Combien payez-vous Internet ?",
    placeholder: "Ex : 40",
  },
  {
    key: "assurance",
    emoji: "🛡️",
    title: "Combien payez-vous vos assurances ?",
    placeholder: "Ex : 80",
  },
  {
    key: "electricite",
    emoji: "⚡",
    title: "Combien payez-vous d’électricité ?",
    placeholder: "Ex : 120",
  },
];

export default function AnalysePage() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [values, setValues] = useState({
    telephone: "",
    internet: "",
    assurance: "",
    electricite: "",
  });

  const question = questions[step];

  async function handleNext() {
    if (!values[question.key as keyof typeof values]) return;

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem("pilo-values", JSON.stringify(values));

    const {
  data: { user },
} = await supabase.auth.getUser();

if (user) {
  await savePiloMissions({
    userId: user.id,
    telephone: Number(values.telephone),
    internet: Number(values.internet),
    assurance: Number(values.assurance),
    electricite: Number(values.electricite),
  });
}

      router.push("/analyse-loading");
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.35 }}
        >
          <QuestionCard title={question.title}>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 animate-bounce items-center justify-center rounded-full bg-green-500/10 text-6xl">
                🐦
              </div>

              <p className="text-sm font-bold uppercase tracking-wide text-green-400">
                Question {step + 1} / {questions.length}
              </p>

              <div className="mt-6 text-6xl">{question.emoji}</div>

              <p className="mt-3 text-slate-400">
                Indique le montant mensuel en euros.
              </p>

              <p className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-center text-green-300">
                {step === 0 && "📱 Je commence par ton forfait mobile."}
                {step === 1 && "🌐 Je regarde maintenant Internet."}
                {step === 2 &&
                  "🛡️ Les assurances peuvent réserver de bonnes surprises."}
                {step === 3 &&
                  "⚡ Plus qu'une question et je calcule tes économies !"}
              </p>
            </div>

            <input
              type="number"
              value={values[question.key as keyof typeof values]}
              onChange={(e) =>
                setValues({
                  ...values,
                  [question.key]: e.target.value,
                })
              }
              placeholder={question.placeholder}
              className="mt-8 w-full rounded-2xl bg-white p-5 text-center text-3xl font-bold text-slate-950 placeholder:text-slate-400"
            />

            <div className="mt-8 flex gap-4">
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="w-1/3 rounded-2xl border border-white/10 bg-white/5 py-5 text-xl font-bold text-white transition hover:bg-white/10"
                >
                  ← Retour
                </button>
              )}

              <button
                onClick={handleNext}
                className="flex-1 rounded-2xl bg-green-500 py-5 text-xl font-bold text-slate-950 transition hover:bg-green-400"
              >
                {step < questions.length - 1
                  ? "Continuer →"
                  : "Voir mon analyse →"}
              </button>
            </div>

            <div className="mt-8 flex gap-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full ${
                    index <= step ? "bg-green-500" : "bg-slate-700"
                  }`}
                />
              ))}
            </div>
          </QuestionCard>
        </motion.div>
      </AnimatePresence>

      <PiloMascot />
    </main>
  );
}