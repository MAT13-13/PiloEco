import LegalPage from "../components/LegalPage";

export const metadata = {
  title: "Conditions générales de vente | PiloEco",
  description:
    "Conditions applicables à la souscription et à l’utilisation de l’abonnement Premium PiloEco.",
};

export default function CgvPage() {
  return (
    <LegalPage
      eyebrow="💳 Abonnement Premium"
      title="Conditions générales de vente"
      description="Les présentes conditions encadrent la souscription, le paiement, le renouvellement et la résiliation de l’abonnement Premium PiloEco."
      sections={[
        {
          title: "1. Identité du vendeur",
          content: (
            <>
              <p>
                L’abonnement Premium PiloEco est commercialisé par :
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
                  Téléphone :
                </strong>{" "}
                07 68 54 05 95
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

              <p>
                Les informations complémentaires concernant l’éditeur sont
                disponibles dans les{" "}
                <a
                  href="/mentions-legales"
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  Mentions légales
                </a>
                .
              </p>
            </>
          ),
        },
        {
          title: "2. Objet et champ d’application",
          content: (
            <>
              <p>
                Les présentes Conditions générales de vente, ci-après
                désignées les « CGV », définissent les conditions dans
                lesquelles un utilisateur peut souscrire un abonnement payant
                aux fonctionnalités Premium de PiloEco.
              </p>

              <p>
                Elles s’appliquent aux souscriptions réalisées directement
                depuis le site ou l’application PiloEco par un consommateur
                agissant à des fins non professionnelles.
              </p>

              <p>
                Les règles générales d’utilisation de la plateforme sont
                précisées dans les{" "}
                <a
                  href="/cgu"
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  Conditions générales d’utilisation
                </a>
                .
              </p>

              <p>
                En cas de contradiction portant sur la souscription, le
                paiement, le renouvellement ou la résiliation de l’abonnement,
                les présentes CGV prévalent sur les CGU.
              </p>
            </>
          ),
        },
        {
          title: "3. Caractéristiques de l’abonnement Premium",
          content: (
            <>
              <p>
                L’abonnement Premium donne accès, pendant sa période de
                validité, aux fonctionnalités identifiées comme Premium sur la
                plateforme PiloEco.
              </p>

              <p>
                Selon la version du service disponible au moment de la
                souscription, ces fonctionnalités peuvent notamment
                comprendre :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>
                  l’enregistrement et le suivi de contrats ou abonnements ;
                </li>

                <li>
                  la surveillance de certains prix, échéances et opportunités ;
                </li>

                <li>
                  l’accès aux alertes et à l’historique de monitoring ;
                </li>

                <li>
                  l’accès aux fonctionnalités avancées de PiloLife ;
                </li>

                <li>
                  le suivi de projets, d’objectifs et d’économies ;
                </li>

                <li>
                  l’accès à certaines analyses ou recommandations avancées ;
                </li>

                <li>
                  l’accès à des fonctionnalités supplémentaires présentées
                  comme Premium dans l’application.
                </li>
              </ul>

              <p>
                La description, le prix, la durée et les principales
                caractéristiques de l’offre sont présentés à l’utilisateur
                avant la validation de sa commande.
              </p>

              <p>
                PiloEco peut faire évoluer les fonctionnalités de l’abonnement
                afin d’améliorer le service, à condition de ne pas supprimer
                arbitrairement les caractéristiques essentielles annoncées au
                moment de la souscription.
              </p>
            </>
          ),
        },
        {
          title: "4. Conditions de souscription",
          content: (
            <>
              <p>
                Pour souscrire l’abonnement Premium, l’utilisateur doit :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>disposer d’un compte PiloEco actif ;</li>

                <li>
                  être majeur et disposer de la capacité juridique nécessaire
                  pour conclure le contrat ;
                </li>

                <li>
                  fournir des informations exactes et à jour ;
                </li>

                <li>
                  disposer d’un moyen de paiement accepté et valide ;
                </li>

                <li>
                  prendre connaissance des présentes CGV et les accepter avant
                  le paiement.
                </li>
              </ul>

              <p>
                La souscription est personnelle. L’utilisateur ne peut pas
                céder, partager, revendre ou mettre son accès Premium à la
                disposition d’un tiers.
              </p>
            </>
          ),
        },
        {
          title: "5. Processus de commande",
          content: (
            <>
              <p>
                Avant de confirmer sa commande, l’utilisateur peut vérifier la
                formule choisie, son prix, sa périodicité et les informations
                relatives au renouvellement.
              </p>

              <p>
                La commande devient définitive après :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>l’acceptation des présentes CGV ;</li>

                <li>
                  la confirmation de l’obligation de paiement ;
                </li>

                <li>
                  la validation du paiement par le prestataire de paiement ;
                </li>

                <li>
                  la confirmation de la souscription par PiloEco.
                </li>
              </ul>

              <p>
                Une confirmation est affichée dans l’application ou envoyée à
                l’adresse e-mail associée au compte.
              </p>

              <p>
                PiloEco peut refuser ou annuler une commande en cas de fraude,
                d’utilisation manifestement abusive, d’informations
                incohérentes ou de refus du paiement.
              </p>
            </>
          ),
        },
        {
          title: "6. Prix",
          content: (
            <>
              <p>
                Le prix applicable est celui affiché en euros toutes taxes
                comprises sur la page de souscription au moment de la
                commande.
              </p>

              <p>
                Le prix, la fréquence de facturation et les éventuelles
                conditions promotionnelles sont présentés avant la validation
                du paiement.
              </p>

              <p>
                PiloEco peut modifier le prix de l’abonnement pour les périodes
                futures.
              </p>

              <p>
                Toute modification tarifaire concernant un abonnement en cours
                sera communiquée à l’utilisateur avant son application. Elle
                ne s’appliquera pas rétroactivement aux périodes déjà payées.
              </p>

              <p>
                Lorsque la loi l’exige, l’utilisateur pourra refuser la
                modification en résiliant son abonnement avant l’entrée en
                vigueur du nouveau tarif.
              </p>
            </>
          ),
        },
        {
          title: "7. Paiement",
          content: (
            <>
              <p>
                Le paiement est effectué en ligne par l’intermédiaire de
                Stripe, selon les moyens de paiement proposés au moment de la
                commande.
              </p>

              <p>
                PiloEco ne reçoit pas et ne conserve pas les numéros complets
                des cartes bancaires.
              </p>

              <p>
                Stripe peut transmettre à PiloEco les informations nécessaires
                à la gestion de la souscription, telles que :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>l’identifiant du client ou de l’abonnement ;</li>
                <li>l’état du paiement ;</li>
                <li>la formule souscrite ;</li>
                <li>la date de renouvellement ;</li>
                <li>
                  certaines informations partielles relatives au moyen de
                  paiement.
                </li>
              </ul>

              <p>
                L’utilisateur garantit qu’il est autorisé à utiliser le moyen
                de paiement renseigné.
              </p>
            </>
          ),
        },
        {
          title: "8. Durée et renouvellement",
          content: (
            <>
              <p>
                La durée de l’abonnement correspond à la formule présentée et
                choisie par l’utilisateur lors de la souscription.
              </p>

              <p>
                Sauf indication contraire avant la commande, l’abonnement est
                conclu pour une période déterminée et renouvelé
                automatiquement pour des périodes successives de même durée.
              </p>

              <p>
                Le paiement de chaque nouvelle période est prélevé à la date de
                renouvellement indiquée dans l’espace utilisateur ou dans le
                portail de gestion de l’abonnement.
              </p>

              <p>
                L’utilisateur peut empêcher le renouvellement automatique en
                résiliant son abonnement avant la prochaine échéance.
              </p>
            </>
          ),
        },
        {
          title: "9. Activation et accès au service",
          content: (
            <>
              <p>
                Sauf incident technique ou contrôle de sécurité nécessaire,
                l’accès aux fonctionnalités Premium est activé après la
                confirmation du paiement.
              </p>

              <p>
                L’abonnement nécessite un compte PiloEco actif, une connexion à
                Internet et un équipement compatible avec le service.
              </p>

              <p>
                En cas de retard d’activation, l’utilisateur peut contacter
                PiloEco à l’adresse{" "}
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
          title: "10. Droit de rétractation",
          content: (
            <>
              <p>
                Lorsque l’abonnement est souscrit à distance par un
                consommateur, celui-ci dispose en principe d’un délai de
                quatorze jours à compter de la conclusion du contrat pour
                exercer son droit de rétractation, sans avoir à justifier sa
                décision.
              </p>

              <p>
                La demande peut être adressée à :
              </p>

              <p>
                <a
                  href="mailto:contact@piloeco.com"
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  contact@piloeco.com
                </a>
              </p>

              <p>
                L’utilisateur peut utiliser le modèle de formulaire figurant à
                la fin des présentes CGV ou adresser toute déclaration
                exprimant clairement sa volonté de se rétracter.
              </p>

              <p>
                Lorsque l’utilisateur demande expressément que l’accès au
                service commence avant la fin du délai de rétractation, il peut
                commencer à utiliser immédiatement les fonctionnalités
                Premium.
              </p>

              <p>
                S’il exerce ensuite son droit de rétractation avant la fin du
                délai de quatorze jours, il pourra être tenu de payer un
                montant proportionnel au service effectivement fourni jusqu’à
                la communication de sa décision, lorsque les conditions légales
                sont réunies.
              </p>

              <p>
                Le droit de rétractation ne disparaît avant la fin du délai que
                dans les situations prévues par la loi, notamment lorsque le
                service a été entièrement exécuté après demande expresse du
                consommateur et reconnaissance de la perte de son droit.
              </p>

              <p>
                En cas de rétractation valable, les sommes devant être
                remboursées le sont au plus tard dans les quatorze jours
                suivant la réception de la demande, au moyen du même mode de
                paiement, sauf accord contraire.
              </p>
            </>
          ),
        },
        {
          title: "11. Résiliation par l’utilisateur",
          content: (
            <>
              <p>
                L’utilisateur peut résilier son abonnement depuis l’interface
                de gestion de son compte ou le portail de gestion Stripe mis à
                sa disposition.
              </p>

              <p>
                La fonctionnalité de résiliation doit rester facilement
                accessible depuis le service lorsque la souscription peut être
                conclue en ligne.
              </p>

              <p>
                Sauf indication contraire ou disposition légale plus favorable,
                la résiliation :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>met fin au renouvellement automatique ;</li>

                <li>
                  n’interrompt pas immédiatement la période déjà payée ;
                </li>

                <li>
                  permet de conserver l’accès Premium jusqu’à la fin de la
                  période en cours ;
                </li>

                <li>
                  n’entraîne pas le remboursement automatique de la période
                  commencée.
                </li>
              </ul>

              <p>
                La suppression du compte PiloEco et la résiliation de
                l’abonnement sont deux opérations distinctes.
              </p>

              <p>
                Avant de supprimer son compte, l’utilisateur doit vérifier
                l’état de son abonnement et, si nécessaire, le résilier.
              </p>
            </>
          ),
        },
        {
          title: "12. Défaut ou échec de paiement",
          content: (
            <>
              <p>
                En cas de refus, d’expiration ou d’échec du moyen de paiement,
                PiloEco ou Stripe peut inviter l’utilisateur à mettre à jour
                ses informations de paiement.
              </p>

              <p>
                De nouvelles tentatives de prélèvement peuvent être effectuées
                selon les paramètres du prestataire de paiement.
              </p>

              <p>
                Si le paiement reste impayé, PiloEco peut suspendre ou
                désactiver l’accès aux fonctionnalités Premium après en avoir
                informé l’utilisateur lorsque cela est raisonnablement
                possible.
              </p>

              <p>
                L’utilisateur conserve alors l’accès aux fonctionnalités
                gratuites disponibles, sauf fermeture ou suspension justifiée
                de son compte.
              </p>
            </>
          ),
        },
        {
          title: "13. Offres promotionnelles",
          content: (
            <>
              <p>
                PiloEco peut proposer ponctuellement des réductions, essais
                gratuits, codes promotionnels ou offres réservées à certaines
                catégories d’utilisateurs.
              </p>

              <p>
                Les conditions particulières, la durée et le prix applicable à
                l’issue d’une promotion sont présentés avant la souscription.
              </p>

              <p>
                Sauf indication contraire, une promotion :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>est personnelle ;</li>
                <li>n’est pas échangeable contre de l’argent ;</li>
                <li>ne peut pas être utilisée frauduleusement ;</li>
                <li>n’est pas cumulable avec une autre offre.</li>
              </ul>

              <p>
                PiloEco peut annuler l’avantage obtenu en cas de fraude ou de
                détournement manifeste de l’offre.
              </p>
            </>
          ),
        },
        {
          title: "14. Évolution de l’abonnement",
          content: (
            <>
              <p>
                PiloEco peut faire évoluer ses fonctionnalités pour des raisons
                techniques, réglementaires, économiques, de sécurité ou
                d’amélioration du service.
              </p>

              <p>
                Les modifications qui n’ont pas d’incidence négative
                significative sur l’accès au service peuvent être mises en
                œuvre sans formalité particulière.
              </p>

              <p>
                En cas de modification importante affectant défavorablement
                l’abonnement, l’utilisateur sera informé de manière claire et
                dans un délai raisonnable.
              </p>

              <p>
                Il pourra bénéficier des recours ou de la faculté de résiliation
                prévus par la législation applicable.
              </p>
            </>
          ),
        },
        {
          title: "15. Disponibilité et maintenance",
          content: (
            <>
              <p>
                PiloEco met en œuvre des moyens raisonnables pour assurer
                l’accès aux fonctionnalités Premium.
              </p>

              <p>
                Le service peut toutefois être temporairement interrompu,
                notamment en raison :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>d’une opération de maintenance ;</li>
                <li>d’une mise à jour ;</li>
                <li>d’un incident de sécurité ;</li>
                <li>d’une défaillance d’un prestataire technique ;</li>
                <li>d’un événement indépendant de la volonté de PiloEco.</li>
              </ul>

              <p>
                Une interruption ponctuelle ne donne pas automatiquement droit
                à un remboursement.
              </p>

              <p>
                En cas d’indisponibilité prolongée ou de défaut de conformité,
                les droits et recours légaux du consommateur restent
                applicables.
              </p>
            </>
          ),
        },
        {
          title: "16. Garantie légale de conformité",
          content: (
            <>
              <p>
                Le consommateur bénéficie de la garantie légale de conformité
                applicable aux contenus et services numériques, dans les
                conditions prévues par le Code de la consommation.
              </p>

              <p>
                PiloEco doit fournir un service conforme à la description, aux
                fonctionnalités et aux caractéristiques présentées au moment de
                la souscription.
              </p>

              <p>
                En cas de défaut de conformité, le consommateur peut demander
                la mise en conformité du service, sans frais et dans un délai
                raisonnable.
              </p>

              <p>
                Lorsque la mise en conformité est impossible, refusée, tardive
                ou que le défaut est suffisamment grave, le consommateur peut,
                selon les conditions légales, obtenir une réduction du prix ou
                la résolution du contrat.
              </p>

              <p>
                Pour signaler un défaut, l’utilisateur peut écrire à{" "}
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
          title: "17. Responsabilité",
          content: (
            <>
              <p>
                PiloEco est responsable de la bonne exécution de ses
                obligations dans les conditions prévues par la loi.
              </p>

              <p>
                Les analyses, projections et économies affichées reposent
                notamment sur les informations renseignées par l’utilisateur et
                constituent des outils d’aide à la décision.
              </p>

              <p>
                PiloEco ne garantit pas la réalisation effective d’une économie
                déterminée ni l’acceptation d’un dossier par une entreprise
                partenaire.
              </p>

              <p>
                PiloEco ne peut pas être tenu responsable des conséquences :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>
                  d’informations inexactes ou obsolètes saisies par
                  l’utilisateur ;
                </li>

                <li>
                  d’une décision prise sans vérification auprès du fournisseur
                  concerné ;
                </li>

                <li>
                  d’un service ou contrat directement fourni par un partenaire
                  tiers ;
                </li>

                <li>
                  d’une utilisation non conforme du compte ou de la
                  plateforme ;
                </li>

                <li>
                  d’un incident provenant de l’équipement, du navigateur ou de
                  la connexion de l’utilisateur.
                </li>
              </ul>

              <p>
                Aucune disposition des présentes CGV ne limite un droit ou une
                responsabilité qui ne peut pas légalement être exclu ou limité.
              </p>
            </>
          ),
        },
        {
          title: "18. Données personnelles",
          content: (
            <>
              <p>
                Les informations nécessaires à la gestion de la commande, du
                paiement et de l’abonnement sont traitées conformément à la{" "}
                <a
                  href="/confidentialite"
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  Politique de confidentialité
                </a>
                .
              </p>

              <p>
                Les paiements sont traités par Stripe. PiloEco ne conserve pas
                les numéros complets des cartes bancaires.
              </p>
            </>
          ),
        },
        {
          title: "19. Réclamations",
          content: (
            <>
              <p>
                Pour toute difficulté concernant la commande, la facturation,
                l’accès Premium ou la résiliation, l’utilisateur doit
                contacter en priorité PiloEco :
              </p>

              <p>
                <strong className="text-white">
                  Par e-mail :
                </strong>{" "}
                <a
                  href="mailto:contact@piloeco.com"
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  contact@piloeco.com
                </a>
                <br />

                <strong className="text-white">
                  Par téléphone :
                </strong>{" "}
                07 68 54 05 95
              </p>

              <p>
                La demande doit préciser l’adresse e-mail du compte, l’objet de
                la réclamation et, lorsque cela est utile, l’identifiant de
                paiement ou d’abonnement.
              </p>
            </>
          ),
        },
        {
          title: "20. Médiation de la consommation",
          content: (
            <>
              <p>
                Après une réclamation écrite préalable auprès de PiloEco restée
                sans solution satisfaisante, le consommateur peut recourir
                gratuitement au médiateur de la consommation dont relève
                PiloEco.
              </p>

              <div className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-4">
                <p className="font-semibold text-amber-200">
                  Coordonnées du médiateur à compléter avant la
                  commercialisation de l’abonnement Premium.
                </p>

                <p className="mt-2">
                  Médiateur : à compléter
                  <br />
                  Adresse : à compléter
                  <br />
                  Site internet : à compléter
                </p>
              </div>

              <p>
                La médiation ne peut être demandée qu’après une tentative
                préalable de résolution directe du litige avec PiloEco.
              </p>

              <p>
                Le consommateur reste libre d’accepter ou de refuser la
                solution proposée par le médiateur et peut saisir les
                juridictions compétentes.
              </p>
            </>
          ),
        },
        {
          title: "21. Droit applicable et juridiction compétente",
          content: (
            <>
              <p>
                Les présentes CGV sont soumises au droit français.
              </p>

              <p>
                En cas de litige, les parties chercheront en priorité une
                solution amiable.
              </p>

              <p>
                À défaut d’accord, le consommateur peut saisir l’une des
                juridictions territorialement compétentes selon les règles
                impératives applicables, notamment celle de son domicile
                lorsque la loi le permet.
              </p>
            </>
          ),
        },
        {
          title: "22. Modification des CGV",
          content: (
            <>
              <p>
                PiloEco peut modifier les présentes CGV afin de tenir compte
                d’une évolution légale, réglementaire, technique, commerciale
                ou fonctionnelle.
              </p>

              <p>
                Les CGV applicables à une commande sont celles acceptées au
                moment de cette commande.
              </p>

              <p>
                Toute modification affectant un abonnement en cours sera
                communiquée à l’utilisateur dans un délai raisonnable avant son
                entrée en vigueur lorsqu’une information préalable est
                nécessaire.
              </p>
            </>
          ),
        },
        {
          title: "23. Nullité partielle",
          content: (
            <p>
              Si l’une des dispositions des présentes CGV est déclarée nulle,
              illégale ou inapplicable, les autres dispositions restent
              applicables dans toute la mesure autorisée par la loi.
            </p>
          ),
        },
        {
          title: "24. Formulaire type de rétractation",
          content: (
            <>
              <p>
                Le formulaire suivant peut être copié et envoyé uniquement si
                l’utilisateur souhaite exercer son droit de rétractation :
              </p>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p>
                  À l’attention de Fiona Mathieu – FM SERVICES – PiloEco
                  <br />
                  E-mail : contact@piloeco.com
                </p>

                <p className="mt-4">
                  Je vous notifie par la présente ma rétractation du contrat
                  portant sur l’abonnement Premium PiloEco souscrit le :
                  __________
                </p>

                <p className="mt-4">
                  Adresse e-mail du compte : __________
                  <br />
                  Nom du consommateur : __________
                  <br />
                  Date : __________
                  <br />
                  Signature, uniquement en cas d’envoi sur papier : __________
                </p>
              </div>
            </>
          ),
        },
        {
          title: "25. Mise à jour",
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