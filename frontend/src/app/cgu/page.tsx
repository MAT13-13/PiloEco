import LegalPage from "../components/LegalPage";

export const metadata = {
  title: "Conditions générales d’utilisation | PiloEco",
  description:
    "Conditions encadrant l’accès et l’utilisation de la plateforme PiloEco.",
};

export default function CguPage() {
  return (
    <LegalPage
      eyebrow="📜 Règles d’utilisation"
      title="Conditions générales d’utilisation"
      description="Les présentes conditions définissent les règles d’accès et d’utilisation du site, de l’application et des services PiloEco."
      sections={[
        {
          title: "1. Objet et champ d’application",
          content: (
            <>
              <p>
                Les présentes Conditions générales d’utilisation, ci-après
                désignées les « CGU », encadrent l’accès et l’utilisation du
                site, de l’application et des fonctionnalités proposés sous le
                nom{" "}
                <strong className="text-white">
                  PiloEco
                </strong>
                .
              </p>

              <p>
                Elles s’appliquent à toute personne qui consulte ou utilise
                PiloEco, qu’elle dispose ou non d’un compte utilisateur.
              </p>

              <p>
                Les conditions applicables à la souscription et au paiement de
                l’abonnement Premium sont précisées séparément dans les{" "}
                <a
                  href="/cgv"
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  Conditions générales de vente
                </a>
                .
              </p>
            </>
          ),
        },
        {
          title: "2. Éditeur du service",
          content: (
            <>
              <p>
                PiloEco est édité et exploité par :
              </p>

              <p>
                <strong className="text-white">
                  Fiona Mathieu
                </strong>
                <br />

                Entrepreneur individuel
                <br />

                Nom commercial : FM SERVICES
                <br />

                SIREN : 880 312 988
                <br />

                Immatriculation : RCS Nice 880 312 988
                <br />

                Localisation : Tourrette-Levens, France
                <br />

                Téléphone : 07 68 54 05 95
                <br />

                E-mail :{" "}
                <a
                  href="mailto:contact@piloeco.com"
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  contact@piloeco.com
                </a>
              </p>

              <p>
                Les informations complémentaires relatives à l’éditeur et à
                l’hébergement sont disponibles dans les{" "}
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
          title: "3. Présentation de PiloEco",
          content: (
            <>
              <p>
                PiloEco est un service numérique destiné à aider les
                utilisateurs à mieux comprendre leurs dépenses, suivre leurs
                contrats et identifier des pistes d’économies.
              </p>

              <p>
                Selon la formule utilisée et les fonctionnalités disponibles,
                le service peut notamment permettre :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>
                  d’effectuer des analyses de dépenses ;
                </li>

                <li>
                  de recevoir des recommandations et des conseils
                  personnalisés ;
                </li>

                <li>
                  d’enregistrer et de suivre des contrats ou abonnements ;
                </li>

                <li>
                  de détecter certaines évolutions de prix ou échéances ;
                </li>

                <li>
                  de réaliser des missions d’économie ;
                </li>

                <li>
                  de suivre une progression, des niveaux et des récompenses
                  virtuelles ;
                </li>

                <li>
                  de gérer des projets et objectifs avec PiloLife ;
                </li>

                <li>
                  d’utiliser un assistant reposant sur l’intelligence
                  artificielle ;
                </li>

                <li>
                  d’accéder à des offres, liens ou services proposés par des
                  partenaires ;
                </li>

                <li>
                  d’utiliser des fonctionnalités gratuites ou Premium.
                </li>
              </ul>

              <p>
                Les fonctionnalités proposées peuvent évoluer, être enrichies,
                modifiées ou remplacées afin d’améliorer le service.
              </p>
            </>
          ),
        },
        {
          title: "4. Acceptation des CGU",
          content: (
            <>
              <p>
                L’utilisation de PiloEco implique l’acceptation des présentes
                CGU.
              </p>

              <p>
                Lors de la création d’un compte, l’utilisateur peut être invité
                à confirmer expressément qu’il a lu et accepté les CGU ainsi
                que la Politique de confidentialité.
              </p>

              <p>
                Si l’utilisateur n’accepte pas les présentes conditions, il ne
                doit pas utiliser les fonctionnalités nécessitant cette
                acceptation.
              </p>
            </>
          ),
        },
        {
          title: "5. Accès au service",
          content: (
            <>
              <p>
                Certaines parties de PiloEco peuvent être consultées librement.
                L’accès aux fonctionnalités personnelles nécessite la création
                d’un compte.
              </p>

              <p>
                L’utilisateur doit disposer d’un équipement compatible, d’un
                navigateur récent et d’une connexion à Internet. Les frais liés
                à ces équipements et à cette connexion restent à sa charge.
              </p>

              <p>
                PiloEco peut faire évoluer les conditions techniques
                nécessaires au fonctionnement du service.
              </p>
            </>
          ),
        },
        {
          title: "6. Création et sécurité du compte",
          content: (
            <>
              <p>
                Lors de la création de son compte, l’utilisateur s’engage à
                fournir des informations exactes, complètes et actualisées.
              </p>

              <p>
                Il doit notamment conserver une adresse e-mail accessible afin
                de recevoir les messages nécessaires au fonctionnement, à la
                sécurité et à la gestion de son compte.
              </p>

              <p>
                Le compte est personnel. Il ne doit pas être partagé, vendu,
                cédé ou mis à la disposition d’un tiers.
              </p>

              <p>
                L’utilisateur est responsable de la confidentialité de ses
                identifiants. Il doit prévenir PiloEco rapidement en cas de
                perte, d’utilisation suspecte ou d’accès non autorisé à son
                compte.
              </p>

              <p>
                PiloEco peut demander une vérification supplémentaire ou
                imposer une réinitialisation du mot de passe lorsqu’une
                activité inhabituelle est détectée.
              </p>
            </>
          ),
        },
        {
          title: "7. Utilisation autorisée du service",
          content: (
            <>
              <p>
                L’utilisateur s’engage à utiliser PiloEco de manière loyale,
                raisonnable et conforme à la loi.
              </p>

              <p>
                Il s’interdit notamment :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>
                  d’utiliser PiloEco à des fins illégales, trompeuses,
                  frauduleuses ou malveillantes ;
                </li>

                <li>
                  d’usurper l’identité d’une autre personne ou de fournir de
                  fausses informations ;
                </li>

                <li>
                  de tenter d’accéder aux comptes, données, fonctionnalités ou
                  systèmes d’un autre utilisateur ;
                </li>

                <li>
                  de contourner les mécanismes d’authentification, de sécurité,
                  de limitation ou de restriction Premium ;
                </li>

                <li>
                  d’introduire un virus, un programme malveillant ou tout
                  élément susceptible de perturber le service ;
                </li>

                <li>
                  de procéder à des tests d’intrusion ou recherches de
                  vulnérabilités sans autorisation écrite préalable ;
                </li>

                <li>
                  de copier, extraire, reproduire, revendre ou exploiter les
                  contenus, données ou fonctionnalités sans autorisation ;
                </li>

                <li>
                  d’utiliser des robots, scripts ou procédés automatisés
                  entraînant une charge excessive ou portant atteinte au
                  fonctionnement de PiloEco ;
                </li>

                <li>
                  de détourner le programme de parrainage, les récompenses ou
                  les offres partenaires au moyen de comptes fictifs ou
                  frauduleux.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "8. Informations fournies par l’utilisateur",
          content: (
            <>
              <p>
                L’utilisateur est responsable de l’exactitude, de la
                pertinence et de l’actualisation des informations qu’il saisit
                dans PiloEco.
              </p>

              <p>
                Il doit uniquement enregistrer des informations qu’il est
                autorisé à utiliser et ne doit pas communiquer inutilement de
                données concernant une autre personne.
              </p>

              <p>
                L’utilisateur ne doit notamment pas saisir dans l’assistant :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>ses mots de passe ;</li>
                <li>ses codes de sécurité ;</li>
                <li>un numéro complet de carte bancaire ;</li>
                <li>des documents d’identité complets ;</li>
                <li>
                  des données sensibles qui ne sont pas nécessaires à
                  l’utilisation du service.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "9. Analyses, estimations et recommandations",
          content: (
            <>
              <p>
                Les résultats affichés par PiloEco reposent notamment sur les
                informations saisies par l’utilisateur, les règles de calcul du
                service et les données disponibles au moment de l’analyse.
              </p>

              <p>
                Les prix, offres, garanties, conditions contractuelles et
                caractéristiques des services proposés par des tiers peuvent
                évoluer à tout moment.
              </p>

              <p>
                L’utilisateur doit donc vérifier les informations directement
                auprès du professionnel concerné avant de souscrire, modifier
                ou résilier un contrat.
              </p>

              <p>
                Les économies potentielles, projections, scores et durées
                présentés sont des estimations. Ils ne constituent pas une
                promesse ou une garantie de résultat.
              </p>

              <p>
                Une économie ne doit être considérée comme réalisée qu’après
                confirmation par l’utilisateur et vérification de son impact
                réel.
              </p>
            </>
          ),
        },
        {
          title: "10. Monitoring et alertes",
          content: (
            <>
              <p>
                Les fonctionnalités de monitoring permettent d’enregistrer
                certains contrats, prix, échéances ou catégories afin de
                présenter des alertes et opportunités potentielles.
              </p>

              <p>
                Ces fonctionnalités constituent un outil d’aide au suivi. Elles
                ne remplacent pas la consultation des factures, contrats,
                avis d’échéance ou communications adressées directement par les
                fournisseurs.
              </p>

              <p>
                PiloEco ne garantit pas qu’une variation de prix, une échéance
                ou une offre sera détectée de manière exhaustive ou
                immédiatement.
              </p>
            </>
          ),
        },
        {
          title: "11. PiloLife, progression et récompenses",
          content: (
            <>
              <p>
                PiloLife permet à l’utilisateur d’enregistrer des projets,
                objectifs et économies afin de visualiser sa progression.
              </p>

              <p>
                Les montants affichés dans PiloLife ou dans une cagnotte
                virtuelle constituent des données de suivi. Ils ne sont pas
                détenus, déposés, investis ou conservés financièrement par
                PiloEco.
              </p>

              <p>
                Les points d’expérience, niveaux, badges, missions et
                récompenses virtuelles ne constituent pas une monnaie, un actif
                financier ou une somme remboursable, sauf indication
                commerciale expresse contraire.
              </p>
            </>
          ),
        },
        {
          title: "12. Assistant et intelligence artificielle",
          content: (
            <>
              <p>
                Certaines réponses, analyses ou recommandations peuvent être
                produites automatiquement à l’aide de services d’intelligence
                artificielle.
              </p>

              <p>
                Ces contenus peuvent comporter des erreurs, approximations,
                omissions ou informations incomplètes. Ils doivent être
                vérifiés avant toute prise de décision.
              </p>

              <p>
                Ils ne remplacent pas l’avis d’un professionnel compétent et ne
                constituent pas un conseil financier, juridique, fiscal,
                médical, bancaire, assurantiel ou professionnel personnalisé.
              </p>

              <p>
                L’utilisateur demeure seul responsable des décisions qu’il
                prend à partir des informations présentées.
              </p>
            </>
          ),
        },
        {
          title: "13. Offres, partenaires et affiliation",
          content: (
            <>
              <p>
                PiloEco peut présenter des offres, liens ou services provenant
                d’entreprises tierces.
              </p>

              <p>
                Certains liens peuvent être des liens d’affiliation. PiloEco
                peut percevoir une commission lorsqu’un utilisateur réalise une
                souscription ou une action auprès d’un partenaire.
              </p>

              <p>
                Cette rémunération n’implique pas nécessairement une
                augmentation du prix payé par l’utilisateur.
              </p>

              <p>
                Toute souscription est conclue directement entre l’utilisateur
                et le partenaire concerné. Ce partenaire reste responsable :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>de l’exactitude de son offre ;</li>
                <li>de ses tarifs et conditions ;</li>
                <li>de l’acceptation du dossier ;</li>
                <li>de la formation et de l’exécution du contrat ;</li>
                <li>de son service client et de ses garanties.</li>
              </ul>

              <p>
                PiloEco n’est pas partie au contrat conclu avec le partenaire,
                sauf indication expresse contraire.
              </p>
            </>
          ),
        },
        {
          title: "14. Fonctionnalités Premium",
          content: (
            <>
              <p>
                Certaines fonctionnalités sont réservées aux utilisateurs
                disposant d’un abonnement Premium actif.
              </p>

              <p>
                Le prix, la durée, le renouvellement, la facturation, la
                résiliation, le droit de rétractation et les garanties
                applicables sont présentés dans les{" "}
                <a
                  href="/cgv"
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  Conditions générales de vente
                </a>
                .
              </p>

              <p>
                Les paiements sont traités par Stripe. PiloEco ne reçoit pas et
                ne conserve pas les numéros complets des cartes bancaires.
              </p>

              <p>
                En cas de contradiction entre les présentes CGU et les
                Conditions générales de vente concernant l’abonnement Premium,
                les Conditions générales de vente prévalent.
              </p>
            </>
          ),
        },
        {
          title: "15. Disponibilité, maintenance et mises à jour",
          content: (
            <>
              <p>
                PiloEco met en œuvre des moyens raisonnables afin d’assurer
                l’accès et le bon fonctionnement du service.
              </p>

              <p>
                Une disponibilité permanente, continue et exempte d’erreurs ne
                peut toutefois être garantie.
              </p>

              <p>
                Des interruptions peuvent intervenir notamment pour :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>la maintenance ;</li>
                <li>les mises à jour fonctionnelles ou de sécurité ;</li>
                <li>la correction d’un incident ;</li>
                <li>la prévention d’une attaque ou d’une fraude ;</li>
                <li>
                  une panne ou indisponibilité provenant d’un prestataire
                  technique ;
                </li>
                <li>un événement indépendant de la volonté de PiloEco.</li>
              </ul>

              <p>
                Lorsque cela est raisonnablement possible, les interruptions
                programmées importantes pourront être annoncées à l’avance.
              </p>
            </>
          ),
        },
        {
          title: "16. Propriété intellectuelle",
          content: (
            <>
              <p>
                PiloEco, son interface, son identité visuelle, la mascotte Pilo,
                ses textes, contenus, illustrations, bases de données,
                algorithmes et fonctionnalités sont protégés par les règles
                applicables à la propriété intellectuelle.
              </p>

              <p>
                L’utilisation de PiloEco ne transfère aucun droit de propriété
                intellectuelle à l’utilisateur.
              </p>

              <p>
                L’utilisateur bénéficie uniquement d’un droit personnel,
                limité, non exclusif et non transférable d’utiliser le service
                conformément aux présentes CGU.
              </p>
            </>
          ),
        },
        {
          title: "17. Contenus et données de l’utilisateur",
          content: (
            <>
              <p>
                L’utilisateur conserve les droits dont il dispose sur les
                informations et contenus qu’il saisit dans PiloEco.
              </p>

              <p>
                Il autorise PiloEco à héberger, traiter, reproduire
                techniquement et afficher ces informations uniquement dans la
                mesure nécessaire :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>à la fourniture des fonctionnalités demandées ;</li>
                <li>à la synchronisation de son compte ;</li>
                <li>à la sécurisation du service ;</li>
                <li>à la maintenance et à la correction des anomalies ;</li>
                <li>
                  à l’amélioration du service, dans le respect de la Politique
                  de confidentialité.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "18. Suspension et suppression du compte",
          content: (
            <>
              <p>
                PiloEco peut limiter ou suspendre temporairement l’accès à un
                compte notamment en cas :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>d’activité suspecte ou frauduleuse ;</li>
                <li>d’atteinte à la sécurité du service ;</li>
                <li>de violation grave ou répétée des présentes CGU ;</li>
                <li>d’utilisation abusive des ressources techniques ;</li>
                <li>d’obligation légale ou demande d’une autorité.</li>
              </ul>

              <p>
                Sauf urgence, fraude, risque pour la sécurité ou obligation
                légale, PiloEco s’efforcera d’informer l’utilisateur et de lui
                permettre de présenter ses observations avant une suppression
                définitive.
              </p>

              <p>
                L’utilisateur peut demander la fermeture de son compte depuis
                les paramètres lorsque cette fonctionnalité est disponible, ou
                en écrivant à{" "}
                <a
                  href="mailto:contact@piloeco.com"
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  contact@piloeco.com
                </a>
                .
              </p>

              <p>
                La suppression du compte entraîne la perte de l’accès aux
                données et fonctionnalités associées, sous réserve des données
                devant être conservées pour respecter une obligation légale ou
                assurer la défense des droits de PiloEco.
              </p>
            </>
          ),
        },
        {
          title: "19. Responsabilité",
          content: (
            <>
              <p>
                PiloEco est responsable de l’exécution de ses obligations dans
                les conditions et limites prévues par la loi.
              </p>

              <p>
                PiloEco ne peut être tenu responsable :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>
                  d’une information inexacte ou obsolète saisie par
                  l’utilisateur ;
                </li>

                <li>
                  d’une décision prise sans vérification des informations ;
                </li>

                <li>
                  de la modification ou du retrait d’une offre par un tiers ;
                </li>

                <li>
                  de l’acceptation ou du refus d’un dossier par un partenaire ;
                </li>

                <li>
                  de la qualité ou de l’exécution d’un service fourni
                  directement par une entreprise tierce ;
                </li>

                <li>
                  d’une indisponibilité due à l’équipement, au réseau ou au
                  navigateur de l’utilisateur ;
                </li>

                <li>
                  d’un usage non conforme aux présentes CGU.
                </li>
              </ul>

              <p>
                Aucune disposition des présentes CGU n’a pour objet d’exclure
                ou de limiter une responsabilité qui ne peut légalement être
                exclue ou limitée.
              </p>
            </>
          ),
        },
        {
          title: "20. Données personnelles",
          content: (
            <p>
              Les conditions de collecte, d’utilisation, de conservation et de
              protection des données personnelles sont détaillées dans la{" "}
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
          title: "21. Modification des CGU",
          content: (
            <>
              <p>
                Les présentes CGU peuvent être modifiées afin de tenir compte
                des évolutions du service, de la réglementation, de la sécurité
                ou des pratiques de PiloEco.
              </p>

              <p>
                Lorsque la modification affecte de manière importante les
                droits ou obligations des utilisateurs, une information pourra
                être affichée dans PiloEco ou envoyée par e-mail avant son
                entrée en vigueur.
              </p>

              <p>
                L’utilisateur qui refuse une modification importante peut
                cesser d’utiliser PiloEco et demander la fermeture de son
                compte, sans préjudice des droits dont il dispose au titre d’un
                abonnement Premium.
              </p>
            </>
          ),
        },
        {
          title: "22. Nullité partielle",
          content: (
            <p>
              Si une disposition des présentes CGU est déclarée nulle,
              inapplicable ou contraire à une règle impérative, les autres
              dispositions restent applicables dans toute la mesure permise par
              la loi.
            </p>
          ),
        },
        {
          title: "23. Droit applicable",
          content: (
            <p>
              Les présentes CGU sont soumises au droit français, sans priver un
              consommateur des dispositions impératives protectrices dont il
              bénéficie en vertu de la législation applicable.
            </p>
          ),
        },
        {
          title: "24. Contact",
          content: (
            <p>
              Pour toute question concernant PiloEco ou les présentes CGU, vous
              pouvez écrire à{" "}
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