import LegalPage from "../components/LegalPage";

export const metadata = {
  title: "Programme de parrainage | PiloEco",
  description:
    "Découvrez prochainement le programme de parrainage PiloEco.",
};

export default function ParrainagePage() {
  return (
    <LegalPage
      eyebrow="🎁 Programme PiloEco"
      title="Le parrainage arrive bientôt"
      description="Invitez vos proches à découvrir PiloEco et bénéficiez prochainement d’avantages exclusifs."
      sections={[
        {
          title: "🤝 Principe du programme",
          content: (
            <>
              <p>
                Le programme de parrainage PiloEco est actuellement en cours de
                préparation.
              </p>

              <p>Lorsqu’il sera disponible, son fonctionnement pourra être :</p>

              <ol className="list-decimal space-y-2 pl-5">
                <li>vous obtenez un lien ou un code personnel ;</li>
                <li>vous invitez un proche à rejoindre PiloEco ;</li>
                <li>votre proche crée un compte avec votre invitation ;</li>
                <li>
                  une récompense est attribuée lorsque les conditions sont
                  remplies.
                </li>
              </ol>
            </>
          ),
        },
        {
          title: "🎉 Récompenses envisagées",
          content: (
            <>
              <p>Les avantages pourront prendre la forme de :</p>

              <ul className="list-disc space-y-2 pl-5">
                <li>jours ou mois de Premium offerts ;</li>
                <li>réduction sur l’abonnement ;</li>
                <li>fonctionnalités ou badges exclusifs ;</li>
                <li>avantages ponctuels proposés par PiloEco.</li>
              </ul>

              <p>
                Ces exemples ne constituent pas encore un engagement
                contractuel. Les récompenses définitives seront affichées avant
                l’activation du programme.
              </p>
            </>
          ),
        },
        {
          title: "📜 Conditions futures",
          content: (
            <>
              <p>
                Des règles détaillées seront publiées lors du lancement du
                programme. Elles préciseront notamment :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>les personnes pouvant participer ;</li>
                <li>les conditions nécessaires pour valider un parrainage ;</li>
                <li>la nature et la durée des récompenses ;</li>
                <li>les limites éventuelles par utilisateur ;</li>
                <li>les conditions de suspension ou de fin du programme.</li>
              </ul>
            </>
          ),
        },
        {
          title: "🛡️ Prévention des abus",
          content: (
            <>
              <p>
                Les faux comptes, l’auto-parrainage non autorisé, l’utilisation
                d’identités fictives et toute manipulation du système seront
                interdits.
              </p>

              <p>
                PiloEco pourra annuler une récompense obtenue de manière
                frauduleuse après vérification de la situation.
              </p>
            </>
          ),
        },
        {
          title: "🚀 Disponibilité",
          content: (
            <>
              <p>
                Aucun lien ni code de parrainage n’est encore actif. Une
                annonce sera affichée dans PiloEco lorsque la fonctionnalité
                sera prête.
              </p>

              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5 text-center">
                <p className="text-lg font-black text-green-400">
                  Fonctionnalité bientôt disponible
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Merci de contribuer au développement de PiloEco.
                </p>
              </div>
            </>
          ),
        },
      ]}
    />
  );
}