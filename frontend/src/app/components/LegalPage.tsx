import Link from "next/link";
import type { ReactNode } from "react";

type LegalSection = {
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: LegalSection[];
  lastUpdated?: string;
};

export default function LegalPage({
  eyebrow,
  title,
  description,
  sections,
  lastUpdated = "17 juillet 2026",
}: LegalPageProps) {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/parametres"
          className="inline-flex items-center gap-2 text-sm font-semibold text-green-400 transition hover:text-green-300"
        >
          ← Retour aux paramètres
        </Link>

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-green-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-green-950/30 p-7 shadow-[0_0_80px_rgba(34,197,94,0.08)] sm:p-10">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-green-400">
            {eyebrow}
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            {title}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {description}
          </p>

          <p className="mt-6 text-sm text-slate-500">
            Dernière mise à jour : {lastUpdated}
          </p>
        </section>

        <div className="mt-8 space-y-5">
          {sections.map((section, index) => (
            <section
              key={`${section.title}-${index}`}
              className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/10 sm:p-8"
            >
              <h2 className="text-xl font-black text-white sm:text-2xl">
                {section.title}
              </h2>

              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300 sm:text-base">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-10 border-t border-white/10 py-8 text-center text-sm text-slate-500">
          <p>© 2026 PiloEco. Tous droits réservés.</p>

          <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link
              href="/mentions-legales"
              className="transition hover:text-green-400"
            >
              Mentions légales
            </Link>

            <Link
              href="/confidentialite"
              className="transition hover:text-green-400"
            >
              Confidentialité
            </Link>

            <Link
              href="/cgu"
              className="transition hover:text-green-400"
            >
              CGU
            </Link>
            <Link
  href="/cookies"
  className="transition hover:text-green-400"
>
  Cookies
</Link>

            <Link
              href="/support"
              className="transition hover:text-green-400"
            >
              Support
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}