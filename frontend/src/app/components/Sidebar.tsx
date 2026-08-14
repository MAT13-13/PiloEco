"use client";

import Link from "next/link";
import { useState } from "react";

const mainItems = [
  { label: "🏡 Mon Nid", href: "/dashboard" },
  { label: "💰 Mes économies", href: "/economies" },
  { label: "🎯 Mes missions", href: "/missions" },
  { label: "📈 Mon évolution", href: "/evolution" },
];

const universeItems = [
  { label: "👨‍👩‍👧 Famille & aides", href: "/missions/famille" },
  { label: "🌸 Beauté & Artisanat", href: "/missions/beaute-artisanat" },
  { label: "✈️ Voyage", href: "/missions/voyage" },
  {
  label: "⚡ Électricité",
  href: "/missions/electricite",
},
  { label: "📱 Téléphone", href: "/missions/mobile" },
  { label: "👵 Téléphone senior", href: "/missions/telephone-senior" },
  { label: "🌐 Site internet pro", href: "/missions/site-internet-pro" },
  { label: "🐶 Assurance animaux", href: "/missions/animaux" },
  {
    label: "🏦 Assurance emprunteur",
    href: "/missions/assurance-emprunteur",
  },
  { label: "💼 Ambassadeur GSelect", href: "/missions/ambassadeur" },
  {
    label: "🕊️ Assurance obsèques",
    href: "/missions/assurance-obseques",
  },
  {
    label: "🏠 Crédit immobilier",
    href: "/missions/credit-immobilier",
  },
  {
    label: "📋 Diagnostic immobilier",
    href: "/missions/diagnostic-immobilier",
  },
  {
    label: "🏠 Assurance habitation",
    href: "/missions/habitation",
  },
  {
    label: "🛠️ Travaux & rénovation",
    href: "/missions/travaux",
  },
  {
    label: "👵 Mutuelle Senior",
    href: "/missions/mutuelle-senior",
  },
  {
    label: "💰 Épargne & retraite",
    href: "/missions/epargne-retraite",
  },
  {
    label: "🚗 Assurance auto",
    href: "/missions/auto",
  },
  {
    label: "🏍️ Assurance moto",
    href: "/missions/moto",
  },
  {
    label: "🚲 Mobilités douces",
    href: "/missions/mobilites-douces",
  },
  {
    label: "🔧 Services auto",
    href: "/missions/services-auto",
  },
  {
    label: "🏍️ Moto & équipement",
    href: "/missions/moto-equipement",
  },
  {
    label: "🎓 Formation",
    href: "/missions/formation",
  },
  {
    label: "🔐 Alarme & sécurité",
    href: "/missions/securite",
  },
  {
    label: "₿ Cryptomonnaies",
    href: "/missions/crypto",
  },
  {
    label: "🛡️ Cybersécurité",
    href: "/missions/cybersecurite",
  },
  {
    label: "🏢 Services aux entreprises",
    href: "/missions/services-entreprises",
  },
  {
    label: "🚚 Déménagement",
    href: "/missions/demenagement",
  },
  {
    label: "📦 Débarras",
    href: "/missions/debarras",
  },
];

const upcomingItems = [
  { label: "❤️ Mutuelle santé" },
  { label: "🌐 Internet" },
  { label: "🏦 Banque" },
  { label: "📺 Streaming" },
  { label: "💻 Logiciels" },
];

export default function Sidebar() {
  const [universOpen, setUniversOpen] = useState(true);
  const [upcomingOpen, setUpcomingOpen] = useState(false);

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 overflow-y-auto border-r border-slate-800 bg-slate-950 p-5 text-white lg:block">
      <div>
        <h1 className="text-3xl font-black text-green-400">
          PiloEco
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Ton copilote d&apos;économies
        </p>
      </div>

      <nav className="mt-8">
        <div className="space-y-2">
          {mainItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block w-full rounded-xl px-4 py-3 text-left font-bold transition ${
                index === 0
                  ? "bg-green-500 text-slate-950"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="my-6 border-t border-slate-800" />

        <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-purple-300">
                Pilo Premium
              </p>

              <p className="mt-1 text-sm font-bold text-white">
                Pilo veille pour toi
              </p>
            </div>

            <span className="text-2xl">💎</span>
          </div>

          <div className="mt-4 space-y-2">
            <Link
              href="/premium"
              className="block rounded-xl bg-purple-500 px-4 py-2.5 text-center text-sm font-black text-white transition hover:bg-purple-400"
            >
              Découvrir Premium
            </Link>

            <Link
              href="/monitoring"
              className="block w-full rounded-xl border border-purple-500/20 bg-slate-950/40 px-4 py-3 text-left text-sm font-bold text-white transition hover:bg-purple-500/10"
            >
              📊 Monitoring
            </Link>

            <Link
              href="/pilolife"
              className="mt-2 block w-full rounded-xl border border-purple-500/20 bg-slate-950/40 px-4 py-3 text-left text-sm font-bold text-white transition hover:bg-purple-500/10"
            >
              🌿 PiloLife
            </Link>
          </div>
        </div>

        <div className="my-6 border-t border-slate-800" />

        <button
          type="button"
          onClick={() => setUniversOpen((value) => !value)}
          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-slate-900"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
              Univers Pilo
            </p>

            <p className="mt-1 text-sm font-bold text-white">
              Missions disponibles
            </p>
          </div>

          <span className="text-slate-400">
            {universOpen ? "−" : "+"}
          </span>
        </button>

        {universOpen && (
          <div className="mt-3 space-y-1">
            {universeItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}

        <div className="my-6 border-t border-slate-800" />

        <button
          type="button"
          onClick={() => setUpcomingOpen((value) => !value)}
          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-slate-900"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">
              Prochainement
            </p>

            <p className="mt-1 text-sm font-bold text-white">
              En cours de partenariat
            </p>
          </div>

          <span className="text-slate-400">
            {upcomingOpen ? "−" : "+"}
          </span>
        </button>

        {upcomingOpen && (
          <div className="mt-3 space-y-1">
            {upcomingItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-slate-500"
              >
                <span>{item.label}</span>

                <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[9px] font-bold text-amber-400">
                  En cours
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="my-6 border-t border-slate-800" />

        <Link
          href="/parametres"
          className="block w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-left font-bold text-white transition hover:border-green-500/40 hover:bg-slate-800"
        >
          ⚙️ Mon compte
        </Link>

        <div className="mt-4 rounded-2xl border border-green-500/20 bg-green-500/10 p-4">
          <p className="font-bold text-white">
            🐦 Parle à Pilo
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Une question sur ton budget ?
          </p>

          <Link
            href="/assistant"
            className="mt-3 block w-full rounded-xl bg-green-500 py-2.5 text-center text-sm font-black text-slate-950 transition hover:bg-green-400"
          >
            Discuter →
          </Link>
        </div>
      </nav>
    </aside>
  );
}