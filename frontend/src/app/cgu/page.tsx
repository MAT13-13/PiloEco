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
      description="Les présentes conditions définissent les règles d’accès et d’utilisation de PiloEco."
      sections={[
        {
          title: "1. Objet",
          content: (
            <p>
              Les présentes Conditions générales d’utilisation encadrent
              l’accès et l’utilisation du site, de l’application et des
              fonctionnalités proposés sous le nom PiloEco.
            </p>
          ),
        },
        {
          title: "2. Présentation du service",
          content: (
            <>
              <p>
                PiloEco est un service numérique destiné à aider ses
                utilisateurs à mieux comprendre leurs dépenses et à identifier
                des pistes d’économies.
              </p>

              <p>Le service peut notamment permettre :</p>

              <ul className="list-disc space-y-2 pl-5">
                <li>d’effectuer des analyses de dépenses ;</li>
                <li>de recevoir des recommandations ;</li>
                <li>de suivre des contrats ou abonnements ;</li>
                <li>de réaliser des missions d’économie ;</li>
                <li>de suivre des projets avec PiloLife ;</li>
                <li>d’utiliser un assistant fondé sur l’IA ;</li>
                <li>d’accéder à des fonctionnalités Premium.</li>
              </ul>
            </>
          ),
        },
        {
          title: "3. Création et sécurité du compte",
          content: (
            <>
              <p>
                Certaines fonctionnalités nécessitent la création d’un compte.
                L’utilisateur s’engage à fournir des informations exactes et à
                maintenir son adresse e-mail accessible.
              </p>

              <p>
                Le compte est personnel. L’utilisateur est responsable de la
                confidentialité de ses identifiants et doit informer PiloEco en
                cas d’utilisation suspecte ou non autorisée.
              </p>
            </>
          ),
        },
        {
          title: "4. Conditions d’utilisation",
          content: (
            <>
              <p>L’utilisateur s’interdit notamment :</p>

              <ul className="list-disc space-y-2 pl-5">
                <li>d’utiliser PiloEco à des fins illégales ou frauduleuses ;</li>
                <li>
                  de tenter d’accéder aux comptes, données ou systèmes d’un
                  autre utilisateur ;
                </li>
                <li>
                  de contourner les mécanismes de sécurité ou de restriction
                  Premium ;
                </li>
                <li>
                  d’introduire un logiciel malveillant ou de perturber le
                  fonctionnement du service ;
                </li>
                <li>
                  de copier, extraire ou revendre les contenus et
                  fonctionnalités de PiloEco sans autorisation ;
                </li>
                <li>
                  d’utiliser le service de façon automatisée ou excessive
                  portant atteinte à son fonctionnement.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "5. Estimations et recommandations",
          content: (
            <>
              <p>
                Les résultats de PiloEco reposent notamment sur les informations
                saisies par l’utilisateur, les règles de calcul du service et
                les informations disponibles au moment de l’analyse.
              </p>

              <p>
                Les prix, offres et conditions de fournisseurs peuvent évoluer.
                L’utilisateur doit vérifier les informations directement auprès
                du professionnel concerné avant de souscrire, résilier ou
                modifier un contrat.
              </p>

              <p>
                Les économies présentées sont des estimations et ne constituent
                pas une promesse de résultat.
              </p>
            </>
          ),
        },
        {
          title: "6. Assistant et intelligence artificielle",
          content: (
            <>
              <p>
                Les réponses de l’assistant peuvent être produites
                automatiquement et contenir des erreurs, approximations ou
                informations incomplètes.
              </p>

              <p>
                Elles ne remplacent pas l’avis d’un professionnel compétent et
                ne constituent pas un conseil financier, juridique, fiscal,
                médical ou assurantiel personnalisé.
              </p>
            </>
          ),
        },
        {
          title: "7. Fonctionnalités Premium",
          content: (
            <>
              <p>
                Certaines fonctionnalités sont accessibles uniquement avec un
                abonnement payant. Les conditions commerciales, le prix, le
                renouvellement, la résiliation et le droit de rétractation
                devront être précisés dans des Conditions générales de vente.
              </p>

              <p>
                Les paiements sont traités par Stripe. PiloEco ne stocke pas les
                numéros complets des cartes bancaires.
              </p>
            </>
          ),
        },
        {
          title: "8. Disponibilité et maintenance",
          content: (
            <>
              <p>
                PiloEco s’efforce d’assurer l’accès au service, sans garantir
                une disponibilité permanente ou sans interruption.
              </p>

              <p>
                Des interruptions peuvent notamment intervenir pour la
                maintenance, les mises à jour, la correction d’incidents ou en
                raison d’un événement indépendant de la volonté de PiloEco.
              </p>
            </>
          ),
        },
        {
          title: "9. Propriété intellectuelle",
          content: (
            <p>
              PiloEco, son interface, son identité visuelle, la mascotte Pilo,
              les textes, contenus, bases de données et fonctionnalités sont
              protégés. Leur utilisation n’accorde aucun transfert de propriété
              intellectuelle à l’utilisateur.
            </p>
          ),
        },
        {
          title: "10. Contenus fournis par l’utilisateur",
          content: (
            <>
              <p>
                L’utilisateur conserve les droits dont il dispose sur les
                informations qu’il saisit dans le service.
              </p>

              <p>
                Il autorise PiloEco à traiter ces informations uniquement dans
                la mesure nécessaire à la fourniture, à la sécurisation et à
                l’amélioration du service.
              </p>
            </>
          ),
        },
        {
          title: "11. Suspension ou suppression",
          content: (
            <>
              <p>
                Un compte peut être temporairement suspendu en cas d’activité
                suspecte, d’atteinte à la sécurité ou de manquement grave aux
                présentes conditions.
              </p>

              <p>
                Sauf urgence ou obligation légale, PiloEco s’efforcera
                d’informer l’utilisateur et de lui permettre de présenter ses
                observations avant une suppression définitive.
              </p>
            </>
          ),
        },
        {
          title: "12. Responsabilité",
          content: (
            <>
              <p>
                PiloEco est responsable de l’exécution de ses obligations dans
                les limites prévues par la loi.
              </p>

              <p>
                PiloEco ne peut être tenu responsable des décisions prises sans
                vérification par l’utilisateur, des informations erronées
                saisies par celui-ci ou des services fournis directement par
                des entreprises tierces.
              </p>
            </>
          ),
        },
        {
          title: "13. Modification des conditions",
          content: (
            <p>
              Les présentes conditions peuvent évoluer. Lorsque la modification
              affecte de manière importante les droits des utilisateurs,
              PiloEco pourra les informer par e-mail ou directement dans
              l’application avant son entrée en vigueur.
            </p>
          ),
        },
        {
          title: "14. Droit applicable et contact",
          content: (
            <>
              <p>
                Les présentes conditions sont soumises au droit français, sans
                priver le consommateur des protections impératives dont il
                bénéficie.
              </p>

              <p>
                Pour toute question :{" "}
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
      ]}
    />
  );
}