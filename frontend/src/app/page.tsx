"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const savingIdeas = [
  {
    emoji: "📱",
    title: "Téléphone",
    text: "Repérer un forfait plus adapté à tes besoins.",
  },
  {
    emoji: "🌐",
    title: "Internet",
    text: "Comparer ton abonnement et les offres disponibles.",
  },
  {
    emoji: "⚡",
    title: "Électricité",
    text: "Identifier une facture potentiellement trop élevée.",
  },
  {
    emoji: "🛡️",
    title: "Assurances",
    text: "Comparer tes contrats auto, habitation ou animaux.",
  },
  {
    emoji: "📺",
    title: "Abonnements",
    text: "Détecter les services coûteux ou devenus inutiles.",
  },
  {
    emoji: "🏦",
    title: "Banque",
    text: "Réduire certains frais bancaires récurrents.",
  },
];

const faqItems = [
  {
    question: "Est-ce que l’analyse est gratuite ?",
    answer:
      "Oui. Tu peux découvrir tes premières pistes d’économies gratuitement et sans engagement.",
  },
  {
    question: "Est-ce que je vais être démarché ?",
    answer:
      "Non. Tes coordonnées ne sont transmises à aucun partenaire sans une action claire de ta part.",
  },
  {
    question: "À quoi sert PiloEco Premium ?",
    answer:
      "Premium permet notamment de surveiller tes contrats, détecter les hausses, recevoir des alertes et faire avancer tes projets avec PiloLife.",
  },
  {
    question: "PiloEco change-t-il mes contrats automatiquement ?",
    answer:
      "Non. Pilo te conseille et t’accompagne, mais tu gardes toujours la décision finale.",
  },
];

export default function HomePage() {
  const [count, setCount] = useState(0);
  const [openedFaq, setOpenedFaq] =
    useState<number | null>(null);

  useEffect(() => {
    let current = 0;

    const timer = window.setInterval(() => {
      current += 3;

      if (current >= 387) {
        current = 387;
        window.clearInterval(timer);
      }

      setCount(current);
    }, 10);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <img
              src="/pilo.png"
              alt="PiloEco"
              className="h-11 w-11 object-contain"
            />

            <span className="text-xl font-black">
              Pilo
              <span className="text-green-400">
                Eco
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-bold text-slate-300 lg:flex">
            <a
              href="#comment-ca-marche"
              className="transition hover:text-green-400"
            >
              Comment ça marche
            </a>

            <a
              href="#monitoring"
              className="transition hover:text-green-400"
            >
              Monitoring
            </a>

            <a
              href="#pilolife"
              className="transition hover:text-green-400"
            >
              PiloLife
            </a>

            <a
              href="#premium"
              className="transition hover:text-green-400"
            >
              Premium
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-3 text-sm font-bold text-slate-300 transition hover:bg-white/5 hover:text-white sm:block"
            >
              Se connecter
            </Link>

            <Link
              href="/analyse"
              className="rounded-xl bg-green-500 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-green-400"
            >
              Commencer
            </Link>
          </div>
        </div>
      </header>

      <section className="relative flex min-h-screen items-center justify-center px-6 pb-20 pt-32">
  <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-green-500/20 blur-3xl" />
  <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-green-400/10 blur-3xl" />

  <div className="relative z-10 grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
    <div>
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-green-400">
        Ton copilote d’économies
      </p>

      <h1 className="text-5xl font-black leading-tight md:text-7xl">
        Pilo cherche où tu peux{" "}
        <span className="text-green-400">
          économiser.
        </span>
      </h1>

      <p className="mt-6 max-w-xl text-xl leading-relaxed text-slate-300">
        Réponds à quelques questions. Pilo analyse tes
        dépenses, détecte les économies possibles et
        t’aide à les transformer en projets de vie.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/analyse"
          className="rounded-2xl bg-green-500 px-8 py-5 text-center text-lg font-black text-slate-950 shadow-lg shadow-green-500/20 transition hover:scale-105 hover:bg-green-400"
        >
          💚 Lancer mon analyse gratuite
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
          💚 Analyse gratuite
        </span>

        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
          ⏱ Environ 2 minutes
        </span>

        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
          🛡 Aucun démarchage imposé
        </span>
      </div>
    </div>

    <div className="relative flex justify-center">
      <div className="absolute h-80 w-80 rounded-full bg-green-500/20 blur-3xl" />

      <div className="relative rounded-[2rem] border border-green-400/20 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
        <div className="mb-4 rounded-2xl bg-white px-5 py-4 text-sm font-bold text-slate-900">
          Salut 👋 Moi, c’est Pilo. On regarde ensemble où
          tu pourrais payer moins ?
        </div>

        <div className="relative flex h-80 w-80 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-green-500/30 blur-3xl" />

          <img
            src="/pilo.png"
            alt="Mascotte Pilo"
            className="relative z-10 h-full w-full animate-pilo object-contain drop-shadow-[0_20px_80px_rgba(34,197,94,0.45)]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <p className="text-xs font-bold uppercase text-slate-500">
              Économie potentielle
            </p>

            <p className="mt-2 text-2xl font-black text-green-400">
              387 €/an
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <p className="text-xs font-bold uppercase text-slate-500">
              Temps nécessaire
            </p>

            <p className="mt-2 text-2xl font-black">
              2 min
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-[2rem] border border-green-500/20 bg-white/5 p-8 shadow-[0_0_80px_rgba(34,197,94,0.08)] backdrop-blur-xl md:p-12">
          <div className="flex flex-col items-center gap-10 lg:flex-row">
            <div className="flex justify-center">
              <img
                src="/pilo.png"
                alt="Pilo"
                className="h-64 w-64 object-contain transition duration-500 hover:scale-105 md:h-80 md:w-80"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-black text-white md:text-4xl">
                🐦 Avant de commencer, je veux te
                rassurer.
              </h2>

              <p className="mt-6 text-lg text-slate-300">
                Beaucoup de personnes hésitent à faire
                une simulation par peur d’être rappelées
                ou mises sous pression.
              </p>

              <p className="mt-6 text-2xl font-bold text-green-400">
                Chez PiloEco, ça fonctionne autrement.
              </p>

              <div className="mt-8 space-y-5 text-lg text-slate-200">
                <p>
                  ✅ Pilo cherche d’abord où tu peux
                  économiser.
                </p>

                <p>
                  ✅ Tu découvres tranquillement les
                  économies potentielles.
                </p>

                <p>
                  ✅ Tes coordonnées ne sont transmises
                  que lorsque tu choisis clairement
                  d’aller plus loin.
                </p>

                <p className="text-xl font-black text-white">
                  🛡 C’est toi qui décides. Toujours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            Imagine si...
          </p>

          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            💰 Et si Pilo trouvait
            <span className="text-green-400">
              {" "}
              {count} €{" "}
            </span>
            d’économies cette année ?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-300">
            Quelques centaines d’euros peuvent financer
            un projet, améliorer ton quotidien ou
            simplement t’aider à respirer chaque mois.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {[
            [
              "🛒",
              "Les courses",
              "Un mois de courses en plus.",
            ],
            [
              "✈️",
              "Un week-end",
              "Une escapade à deux.",
            ],
            [
              "🎄",
              "Les cadeaux",
              "Préparer Noël plus sereinement.",
            ],
            [
              "🐶",
              "Ton compagnon",
              "Prendre soin de ton animal.",
            ],
            [
              "💚",
              "Plus de liberté",
              "Respirer un peu plus chaque mois.",
            ],
          ].map(([emoji, title, text]) => (
            <div
              key={title}
              className="animate-fade-up rounded-3xl border border-white/10 bg-white/5 p-6 text-center transition duration-300 hover:-translate-y-2 hover:border-green-400/40 hover:bg-white/10"
            >
              <div className="text-6xl">{emoji}</div>

              <h3 className="mt-6 text-2xl font-black">
                {title}
              </h3>

              <p className="mt-4 text-slate-400">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="comment-ca-marche"
        className="mx-auto max-w-6xl scroll-mt-28 px-6 pb-24"
      >
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            Simple et rapide
          </p>

          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Comment fonctionne PiloEco ?
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            [
              "01",
              "📱",
              "Tu réponds simplement",
              "Téléphone, Internet, assurances, électricité… Quelques informations suffisent.",
            ],
            [
              "02",
              "🔎",
              "Pilo analyse",
              "Pilo repère les dépenses pour lesquelles une économie semble possible.",
            ],
            [
              "03",
              "🎉",
              "Tu choisis ta mission",
              "Tu consultes les résultats et tu décides tranquillement des actions à réaliser.",
            ],
          ].map(
            ([number, emoji, title, text]) => (
              <div
                key={title}
                className="relative rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-green-400/40"
              >
                <span className="absolute right-6 top-5 text-5xl font-black text-white/5">
                  {number}
                </span>

                <div className="text-5xl">{emoji}</div>

                <h3 className="mt-6 text-2xl font-black">
                  {title}
                </h3>

                <p className="mt-4 leading-relaxed text-slate-400">
                  {text}
                </p>
              </div>
            )
          )}
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/[0.02] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
              Tes dépenses du quotidien
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              Pilo cherche dans plusieurs univers.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
              Le but n’est pas de te faire tout changer,
              mais de repérer les actions qui peuvent
              réellement être utiles.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {savingIdeas.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-slate-950 p-7 transition hover:-translate-y-1 hover:border-green-400/40"
              >
                <div className="text-5xl">
                  {item.emoji}
                </div>

                <h3 className="mt-5 text-2xl font-black">
                  {item.title}
                </h3>

                <p className="mt-3 leading-relaxed text-slate-400">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="monitoring"
        className="mx-auto grid max-w-6xl scroll-mt-28 items-center gap-12 px-6 py-24 lg:grid-cols-2"
      >
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            Monitoring Premium
          </p>

          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Pilo continue de surveiller tes contrats.
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            Ajouter un contrat au Monitoring permet à
            Pilo de vérifier régulièrement sa situation
            et de t’avertir lorsqu’une action peut devenir
            utile.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "📈 Détection des hausses de prix",
              "📉 Détection des baisses",
              "💰 Nouvelles économies potentielles",
              "⏰ Alertes avant une échéance",
              "📧 Emails automatiques",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-bold text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-orange-400/20 bg-gradient-to-br from-orange-500/10 to-slate-900 p-7 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase text-orange-300">
                Alerte Monitoring
              </p>

              <h3 className="mt-3 text-2xl font-black">
                📈 Hausse détectée
              </h3>
            </div>

            <span className="rounded-full bg-orange-400/10 px-4 py-2 text-xs font-black text-orange-300">
              À vérifier
            </span>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <p className="text-sm text-slate-400">
              Assurance auto
            </p>

            <div className="mt-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">
                  Ancien prix
                </p>

                <p className="text-2xl font-black">
                  49,90 €
                </p>
              </div>

              <div className="text-3xl">→</div>

              <div className="text-right">
                <p className="text-sm text-slate-500">
                  Nouveau prix
                </p>

                <p className="text-2xl font-black text-orange-300">
                  57,90 €
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="mt-6 w-full rounded-2xl bg-green-500 px-6 py-4 font-black text-slate-950"
          >
            Voir la recommandation de Pilo
          </button>
        </div>
      </section>

      <section
        id="pilolife"
        className="border-y border-white/5 bg-gradient-to-b from-green-950/20 to-slate-950 py-24"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="rounded-[2rem] border border-green-400/20 bg-white/5 p-8">
              <p className="font-bold text-green-400">
                🌿 Mon projet principal
              </p>

              <h3 className="mt-4 text-3xl font-black">
                Voyage en Italie
              </h3>

              <div className="mt-8">
                <div className="flex justify-between text-sm font-bold text-slate-300">
                  <span>1 740 € économisés</span>
                  <span>4 000 €</span>
                </div>

                <div className="mt-3 h-4 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[44%] rounded-full bg-green-500" />
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-green-400/20 bg-green-400/10 p-5">
                <p className="font-black text-green-300">
                  +216 € grâce à ta mission Internet
                </p>

                <p className="mt-2 text-sm text-slate-300">
                  Ton projet vient de progresser.
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
              PiloLife Premium
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              Tes économies prennent enfin un sens.
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Avec PiloLife, chaque économie validée
              peut faire avancer ton objectif principal :
              voyage, maison, voiture, épargne ou projet
              personnel.
            </p>

            <p className="mt-6 text-xl font-black text-green-400">
              Économiser devient une progression visible,
              pas seulement un chiffre.
            </p>
          </div>
        </div>
      </section>

      <section
        id="premium"
        className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24"
      >
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            Une formule simple
          </p>

          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Commence gratuitement. Passe à Premium
            lorsque tu veux aller plus loin.
          </h2>
        </div>

        <div className="mt-14 grid gap-7 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <p className="text-sm font-bold uppercase text-slate-400">
              Gratuit
            </p>

            <p className="mt-4 text-5xl font-black">
              0 €
            </p>

            <p className="mt-3 text-slate-400">
              Pour découvrir tes premières économies.
            </p>

            <div className="mt-8 space-y-4 text-slate-200">
              <p>✅ Analyse de tes dépenses</p>
              <p>✅ Missions personnalisées</p>
              <p>✅ Estimation des économies</p>
              <p>✅ Tableau de bord</p>
            </div>

            <Link
              href="/analyse"
              className="mt-10 block rounded-2xl border border-white/10 px-6 py-4 text-center font-black transition hover:bg-white/10"
            >
              Commencer gratuitement
            </Link>
          </div>

          <div className="relative rounded-[2rem] border border-green-400/30 bg-gradient-to-br from-green-500/15 via-slate-900 to-slate-950 p-8 shadow-[0_0_80px_rgba(34,197,94,0.12)]">
            <span className="absolute right-6 top-6 rounded-full bg-green-500 px-4 py-2 text-xs font-black text-slate-950">
              RECOMMANDÉ
            </span>

            <p className="text-sm font-bold uppercase text-green-400">
              PiloEco Premium
            </p>

            <div className="mt-4 flex items-end gap-2">
              <p className="text-5xl font-black">
                4,99 €
              </p>

              <p className="pb-1 text-slate-400">
                / mois
              </p>
            </div>

            <p className="mt-3 text-slate-300">
              Pour automatiser le suivi de tes économies.
            </p>

            <div className="mt-8 space-y-4 text-slate-200">
              <p>✅ Tout le contenu gratuit</p>
              <p>✅ Monitoring des contrats</p>
              <p>✅ Détection des hausses et baisses</p>
              <p>✅ Alertes et emails automatiques</p>
              <p>✅ PiloLife et projets de vie</p>
              <p>✅ Suivi continu par Pilo</p>
            </div>

            <Link
              href="/premium"
              className="mt-10 block rounded-2xl bg-green-500 px-6 py-4 text-center font-black text-slate-950 transition hover:bg-green-400"
            >
              Découvrir Premium
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            Questions fréquentes
          </p>

          <h2 className="mt-4 text-4xl font-black">
            Tu te poses encore une question ?
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {faqItems.map((item, index) => {
            const isOpened =
              openedFaq === index;

            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenedFaq(
                      isOpened ? null : index
                    )
                  }
                  className="flex w-full items-center justify-between gap-6 p-6 text-left"
                >
                  <span className="text-lg font-black">
                    {item.question}
                  </span>

                  <span className="text-2xl text-green-400">
                    {isOpened ? "−" : "+"}
                  </span>
                </button>

                {isOpened && (
                  <p className="border-t border-white/10 px-6 py-5 leading-relaxed text-slate-400">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-green-400/20 bg-gradient-to-br from-green-500/20 via-slate-900 to-slate-950 px-8 py-16 text-center md:px-16">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-green-500/20 blur-3xl" />

          <div className="relative">
            <img
              src="/pilo.png"
              alt="Pilo"
              className="mx-auto h-36 w-36 object-contain"
            />

            <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black md:text-6xl">
              Prêt à découvrir où part ton argent ?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-xl text-slate-300">
              L’analyse est gratuite, rapide et sans
              engagement. Pilo te montre les pistes,
              puis tu gardes le contrôle.
            </p>

            <Link
              href="/analyse"
              className="mt-10 inline-block rounded-2xl bg-green-500 px-9 py-5 text-lg font-black text-slate-950 shadow-xl shadow-green-500/20 transition hover:scale-105 hover:bg-green-400"
            >
              💚 Commencer avec Pilo
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center text-sm text-slate-500 md:flex-row md:text-left">
          <div>
            <p className="font-black text-white">
              Pilo
              <span className="text-green-400">
                Eco
              </span>
            </p>

            <p className="mt-2">
              Ton copilote pour une vie moins chère.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/login"
              className="transition hover:text-white"
            >
              Connexion
            </Link>

            <Link
              href="/premium"
              className="transition hover:text-white"
            >
              Premium
            </Link>

            <Link
              href="/mentions-legales"
              className="transition hover:text-white"
            >
              Mentions légales
            </Link>

            <Link
              href="/confidentialite"
              className="transition hover:text-white"
            >
              Confidentialité
            </Link>
          </div>

          <p>
            © {new Date().getFullYear()} PiloEco
          </p>
        </div>
      </footer>
    </main>
  );
}