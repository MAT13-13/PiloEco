import LegalPage from "../components/LegalPage";

export const metadata = {
  title: "Politique de cookies | PiloEco",
  description:
    "Informations sur l’utilisation des cookies et autres traceurs par PiloEco.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="🍪 Cookies"
      title="Politique de cookies"
      description="Cette politique explique comment PiloEco utilise les cookies et technologies similaires pour assurer le fonctionnement, la sécurité et l’amélioration de la plateforme."
      sections={[
        {
          title: "1. Qu’est-ce qu’un cookie ?",
          content: (
            <>
              <p>
                Un cookie est un petit fichier ou une information enregistrée
                ou consultée sur votre ordinateur, smartphone, tablette ou tout
                autre appareil lorsque vous utilisez un site internet ou une
                application.
              </p>

              <p>
                Les cookies et technologies similaires peuvent notamment
                permettre de maintenir une session ouverte, mémoriser certaines
                préférences, sécuriser un compte ou mesurer l’utilisation d’un
                service.
              </p>
            </>
          ),
        },
        {
          title: "2. Responsable de l’utilisation des cookies",
          content: (
            <>
              <p>
                La plateforme PiloEco est exploitée par :
              </p>

              <p>
                <strong className="text-white">
                  Fiona Mathieu
                </strong>
                <br />

                Entrepreneur individuel
                <br />

                <strong className="text-white">
                  Nom commercial :
                </strong>{" "}
                FM SERVICES
                <br />

                <strong className="text-white">
                  Plateforme exploitée :
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
                  E-mail :
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
          title: "3. Cookies strictement nécessaires",
          content: (
            <>
              <p>
                PiloEco utilise ou peut utiliser des cookies et mécanismes
                techniques strictement nécessaires à la fourniture du service.
              </p>

              <p>
                Ils peuvent notamment être utilisés pour :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>permettre la connexion et l’authentification ;</li>

                <li>maintenir la session de l’utilisateur ;</li>

                <li>sécuriser le compte et prévenir les accès frauduleux ;</li>

                <li>
                  mémoriser certaines préférences indispensables au
                  fonctionnement du service ;
                </li>

                <li>
                  assurer la navigation entre les différentes pages de
                  l’application ;
                </li>

                <li>
                  permettre le fonctionnement de l’abonnement et du portail de
                  paiement ;
                </li>

                <li>
                  détecter et corriger certains incidents techniques ou de
                  sécurité.
                </li>
              </ul>

              <p>
                Ces cookies sont indispensables au fonctionnement de PiloEco.
                Ils peuvent être déposés sans consentement préalable lorsqu’ils
                sont strictement nécessaires au service demandé par
                l’utilisateur.
              </p>

              <p>
                Leur désactivation depuis le navigateur peut empêcher la
                connexion ou provoquer le dysfonctionnement de certaines
                fonctionnalités.
              </p>
            </>
          ),
        },
        {
          title: "4. Prestataires techniques concernés",
          content: (
            <>
              <p>
                Dans le cadre du fonctionnement de PiloEco, certains
                prestataires techniques peuvent déposer ou utiliser des
                cookies, identifiants ou technologies similaires.
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-white">
                    Supabase :
                  </strong>{" "}
                  authentification, maintien de la session et sécurité du
                  compte ;
                </li>

                <li>
                  <strong className="text-white">
                    Stripe :
                  </strong>{" "}
                  sécurisation du paiement et gestion de l’abonnement Premium ;
                </li>

                <li>
                  <strong className="text-white">
                    Vercel :
                  </strong>{" "}
                  hébergement, diffusion et fonctionnement technique de la
                  plateforme ;
                </li>
              </ul>

              <p>
                OpenAI et Resend peuvent traiter certaines données nécessaires
                respectivement aux fonctionnalités d’intelligence artificielle
                et à l’envoi d’e-mails, mais leur utilisation n’implique pas
                nécessairement le dépôt de cookies sur l’appareil de
                l’utilisateur.
              </p>
            </>
          ),
        },
        {
          title: "5. Mesure d’audience et statistiques",
          content: (
            <>
              <p>
                À la date de la dernière mise à jour de cette politique,
                PiloEco n’utilise pas de cookies publicitaires ni de traceurs
                destinés à établir un profil publicitaire personnalisé.
              </p>

              <p>
                PiloEco pourra utiliser à l’avenir un outil de mesure
                d’audience afin de comprendre l’utilisation générale de la
                plateforme, identifier les pages consultées et améliorer ses
                fonctionnalités.
              </p>

              <p>
                Lorsqu’un outil de mesure d’audience nécessite un consentement,
                il ne sera activé qu’après l’accord préalable de
                l’utilisateur.
              </p>

              <p>
                Certains outils de mesure d’audience peuvent être exemptés de
                consentement lorsqu’ils sont configurés de manière à être
                strictement nécessaires au fonctionnement et à l’amélioration
                du service, dans les conditions prévues par la réglementation.
              </p>
            </>
          ),
        },
        {
          title: "6. Cookies publicitaires et réseaux sociaux",
          content: (
            <>
              <p>
                PiloEco n’utilise actuellement aucun cookie publicitaire,
                dispositif de suivi intersites, pixel Meta, traceur TikTok ou
                autre outil destiné à personnaliser des publicités en fonction
                de la navigation de l’utilisateur.
              </p>

              <p>
                Si de tels outils sont ajoutés ultérieurement, ils seront
                bloqués jusqu’à l’obtention du consentement de l’utilisateur.
              </p>

              <p>
                Le refus des cookies publicitaires devra être proposé de manière
                aussi simple et accessible que leur acceptation.
              </p>
            </>
          ),
        },
        {
          title: "7. Consentement et gestion des préférences",
          content: (
            <>
              <p>
                Les cookies qui ne sont pas strictement nécessaires ne peuvent
                être déposés ou lus qu’après l’obtention d’un consentement
                libre, spécifique, éclairé et univoque.
              </p>

              <p>
                Lorsque PiloEco utilisera des traceurs nécessitant un
                consentement, une interface permettra notamment :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>d’accepter tous les cookies concernés ;</li>

                <li>de les refuser tous aussi facilement ;</li>

                <li>
                  de choisir les catégories ou finalités autorisées ;
                </li>

                <li>
                  de modifier ou retirer son consentement à tout moment.
                </li>
              </ul>

              <p>
                Le fait de continuer à naviguer sur le site ne constitue pas,
                à lui seul, un consentement valable.
              </p>
            </>
          ),
        },
        {
          title: "8. Durée de conservation",
          content: (
            <>
              <p>
                La durée de conservation dépend de la nature et de la finalité
                du cookie ou du traceur utilisé.
              </p>

              <p>
                Les cookies strictement nécessaires sont conservés pendant la
                durée indispensable au fonctionnement du service, de la session
                ou de la fonctionnalité concernée.
              </p>

              <p>
                Lorsque des traceurs de mesure d’audience exemptés de
                consentement sont utilisés, leur durée de vie est limitée à ce
                qui est strictement nécessaire et fait l’objet d’un réexamen
                périodique.
              </p>

              <p>
                Lorsque le consentement est requis, le choix de l’utilisateur,
                qu’il s’agisse d’une acceptation ou d’un refus, peut être
                conservé pendant une durée permettant de ne pas le solliciter à
                chaque visite. Une durée de six mois constitue généralement une
                bonne pratique.
              </p>
            </>
          ),
        },
        {
          title: "9. Paramétrage du navigateur",
          content: (
            <>
              <p>
                L’utilisateur peut configurer son navigateur afin de supprimer,
                bloquer ou limiter les cookies enregistrés sur son appareil.
              </p>

              <p>
                Ces réglages sont généralement accessibles depuis les menus
                relatifs à la confidentialité, à la sécurité ou aux données de
                navigation du navigateur.
              </p>

              <p>
                Le blocage de tous les cookies peut empêcher le bon
                fonctionnement de PiloEco, notamment la connexion au compte, le
                maintien de la session et l’accès aux fonctionnalités Premium.
              </p>
            </>
          ),
        },
        {
          title: "10. Données personnelles",
          content: (
            <p>
              Lorsque les cookies ou technologies similaires entraînent un
              traitement de données personnelles, ce traitement est effectué
              conformément à la{" "}
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
          title: "11. Modification de cette politique",
          content: (
            <>
              <p>
                La présente politique peut être mise à jour en cas d’évolution
                des fonctionnalités de PiloEco, des prestataires utilisés ou de
                la réglementation applicable.
              </p>

              <p>
                En cas d’ajout d’un nouveau traceur nécessitant un consentement,
                celui-ci ne sera pas activé avant que l’utilisateur ait pu
                exprimer son choix.
              </p>
            </>
          ),
        },
        {
          title: "12. Contact",
          content: (
            <>
              <p>
                Pour toute question concernant les cookies ou technologies
                similaires utilisés par PiloEco :
              </p>

              <p>
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
          title: "13. Mise à jour",
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