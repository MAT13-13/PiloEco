"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    label: "🏡 Dashboard",
    href: "/dashboard",
    premium: false,
  },
  {
    label: "🎯 Missions",
    href: "/missions",
    premium: false,
  },
  {
    label: "💰 Mes économies",
    href: "/economies",
    premium: false,
  },
  {
    label: "🌿 PiloLife",
    href: "/pilolife",
    premium: true,
  },
  {
    label: "📊 Monitoring",
    href: "/monitoring",
    premium: true,
  },
];

export default function PiloNavigation() {
  const pathname = usePathname();

  return (
    <nav className="mt-10 rounded-[2rem] border border-white/10 bg-slate-900/80 p-4 shadow-xl backdrop-blur-xl">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {navigationItems.map((item) => {
          const isActive =
            pathname === item.href ||
            pathname.startsWith(
              `${item.href}/`
            );

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                isActive ? "page" : undefined
              }
              className={`flex min-h-16 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-center text-sm font-black transition ${
                isActive
                  ? "border-green-400 bg-green-500 text-slate-950 shadow-lg shadow-green-500/20"
                  : "border-white/10 bg-slate-950/60 text-slate-200 hover:border-green-500/40 hover:bg-green-500/10 hover:text-green-300"
              }`}
            >
              <span>{item.label}</span>

              {item.premium && (
                <span
                  className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-wide ${
                    isActive
                      ? "bg-slate-950/15 text-slate-950"
                      : "bg-amber-500/15 text-amber-300"
                  }`}
                >
                  ⭐ Premium
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}