import LegalPage from "../components/LegalPage";

export const metadata = {
  title: "Aide et support | PiloEco",
  description:
    "Obtenez de l’aide pour utiliser PiloEco, gérer votre abonnement ou signaler un problème.",
};

export default function SupportPage() {
  return (
    <LegalPage
      eyebrow="💬 Centre d’aide"
      title="Comment pouvons-nous vous aider ?"
      description="Retrouvez les réponses aux questions courantes et les informations nécessaires pour contacter le support PiloEco."
      sections={[
        {
          title: "1. Contacter le support",
          content: (
            <>
              <p>
                Pour toute question, demande d’assistance, réclamation ou
                difficulté rencontrée dans PiloEco, vous pouvez écrire à :
              </p>

              <a
                href="mailto:contact@piloeco.com"
                className="inline-flex rounded-xl bg-green-500 px-5 py-3 font-black text-slate-950 transition hover:bg-green-400"
              >
                contact@piloeco.com
              </a>

              <p>
                Vous pouvez également nous contacter par téléphone au :
              </p>

              <a
                href="tel:+33768540595"
                className="font-semibold text-green-400 hover:text-green-300"
              >
                en cours
              </a>

              <p className="text-slate-400">
                Pour faciliter le traitement de votre demande, indiquez
                l’adresse e-mail associée à votre compte et décrivez précisément
                le problème rencontré.
              </p>
            </>
          ),
        },
        {
          title: "2. Je ne parviens plus à me connecter",
          content: (
            <>
              <p>
                Vérifiez que l’adresse e-mail utilisée correspond bien à celle
                enregistrée sur votre compte et que votre mot de passe est
                correctement saisi.
              </p>

              <p>
                Utilisez ensuite la fonctionnalité « Mot de passe oublié » sur
                la page de connexion.
              </p>

              <p>
                Si vous ne recevez pas l’e-mail de réinitialisation :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>vérifiez vos courriers indésirables ;</li>
                <li>patientez quelques minutes ;</li>
                <li>vérifiez l’orthographe de votre adresse e-mail ;</li>
                <li>
                  contactez le support si le problème persiste.
                </li>
              </ul>

              <p>
                Le support ne vous demandera jamais de communiquer votre mot de
                passe.
              </p>
            </>
          ),
        },
        {
          title: "3. Mon abonnement Premium n’est pas activé",
          content: (
            <>
              <p>
                Après un paiement, quelques instants peuvent être nécessaires
                pour actualiser le statut Premium de votre compte.
              </p>

              <p>
                Vérifiez successivement :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>
                  que le paiement a bien été confirmé par Stripe ;
                </li>
                <li>
                  que vous êtes connecté au compte utilisé lors du paiement ;
                </li>
                <li>
                  que la page a été rechargée après la confirmation ;
                </li>
                <li>
                  que votre abonnement apparaît dans la page de gestion de
                  l’abonnement.
                </li>
              </ul>

              <p>
                Si le problème persiste, contactez le support en précisant
                l’adresse e-mail du compte et, si possible, l’identifiant de la
                transaction ou de l’abonnement.
              </p>

              <p>
                Ne transmettez jamais votre numéro complet de carte bancaire,
                votre cryptogramme ou votre code secret.
              </p>
            </>
          ),
        },
        {
          title: "4. Gérer ou résilier mon abonnement",
          content: (
            <>
              <p>
                L’abonnement Premium peut être géré depuis la page dédiée à
                l’abonnement ou depuis le portail de gestion Stripe accessible
                depuis votre compte.
              </p>

              <p>
                La résiliation met fin au renouvellement automatique. Sauf
                indication contraire, l’accès Premium reste actif jusqu’à la fin
                de la période déjà payée.
              </p>

              <p>
                La suppression du compte et la résiliation de l’abonnement sont
                deux opérations distinctes. Pensez à résilier votre abonnement
                avant de supprimer définitivement votre compte.
              </p>

              <p>
                En cas de difficulté pour accéder à la fonction de résiliation,
                contactez immédiatement le support.
              </p>
            </>
          ),
        },
        {
          title: "5. Une estimation ou une recommandation semble incorrecte",
          content: (
            <>
              <p>
                Les résultats proposés par PiloEco dépendent directement des
                informations renseignées dans votre compte.
              </p>

              <p>
                Vérifiez notamment :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>le montant mensuel ou annuel saisi ;</li>
                <li>le fournisseur sélectionné ;</li>
                <li>la catégorie du contrat ;</li>
                <li>la date de fin d’engagement ;</li>
                <li>les caractéristiques de l’offre actuelle ;</li>
                <li>
                  la fréquence de paiement et les éventuels frais annexes.
                </li>
              </ul>

              <p>
                Les recommandations et économies affichées sont indicatives et
                doivent toujours être vérifiées auprès du fournisseur concerné
                avant une souscription, une modification ou une résiliation.
              </p>
            </>
          ),
        },
        {
          title: "6. Signaler un bug",
          content: (
            <>
              <p>
                Pour nous aider à identifier rapidement un problème technique,
                indiquez dans votre message :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>la page ou la fonctionnalité concernée ;</li>
                <li>les actions réalisées avant l’apparition du problème ;</li>
                <li>le résultat attendu ;</li>
                <li>le résultat obtenu ;</li>
                <li>le message d’erreur affiché, le cas échéant ;</li>
                <li>votre navigateur et votre appareil ;</li>
                <li>
                  une capture d’écran lorsque cela est possible.
                </li>
              </ul>

              <p>
                Avant de nous contacter, vous pouvez également essayer de
                recharger la page, vous déconnecter puis vous reconnecter, ou
                utiliser un navigateur récent.
              </p>

              <p>
                Ne joignez jamais de mot de passe, de numéro complet de carte
                bancaire, de cryptogramme, de code de sécurité ou de document
                d’identité complet.
              </p>
            </>
          ),
        },
        {
          title: "7. Signaler un problème de sécurité",
          content: (
            <>
              <p>
                Toute vulnérabilité, connexion suspecte ou activité inhabituelle
                concernant votre compte doit être signalée rapidement à :
              </p>

              <a
                href="mailto:contact@piloeco.com"
                className="font-semibold text-green-400 hover:text-green-300"
              >
                contact@piloeco.com
              </a>

              <p>
                Si vous pensez que votre compte a été compromis :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>modifiez immédiatement votre mot de passe ;</li>
                <li>
                  utilisez un mot de passe différent de ceux utilisés sur vos
                  autres services ;
                </li>
                <li>déconnectez-vous des appareils inconnus si possible ;</li>
                <li>contactez le support en précisant les faits observés.</li>
              </ul>

              <p>
                Si vous découvrez une vulnérabilité technique, décrivez-la sans
                exploiter la faille au-delà de ce qui est strictement nécessaire
                pour la démontrer et sans accéder aux données d’autres
                utilisateurs.
              </p>
            </>
          ),
        },
        {
          title: "8. Données personnelles et exercice de vos droits",
          content: (
            <>
              <p>
                Vous pouvez demander l’accès, la rectification, l’effacement,
                la limitation ou la portabilité de certaines données
                personnelles, selon les conditions prévues par la réglementation.
              </p>

              <p>
                Vous pouvez également vous opposer à certains traitements,
                notamment à la prospection commerciale.
              </p>

              <p>
                Pour exercer vos droits, écrivez à :
              </p>

              <a
                href="mailto:contact@piloeco.com"
                className="font-semibold text-green-400 hover:text-green-300"
              >
                contact@piloeco.com
              </a>

              <p>
                Une vérification d’identité pourra être demandée uniquement si
                elle est nécessaire pour sécuriser votre demande.
              </p>

              <p>
                Vous pouvez également consulter la{" "}
                <a
                  href="/confidentialite"
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  Politique de confidentialité
                </a>
                .
              </p>
            </>
          ),
        },
        {
          title: "9. Supprimer mon compte",
          content: (
            <>
              <p>
                La suppression des données PiloEco peut être demandée depuis les
                paramètres du compte lorsque cette fonctionnalité est
                disponible.
              </p>

              <p>
                Vous pouvez également adresser une demande au support en
                utilisant l’adresse e-mail associée à votre compte.
              </p>

              <p>
                La suppression entraîne notamment la perte de l’accès aux
                contrats enregistrés, aux projets PiloLife, à la progression,
                aux missions et aux autres informations liées au compte.
              </p>

              <p>
                Certaines données peuvent toutefois être conservées pendant la
                durée nécessaire au respect d’une obligation légale, à la
                gestion d’une réclamation ou à la défense des droits de PiloEco.
              </p>
            </>
          ),
        },
        {
          title: "10. Réclamation concernant un paiement",
          content: (
            <>
              <p>
                Pour toute question concernant une facturation, un prélèvement,
                un renouvellement ou un remboursement, contactez le support en
                précisant :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>l’adresse e-mail associée au compte ;</li>
                <li>la date du paiement ;</li>
                <li>le montant concerné ;</li>
                <li>
                  l’identifiant Stripe ou de facture lorsqu’il est disponible ;
                </li>
                <li>la nature exacte de la demande.</li>
              </ul>

              <p>
                Après une réclamation écrite préalable restée sans solution
                satisfaisante, un consommateur pourra recourir au médiateur de
                la consommation indiqué dans les{" "}
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
          title: "11. Proposer une amélioration",
          content: (
            <>
              <p>
                Les suggestions concernant les analyses, les missions, le
                Monitoring, PiloLife, l’assistant, le Premium ou l’interface
                sont les bienvenues.
              </p>

              <p>
                Vous pouvez décrire l’amélioration souhaitée, son utilité et la
                manière dont vous aimeriez l’utiliser.
              </p>

              <p>
                L’envoi d’une suggestion ne garantit pas son intégration, mais
                chaque retour peut aider à faire évoluer PiloEco.
              </p>
            </>
          ),
        },
        {
          title: "12. Liens utiles",
          content: (
            <ul className="list-disc space-y-3 pl-5">
              <li>
                <a
                  href="/cgu"
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  Conditions générales d’utilisation
                </a>
              </li>

              <li>
                <a
                  href="/cgv"
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  Conditions générales de vente
                </a>
              </li>

              <li>
                <a
                  href="/confidentialite"
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  Politique de confidentialité
                </a>
              </li>

              <li>
                <a
                  href="/cookies"
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  Politique de cookies
                </a>
              </li>

              <li>
                <a
                  href="/mentions-legales"
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  Mentions légales
                </a>
              </li>
            </ul>
          ),
        },
        {
          title: "13. Mise à jour",
          content: (
            <p>
              Dernière mise à jour :{" "}
              <strong className="text-white">31 juillet 2026</strong>.
            </p>
          ),
        },
      ]}
    />
  );
}