import Link from "next/link";

const benefits = [
  {
    icon: "🎯",
    title: "Une audience qualifiée",
    description:
      "Les utilisateurs de PiloEco recherchent activement des solutions pour réduire leurs dépenses et améliorer leurs contrats.",
  },
  {
    icon: "🤝",
    title: "Des recommandations pertinentes",
    description:
      "Votre offre est présentée uniquement lorsqu’elle correspond réellement à la situation et aux besoins de l’utilisateur.",
  },
  {
    icon: "🚀",
    title: "Une visibilité contextualisée",
    description:
      "Votre service s’intègre dans un parcours personnalisé, au moment où l’utilisateur est prêt à passer à l’action.",
  },
  {
    icon: "📊",
    title: "Un suivi des performances",
    description:
      "Les partenariats peuvent être suivis grâce aux clics, mises en relation, conversions et commissions enregistrées.",
  },
];

const categories = [
  { icon: "📱", label: "Téléphonie" },
  { icon: "🌐", label: "Internet" },
  { icon: "⚡", label: "Énergie" },
  { icon: "🛡️", label: "Assurance" },
  { icon: "🏦", label: "Banque" },
  { icon: "🚗", label: "Automobile" },
  { icon: "🐶", label: "Animaux" },
  { icon: "🏠", label: "Maison" },
  { icon: "👨‍👩‍👧", label: "Famille" },
  { icon: "📺", label: "Streaming" },
];

const recommendationSteps = [
  {
    number: "01",
    title: "Analyse du besoin",
    description:
      "PiloEco identifie les dépenses, contrats et priorités de l’utilisateur.",
  },
  {
    number: "02",
    title: "Sélection des offres",
    description:
      "Les solutions susceptibles de répondre au besoin détecté sont comparées.",
  },
  {
    number: "03",
    title: "Recommandation personnalisée",
    description:
      "L’utilisateur reçoit une recommandation claire et adaptée à sa situation.",
  },
  {
    number: "04",
    title: "Mise en relation",
    description:
      "L’utilisateur choisit librement d’accéder à l’offre du partenaire.",
  },
  {
    number: "05",
    title: "Suivi",
    description:
      "Les performances et conversions peuvent ensuite être suivies.",
  },
];

const partnerSteps = [
  {
    number: "1",
    title: "Prise de contact",
    description:
      "Vous nous présentez votre entreprise, votre offre et vos objectifs.",
  },
  {
    number: "2",
    title: "Étude de l’offre",
    description:
      "Nous vérifions la pertinence, la clarté et l’intérêt réel pour les utilisateurs.",
  },
  {
    number: "3",
    title: "Échange",
    description:
      "Nous définissons ensemble le modèle de collaboration le plus adapté.",
  },
  {
    number: "4",
    title: "Validation",
    description:
      "Les conditions commerciales et techniques du partenariat sont formalisées.",
  },
  {
    number: "5",
    title: "Mise en ligne",
    description:
      "Votre offre peut être intégrée au parcours de recommandation PiloEco.",
  },
];

const partnerTypes = [
  "Assureurs et courtiers",
  "Mutuelles",
  "Fournisseurs d’énergie",
  "Opérateurs téléphoniques",
  "Fournisseurs internet",
  "Banques et services financiers",
  "Services automobiles",
  "Services pour animaux",
  "Solutions pour la maison",
  "Services familiaux",
  "Plateformes de streaming",
  "Logiciels et services utiles",
];

const businessModels = [
  {
    title: "Affiliation",
    description:
      "Intégration d’un lien ou d’un parcours partenaire avec suivi des conversions.",
  },
  {
    title: "Commission par vente",
    description:
      "Rémunération définie pour chaque souscription ou vente validée.",
  },
  {
    title: "Commission fixe",
    description:
      "Montant déterminé pour chaque mise en relation ou contrat éligible.",
  },
  {
    title: "Partenariat sur mesure",
    description:
      "Construction d’un modèle adapté à votre activité, vos objectifs et vos contraintes.",
  },
];

const commitments = [
  {
    title: "Transparence",
    description:
      "Les offres et avantages sont présentés avec des informations compréhensibles.",
  },
  {
    title: "Pertinence",
    description:
      "Une offre n’est recommandée que si elle peut répondre à un besoin identifié.",
  },
  {
    title: "Consentement",
    description:
      "L’utilisateur reste libre de consulter une offre et d’être mis en relation.",
  },
  {
    title: "Respect des données",
    description:
      "Les données personnelles ne sont pas vendues et sont traitées conformément à nos engagements.",
  },
  {
    title: "Qualité",
    description:
      "PiloEco privilégie les partenaires sérieux, fiables et utiles aux particuliers.",
  },
  {
    title: "Relation durable",
    description:
      "Notre objectif est de construire des collaborations équilibrées dans le temps.",
  },
];

const faqs = [
  {
    question: "Quels partenaires recherchez-vous ?",
    answer:
      "Nous recherchons principalement des entreprises proposant des services utiles aux particuliers : assurance, énergie, téléphonie, internet, banque, automobile, maison, animaux, famille ou abonnements numériques.",
  },
  {
    question: "Comment les offres sont-elles recommandées ?",
    answer:
      "Les offres sont proposées dans un contexte précis, à partir des besoins, dépenses ou contrats renseignés par l’utilisateur. Elles ne sont pas affichées comme de simples publicités générales.",
  },
  {
    question: "Quel modèle de rémunération est possible ?",
    answer:
      "Le partenariat peut reposer sur l’affiliation, une commission fixe, une commission par vente, une commission par contrat ou un modèle personnalisé.",
  },
  {
    question: "PiloEco transmet-il les coordonnées des utilisateurs ?",
    answer:
      "Aucune mise en relation nominative ne doit être réalisée sans information claire et sans action volontaire de l’utilisateur.",
  },
  {
    question: "Puis-je suivre les performances de mon offre ?",
    answer:
      "Selon le partenariat mis en place, un suivi pourra inclure les clics, les mises en relation, les ventes, les contrats validés et les commissions générées.",
  },
  {
    question: "L’intégration de mon offre est-elle automatique ?",
    answer:
      "Non. Chaque proposition est étudiée afin de vérifier sa pertinence, sa qualité et sa cohérence avec les valeurs de PiloEco.",
  },
  {
    question: "Existe-t-il une durée d’engagement obligatoire ?",
    answer:
      "Les conditions sont définies au cas par cas dans le contrat ou la convention de partenariat conclu entre les parties.",
  },
  {
    question: "Comment proposer mon offre ?",
    answer:
      "Vous pouvez remplir le formulaire partenaire. Nous vous recontacterons afin d’étudier votre proposition et les modalités de collaboration.",
  },
];

export const metadata = {
  title: "Devenir partenaire | PiloEco",
  description:
    "Rejoignez l’écosystème PiloEco et proposez vos offres à une audience qualifiée recherchant des solutions pour réduire ses dépenses.",
};

export default function DevenirPartenairePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-emerald-100 bg-gradient-to-br from-white via-emerald-50 to-white px-6 py-24 sm:py-28">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-emerald-100/70 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-100 px-4 py-2 text-sm font-black text-emerald-700">
              Partenariats & affiliation
            </span>

            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
              Faites connaître votre offre aux utilisateurs de{" "}
              <span className="text-emerald-600">PiloEco</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Rejoignez un écosystème qui aide les particuliers à identifier
              leurs dépenses, comparer leurs possibilités et accéder à des
              solutions réellement adaptées à leurs besoins.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact-partenaire"
                className="rounded-2xl bg-emerald-600 px-7 py-4 font-black text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
              >
                Nous contacter
              </Link>

              <Link
                href="/"
                className="rounded-2xl border border-slate-300 bg-white px-7 py-4 font-black text-slate-700 transition hover:border-emerald-500 hover:text-emerald-700"
              >
                Découvrir PiloEco
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-600">
              <span>✓ Plateforme française</span>
              <span>✓ Recommandations ciblées</span>
              <span>✓ Respect des utilisateurs</span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-100 bg-white/90 p-7 shadow-2xl shadow-emerald-950/10 backdrop-blur">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600">
              Une approche différente
            </p>

            <h2 className="mt-4 text-2xl font-black">
              La bonne offre, au bon moment, pour le bon besoin.
            </h2>

            <div className="mt-6 space-y-4">
              {[
                "Pas de publicité intrusive",
                "Pas de recommandation sans contexte",
                "Pas de revente des données personnelles",
                "Une sélection fondée sur l’utilité réelle",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-black text-emerald-700">
                    ✓
                  </span>

                  <p className="font-bold text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BÉNÉFICES */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="font-black uppercase tracking-widest text-emerald-600">
              Pourquoi nous rejoindre ?
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Un partenariat pensé pour générer de la valeur
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              PiloEco ne cherche pas à multiplier les publicités. Notre objectif
              est de présenter des solutions pertinentes dans un parcours
              utilisateur centré sur les économies.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
              >
                <div className="text-4xl">{benefit.icon}</div>

                <h3 className="mt-5 text-xl font-black">{benefit.title}</h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* UNIVERS */}
      <section className="bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-black uppercase tracking-widest text-emerald-400">
              Nos univers
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Des économies possibles dans toute la vie quotidienne
            </h2>

            <p className="mt-5 leading-8 text-slate-300">
              PiloEco peut intégrer des partenaires issus de secteurs variés,
              dès lors que leur offre apporte une utilité réelle aux
              particuliers.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {categories.map((category) => (
              <div
                key={category.label}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center transition hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-emerald-400/10"
              >
                <div className="text-3xl">{category.icon}</div>
                <p className="mt-3 font-black">{category.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARCOURS UTILISATEUR */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-black uppercase tracking-widest text-emerald-600">
              Notre fonctionnement
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Une recommandation intégrée au parcours utilisateur
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              L’offre partenaire intervient après l’identification d’un besoin,
              et non comme une publicité affichée au hasard.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-5">
            {recommendationSteps.map((step) => (
              <article
                key={step.number}
                className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6"
              >
                <p className="text-sm font-black text-emerald-600">
                  {step.number}
                </p>

                <h3 className="mt-3 text-lg font-black">{step.title}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROMESSE */}
      <section className="bg-emerald-600 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-black uppercase tracking-[0.22em] text-emerald-100">
            Notre promesse
          </p>

          <h2 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">
            Nous préférons renoncer à une commission plutôt que recommander une
            offre qui ne serait pas réellement avantageuse.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-emerald-50">
            La confiance des utilisateurs est au cœur du modèle PiloEco. Une
            recommandation doit être utile avant d’être rentable.
          </p>
        </div>
      </section>

      {/* QUI PEUT DEVENIR PARTENAIRE */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="font-black uppercase tracking-widest text-emerald-600">
                Partenaires recherchés
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Des entreprises utiles, sérieuses et transparentes
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                Nous étudions les offres susceptibles d’aider les particuliers à
                mieux maîtriser leur budget, leurs contrats ou leurs projets.
              </p>

              <Link
                href="/contact-partenaire"
                className="mt-7 inline-flex rounded-2xl bg-slate-950 px-6 py-3 font-black text-white transition hover:bg-emerald-600"
              >
                Présenter mon entreprise
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {partnerTypes.map((partnerType) => (
                <div
                  key={partnerType}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-black text-emerald-700">
                    ✓
                  </span>

                  <p className="font-bold">{partnerType}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MODÈLES ÉCONOMIQUES */}
      <section className="bg-slate-100 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-black uppercase tracking-widest text-emerald-600">
              Modèles de collaboration
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Un partenariat adapté à votre activité
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Les modalités commerciales sont étudiées individuellement selon
              votre offre, votre parcours de conversion et vos objectifs.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {businessModels.map((model) => (
              <article
                key={model.title}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <h3 className="text-xl font-black">{model.title}</h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {model.description}
                </p>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-slate-500">
            Les commissions, conditions de validation, délais et modalités de
            suivi sont définis dans le contrat ou la convention conclue avec
            chaque partenaire.
          </p>
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="font-black uppercase tracking-widest text-emerald-600">
              Nos engagements
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Un partenariat ne se limite pas à une commission
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Nous souhaitons construire un écosystème dans lequel les
              utilisateurs, les partenaires et PiloEco avancent dans la même
              direction.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Chaque offre intégrée doit apporter une valeur réelle, être
              présentée avec clarté et respecter la liberté de choix de
              l’utilisateur.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {commitments.map((commitment) => (
              <article
                key={commitment.title}
                className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 font-black text-white">
                  ✓
                </div>

                <h3 className="mt-4 text-lg font-black">{commitment.title}</h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {commitment.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DEVENIR PARTENAIRE */}
      <section className="bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-black uppercase tracking-widest text-emerald-400">
              Rejoindre PiloEco
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Comment devenir partenaire ?
            </h2>

            <p className="mt-5 leading-8 text-slate-300">
              Chaque proposition suit un processus simple afin de construire une
              collaboration claire et adaptée.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-5">
            {partnerSteps.map((step) => (
              <article
                key={step.number}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-lg font-black text-slate-950">
                  {step.number}
                </div>

                <h3 className="mt-5 font-black">{step.title}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SUIVI PARTENAIRE */}
      <section className="bg-emerald-50 px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-black uppercase tracking-widest text-emerald-600">
              Espace partenaire
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Suivez les résultats de votre collaboration
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Selon les modalités du partenariat, un espace dédié pourra
              permettre de centraliser les informations commerciales et le suivi
              des performances.
            </p>
          </div>

          <div className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["🔗", "Liens partenaires"],
                ["👆", "Clics enregistrés"],
                ["🤝", "Mises en relation"],
                ["✅", "Conversions validées"],
                ["💶", "Commissions générées"],
                ["📈", "Historique des performances"],
              ].map(([icon, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                >
                  <p className="text-2xl">{icon}</p>
                  <p className="mt-3 font-black">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="font-black uppercase tracking-widest text-emerald-600">
              Questions fréquentes
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Tout savoir avant de nous contacter
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-black">
                  <span>{faq.question}</span>

                  <span className="text-xl text-emerald-600 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-4 leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-8 py-16 text-center text-white shadow-2xl sm:px-14">
          <p className="font-black uppercase tracking-[0.22em] text-emerald-400">
            Construisons ensemble
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-black leading-tight sm:text-5xl">
            Les meilleurs partenariats commencent par une vision commune.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-300">
            Vous représentez une marque, une plateforme d’affiliation ou un
            service utile aux particuliers ? Présentez-nous votre offre et
            échangeons sur les possibilités de collaboration.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact-partenaire"
              className="rounded-2xl bg-emerald-500 px-8 py-4 font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-400"
            >
              Devenir partenaire
            </Link>

            <a
              href="mailto:contact@piloeco.com"
              className="rounded-2xl border border-white/20 bg-white/5 px-8 py-4 font-black text-white transition hover:bg-white/10"
            >
              contact@piloeco.com
            </a>
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-400">
            <span>✓ Sélection des partenaires</span>
            <span>✓ Collaboration transparente</span>
            <span>✓ Parcours respectueux des utilisateurs</span>
          </div>

          <p className="mt-7 text-sm text-slate-500">www.piloeco.com</p>
        </div>
      </section>
    </main>
  );
}