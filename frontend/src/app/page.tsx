"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
    const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;

    const timer = setInterval(() => {
      current += 3;

      if (current >= 387) {
        current = 387;
        clearInterval(timer);
      }

      setCount(current);
    }, 10);

    return () => clearInterval(timer);
  }, []);
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative flex min-h-screen items-center justify-center px-6">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-green-500/20 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-green-400/10 blur-3xl" />

        <div className="relative z-10 grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-green-400">
              PiloEco
            </p>

            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              Pilo cherche où tu peux économiser.
            </h1>

            <p className="mt-6 max-w-xl text-xl leading-relaxed text-slate-300">
              Réponds à quelques questions, Pilo regarde tes dépenses et te
              montre les pistes les plus simples pour payer moins. Puis tu
              décides de la suite.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/analyse"
                className="rounded-2xl bg-green-500 px-8 py-5 text-center text-lg font-black text-slate-950 shadow-lg shadow-green-500/20 transition hover:scale-105 hover:bg-green-400"
              >
                💚 Commencer avec Pilo
              </Link>

              <a
                href="#comment-ca-marche"
                className="rounded-2xl border border-white/10 bg-white/5 px-8 py-5 text-center text-lg font-bold text-white transition hover:bg-white/10"
              >
                Voir comment ça marche
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-slate-300">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                💚 Gratuit
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                ⏱ Environ 2 minutes
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                🛡 Tu gardes le contrôle
              </span>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute h-80 w-80 rounded-full bg-green-500/20 blur-3xl" />

            <div className="relative rounded-[2rem] border border-green-400/20 bg-white/5 p-6 shadow-2xl">
              <div className="mb-4 rounded-2xl bg-white px-5 py-4 text-sm font-bold text-slate-900">
                Salut 👋 Moi c'est Pilo. On regarde tes dépenses ?
              </div>

              <div className="relative flex h-80 w-80 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-green-500/30 blur-3xl" />

                <img
                  src="/pilo.png"
                  alt="Pilo"
                  className="relative z-10 h-full w-full animate-pilo object-contain drop-shadow-[0_20px_80px_rgba(34,197,94,0.45)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-[2rem] border border-green-500/20 bg-white/5 p-12 shadow-[0_0_80px_rgba(34,197,94,0.08)] backdrop-blur-xl">
          <div className="flex flex-col items-center gap-10 lg:flex-row">
            <div className="flex justify-center">
              <img
                src="/pilo.png"
                alt="Pilo"
                className="h-80 w-80 object-contain transition duration-500 hover:scale-105"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-4xl font-black text-white">
                🐦 Avant de commencer, je veux te rassurer.
              </h2>

              <p className="mt-6 text-lg text-slate-300">
                Beaucoup de personnes hésitent à faire une simulation par peur
                d'être rappelées ensuite.
              </p>

              <p className="mt-6 text-2xl font-bold text-green-400">
                Chez moi, ça fonctionne autrement.
              </p>

              <div className="mt-8 space-y-5 text-lg text-slate-200">
                <p>✅ Je cherche d'abord où tu peux économiser.</p>

                <p>✅ Tu découvres le montant que tu pourrais économiser.</p>

                <p>
                  ✅ Tes coordonnées ne sont transmises à un partenaire
                  <span className="font-bold text-green-400">
                    {" "}
                    que si tu décides d'aller plus loin.
                  </span>
                </p>

                <p className="text-xl font-black text-white">
                  🛡 C'est toi qui décides. Toujours.
                </p>
              </div>

              <p className="mt-8 text-lg font-semibold text-green-400">
                💚 Je suis là pour t'aider à économiser, pas pour te mettre la
                pression.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            Imagine si...
          </p>

         <h2 className="mt-4 text-5xl font-black">
  💰 Et si Pilo trouvait
  <span className="text-green-400"> {count} € </span>
  d'économies cette année ?
</h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-300">
            Ce n'est qu'un exemple... mais quelques centaines d'euros peuvent
            parfois faire une vraie différence.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {[
            ["🛒", "Les courses", "Un mois de courses en plus."],
            ["✈️", "Un week-end", "Une escapade à deux."],
            ["🎄", "Les cadeaux", "Préparer Noël plus sereinement."],
            ["🐶", "Ton compagnon", "Les frais de ton chien ou ton chat."],
            [
              "💚",
              "Plus de liberté",
              "Ou simplement respirer un peu plus chaque mois.",
            ],
          ].map(([emoji, title, text]) => (
            <div
              key={title}
             className="animate-fade-up rounded-3xl border border-white/10 bg-white/5 p-6 text-center transition duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-green-400/40 hover:bg-white/10"
            >
              <div className="text-6xl">{emoji}</div>

              <h3 className="mt-6 text-2xl font-black">{title}</h3>

              <p className="mt-4 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="comment-ca-marche"
        className="relative mx-auto grid max-w-6xl gap-6 px-6 pb-24 md:grid-cols-3"
      >
        {[
          [
            "📱",
            "Tu réponds simplement",
            "Téléphone, Internet, assurances, électricité... Environ 2 minutes.",
          ],
          [
            "🔎",
            "Pilo regarde pour toi",
            "Elle repère les dépenses où tu pourrais peut-être payer moins.",
          ],
          [
            "🎉",
            "Tu décides de la suite",
            "Tu consultes les résultats tranquillement. Aucun contact sans ton accord.",
          ],
        ].map(([emoji, title, text]) => (
          <div
            key={title}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-green-400/40"
          >
            <div className="text-5xl">{emoji}</div>
            <h2 className="mt-6 text-2xl font-black">{title}</h2>
            <p className="mt-4 text-slate-400">{text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}