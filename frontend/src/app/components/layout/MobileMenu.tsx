"use client";

import { useState } from "react";
import Link from "next/link";

const mainItems = [
  { label: "🏡 Mon Nid", href: "/dashboard" },
  { label: "💰 Mes économies", href: "/economies" },
  { label: "🎯 Mes missions", href: "/missions" },
  { label: "📈 Mon évolution", href: "/evolution" },
  { label: "🌿 PiloLife ⭐", href: "/pilolife" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        className="fixed right-4 top-4 z-50 rounded-2xl border border-green-500/30 bg-slate-900 px-4 py-3 font-black text-green-400 shadow-xl"
      >
        ☰
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-black text-green-400">PiloEco</p>
              <p className="text-sm text-slate-400">Navigation</p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="rounded-xl bg-slate-800 px-4 py-2 font-bold"
            >
              ✕
            </button>
          </div>

          <nav className="mt-10 space-y-3">
            {mainItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl bg-white/5 px-5 py-4 font-bold text-slate-200"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/premium"
              onClick={() => setOpen(false)}
              className="block rounded-2xl border border-purple-500/40 bg-purple-500/10 px-5 py-4 font-black text-purple-300"
            >
              💎 Pilo Premium
            </Link>

            <Link
              href="/compte"
              onClick={() => setOpen(false)}
              className="block rounded-2xl bg-white/5 px-5 py-4 font-bold text-slate-200"
            >
              ⚙️ Mon compte
            </Link>

            <Link
              href="/assistant"
              onClick={() => setOpen(false)}
              className="block rounded-2xl bg-green-500 px-5 py-4 text-center font-black text-slate-950"
            >
              🐦 Discuter avec Pilo
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}