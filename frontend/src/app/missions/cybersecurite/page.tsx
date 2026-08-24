"use client";

import MissionLayout from "../../components/MissionLayout";

export default function CyberSecuritePage() {
  return (
    <MissionLayout
      icon="🛡️"
      title="Cybersécurité & logiciels"
      subtitle="Choisis la solution numérique correspondant à ton besoin."
      basePrice={0}
      recommendedPrice={0}
      recommendedName="Solution numérique"
      advice="Pilo t’oriente vers la solution correspondant à ton besoin."
      fields={[
        {
          name: "securityNeed",
          label: "Quel est ton besoin principal ?",
          type: "select",
          defaultValue: "Sécuriser ma connexion Internet",
          options: [
            "Sécuriser ma connexion Internet",
            "Protéger ma vie privée en ligne",
            "Comparer des logiciels",
            "Acheter des logiciels ou équipements professionnels",
          ],
        },
      ]}
      dynamicOfferField="securityNeed"
      dynamicOffers={{
        "Sécuriser ma connexion Internet": {
          href: "https://nordvpn.com/fr/coupon/deal/?coupon=extra1yoff&utm_campaign=off314&utm_content&utm_medium=affiliate&utm_source=aff2495&utm_term=",
          buttonLabel: "Découvrir NordVPN →",
          recommendedName: "NordVPN",
          advice:
            "Sécurise ta connexion et protège tes données, notamment sur les réseaux Wi-Fi publics.",
          external: true,
          completionType: "none",
        },

        "Protéger ma vie privée en ligne": {
          href: "https://www.kqzyfj.com/click-101847438-15402312",
          buttonLabel: "Découvrir AntiBrowserSpy →",
          recommendedName: "Abelssoft – AntiBrowserSpy",
          advice:
            "Réduis le suivi en ligne et protège davantage tes données personnelles et ta confidentialité.",
          external: true,
          completionType: "none",
        },

        "Comparer des logiciels": {
          href: "https://track.effiliation.com/servlet/effi.click?id_compteur=23305834",
          buttonLabel: "Comparer les logiciels →",
          recommendedName: "MonLogiciel.fr",
          advice:
            "Compare les logiciels disponibles et trouve l’outil numérique le plus adapté à tes besoins.",
          external: true,
          completionType: "none",
        },

        "Acheter des logiciels ou équipements professionnels": {
          href: "https://track.effiliation.com/servlet/effi.click?id_compteur=23305838",
          buttonLabel: "Découvrir CoffeeSoft →",
          recommendedName: "CoffeeSoft",
          advice:
            "Découvre des logiciels, solutions informatiques et équipements adaptés aux besoins des professionnels.",
          external: true,
          completionType: "none",
        },
      }}
      completionType="none"
    />
  );
}