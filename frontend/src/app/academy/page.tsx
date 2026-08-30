
import Image from "next/image";
import Link from "next/link";

import AcademyBuyButton from "./components/AcademyBuyButton";

export const metadata: Metadata = {
  title: "Pilo Academy | Formations IA, business et visibilité",
  description:
    "Pilo Academy propose des parcours pratiques pour apprendre à créer un site avec l'IA, structurer son business, développer sa visibilité et stimuler sa créativité.",
  keywords: [
    "Pilo Academy",
    "formation intelligence artificielle",
    "créer un site avec IA",
    "apprendre à créer un site",
    "formation digitale",
    "business en ligne",
    "visibilité Instagram",
    "création de contenu",
    "neuroscience créativité",
    "compétences digitales",
    "entrepreneuriat",
  ],
  alternates: {
    canonical: "https://piloeco.com/academy",
  },
  openGraph: {
    title: "Pilo Academy | Apprends. Crée. Développe tes compétences.",
    description:
      "Des parcours concrets autour de l'IA, du business, de la visibilité et de la créativité.",
    url: "https://piloeco.com/academy",
    siteName: "PiloEco",
    type: "website",
  },
};

const benefits = [
  {
    icon: "🎓",
    title: "Simple & accessible",
    text: "Des explications claires, même si tu pars de zéro.",
  },
  {
    icon: "⚡",
    title: "Actionnable",
    text: "Des méthodes, exercices et outils à appliquer directement.",
  },
  {
    icon: "🎯",
    title: "À ton rythme",
    text: "Avance quand tu veux et reviens sur les ressources à tout moment.",
  },
  {
    icon: "💼",
    title: "Concret",
    text: "Des compétences utiles pour tes projets personnels ou professionnels.",
  },
];

const courses = [
  {
    slug: "site-ia",
    icon: "💻",
    badge: "Parcours phare",
    badgeClass: "bg-emerald-100 text-emerald-800",
    accent: "text-emerald-700",
    button: "bg-emerald-600 hover:bg-emerald-500",
    panel: "from-[#013f31] to-[#008561]",
    title: "SITE IA",
    headline: "Crée ton premier site avec l’IA",
    description:
      "De zéro jusqu’à un véritable site en ligne, même si tu ne sais pas coder.",
    features: [
      "15 chapitres",
      "164 pages",
      "Prompts IA",
      "Checklists",
      "Mise en ligne",
      "Portfolio & prospection",
    ],
    price: "49€",
    href: "/academy/site-ia",
  },
  {
    slug: "mon-business",
    icon: "🚀",
    badge: "Workbook pratique",
    badgeClass: "bg-amber-100 text-amber-800",
    accent: "text-amber-700",
    button: "bg-[#b7791f] hover:bg-[#9f681b]",
    panel: "from-[#8b5b18] to-[#d59a3a]",
    title: "MON BUSINESS",
    headline: "Transforme ton idée en activité structurée",
    description:
      "Clarifie ton offre, ton client, ton prix, ta prospection et ton plan d’action.",
    features: [
      "Planner guidé",
      "Offre & client idéal",
      "Prix & concurrence",
      "Plan marketing",
      "Prospection",
      "Sprint 30 jours",
    ],
    price: "39€",
    href: "/academy/mon-business",
  },
  {
    slug: "30-jours-visibilite",
    icon: "📱",
    badge: "Plan d’action 30 jours",
    badgeClass: "bg-rose-100 text-rose-700",
    accent: "text-[#d86450]",
    button: "bg-[#e97862] hover:bg-[#d86450]",
    panel: "from-[#c95d4b] to-[#f08c76]",
    title: "30 JOURS DE VISIBILITÉ",
    headline: "Crée du contenu qui crée du lien",
    description:
      "Un mois de structure pour publier plus facilement, écouter ton audience et progresser.",
    features: [
      "30 jours guidés",
      "50 accroches",
      "CTA naturels",
      "40 idées B-roll",
      "Prompts IA",
      "Tableau de suivi",
    ],
    price: "29€",
    href: "/academy/30-jours-visibilite",
  },
  {
    slug: "neuroscience",
    icon: "🧠",
    badge: "Créativité",
    badgeClass: "bg-violet-100 text-violet-700",
    accent: "text-violet-700",
    button: "bg-violet-600 hover:bg-violet-500",
    panel: "from-[#5b496d] to-[#8b789b]",
    title: "NEUROSCIENCE",
    headline: "Débloque ta créativité en 5 étapes",
    description:
      "Une méthode pour générer, organiser et transformer tes idées quand l’inspiration ralentit.",
    features: [
      "Méthode en 5 étapes",
      "Exercices pratiques",
      "Déclencheurs créatifs",
      "SCAMPER",
      "Organisation des idées",
      "Routines créatives",
    ],
    price: "19€",
    href: "/academy/neuroscience",
  },
] as const;

const academyStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Pilo Academy",
  url: "https://piloeco.com/academy",
  description:
    "Des parcours pratiques autour de l'intelligence artificielle, du business, de la visibilité et de la créativité.",
  isPartOf: {
    "@type": "WebSite",
    name: "PiloEco",
    url: "https://piloeco.com",
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: courses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://piloeco.com${course.href}`,
      name: `${course.title} — ${course.headline}`,
    })),
  },
};

export default function AcademyPage() {
  return (
    <main className="min-h-screen bg-[#fffdf9] text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(academyStructuredData),
        }}
      />

      {/* RETOUR PILO */}
      <div className="border-b border-emerald-100 bg-white">
        <div className="mx-auto flex max-w-[1350px] items-center justify-between px-5 py-3 md:px-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-black text-emerald-800 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-50"
          >
            <span aria-hidden="true">←</span>
            Retour au dashboard
          </Link>

          <span className="hidden text-xs font-black uppercase tracking-[0.22em] text-emerald-700 sm:block">
            🎓 Pilo Academy
          </span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#021c17] via-[#033c2f] to-[#006b50]">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-amber-200/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1350px] items-center gap-8 px-5 py-12 md:grid-cols-2 md:px-8 md:py-20">
          <div className="order-2 md:order-1">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-emerald-400/50 bg-emerald-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300">
                Pilo Academy
              </span>

              <span className="text-sm font-bold text-white/80">
                4 parcours disponibles
              </span>
            </div>

            <h1 className="max-w-2xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Apprends.
              <span className="block text-emerald-400">Crée.</span>
              Développe tes compétences.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/70 md:text-lg">
              Des guides pratiques pour apprendre une compétence, construire un
              projet concret et passer rapidement à l&apos;action.
            </p>

            <div className="mt-7 grid max-w-lg grid-cols-3 gap-3">
              {[
                ["📖", "Guidé"],
                ["🚀", "Concret"],
                ["🎯", "Accessible"],
              ].map(([icon, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-2 py-4 text-center backdrop-blur"
                >
                  <div className="text-2xl">{icon}</div>
                  <p className="mt-1 text-xs font-bold text-white/80">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="#parcours"
              className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-emerald-400 px-6 py-4 font-black text-[#02251c] shadow-lg shadow-emerald-950/20 transition hover:-translate-y-0.5 hover:bg-emerald-300"
            >
              Découvrir les parcours
              <span aria-hidden="true">↓</span>
            </Link>
          </div>

          <div className="order-1 flex justify-center md:order-2">
            <div className="relative w-full max-w-[520px]">
              <div className="absolute inset-x-10 bottom-2 h-16 rounded-[50%] bg-emerald-400/25 blur-xl" />

              <Image
                src="/pilo-academy.png"
                alt="Pilo, la mascotte de Pilo Academy, avec des lunettes et un livre"
                width={700}
                height={700}
                priority
                sizes="(max-width: 768px) 90vw, 520px"
                className="relative z-10 h-auto w-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PARCOURS */}
      <section
        id="parcours"
        className="scroll-mt-10 bg-[#fffdf9] px-5 py-14 md:px-8 md:py-20"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-600">
              Pilo Academy
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              Choisis ton parcours
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-slate-500">
              Commence par la compétence dont tu as besoin maintenant. Chaque
              parcours est pensé pour être pratique, clair et directement
              utilisable.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {courses.map((course) => (
              <article
                key={course.slug}
                className="group overflow-hidden rounded-[2rem] border border-[#eee4d6] bg-white shadow-[0_18px_55px_rgba(28,49,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(28,49,42,0.13)]"
              >
                <div
                  className={`relative min-h-[205px] overflow-hidden bg-gradient-to-br ${course.panel} p-7 text-white`}
                >
                  <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-xl" />
                  <div className="absolute -bottom-20 -left-12 h-44 w-44 rounded-full bg-white/10 blur-xl" />

                  <div className="relative flex items-start justify-between gap-4">
                    <span
                      className={`rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-wide ${course.badgeClass}`}
                    >
                      {course.badge}
                    </span>

                    <span className="text-5xl drop-shadow-sm">
                      {course.icon}
                    </span>
                  </div>

                  <div className="relative mt-8">
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-white/65">
                      {course.title}
                    </p>

                    <h3 className="mt-2 max-w-md text-2xl font-black leading-tight md:text-3xl">
                      {course.headline}
                    </h3>
                  </div>
                </div>

                <div className="p-7 md:p-8">
                  <p className="min-h-[48px] text-sm leading-6 text-slate-500 md:text-base">
                    {course.description}
                  </p>

                  <div className="mt-6 grid gap-3 text-sm font-semibold text-slate-700 sm:grid-cols-2">
                    {course.features.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[11px] font-black text-emerald-700">
                          ✓
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-end justify-between gap-4 border-t border-slate-100 pt-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Accès au parcours
                      </p>
                      <p
                        className={`mt-1 text-4xl font-black ${course.accent}`}
                      >
                        {course.price}
                      </p>
                    </div>

                    <AcademyBuyButton
                      productSlug={course.slug}
                      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-black text-white transition hover:-translate-y-0.5 ${course.button}`}
                    >
                      Acheter maintenant
                      <span aria-hidden="true">→</span>
                    </AcademyBuyButton>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PACK */}
      <section className="bg-[#f6efe3] px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1100px] overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-[#032d24] via-[#064938] to-[#087157] text-white shadow-[0_25px_70px_rgba(2,45,35,0.18)]">
          <div className="grid items-center gap-8 p-7 md:grid-cols-[1.35fr_0.65fr] md:p-12">
            <div>
              <span className="inline-flex rounded-full bg-amber-300 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-amber-950">
                Pack complet
              </span>

              <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
                Toute la collection
                <span className="block text-emerald-300">Pilo Academy</span>
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-white/75">
                Site IA + Mon Business + 30 Jours de Visibilité + Neuroscience.
                Un parcours complet pour apprendre, construire ton projet et le
                rendre visible.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "💻 Site IA",
                  "🚀 Mon Business",
                  "📱 Visibilité",
                  "🧠 Neuroscience",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm font-bold text-white/90"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
              <p className="text-sm font-bold text-white/60">
                Valeur séparée
              </p>

              <p className="mt-1 text-xl font-black text-white/50 line-through">
                136€
              </p>

              <p className="mt-4 text-sm font-bold uppercase tracking-wider text-emerald-300">
                Le pack complet
              </p>

              <p className="mt-1 text-5xl font-black">99€</p>

              <p className="mt-2 text-sm text-white/65">
                Soit 37€ économisés sur l&apos;ensemble.
              </p>

              <AcademyBuyButton
                productSlug="pack"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-300 px-6 py-4 font-black text-emerald-950 transition hover:-translate-y-0.5 hover:bg-emerald-200"
              >
                Acheter le pack
                <span aria-hidden="true">→</span>
              </AcademyBuyButton>
            </div>
          </div>
        </div>
      </section>

      {/* POURQUOI */}
      <section className="bg-white px-5 py-14 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-black text-[#053f31] md:text-3xl">
            Pourquoi Pilo Academy ?
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-7 md:grid-cols-4">
            {benefits.map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
                  {item.icon}
                </div>

                <h3 className="mt-4 font-black text-slate-900">
                  {item.title}
                </h3>

                <p className="mx-auto mt-2 max-w-[220px] text-sm leading-6 text-slate-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-5 pb-12 pt-2 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 overflow-hidden rounded-[2rem] bg-[#f8f1e6] px-7 py-8 md:flex-row md:px-10">
          <div className="flex items-center gap-5">
            <div className="hidden h-20 w-20 overflow-hidden rounded-full bg-white sm:block">
              <Image
                src="/pilo-academy.png"
                alt=""
                width={150}
                height={150}
                sizes="80px"
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <h2 className="text-xl font-black text-[#083f32] md:text-2xl">
                Une compétence à la fois.
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choisis ton parcours et avance à ton rythme.
              </p>
            </div>
          </div>

          <Link
            href="#parcours"
            className="w-full rounded-2xl bg-emerald-600 px-6 py-4 text-center font-black text-white transition hover:-translate-y-0.5 hover:bg-emerald-500 md:w-auto"
          >
            Voir les parcours ↑
          </Link>
        </div>
      </section>

      {/* SEO / CONTEXTE */}
      <section className="mx-auto max-w-5xl px-5 pb-12">
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 px-5 py-4">
          <p className="text-center text-xs leading-5 text-slate-400">
            Pilo Academy propose des ressources pratiques autour de
            l&apos;intelligence artificielle, de la création de sites internet,
            du business, de la visibilité en ligne, de la création de contenu
            et de la créativité.
          </p>
        </div>
      </section>
    </main>
  );
}
