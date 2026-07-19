import LegalPage from "../components/LegalPage";

export const metadata = {
  title: "Aide et support | PiloEco",
  description:
    "Obtenez de l’aide pour utiliser PiloEco ou signaler un problème.",
};

export default function SupportPage() {
  return (
    <LegalPage
      eyebrow="💬 Centre d’aide"
      title="Comment pouvons-nous vous aider ?"
      description="Retrouvez les réponses aux questions courantes et les informations pour contacter le support PiloEco."
      sections={[
        {
          title: "📧 Contacter le support",
          content: (
            <>
              <p>
                Pour toute question, demande d’assistance ou difficulté
                rencontrée dans PiloEco, écrivez à :
              </p>

              <a
                href="mailto:contact@piloeco.com"
                className="inline-flex rounded-xl bg-green-500 px-5 py-3 font-black text-slate-950 transition hover:bg-green-400"
              >
                contact@piloeco.com
              </a>

              <p className="text-slate-400">
                L’adresse devra être créée et testée avant l’ouverture publique
                de PiloEco.
              </p>
            </>
          ),
        },
        {
          title: "🔑 Je ne parviens plus à me connecter",
          content: (
            <>
              <p>
                Vérifiez d’abord que l’adresse e-mail utilisée correspond à
                celle de votre compte et que votre mot de passe est correctement
                saisi.
              </p>

              <p>
                Utilisez ensuite la fonction « Mot de passe oublié ». Si aucun
                e-mail n’arrive, vérifiez vos courriers indésirables avant de
                contacter le support.
              </p>
            </>
          ),
        },
        {
          title: "⭐ Mon abonnement Premium n’est pas activé",
          content: (
            <>
              <p>
                Après un paiement, quelques instants peuvent être nécessaires
                pour actualiser le statut Premium.
              </p>

              <p>
                Rechargez la page et vérifiez que vous utilisez le compte ayant
                servi au paiement. Si le problème persiste, contactez le support
                sans transmettre vos coordonnées bancaires complètes.
              </p>
            </>
          ),
        },
        {
          title: "💰 Une estimation semble incorrecte",
          content: (
            <>
              <p>
                Les résultats dépendent des montants et informations renseignés.
                Vérifiez le prix mensuel, le fournisseur, la catégorie et les
                caractéristiques du contrat concerné.
              </p>

              <p>
                Les recommandations restent indicatives et doivent être
                vérifiées auprès du fournisseur avant toute décision.
              </p>
            </>
          ),
        },
        {
          title: "🐞 Signaler un bug",
          content: (
            <>
              <p>Pour accélérer le diagnostic, indiquez :</p>

              <ul className="list-disc space-y-2 pl-5">
                <li>la page concernée ;</li>
                <li>ce que vous tentiez de faire ;</li>
                <li>le résultat obtenu ou le message d’erreur ;</li>
                <li>votre navigateur et votre appareil ;</li>
                <li>une capture d’écran lorsque cela est possible.</li>
              </ul>

              <p>
                Ne joignez jamais de mot de passe, numéro complet de carte
                bancaire ou document d’identité dans votre signalement.
              </p>
            </>
          ),
        },
        {
          title: "🔒 Signaler un problème de sécurité",
          content: (
            <>
              <p>
                Toute vulnérabilité ou activité suspecte doit être signalée
                rapidement à{" "}
                <a
                  href="mailto:contact@piloeco.com"
                  className="font-semibold text-green-400 hover:text-green-300"
                >
                  contact@piloeco.com
                </a>
                .
              </p>

              <p>
                Décrivez le problème sans exploiter la faille au-delà de ce qui
                est nécessaire pour la démontrer et sans accéder aux données
                d’autres utilisateurs.
              </p>
            </>
          ),
        },
        {
          title: "🗑️ Données et suppression du compte",
          content: (
            <>
              <p>
                Les demandes d’accès, de rectification, d’export ou de
                suppression des données peuvent être adressées au support.
              </p>

              <p>
                Une fonction directement intégrée aux paramètres du compte
                pourra également permettre d’effectuer ces opérations.
              </p>
            </>
          ),
        },
        {
          title: "💡 Proposer une amélioration",
          content: (
            <p>
              Les suggestions concernant les analyses, les missions, le
              Monitoring, PiloLife ou l’assistant sont les bienvenues. Chaque
              retour aide à améliorer PiloEco.
            </p>
          ),
        },
      ]}
    />
  );
}