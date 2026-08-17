"use client";

import MissionLayout from "../../components/MissionLayout";

export default function CyberSecuritePage() {
  return (
    <MissionLayout
      icon="🛡️"
      title="Protéger ta vie numérique"
      subtitle="Choisis simplement ce que tu souhaites protéger."
      basePrice={0}
      recommendedPrice={0}
      recommendedName="Solution de cybersécurité"
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
      }}
      completionType="none"
    />
  );
}