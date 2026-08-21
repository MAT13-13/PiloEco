export default function SuppressionComptePage() {
  return (
    <main
      style={{
        maxWidth: "850px",
        margin: "0 auto",
        padding: "48px 24px",
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.6,
        color: "#1f2937",
      }}
    >
      <h1
        style={{
          fontSize: "34px",
          marginBottom: "24px",
          color: "#047857",
        }}
      >
        Suppression de votre compte PiloEco
      </h1>

      <p>
        Vous pouvez demander à tout moment la suppression de votre compte
        PiloEco ainsi que des données personnelles qui y sont associées.
      </p>

      <h2 style={{ marginTop: "32px", fontSize: "22px" }}>
        Comment demander la suppression de votre compte ?
      </h2>

      <p>
        Envoyez un e-mail à{" "}
        <a href="mailto:support@piloeco.com">support@piloeco.com</a> depuis
        l’adresse e-mail associée à votre compte PiloEco.
      </p>

      <p>
        Indiquez dans l’objet de votre message :
        <strong> Suppression de compte PiloEco</strong>.
      </p>

      <h2 style={{ marginTop: "32px", fontSize: "22px" }}>
        Données concernées
      </h2>

      <p>
        Après vérification de votre demande, PiloEco procédera à la suppression
        des données personnelles et des informations associées à votre compte,
        dans la mesure où leur conservation n’est pas nécessaire au respect
        d’une obligation légale ou réglementaire.
      </p>

      <h2 style={{ marginTop: "32px", fontSize: "22px" }}>
        Délai de traitement
      </h2>

      <p>
        Votre demande sera traitée dans les meilleurs délais. Certaines données
        pourront être conservées pendant la durée strictement nécessaire au
        respect de nos obligations légales, comptables ou de sécurité.
      </p>

      <h2 style={{ marginTop: "32px", fontSize: "22px" }}>
        Contact
      </h2>

      <p>
        Pour toute question concernant la suppression de votre compte ou de vos
        données :
      </p>

      <p>
        <a href="mailto:support@piloeco.com">support@piloeco.com</a>
      </p>
    </main>
  );
}