import LegalPage from "../components/LegalPage";

export const metadata = {
  title: "Mentions légales | PiloEco",
  description:
    "Informations légales concernant l’éditeur, l’hébergement et le fonctionnement de la plateforme PiloEco.",
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
                Le service{" "}
                <strong className="text-white">
                  PiloEco
                </strong>{" "}
                est une plateforme SaaS consacrée à l’analyse des dépenses, à
                la détection d’économies potentielles, au suivi des contrats et
                à l’accompagnement des utilisateurs dans leurs projets
                financiers personnels.
              </p>

              <div className="rounded-2xl border border-green-400/20 bg-green-400/5 p-4">
                <p>
                  La plateforme PiloEco est éditée et exploitée par{" "}
                  <strong className="text-green-300">
                    Fiona Mathieu, entrepreneur individuel
                  </strong>
                  .
                </p>
              </div>

              <p>
                <strong className="text-white">
                  Éditrice :
                </strong>{" "}
                Fiona Mathieu
                <br />

                <strong className="text-white">
                  Forme juridique :
                </strong>{" "}
                Entrepreneur individuel
                <br />

                <strong className="text-white">
                  Nom commercial :
                </strong>{" "}
                FM SERVICES
                <br />

                <strong className="text-white">
                  Service exploité :
                </strong>{" "}
                PiloEco
                <br />

                <strong className="text-white">
                  SIREN :
                </strong>{" "}
                880 312 988
                <br />

                <strong className="text-white">
                  Immatriculation :
                </strong>{" "}
                RCS Nice 880 312 988
                <br />

                <strong className="text-white">
                  Numéro de gestion :
                </strong>{" "}
                2026A01832
                <br />

                <strong className="text-white">
                  Adresse :
                </strong>{" "}
               Canton de Levens, 06690 Tourrette-Levens, France
                <br />

                <strong className="text-white">
                  Téléphone :
                </strong>{" "}
                0768540595
                <br />

                <strong className="text-white">
                  Contact :
                </strong>{" "}
                <a
                  href="mailto:contact@piloeco.com"
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  contact@piloeco.com
                </a>
              </p>
            </>
          ),
        },
        {
          title: "2. Direction de la publication",
          content: (
            <p>
              La directrice de la publication de PiloEco est{" "}
              <strong className="text-white">
                Fiona Mathieu
              </strong>
              .
            </p>
          ),
        },
        {
          title: "3. Activité de PiloEco",
          content: (
            <>
              <p>
                PiloEco propose notamment des services numériques permettant :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>
                  d’analyser les dépenses et contrats renseignés par les
                  utilisateurs ;
                </li>

                <li>
                  d’identifier des pistes d’économies potentielles ;
                </li>

                <li>
                  de suivre les contrats, abonnements et échéances ;
                </li>

                <li>
                  de gérer des missions et des objectifs d’épargne ;
                </li>

                <li>
                  d’utiliser des outils d’aide à la décision assistés par
                  intelligence artificielle ;
                </li>

                <li>
                  de comparer des offres et services ;
                </li>

                <li>
                  d’accéder à certains services numériques par abonnement ;
                </li>

                <li>
                  d’être redirigé, avec son consentement, vers des partenaires
                  ou prestataires tiers.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "4. Hébergement",
          content: (
            <>
              <p>
                L’application PiloEco est hébergée et déployée à l’aide des
                services de :
              </p>

              <p>
                <strong className="text-white">
                  Vercel Inc.
                </strong>
                <br />

                440 N Barranca Avenue #4133
                <br />

                Covina, CA 91723
                <br />

                États-Unis
                <br />

                Site :{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  vercel.com
                </a>
              </p>

              <p>
                La base de données, l’authentification et certains services de
                stockage reposent sur les infrastructures de{" "}
                <strong className="text-white">
                  Supabase
                </strong>
                .
              </p>
            </>
          ),
        },
        {
          title: "5. Prestataires techniques",
          content: (
            <>
              <p>
                Le fonctionnement de PiloEco peut notamment reposer sur les
                prestataires et services suivants :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-white">
                    Vercel
                  </strong>{" "}
                  pour l’hébergement et le déploiement ;
                </li>

                <li>
                  <strong className="text-white">
                    Supabase
                  </strong>{" "}
                  pour l’authentification, la base de données et le stockage ;
                </li>

                <li>
                  <strong className="text-white">
                    Stripe
                  </strong>{" "}
                  pour le traitement sécurisé des paiements et la gestion des
                  abonnements ;
                </li>

                <li>
                  <strong className="text-white">
                    OpenAI
                  </strong>{" "}
                  pour certaines fonctionnalités d’intelligence artificielle ;
                </li>

                <li>
                  <strong className="text-white">
                    Resend
                  </strong>{" "}
                  pour l’envoi d’e-mails transactionnels ;
                </li>

                <li>
                  <strong className="text-white">
                    GitHub
                  </strong>{" "}
                  pour l’hébergement privé et la gestion du code source.
                </li>
              </ul>

              <p>
                Les modalités relatives au traitement des données par ces
                prestataires sont précisées dans la Politique de
                confidentialité.
              </p>
            </>
          ),
        },
        {
          title: "6. Propriété intellectuelle",
          content: (
            <>
              <p>
                La structure de la plateforme, ses interfaces, textes,
                fonctionnalités, bases de données, illustrations, éléments
                graphiques, logos, contenus, algorithmes et composants
                logiciels sont protégés par les règles applicables à la
                propriété intellectuelle.
              </p>

              <p>
                Sont notamment concernés le nom PiloEco, son univers graphique,
                la mascotte Pilo et les contenus associés à la plateforme, sous
                réserve des droits appartenant à leurs propriétaires
                respectifs.
              </p>

              <p>
                Toute reproduction, représentation, extraction, adaptation,
                modification, diffusion ou exploitation non autorisée de tout
                ou partie du service est interdite.
              </p>
            </>
          ),
        },
        {
          title: "7. Intelligence artificielle",
          content: (
            <>
              <p>
                Certaines fonctionnalités de PiloEco peuvent utiliser des
                technologies d’intelligence artificielle afin de produire des
                analyses, des explications ou des recommandations
                personnalisées.
              </p>

              <p>
                Les résultats générés automatiquement sont fournis à titre
                informatif et peuvent comporter des erreurs ou des
                approximations. Ils doivent être vérifiés par l’utilisateur
                avant toute prise de décision.
              </p>

              <p>
                Ces résultats ne constituent pas un conseil financier,
                juridique, fiscal, bancaire, assurantiel ou professionnel
                personnalisé.
              </p>
            </>
          ),
        },
        {
          title: "8. Responsabilité",
          content: (
            <>
              <p>
                PiloEco fournit des estimations et des recommandations destinées
                à aider l’utilisateur à mieux comprendre ses dépenses et à
                identifier des pistes d’économies.
              </p>

              <p>
                Les résultats dépendent notamment des informations renseignées
                par l’utilisateur, de leur exactitude, de leur actualisation
                ainsi que des données disponibles au moment de l’analyse.
              </p>

              <p>
                Les économies affichées sont estimatives. PiloEco ne garantit
                ni leur montant, ni leur réalisation, ni la disponibilité
                permanente des offres présentées.
              </p>

              <p>
                L’utilisateur reste responsable de la vérification des tarifs,
                garanties, exclusions, durées d’engagement et autres conditions
                contractuelles avant de souscrire ou de modifier un service.
              </p>
            </>
          ),
        },
        {
          title: "9. Liens, partenaires et services tiers",
          content: (
            <>
              <p>
                PiloEco peut afficher des liens vers des sites, des offres ou
                des services proposés par des partenaires ou des prestataires
                tiers.
              </p>

              <p>
                Certains de ces liens peuvent être des liens d’affiliation.
                PiloEco peut alors percevoir une commission lorsqu’un
                utilisateur souscrit une offre ou effectue une action
                déterminée auprès du partenaire, sans augmentation automatique
                du prix facturé à l’utilisateur.
              </p>

              <p>
                Les sites et services tiers restent seuls responsables de leurs
                contenus, de leurs offres, de leurs contrats, de leurs tarifs
                et du traitement des données qu’ils collectent directement.
              </p>
            </>
          ),
        },
        {
          title: "10. Données personnelles",
          content: (
            <>
              <p>
                Les modalités de collecte, d’utilisation, de conservation et de
                protection des données personnelles sont détaillées dans la{" "}
                <a
                  href="/confidentialite"
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  Politique de confidentialité
                </a>
                .
              </p>

              <p>
                Pour exercer vos droits relatifs à vos données personnelles,
                vous pouvez écrire à{" "}
                <a
                  href="mailto:contact@piloeco.com"
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  contact@piloeco.com
                </a>
                .
              </p>
            </>
          ),
        },
        {
          title: "11. Signalement d’un contenu ou d’une anomalie",
          content: (
            <p>
              Pour signaler un contenu, un dysfonctionnement, une utilisation
              illicite du service ou une faille de sécurité, vous pouvez écrire
              à{" "}
              <a
                href="mailto:contact@piloeco.com"
                className="font-semibold text-green-400 hover:text-green-300"
              >
                contact@piloeco.com
              </a>{" "}
              en décrivant précisément votre demande.
            </p>
          ),
        },
        {
          title: "12. Droit applicable",
          content: (
            <p>
              Les présentes mentions légales et l’utilisation de PiloEco sont
              soumises au droit français, sous réserve des dispositions
              impératives protectrices applicables aux consommateurs.
            </p>
          ),
        },
        {
          title: "13. Contact",
          content: (
            <p>
              Pour toute question relative à PiloEco ou aux présentes mentions
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
        {
          title: "14. Mise à jour",
          content: (
            <p>
              Dernière mise à jour :{" "}
              <strong className="text-white">
                31 juillet 2026
              </strong>
              .
            </p>
          ),
        },
      ]}
    />
  );
}