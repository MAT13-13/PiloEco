"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const steps = [
  "Analyse du forfait mobile",
  "Vérification Internet",
  "Lecture des assurances",
  "Calcul de l'électricité",
  "Préparation de ton score Pilo",
];

export default function AnalyseLoadingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          clearInterval(timer);
          return 100;
        }

        return value + 2;
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      router.push("/dashboard");
    }
  }, [progress, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <section className="w-full max-w-2xl rounded-[2rem] border border-green-500/20 bg-white/5 p-10 text-center shadow-2xl">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-green-500/10 text-7xl">
          🐦
        </div>

        <h1 className="mt-8 text-4xl font-black">
          Pilo analyse tes dépenses...
        </h1>

        <p className="mt-4 text-slate-400">
          Je cherche les premières pistes d'économies pour toi.
        </p>

        <div className="mt-10 space-y-4 text-left">
          {steps.map((step, index) => {
            const isDone = progress >= (index + 1) * 20;

            return (
              <div
                key={step}
                className="flex items-center justify-between rounded-2xl bg-white/5 px-5 py-4"
              >
                <span>{step}</span>

                <span
                  className={
                    isDone ? "text-green-400" : "text-slate-500"
                  }
                >
                  {isDone ? "✓" : "⏳"}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-10 h-4 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-4 text-2xl font-black text-green-400">
          {progress} %
        </p>
      </section>
    </main>
  );
}