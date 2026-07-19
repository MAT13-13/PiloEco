import LegalPage from "../components/LegalPage";

export const metadata = {
  title: "Politique de confidentialité | PiloEco",
  description:
    "Découvrez comment PiloEco collecte, utilise et protège vos données personnelles.",
};

export default function ConfidentialitePage() {
  return (
    <LegalPage
      eyebrow="🔒 Protection des données"
      title="Politique de confidentialité"
      description="Cette politique explique quelles données PiloEco peut traiter, pourquoi elles sont utilisées et comment exercer vos droits."
      sections={[
        {
          title: "1. Responsable du traitement",
          content: (
            <>
              <p>
                Le responsable du traitement est l’éditeur du service PiloEco.
              </p>

              <p>
                <strong className="text-white">Nom commercial :</strong>{" "}
                PiloEco
                <br />
                <strong className="text-white">Localisation :</strong>{" "}
                Tourrette-Levens, France
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
                Les informations juridiques définitives seront ajoutées après
                l’immatriculation de l’entreprise.
              </p>
            </>
          ),
        },
        {
          title: "2. Données susceptibles d’être collectées",
          content: (
            <>
              <p>PiloEco peut traiter les catégories de données suivantes :</p>

              <ul className="list-disc space-y-2 pl-5">
                <li>
                  données de compte : adresse e-mail, identifiant utilisateur,
                  nom ou pseudonyme ;
                </li>
                <li>
                  données de profil : préférences, statut Premium, progression
                  et paramètres ;
                </li>
                <li>
                  informations saisies dans les analyses : montants, contrats,
                  fournisseurs, abonnements et dépenses ;
                </li>
                <li>
                  données PiloLife : projets, objectifs, montants et économies
                  enregistrées ;
                </li>
                <li>
                  données de monitoring : catégories surveillées, prix, offres,
                  échéances et alertes ;
                </li>
                <li>
                  échanges avec l’assistant et demandes envoyées au support ;
                </li>
                <li>
                  données techniques nécessaires à la sécurité et au
                  fonctionnement du service.
                </li>
              </ul>

              <p>
                PiloEco ne demande pas à l’utilisateur de communiquer ses
                identifiants bancaires ou les numéros complets de ses cartes de
                paiement.
              </p>
            </>
          ),
        },
        {
          title: "3. Finalités et bases légales",
          content: (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-white">
                      <th className="px-3 py-3">Traitement</th>
                      <th className="px-3 py-3">Finalité</th>
                      <th className="px-3 py-3">Base légale envisagée</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/10">
                    <tr>
                      <td className="px-3 py-3">Compte utilisateur</td>
                      <td className="px-3 py-3">
                        Créer et sécuriser le compte
                      </td>
                      <td className="px-3 py-3">Exécution du contrat</td>
                    </tr>

                    <tr>
                      <td className="px-3 py-3">Analyses et recommandations</td>
                      <td className="px-3 py-3">
                        Fournir les fonctionnalités demandées
                      </td>
                      <td className="px-3 py-3">Exécution du contrat</td>
                    </tr>

                    <tr>
                      <td className="px-3 py-3">Paiement Premium</td>
                      <td className="px-3 py-3">
                        Gérer l’abonnement et la facturation
                      </td>
                      <td className="px-3 py-3">
                        Exécution du contrat et obligations légales
                      </td>
                    </tr>

                    <tr>
                      <td className="px-3 py-3">Sécurité et journaux</td>
                      <td className="px-3 py-3">
                        Prévenir les abus et incidents
                      </td>
                      <td className="px-3 py-3">Intérêt légitime</td>
                    </tr>

                    <tr>
                      <td className="px-3 py-3">E-mails marketing</td>
                      <td className="px-3 py-3">
                        Présenter des nouveautés ou offres
                      </td>
                      <td className="px-3 py-3">
                        Consentement lorsque celui-ci est requis
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          ),
        },
        {
          title: "4. Intelligence artificielle",
          content: (
            <>
              <p>
                Certaines fonctionnalités de PiloEco utilisent les services
                d’OpenAI afin de produire des réponses ou recommandations.
              </p>

              <p>
                Seules les informations nécessaires à la génération demandée
                doivent être transmises. L’utilisateur ne doit pas saisir dans
                l’assistant de données particulièrement sensibles ou inutiles,
                telles que des mots de passe, numéros complets de carte
                bancaire, documents d’identité ou données médicales.
              </p>

              <p>
                Les réponses générées automatiquement peuvent contenir des
                erreurs et doivent être vérifiées avant toute décision.
              </p>
            </>
          ),
        },
        {
          title: "5. Paiements",
          content: (
            <>
              <p>
                Les paiements de l’abonnement Premium sont traités par Stripe.
              </p>

              <p>
                PiloEco ne reçoit pas et ne conserve pas les numéros complets de
                carte bancaire. Stripe peut toutefois transmettre à PiloEco les
                informations nécessaires à la gestion de l’abonnement, telles
                que l’état du paiement, l’identifiant client ou la formule
                souscrite.
              </p>
            </>
          ),
        },
        {
          title: "6. Destinataires et prestataires",
          content: (
            <>
              <p>
                Les données sont accessibles uniquement aux personnes et
                prestataires qui en ont besoin pour fournir le service.
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>Supabase : authentification et base de données ;</li>
                <li>Vercel : hébergement et déploiement ;</li>
                <li>Stripe : paiement et gestion des abonnements ;</li>
                <li>OpenAI : fonctionnalités d’intelligence artificielle ;</li>
                <li>Resend : envoi d’e-mails transactionnels ;</li>
                <li>
                  prestataires techniques ou conseils soumis à une obligation
                  de confidentialité.
                </li>
              </ul>

              <p>
                Certains prestataires peuvent traiter des données en dehors de
                l’Espace économique européen. Dans ce cas, PiloEco veille à ce
                que le transfert repose sur un mécanisme juridique approprié.
              </p>
            </>
          ),
        },
        {
          title: "7. Durées de conservation",
          content: (
            <>
              <p>
                Les durées exactes devront être fixées dans le registre de
                traitement de PiloEco. Les principes suivants sont envisagés :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>
                  compte et données fonctionnelles : pendant la durée
                  d’utilisation du compte ;
                </li>
                <li>
                  données supprimées : effacement ou anonymisation après la
                  fermeture du compte, sauf obligation légale contraire ;
                </li>
                <li>
                  données de facturation : conservation pendant la durée
                  imposée par la réglementation ;
                </li>
                <li>
                  journaux de sécurité : durée limitée et proportionnée à la
                  prévention des incidents ;
                </li>
                <li>
                  demandes au support : durée nécessaire au traitement et au
                  suivi de la demande.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "8. Cookies et traceurs",
          content: (
            <>
              <p>
                PiloEco peut utiliser des cookies strictement nécessaires à
                l’authentification, à la sécurité et au fonctionnement du
                service.
              </p>

              <p>
                Tout traceur publicitaire ou outil de mesure d’audience soumis
                au consentement ne devra être activé qu’après l’accord de
                l’utilisateur. Le refus devra être aussi accessible que
                l’acceptation.
              </p>

              <p>
                Une interface de gestion des préférences sera ajoutée si
                PiloEco utilise des traceurs non essentiels.
              </p>
            </>
          ),
        },
        {
          title: "9. Vos droits",
          content: (
            <>
              <p>
                Selon la situation, vous pouvez exercer vos droits d’accès, de
                rectification, d’effacement, d’opposition, de limitation et de
                portabilité.
              </p>

              <p>
                Vous pouvez envoyer votre demande à{" "}
                <a
                  href="mailto:contact@piloeco.com"
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  contact@piloeco.com
                </a>
                . Une vérification d’identité pourra être demandée uniquement
                lorsqu’elle est nécessaire pour sécuriser la demande.
              </p>

              <p>
                Vous disposez également du droit d’introduire une réclamation
                auprès de la CNIL.
              </p>
            </>
          ),
        },
        {
          title: "10. Sécurité",
          content: (
            <>
              <p>
                PiloEco met en œuvre des mesures techniques et
                organisationnelles destinées à limiter les accès non autorisés,
                les pertes, les altérations et les divulgations de données.
              </p>

              <p>
                Aucun service numérique ne peut toutefois garantir une sécurité
                absolue. L’utilisateur doit protéger son mot de passe et
                signaler rapidement toute activité suspecte.
              </p>
            </>
          ),
        },
        {
          title: "11. Mise à jour de cette politique",
          content: (
            <p>
              Cette politique pourra être mise à jour pour tenir compte des
              évolutions du service ou de la réglementation. En cas de
              modification importante, une information pourra être présentée
              directement dans PiloEco ou envoyée par e-mail.
            </p>
          ),
        },
      ]}
    />
  );
}