import LegalPage from "../components/LegalPage";

export const metadata = {
  title: "Mentions légales | PiloEco",
  description:
    "Informations légales concernant l’éditeur et l’hébergement de PiloEco.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      eyebrow="⚖️ Informations légales"
      title="Mentions légales"
      description="Retrouvez les informations relatives à l’édition, à l’hébergement et à l’utilisation de la plateforme PiloEco."
      sections={[
        {
          title: "1. Éditeur du service",
          content: (
            <>
              <p>
                Le service <strong className="text-white">PiloEco</strong> est
                une plateforme SaaS consacrée à l’analyse des dépenses, à la
                détection d’économies potentielles et au suivi d’objectifs
                financiers personnels.
              </p>

              <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4">
                <p>
                  <strong className="text-amber-300">
                    Statut provisoire :
                  </strong>{" "}
                  entreprise en cours de création et d’immatriculation.
                </p>
              </div>

              <p>
                <strong className="text-white">Nom commercial :</strong>{" "}
                PiloEco
                <br />
                <strong className="text-white">Localisation :</strong>{" "}
                Tourrette-Levens, France
                <br />
                <strong className="text-white">SIREN :</strong> en attente
                d’immatriculation
                <br />
                <strong className="text-white">Contact :</strong>{" "}
                <a
                  href="mailto:contact@piloeco.com"
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  contact@piloeco.com
                </a>
              </p>

              <p className="text-slate-400">
                L’identité juridique, l’adresse postale complète et les
                numéros d’immatriculation seront ajoutés avant l’ouverture
                commerciale définitive du service.
              </p>
            </>
          ),
        },
        {
          title: "2. Hébergement",
          content: (
            <>
              <p>
                L’application PiloEco est déployée à l’aide des services de :
              </p>

              <p>
                <strong className="text-white">Vercel Inc.</strong>
                <br />
                440 N Barranca Avenue #4133
                <br />
                Covina, CA 91723
                <br />
                États-Unis
              </p>

              <p>
                La base de données et certains services d’authentification
                reposent sur <strong className="text-white">Supabase</strong>.
              </p>
            </>
          ),
        },
        {
          title: "3. Prestataires techniques",
          content: (
            <>
              <p>
                Le fonctionnement de PiloEco peut notamment reposer sur les
                services suivants :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>Vercel pour l’hébergement et le déploiement ;</li>
                <li>
                  Supabase pour l’authentification, la base de données et le
                  stockage ;
                </li>
                <li>Stripe pour le traitement sécurisé des paiements ;</li>
                <li>
                  OpenAI pour certaines fonctionnalités d’intelligence
                  artificielle ;
                </li>
                <li>Resend pour l’envoi d’e-mails transactionnels ;</li>
                <li>
                  GitHub pour l’hébergement privé et la gestion du code source.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "4. Propriété intellectuelle",
          content: (
            <>
              <p>
                La structure, les interfaces, les textes, les fonctionnalités,
                le logo, la mascotte Pilo, les illustrations et les éléments
                graphiques de PiloEco sont protégés par les règles applicables
                à la propriété intellectuelle.
              </p>

              <p>
                Toute reproduction, extraction, modification, diffusion ou
                exploitation non autorisée de tout ou partie du service est
                interdite.
              </p>
            </>
          ),
        },
        {
          title: "5. Responsabilité",
          content: (
            <>
              <p>
                PiloEco fournit des estimations et des recommandations destinées
                à aider l’utilisateur à mieux comprendre ses dépenses et à
                identifier des pistes d’économies.
              </p>

              <p>
                Ces informations sont fournies à titre indicatif. Elles ne
                constituent ni une garantie d’économie, ni un conseil financier,
                juridique, fiscal, assurantiel ou professionnel personnalisé.
              </p>

              <p>
                L’utilisateur reste responsable de la vérification des offres,
                des tarifs, des conditions contractuelles et des décisions
                prises à partir des informations présentées.
              </p>
            </>
          ),
        },
        {
          title: "6. Données personnelles",
          content: (
            <p>
              Les modalités de collecte et de traitement des données sont
              détaillées dans la{" "}
              <a
                href="/confidentialite"
                className="font-semibold text-green-400 hover:text-green-300"
              >
                Politique de confidentialité
              </a>
              .
            </p>
          ),
        },
        {
          title: "7. Contact",
          content: (
            <p>
              Pour toute question relative au service ou aux présentes mentions
              légales, vous pouvez écrire à{" "}
              <a
                href="mailto:contact@piloeco.com"
                className="font-semibold text-green-400 hover:text-green-300"
              >
                contact@piloeco.com
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}