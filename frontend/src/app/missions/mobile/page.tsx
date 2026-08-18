"use client";

import MissionLayout from "../../components/MissionLayout";

/* =========================
   AUCHAN TÉLÉCOM
========================= */

const AUCHAN_200_INTL =
  "https://action.metaffiliation.com/trk.php?mclic=P51234F58C0F5191&redir=https%3A%2F%2Fespace-client.auchantelecom.fr%2Fpanier%3Fcommande%3DU3PKqtq%252F%252BbaAUzZN5Gn0kYkkXJE4SypBa0GsSpklfq9esfR5qY1qtV1xEbVoj0srG45Bl24kIKEHOtajKIe65g%253D%253D";

const AUCHAN_200 =
  "https://action.metaffiliation.com/trk.php?mclic=P51234F58C0F5191&redir=https%3A%2F%2Fespace-client.auchantelecom.fr%2Fpanier%3Fcommande%3DTpxqkxGcMm%252BOeuBgz77zp2czoS9Pq5fVVUk9ZY2LktIH9%252BqdFm%252FmunWg6LqOsKr52YQGd5JJavXEgHnp70pUPg%253D%253D";

const AUCHAN_100 =
  "https://action.metaffiliation.com/trk.php?mclic=P51234F58C0F5191&redir=https%3A%2F%2Fespace-client.auchantelecom.fr%2Fpanier%3Fcommande%3Day897OqWufpOu%252Flrk6xw1yDk%252BgGsv0F6xO6or2wtFcQkeiTxJNcjbCphLBte8Us34NQajPpzeNKpxb47fAVSgA%253D%253D";

const AUCHAN_10 =
  "https://action.metaffiliation.com/trk.php?mclic=P51234F58C0F5191&redir=https%3A%2F%2Fespace-client.auchantelecom.fr%2Fpanier%3Fcommande%3DdOGhtAHoAWMHHTEYpSYU9rBT7PvJnpAp9E%252Fu1JYN4oq%252Bg6chj96dt%252F2Y%252FMjH6Ej%252FZWN4gyH9dOIdGwkkyau4lQ%253D%253D";

const AUCHAN_1 =
  "https://action.metaffiliation.com/trk.php?mclic=P51234F58C0F5191&redir=https%3A%2F%2Fespace-client.auchantelecom.fr%2Fpanier%3Fcommande%3DbTuOVPicbffUHIqTMHWV4wUrukuwo1X4TFhMHZz5cGU%252BPxrAWEt8FVChsVfAK07wWsqOVcm3MQiwOcNKK69i%252FQ%253D%253D";

const AUCHAN_MOBILES =
  "https://action.metaffiliation.com/trk.php?mclic=P51234F58C0F5191&redir=https%3A%2F%2Fwww.auchantelecom.fr%2Fmobiles";

const AUCHAN_PARRAINAGE =
  "https://action.metaffiliation.com/trk.php?mclic=P51234F58C0F5191&redir=https%3A%2F%2Fwww.auchantelecom.fr%2Fservice%2Fprogramme-de-parrainage%3Futm_medium%3Dpartners%26utm_source%3Daklamio%26utm_campaign%3Dparrainage%26source%3Dmenu";

/* =========================
   LYCA MOBILE
========================= */

const LYCA_ESIM =
  "https://mkq.lycamobile.fr/?P513AB758C0F52111&redir=https%3A%2F%2Fwww.lycamobile.fr%2Ffr%2Fesim%2F";

const LYCA_INTERNATIONAL =
  "https://mkq.lycamobile.fr/?P513AB758C0F52111&redir=https%3A%2F%2Fwww.lycamobile.fr%2Ffr%2Fbundles%2Fforfait-prepaye%2F%23international";

const LYCA_PREPAYE =
  "https://mkq.lycamobile.fr/?P513AB758C0F52111&redir=https%3A%2F%2Fwww.lycamobile.fr%2Ffr%2Fbundles%2Fforfait-prepaye%2F%23forfaits";

const LYCA_1_MOIS =
  "https://mkq.lycamobile.fr/?P513AB758C0F52111&redir=https%3A%2F%2Fwww.lycamobile.fr%2Fabo%2Ffr%2Fbundles%2Fsim-only-deals%2F%231-mois";

const LYCA_24_MOIS =
  "https://mkq.lycamobile.fr/?P513AB758C0F52111&redir=https%3A%2F%2Fwww.lycamobile.fr%2Fabo%2Ffr%2Fbundles%2Fsim-only-deals%2F%2324-mois";

/* =========================
   LEBARA
========================= */

const LEBARA_FORFAITS =
  "https://track.effiliation.com/servlet/effi.redir?id_compteur=23304600&url=https%3A%2F%2Fwww.lebara.fr%2F";

export default function MobileMissionPage() {
  return (
    <MissionLayout
      icon="📱"
      title="Trouver ton forfait mobile"
      subtitle="Choisis ton opérateur puis l’offre qui correspond à ton besoin."
      basePrice={0}
      recommendedPrice={0}
      recommendedName="Offre mobile adaptée"
      advice="Pilo t’oriente vers une solution mobile adaptée à ton besoin."
      fields={[
        {
          name: "operator",
          label: "Quel opérateur souhaites-tu consulter ?",
          type: "select",
          defaultValue: "Auchan Télécom",
          options: [
            "Auchan Télécom",
            "Lyca Mobile",
            "Lebara",
          ],
        },
        {
          name: "auchanOffer",
          label: "Quel forfait Auchan Télécom souhaites-tu consulter ?",
          type: "select",
          defaultValue:
            "Auchan Télécom – 200 Go 5G à 12,99 €",
          showWhen: {
            field: "operator",
            equals: "Auchan Télécom",
          },
          options: [
            "Auchan Télécom – 200 Go 5G à 12,99 €",
            "Auchan Télécom – 100 Go 5G à 9,99 €",
            "Auchan Télécom – 200 Go 5G international à 15,99 €",
            "Auchan Télécom – 10 Go 4G à 7,99 €",
            "Auchan Télécom – 1 Go 4G à 1,99 €",
            "Auchan Télécom – Acheter un mobile",
            "Auchan Télécom – Programme de parrainage",
          ],
        },
        {
          name: "lycaOffer",
          label: "Quelle offre Lyca Mobile souhaites-tu consulter ?",
          type: "select",
          defaultValue: "Lyca Mobile – eSIM",
          showWhen: {
            field: "operator",
            equals: "Lyca Mobile",
          },
          options: [
            "Lyca Mobile – eSIM",
            "Lyca Mobile – Forfait international",
            "Lyca Mobile – Forfait prépayé",
            "Lyca Mobile – Forfait SIM 1 mois",
            "Lyca Mobile – Forfait SIM 24 mois",
          ],
        },
      ]}
      dynamicOfferResolver={(values) => {
        const operator = String(
          values.operator ?? ""
        );

        if (operator === "Auchan Télécom") {
          return String(
            values.auchanOffer ?? ""
          );
        }

        if (operator === "Lyca Mobile") {
          return String(
            values.lycaOffer ?? ""
          );
        }

        if (operator === "Lebara") {
          return "Lebara – Voir les forfaits";
        }

        return "";
      }}
      dynamicOffers={{
        "Auchan Télécom – 200 Go 5G à 12,99 €": {
          href: AUCHAN_200,
          buttonLabel:
            "Choisir le forfait 200 Go →",
          recommendedName:
            "Auchan Télécom – 200 Go 5G",
          advice:
            "200 Go en 5G en France métropolitaine, dont 25 Go utilisables depuis l’Europe et les DOM. Appels et SMS/MMS illimités.",
          external: true,
        },

        "Auchan Télécom – 100 Go 5G à 9,99 €": {
          href: AUCHAN_100,
          buttonLabel:
            "Choisir le forfait 100 Go →",
          recommendedName:
            "Auchan Télécom – 100 Go 5G",
          advice:
            "100 Go en 5G en France métropolitaine, dont 22 Go utilisables depuis l’Europe et les DOM. Appels et SMS/MMS illimités.",
          external: true,
        },

        "Auchan Télécom – 200 Go 5G international à 15,99 €": {
          href: AUCHAN_200_INTL,
          buttonLabel:
            "Choisir le forfait international →",
          recommendedName:
            "Auchan Télécom – 200 Go 5G international",
          advice:
            "200 Go en 5G en France métropolitaine avec 35 Go utilisables depuis plus de 160 destinations. Appels et SMS/MMS illimités.",
          external: true,
        },

        "Auchan Télécom – 10 Go 4G à 7,99 €": {
          href: AUCHAN_10,
          buttonLabel:
            "Choisir le forfait 10 Go →",
          recommendedName:
            "Auchan Télécom – 10 Go 4G",
          advice:
            "10 Go en 4G en France métropolitaine et 10 Go depuis l’Europe et les DOM. Appels et SMS/MMS illimités.",
          external: true,
        },

        "Auchan Télécom – 1 Go 4G à 1,99 €": {
          href: AUCHAN_1,
          buttonLabel:
            "Choisir le forfait 1 Go →",
          recommendedName:
            "Auchan Télécom – 1 Go 4G",
          advice:
            "Une offre adaptée aux petits usages avec 1 Go en France métropolitaine et depuis l’Europe et les DOM.",
          external: true,
        },

        "Auchan Télécom – Acheter un mobile": {
          href: AUCHAN_MOBILES,
          buttonLabel:
            "Voir les mobiles Auchan Télécom →",
          recommendedName:
            "Auchan Télécom – Mobiles",
          advice:
            "Découvre les téléphones proposés par Auchan Télécom et consulte les modèles actuellement disponibles.",
          external: true,
        },

        "Auchan Télécom – Programme de parrainage": {
          href: AUCHAN_PARRAINAGE,
          buttonLabel:
            "Découvrir le programme de parrainage →",
          recommendedName:
            "Auchan Télécom – Parrainage",
          advice:
            "Découvre le programme de parrainage Auchan Télécom et consulte directement les conditions et avantages proposés.",
          external: true,
        },

        "Lyca Mobile – eSIM": {
          href: LYCA_ESIM,
          buttonLabel:
            "Découvrir l’eSIM Lyca Mobile →",
          recommendedName:
            "Lyca Mobile – eSIM",
          advice:
            "Découvre l’eSIM Lyca Mobile et vérifie sa compatibilité avec ton téléphone.",
          external: true,
        },

        "Lyca Mobile – Forfait international": {
          href: LYCA_INTERNATIONAL,
          buttonLabel:
            "Voir les forfaits internationaux →",
          recommendedName:
            "Lyca Mobile – International",
          advice:
            "Découvre les forfaits Lyca Mobile adaptés aux appels et aux usages internationaux.",
          external: true,
        },

        "Lyca Mobile – Forfait prépayé": {
          href: LYCA_PREPAYE,
          buttonLabel:
            "Voir les forfaits prépayés →",
          recommendedName:
            "Lyca Mobile – Forfaits prépayés",
          advice:
            "Découvre les offres prépayées Lyca Mobile sans abonnement mobile classique.",
          external: true,
        },

        "Lyca Mobile – Forfait SIM 1 mois": {
          href: LYCA_1_MOIS,
          buttonLabel:
            "Découvrir les forfaits 1 mois →",
          recommendedName:
            "Lyca Mobile – Forfaits SIM 1 mois",
          advice:
            "Découvre les forfaits SIM Lyca Mobile proposés sur une durée d’un mois.",
          external: true,
        },

        "Lyca Mobile – Forfait SIM 24 mois": {
          href: LYCA_24_MOIS,
          buttonLabel:
            "Découvrir les forfaits 24 mois →",
          recommendedName:
            "Lyca Mobile – Forfaits SIM 24 mois",
          advice:
            "Découvre les forfaits SIM Lyca Mobile proposés sur une durée de 24 mois.",
          external: true,
        },

        "Lebara – Voir les forfaits": {
          href: LEBARA_FORFAITS,
          buttonLabel:
            "Découvrir les forfaits Lebara →",
          recommendedName:
            "Lebara – Forfaits mobiles",
          advice:
            "Consulte les forfaits mobiles Lebara et choisis directement l’offre correspondant à ton besoin et à ton budget.",
          external: true,
        },
      }}
    />
  );
}