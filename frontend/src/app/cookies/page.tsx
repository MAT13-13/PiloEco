import LegalPage from "../components/LegalPage";

export const metadata = {
  title: "Politique de cookies | PiloEco",
  description:
    "Informations sur l'utilisation des cookies et autres traceurs par PiloEco.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="🍪 Cookies"
      title="Politique de cookies"
      description="Cette page explique comment PiloEco utilise les cookies et technologies similaires afin d'assurer le bon fonctionnement de la plateforme."
      sections={[
        {
          title: "1. Qu'est-ce qu'un cookie ?",
          content: (
            <>
              <p>
                Un cookie est un petit fichier enregistré sur votre appareil
                lorsque vous consultez un site ou une application.
              </p>

              <p>
                Les cookies permettent notamment de mémoriser certaines
                informations afin d'améliorer votre expérience utilisateur.
              </p>
            </>
          ),
        },
        {
          title: "2. Les cookies utilisés par PiloEco",
          content: (
            <>
              <p>
                PiloEco utilise principalement des cookies nécessaires au
                fonctionnement du service.
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>connexion et authentification ;</li>
                <li>maintien de la session utilisateur ;</li>
                <li>sécurité du compte ;</li>
                <li>préférences de navigation ;</li>
                <li>fonctionnement général de l'application.</li>
              </ul>
            </>
          ),
        },
        {
          title: "3. Cookies de mesure d'audience",
          content: (
            <>
              <p>
                À ce jour, PiloEco n'utilise pas de cookies publicitaires.
              </p>

              <p>
                Si des outils de mesure d'audience ou d'analyse sont ajoutés,
                votre consentement sera recueilli lorsque la réglementation
                l'exige.
              </p>
            </>
          ),
        },
        {
          title: "4. Gestion des cookies",
          content: (
            <>
              <p>
                Vous pouvez configurer votre navigateur afin d'accepter,
                refuser ou supprimer les cookies déjà enregistrés.
              </p>

              <p>
                Le refus de certains cookies techniques peut toutefois empêcher
                le bon fonctionnement de certaines fonctionnalités de PiloEco.
              </p>
            </>
          ),
        },
        {
          title: "5. Durée de conservation",
          content: (
            <>
              <p>
                Les cookies sont conservés pendant une durée limitée,
                conformément à leur finalité et à la réglementation applicable.
              </p>
            </>
          ),
        },
        {
          title: "6. Contact",
          content: (
            <>
              <p>
                Pour toute question concernant cette politique de cookies :
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
      ]}
    />
  );
}