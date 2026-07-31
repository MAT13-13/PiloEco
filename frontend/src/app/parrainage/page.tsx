import LegalPage from "../components/LegalPage";

export const metadata = {
  title: "Programme de parrainage | PiloEco",
  description:
    "Découvrez le futur programme de parrainage PiloEco et son fonctionnement.",
};

export default function ParrainagePage() {
  return (
    <LegalPage
      eyebrow="🎁 Programme PiloEco"
      title="Programme de parrainage"
      description="Le programme de parrainage est actuellement en préparation. Cette page présente son principe général. Les conditions définitives seront publiées avant son lancement."
      sections={[
        {
          title: "1. Objectif du programme",
          content: (
            <>
              <p>
                Le programme de parrainage a pour objectif de permettre aux
                utilisateurs de faire découvrir PiloEco à leurs proches tout en
                bénéficiant, lorsque les conditions seront réunies, de certains
                avantages proposés par PiloEco.
              </p>

              <p>
                À la date de la dernière mise à jour de cette page, aucun
                programme de parrainage n'est encore actif.
              </p>
            </>
          ),
        },
        {
          title: "2. Fonctionnement envisagé",
          content: (
            <>
              <p>
                Lors de son lancement, le programme pourra notamment fonctionner
                selon le principe suivant :
              </p>

              <ol className="list-decimal space-y-2 pl-5">
                <li>obtention d'un lien ou d'un code personnel ;</li>
                <li>invitation d'un proche ;</li>
                <li>création d'un compte via cette invitation ;</li>
                <li>validation automatique lorsque toutes les conditions seront remplies ;</li>
                <li>attribution éventuelle d'une récompense.</li>
              </ol>

              <p>
                Les modalités définitives pourront évoluer avant la mise en
                service officielle.
              </p>
            </>
          ),
        },
        {
          title: "3. Récompenses possibles",
          content: (
            <>
              <p>
                Les récompenses pourront notamment prendre la forme de :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>jours ou mois de Premium offerts ;</li>
                <li>réductions sur l'abonnement ;</li>
                <li>badges exclusifs ;</li>
                <li>fonctionnalités supplémentaires ;</li>
                <li>avantages ponctuels proposés par PiloEco.</li>
              </ul>

              <p>
                Ces exemples sont donnés uniquement à titre indicatif et ne
                constituent pas un engagement contractuel.
              </p>
            </>
          ),
        },
        {
          title: "4. Conditions de participation",
          content: (
            <>
              <p>
                Les conditions détaillées seront publiées avant le lancement du
                programme.
              </p>

              <p>
                Elles pourront notamment préciser :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>les utilisateurs pouvant participer ;</li>
                <li>les conditions de validation d'un parrainage ;</li>
                <li>les éventuelles limites par utilisateur ;</li>
                <li>la durée de validité des récompenses ;</li>
                <li>les cas d'annulation d'un parrainage.</li>
              </ul>
            </>
          ),
        },
        {
          title: "5. Prévention des fraudes",
          content: (
            <>
              <p>
                Toute tentative de fraude pourra entraîner l'annulation des
                récompenses obtenues.
              </p>

              <p>
                Sont notamment susceptibles d'être refusés :
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>les faux comptes ;</li>
                <li>les comptes créés uniquement pour obtenir une récompense ;</li>
                <li>les identités fictives ;</li>
                <li>les créations multiples d'un même utilisateur ;</li>
                <li>toute manipulation du système de parrainage.</li>
              </ul>

              <p>
                PiloEco pourra suspendre ou supprimer une récompense obtenue de
                manière frauduleuse après vérification.
              </p>
            </>
          ),
        },
        {
          title: "6. Modification ou arrêt du programme",
          content: (
            <>
              <p>
                PiloEco pourra modifier, suspendre ou mettre fin au programme de
                parrainage à tout moment, notamment en cas d'évolution
                technique, économique ou réglementaire.
              </p>

              <p>
                Les modifications n'auront pas d'effet rétroactif sur les
                récompenses définitivement acquises, sauf en cas de fraude ou
                d'erreur manifeste.
              </p>
            </>
          ),
        },
        {
          title: "7. Disponibilité",
          content: (
            <>
              <p>
                Aucun lien de parrainage, code d'invitation ou récompense n'est
                actuellement disponible.
              </p>

              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5 text-center">
                <p className="text-lg font-black text-green-400">
                  🚀 Le programme arrivera prochainement
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Une annonce sera publiée directement dans PiloEco dès son
                  lancement.
                </p>
              </div>
            </>
          ),
        },
        {
          title: "8. Mise à jour",
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